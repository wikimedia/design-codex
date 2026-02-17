<template>
	<teleport :disabled="renderInPlace" :to="computedTarget">
		<Transition
			name="cdx-toast"
			appear
			:leave-active-class="leaveActiveClass"
			@after-leave="onAfterLeave"
		>
			<div
				v-if="!dismissed"
				ref="toastElement"
				class="cdx-toast"
				:class="rootClasses"
				:tabindex="-1"
				@mouseenter="onMouseEnter"
				@mouseleave="onMouseLeave"
				@keydown.esc="onDismiss( 'user-dismissed' )"
			>
				<cdx-message
					:type="type"
					:icon="icon"
					:action-button-label="actionButtonLabel"
					:allow-user-dismiss="!preventUserDismiss"
					class="cdx-toast__message"
					@user-dismissed="onDismiss( 'user-dismissed' )"
					@auto-dismissed="onDismiss( 'auto-dismissed' )"
					@action-button-click="onActionButtonClick"
				>
					<!-- @slot Toast content. -->
					<slot />
				</cdx-message>
			</div>
		</Transition>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, onMounted, onUnmounted, nextTick, inject, unref } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import CdxMessage from '../message/Message.vue';
import { statusTypeValidator } from '../../constants';
import { StatusType, TeleportTarget } from '../../types';
import useSplitAttributes from '../../composables/useSplitAttributes';
import { isUserTouchingToastRef } from './toast.store';

/**
 * Internal component that renders a single toast (teleport, transition, message, swipe).
 * Used by CdxToast when rendered inside ToastContainer.
 */
export default defineComponent( {
	name: 'CdxToastDisplay',
	components: { CdxMessage },
	inheritAttrs: false,
	props: {
		type: {
			type: String as PropType<StatusType>,
			default: 'notice',
			validator: statusTypeValidator
		},
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},
		actionButtonLabel: {
			type: String,
			default: ''
		},
		preventUserDismiss: {
			type: Boolean,
			default: false
		},
		autoDismiss: {
			type: [ Boolean, Number ],
			default: false,
			validator: ( value: unknown ) => typeof value === 'boolean' ||
				( typeof value === 'number' && value > 0 )
		},
		renderInPlace: {
			type: Boolean,
			default: false
		},
		// Optional explicit teleport target. Used mainly by standalone toasts;
		// ignored when rendered inside ToastContainer with renderInPlace.
		target: {
			type: [ String, Object ] as PropType<TeleportTarget>,
			default: undefined
		}
	},
	emits: [ 'user-dismissed', 'auto-dismissed', 'action-button-click' ],
	setup( props, { emit, attrs } ) {
		const dismissed = ref( false );
		const toastElement = ref<HTMLElement>();
		const leaveActiveClass = ref( '' );
		const pendingDismissEvent = ref<'user-dismissed' | 'auto-dismissed' | null>( null );
		// True while user is touching this toast (swiping). Pauses this toast's auto-dismiss.
		const isTouchingThisToast = ref( false );

		let autoDismissTimer: ReturnType<typeof setTimeout> | null = null;
		let isPaused = false;
		let swipeCleanup: ( () => void ) | undefined;

		// Teleport target
		function getToastContainerTarget(): HTMLElement | null {
			if ( typeof document === 'undefined' ) {
				return null;
			}
			return document.querySelector<HTMLElement>( '.cdx-toast-container__stack' );
		}
		const containerTarget = ref<HTMLElement | null>( getToastContainerTarget() );
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( props.target ) ?? containerTarget.value ?? unref( providedTarget ) ?? 'body' );

		const displayTime = computed( () => props.autoDismiss === true ? 4000 : props.autoDismiss );
		const internalClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-toast--${ props.type }` ]: true
		} ) );
		const { rootClasses } = useSplitAttributes( attrs, internalClasses );

		// Dismiss (leave transition + emit)
		/**
		 * Start dismiss: set leave class, trigger leave. Event is emitted in
		 * `onAfterLeave` once the leave transition has completed so parents
		 * or the container can safely unmount the toast.
		 *
		 * @param eventName Event to emit after leave completes
		 */
		function onDismiss( eventName: 'user-dismissed' | 'auto-dismissed' ) {
			if ( dismissed.value ) {
				return;
			}
			clearAutoDismissTimer();
			leaveActiveClass.value = eventName === 'user-dismissed' ?
				'cdx-toast-leave-active-user' :
				'cdx-toast-leave-active-system';
			pendingDismissEvent.value = eventName;
			dismissed.value = true;
		}

		/**
		 * When leave transition completes, emit the pending dismiss event so the
		 * container can remove the toast from the store or parents can unmount.
		 */
		function onAfterLeave() {
			if ( pendingDismissEvent.value ) {
				emit( pendingDismissEvent.value );
				pendingDismissEvent.value = null;
			}
		}

		// User actions (action button, hover)
		/**
		 * Handle action button click.
		 */
		function onActionButtonClick() {
			emit( 'action-button-click' );
		}

		/**
		 * Pause auto-dismiss when hovering over the toast.
		 */
		function onMouseEnter() {
			isPaused = true;
			clearAutoDismissTimer();
		}

		/**
		 * Resume auto-dismiss when mouse leaves the toast.
		 */
		function onMouseLeave() {
			if ( isPaused && displayTime.value ) {
				isPaused = false;
				startAutoDismiss();
			}
		}

		// Auto-dismiss (timer + pause on hover)
		/**
		 * Clear the auto-dismiss timer.
		 */
		function clearAutoDismissTimer(): void {
			if ( autoDismissTimer ) {
				clearTimeout( autoDismissTimer );
				autoDismissTimer = null;
			}
		}
		/**
		 * Start the auto-dismiss timer.
		 * If the timer fires while the user is touching any toast, we clear and
		 * return; the watcher on `isUserTouchingToastRef` restarts us when they
		 * release.
		 */
		function startAutoDismiss() {
			if ( !displayTime.value || isPaused ) {
				return;
			}
			autoDismissTimer = setTimeout( () => {
				if ( isTouchingThisToast.value || isUserTouchingToastRef.value ) {
					clearAutoDismissTimer();
					return;
				}
				onDismiss( 'auto-dismissed' );
			}, displayTime.value );
		}
		/**
		 * Watch for changes in the user touching state.
		 * If the user stops touching, restart the auto-dismiss timer.
		 */
		watch( isUserTouchingToastRef, ( isTouching, wasTouching ) => {
			if ( wasTouching && !isTouching && displayTime.value && !isPaused ) {
				clearAutoDismissTimer();
				startAutoDismiss();
			}
		} );

		/**
		 * Watch for changes in autoDismiss prop (via displayTime computed).
		 * Clear timer if disabled, restart if enabled (and not paused).
		 */
		watch( displayTime, ( newDisplayTime ) => {
			clearAutoDismissTimer();
			if ( newDisplayTime && !isPaused ) {
				startAutoDismiss();
			}
		} );

		// Swipe-to-dismiss (mobile)
		/**
		 * Set up horizontal swipe-to-dismiss on mobile.
		 * Dismiss if swipe exceeds ~35% of toast width; otherwise snap back.
		 *
		 * @return Cleanup function to remove event listeners, or undefined if not set up
		 */
		function setupSwipeToDismiss() {
			if ( !toastElement.value || props.preventUserDismiss ) {
				return;
			}

			const el = toastElement.value;
			const dismissThresholdRatio = 0.35;
			let touchStartX: number | null = null;
			let currentDeltaX = 0;

			function getBaseTransform() {
				return props.renderInPlace ? '' : 'translateX(-50%)';
			}

			function applyDragTransform( deltaX: number ) {
				const threshold = el.offsetWidth * dismissThresholdRatio;
				const opacity = Math.max( 0.95, 1 - ( Math.abs( deltaX ) / threshold ) * 0.05 );
				el.style.opacity = String( opacity );
				if ( props.renderInPlace ) {
					el.style.transform = `translateX(${ deltaX }px)`;
				} else {
					el.style.transform = `translateX(calc(-50% + ${ deltaX }px))`;
				}
			}

			function snapBack() {
				el.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
				el.style.transform = getBaseTransform();
				el.style.opacity = '';
				const onTransitionEnd = () => {
					el.removeEventListener( 'transitionend', onTransitionEnd );
					el.style.transition = '';
					el.style.transform = '';
				};
				el.addEventListener( 'transitionend', onTransitionEnd );
			}

			function slideOutAndDismiss() {
				const direction = currentDeltaX >= 0 ? 1 : -1;
				const slideOutDistance = el.offsetWidth * 1.2;
				const targetDeltaX = direction * slideOutDistance;

				el.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out';
				el.style.opacity = '0';
				if ( props.renderInPlace ) {
					el.style.transform = `translateX(${ targetDeltaX }px)`;
				} else {
					el.style.transform = `translateX(calc(-50% + ${ targetDeltaX }px))`;
				}

				const onTransitionEnd = () => {
					el.removeEventListener( 'transitionend', onTransitionEnd );
					onDismiss( 'user-dismissed' );
				};
				el.addEventListener( 'transitionend', onTransitionEnd );
			}

			function setTouching( touching: boolean ) {
				isTouchingThisToast.value = touching;
				isUserTouchingToastRef.value = touching;
			}

			const onTouchStart = ( e: TouchEvent ) => {
				touchStartX = e.touches[ 0 ].clientX;
				currentDeltaX = 0;
				el.style.transition = '';
				setTouching( true );
			};

			const onTouchMove = ( e: TouchEvent ) => {
				if ( touchStartX === null ) {
					return;
				}
				e.preventDefault();
				currentDeltaX = e.touches[ 0 ].clientX - touchStartX;
				applyDragTransform( currentDeltaX );
			};

			const onTouchEnd = () => {
				setTouching( false );
				if ( touchStartX === null ) {
					return;
				}
				const threshold = el.offsetWidth * dismissThresholdRatio;
				if ( Math.abs( currentDeltaX ) >= threshold ) {
					slideOutAndDismiss();
				} else {
					snapBack();
				}
				touchStartX = null;
			};

			const onTouchCancel = () => {
				setTouching( false );
				if ( touchStartX !== null ) {
					snapBack();
					touchStartX = null;
				}
			};

			el.addEventListener( 'touchstart', onTouchStart, { passive: true } );
			el.addEventListener( 'touchmove', onTouchMove, { passive: false } );
			el.addEventListener( 'touchend', onTouchEnd, { passive: true } );
			el.addEventListener( 'touchcancel', onTouchCancel, { passive: true } );

			return () => {
				el.removeEventListener( 'touchstart', onTouchStart );
				el.removeEventListener( 'touchmove', onTouchMove );
				el.removeEventListener( 'touchend', onTouchEnd );
				el.removeEventListener( 'touchcancel', onTouchCancel );
			};
		}

		// Focus
		/**
		 * Focus the toast when it appears so keyboard users can immediately
		 * interact with it (e.g. dismiss or activate action button).
		 */
		async function focusToast() {
			await nextTick();
			if ( toastElement.value ) {
				toastElement.value.focus();
			}
		}

		// Lifecycle
		onMounted( async () => {
			// The container target is the .cdx-toast-container__stack element if it exists
			containerTarget.value = getToastContainerTarget();
			// Start auto-dismiss if enabled
			if ( displayTime.value ) {
				startAutoDismiss();
			}
			// Set up swipe-to-dismiss
			swipeCleanup = setupSwipeToDismiss();
			// Focus the toast
			await focusToast();
		} );

		onUnmounted( () => {
			// Clear auto-dismiss timer and remove swipe-to-dismiss event listeners
			clearAutoDismissTimer();
			swipeCleanup?.();
		} );

		return {
			dismissed,
			toastElement,
			rootClasses,
			leaveActiveClass,
			onDismiss,
			onActionButtonClick,
			onAfterLeave,
			onMouseEnter,
			onMouseLeave,
			computedTarget
		};
	}
} );
</script>

<!-- eslint-disable max-len -->
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-toast {
	position: fixed;
	bottom: @spacing-100;
	left: @size-half;
	z-index: @z-index-toast-notification;
	box-sizing: @box-sizing-base;
	width: calc( 100% - 2 * @spacing-100 );
	max-width: calc( 100% - 2 * @spacing-100 );
	transform: translateX( -@spacing-half );

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		bottom: @spacing-150;
		width: @size-3200;
		max-width: @size-3200;
	}

	&__message {
		margin: 0;
		box-shadow: @box-shadow-large;

		@media screen and ( max-width: @max-width-breakpoint-mobile ) {
			.cdx-message__dismiss-button {
				display: none;
			}

			&.cdx-message--user-dismissable {
				padding-right: @spacing-75;
			}
		}
	}

	&-enter-active {
		transition-property: @transition-property-toast;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}

	&-leave-active-system {
		transition-property: @transition-property-fade;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;

		&.cdx-toast-leave-to {
			transform: translateX( -@spacing-half );
		}
	}

	&-leave-active-user {
		transition-property: none;
		transition-duration: 0s;

		&.cdx-toast-leave-to {
			transform: translateX( -@spacing-half );
		}
	}

	&-enter-from,
	&-leave-to {
		opacity: @opacity-transparent;
		transform: translateX( -@spacing-half ) translateY( @spacing-125 );
	}

	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	&:focus-visible {
		outline: @border-width-base @border-style-base @border-color-progressive--focus;
	}
}
</style>
<!-- eslint-enable max-len -->
