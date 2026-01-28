<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<!-- Focus trap start -->
		<div
			v-if="open"
			ref="focusTrapStart"
			tabindex="0"
			@focus="focusLast"
		/>
		<transition
			name="cdx-popover-bottom-sheet"
			appear
		>
			<div
				v-if="open"
				ref="backdrop"
				class="cdx-popover-bottom-sheet-backdrop"
				:class="{ 'cdx-popover-bottom-sheet-backdrop--no-backdrop': hideBackdrop }"
				@mousedown="onBackdropMouseDown"
				@click="onBackdropClick"
			>
				<div
					ref="bottomSheet"
					class="cdx-popover-bottom-sheet"
					:class="{ 'cdx-popover-bottom-sheet--dividers': showDividers }"
					:style="sheetStyles"
					role="dialog"
					aria-modal="true"
					v-bind="$attrs"
					@click.stop
				>
					<div
						ref="focusHolder"
						class="cdx-popover-bottom-sheet-focus-trap"
						tabindex="-1"
					/>
					<header
						v-if="showHeader || $slots.header"
						class="cdx-popover-bottom-sheet__header"
					>
						<!-- @slot Customizable Bottom Sheet header. -->
						<slot name="header">
							<cdx-icon
								v-if="icon"
								class="cdx-popover-bottom-sheet__header__icon"
								:icon
							/>
							<div v-if="title" class="cdx-popover-bottom-sheet__header__title">
								{{ title }}
							</div>
							<div class="cdx-popover-bottom-sheet__header__button-wrapper">
								<cdx-button
									v-if="useCloseButton"
									class="cdx-popover-bottom-sheet__header__close-button"
									weight="quiet"
									type="button"
									:aria-label="translatedCloseButtonLabel"
									@click="close"
								>
									<cdx-icon :icon="cdxIconClose" />
								</cdx-button>
							</div>
						</slot>
					</header>

					<div
						ref="scrollable"
						class="cdx-popover-bottom-sheet__body cdx-scrollable-container"
						:class="{
							// eslint-disable-next-line max-len
							'cdx-popover-bottom-sheet__body--no-footer': !( showFooter || $slots.footer )
						}"
						@scroll="onScrollableScroll"
					>
						<!-- @slot Bottom Sheet body content. -->
						<slot />
					</div>

					<footer
						v-if="showFooter || $slots.footer"
						class="cdx-popover-bottom-sheet__footer"
					>
						<!-- @slot Customizable Bottom Sheet footer. -->
						<slot name="footer">
							<div
								class="cdx-popover-bottom-sheet__footer__actions"
								:class="footerActionsClasses"
							>
								<cdx-button
									v-if="primaryAction"
									class="cdx-popover-bottom-sheet__footer__primary-action"
									weight="primary"
									:action="primaryAction.actionType"
									:disabled="primaryAction.disabled"
									@click="$emit( 'primary' )"
								>
									{{ primaryAction.label }}
								</cdx-button>

								<cdx-button
									v-if="defaultAction"
									class="cdx-popover-bottom-sheet__footer__default-action"
									:disabled="defaultAction.disabled"
									@click="$emit( 'default' )"
								>
									{{ defaultAction.label }}
								</cdx-button>
							</div>
						</slot>
					</footer>
				</div>
			</div>
		</transition>
		<!-- Focus trap end -->
		<div
			v-if="open"
			ref="focusTrapEnd"
			tabindex="0"
			@focus="focusFirst"
		/>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject, toRef, ref, watch, onMounted, onUnmounted, unref } from 'vue';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useI18nWithOverride from '../../composables/useI18nWithOverride';
import useResizeObserver from '../../composables/useResizeObserver';
import useScrollLock from '../../composables/useScrollLock';
import useFocusTrap from '../../composables/useFocusTrap';
import { TeleportTarget, PrimaryModalAction, ModalAction } from '../../types';

/**
 * Internal component: Bottom Sheet variant of Popover for mobile devices.
 * This component is not exported and should only be used internally by Popover.
 */
export default defineComponent( {
	name: 'CdxPopoverBottomSheet',

	components: { CdxButton, CdxIcon },

	inheritAttrs: false,

	props: {
		/**
		 * Whether the bottom sheet is visible.
		 * Should be provided via a v-model:open binding in the parent scope.
		 */
		open: {
			type: Boolean,
			default: false
		},

		/**
		 * Title text at the top of the bottom sheet.
		 */
		title: {
			type: String,
			default: ''
		},

		/**
		 * Icon displayed at the start of the bottom sheet.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},

		/**
		 * Add an icon-only close button to the bottom sheet header.
		 */
		useCloseButton: {
			type: Boolean,
			default: false
		},

		/**
		 * Visually-hidden label text for the icon-only close button in the header.
		 *
		 * Omit this prop to use the default value, "Close".
		 */
		closeButtonLabel: {
			type: String,
			default: 'Close'
		},

		/**
		 * Primary user action. This will display a primary button with the specified action
		 * (progressive or destructive).
		 */
		primaryAction: {
			type: Object as PropType<PrimaryModalAction>,
			default: null
		},

		/**
		 * Default user action. This will display a normal button.
		 */
		defaultAction: {
			type: Object as PropType<ModalAction>,
			default: null
		},

		/**
		 * Whether action buttons should be vertically stacked and 100% width.
		 */
		stackedActions: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to hide the backdrop/scrim behind the bottom sheet.
		 */
		hideBackdrop: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to disable the use of teleport and render the Bottom Sheet in its
		 * original location in the document.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the open/close state changes, e.g. when the close button is clicked.
		 *
		 * @property {boolean} newValue The new open/close state (true for open, false for closed)
		 */
		'update:open',
		/**
		 * When the primary action button is clicked.
		 */
		'primary',
		/**
		 * When the default action button is clicked.
		 */
		'default'
	],

	setup( props, { emit } ) {
		const backdrop = ref<HTMLDivElement>();
		const bottomSheet = ref<HTMLDivElement>();
		const scrollable = ref<HTMLDivElement>();

		// Teleport configuration

		/**
		 * Determine where to teleport the Bottom Sheet to.
		 * Uses injected teleport target if available, otherwise defaults to 'body'.
		 */
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

		// Internationalization

		/**
		 * Translated close button label with i18n override support.
		 */
		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-popover-close-button-label',
			'Close'
		);

		// UI state

		/**
		 * Whether to show the header section.
		 */
		const showHeader = computed( () => !!props.title || !!props.icon || props.useCloseButton );

		/**
		 * Whether to show the footer section.
		 */
		const showFooter = computed( () => !!props.primaryAction || !!props.defaultAction );

		/**
		 * CSS classes for footer actions container.
		 */
		const footerActionsClasses = computed( () => ( {
			'cdx-popover-bottom-sheet__footer__actions--stacked': props.stackedActions
		} ) );

		// Scroll locking
		const isSheetOpen = computed( () => props.open );
		useScrollLock( isSheetOpen );

		// Viewport management

		/**
		 * Visual viewport height (accounts for keyboard).
		 * Used for calculating sheet positioning and keyboard height.
		 */
		const visualViewportHeight = ref<number>( 0 );

		/**
		 * Visual viewport offset from top of layout viewport.
		 * Needed for correct positioning when keyboard is open.
		 */
		const visualViewportOffsetTop = ref<number>( 0 );

		/**
		 * Initial layout viewport height when sheet opens.
		 * Stored as a stable reference since window.innerHeight can change during scrolling.
		 */
		const initialLayoutViewportHeight = ref<number>( 0 );

		/**
		 * Reset the viewport to the initial state.
		 */
		function resetViewport() {
			visualViewportHeight.value = window.innerHeight;
			visualViewportOffsetTop.value = 0;
			initialLayoutViewportHeight.value = 0;
		}

		/**
		 * Set the viewport to the given height and offset top.
		 *
		 * @param height - The height of the viewport
		 * @param offsetTop - The offset top of the viewport
		 */
		function setViewport( height: number, offsetTop: number ) {
			visualViewportHeight.value = height;
			visualViewportOffsetTop.value = offsetTop;
		}

		let updateViewportRaf = 0;

		/**
		 * Cancel any pending viewport update.
		 */
		function cancelPendingViewportUpdate() {
			if ( updateViewportRaf !== 0 ) {
				cancelAnimationFrame( updateViewportRaf );
				updateViewportRaf = 0;
			}
		}

		/**
		 * Update visual viewport height (coalesced to one read per frame so padding-bottom
		 * does not thrash when resize + scroll events fire together).
		 */
		function updateViewport() {
			if ( updateViewportRaf !== 0 ) {
				return;
			}
			updateViewportRaf = requestAnimationFrame( () => {
				updateViewportRaf = 0;
				if ( !window.visualViewport ) {
					// Fallback for browsers without visualViewport support
					setViewport( window.innerHeight, 0 );
					return;
				}

				// visualViewport.height already accounts for the keyboard being visible
				// visualViewport.offsetTop tells us where the visual viewport is positioned
				// relative to the layout viewport (important when keyboard is open)
				setViewport( window.visualViewport.height, window.visualViewport.offsetTop );
			} );
		}

		/**
		 * Set up viewport listeners to track changes.
		 */
		function setViewportListeners() {
			if ( window.visualViewport ) {
				window.visualViewport.addEventListener( 'resize', updateViewport );
				window.visualViewport.addEventListener( 'scroll', updateViewport );
			}
		}

		/**
		 * Remove viewport listeners to prevent memory leaks.
		 */
		function removeViewportListeners() {
			if ( window.visualViewport ) {
				window.visualViewport.removeEventListener( 'resize', updateViewport );
				window.visualViewport.removeEventListener( 'scroll', updateViewport );
			}
		}

		// Styling

		/**
		 * Dynamic styles for the bottom sheet.
		 * Calculates padding-bottom to account for keyboard height.
		 */
		const sheetStyles = computed( () => {
			const viewportHeight = visualViewportHeight.value > 0 ?
				visualViewportHeight.value :
				( initialLayoutViewportHeight.value || window.innerHeight );
			const offsetTop = visualViewportOffsetTop.value;
			// Use initial layout viewport height as stable reference
			const layoutViewportHeight = initialLayoutViewportHeight.value || window.innerHeight;

			// Calculate keyboard height
			// Only apply padding if the height difference is significant (> 100px),
			// indicating a real keyboard is visible
			const keyboardHeight = layoutViewportHeight - viewportHeight - offsetTop;
			const paddingBottomValue = keyboardHeight > 100 ? Math.max( 0, keyboardHeight ) : 0;

			// Add padding only if the keyboard is visible.
			if ( paddingBottomValue <= 0 ) {
				return {};
			}
			return {
				paddingBottom: `${ paddingBottomValue }px`,
			};
		} );

		// Scroll tracking

		/**
		 * Track scroll position to detect if sheet is at top.
		 */
		const scrollTop = ref<number>( 0 );

		/**
		 * Update scroll position when scrollable area is scrolled.
		 */
		function onScrollableScroll() {
			if ( scrollable.value ) {
				scrollTop.value = scrollable.value.scrollTop;
			}
		}

		// Track scrollable area dimensions to detect if content is scrollable
		const scrollableDimensions = useResizeObserver( scrollable );
		const currentScrollableHeight = computed( () => scrollableDimensions.value.height ?? 0 );
		const showDividers = ref( false );

		// Determine if content dividers should be displayed for overflowing content
		watch( currentScrollableHeight, () => {
			if ( scrollable.value ) {
				showDividers.value = scrollable.value.clientHeight < scrollable.value.scrollHeight;
			}
		} );

		// Event handlers

		/**
		 * Close the bottom sheet by emitting an event to the parent.
		 */
		function close() {
			emit( 'update:open', false );
		}

		/**
		 * Track whether the mouse is down on the backdrop.
		 * Used to distinguish between backdrop clicks and clicks on the sheet itself.
		 */
		let mousedownOnBackdrop = false;

		/**
		 * Handle backdrop mousedown event.
		 *
		 * @param e - The mouse event
		 */
		function onBackdropMouseDown( e: MouseEvent ) {
			mousedownOnBackdrop = e.target === backdrop.value;
		}

		/**
		 * Handle backdrop click event.
		 * Closes the sheet if the click started on the backdrop.
		 */
		function onBackdropClick() {
			if ( mousedownOnBackdrop ) {
				close();
			}
		}

		/**
		 * Handle Escape key press to close the bottom sheet.
		 *
		 * @param event - The keyboard event
		 */
		function onKeydown( event: KeyboardEvent ) {
			if ( event.key === 'Escape' ) {
				close();
			}
		}

		const {
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			focusFirst,
			focusLast,
			activateFocusTrap,
			deactivateFocusTrap
		} = useFocusTrap( {
			containerRef: bottomSheet,
			bodyRef: scrollable,
			preventScroll: true
		} );

		// Lifecycle functions

		/**
		 * Initialize and open the bottom sheet.
		 * Sets up event listeners and initializes viewport tracking.
		 * Note: initialLayoutViewportHeight should be set before calling this function.
		 */
		async function openBottomSheet() {
			document.addEventListener( 'keydown', onKeydown );

			updateViewport();
			setViewportListeners();

			// Run shared focus trap setup.
			await activateFocusTrap();
		}

		/**
		 * Close and clean up the bottom sheet.
		 * Removes event listeners and resets viewport state.
		 */
		function closeBottomSheet() {
			document.removeEventListener( 'keydown', onKeydown );
			removeViewportListeners();
			cancelPendingViewportUpdate();
			resetViewport();

			// Run shared focus trap teardown.
			deactivateFocusTrap();
		}

		// Lifecycle hooks

		watch( () => props.open, async ( isOpen ) => {
			if ( isOpen ) {
				// Capture initial viewport height BEFORE opening the sheet
				// Use document.documentElement.clientHeight as it's more stable than
				// window.innerHeight which can change during scrolling on iOS Safari
				initialLayoutViewportHeight.value = document.documentElement.clientHeight;
				await openBottomSheet();
			} else {
				closeBottomSheet();
			}
		} );

		onMounted( async () => {
			if ( props.open ) {
				// Capture initial viewport height if sheet is already open on mount
				initialLayoutViewportHeight.value = document.documentElement.clientHeight;
				await openBottomSheet();
			} else {
				updateViewport();
			}
		} );

		onUnmounted( () => {
			document.removeEventListener( 'keydown', onKeydown );
			removeViewportListeners();
			cancelPendingViewportUpdate();
		} );

		return {
			computedTarget,
			translatedCloseButtonLabel,
			showHeader,
			showFooter,
			footerActionsClasses,
			close,
			cdxIconClose,
			backdrop,
			bottomSheet,
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			focusFirst,
			focusLast,
			scrollable,
			sheetStyles,
			showDividers,
			onScrollableScroll,
			onBackdropMouseDown,
			onBackdropClick
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import (reference) '../../themes/mixins/public/typography.less';

.cdx-popover-bottom-sheet-backdrop {
	background-color: @background-color-backdrop-light;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: @z-index-overlay-backdrop;
	min-height: @size-full;
	width: @size-viewport-width-full;
	height: @size-viewport-height-full;
	// Support Safari/iOS: Make `100vh` work with Safari's address bar.
	// See https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
		scale-unlimited/declaration-strict-value */
	height: -webkit-fill-available;
	// Dynamic viewport (mobile chrome, Firefox Android toolbar); not all target Safari versions
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
		scale-unlimited/declaration-strict-value */
	height: 100dvh;

	&--no-backdrop {
		background-color: @background-color-transparent;
	}
}

.cdx-popover-bottom-sheet {
	background-color: @background-color-base;
	display: flex;
	flex-direction: column;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: @z-index-popover;
	box-sizing: @box-sizing-base;
	width: @size-full;
	max-width: @size-full;
	// Fallback for browsers without dynamic viewport units support.
	max-height: calc( @size-full - @size-800 );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
	scale-unlimited/declaration-strict-value */
	max-height: 90dvh;
	border-top: @border-base;
	// Account for safe area at top (notch, status bar, etc.)
	// @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env
	padding-top: env( safe-area-inset-top, 0 );
	box-shadow: @box-shadow-large;
	// Base safe area at bottom (keyboard padding is added via inline style)
	// padding-bottom is set via inline style to include keyboard height

	&__header {
		display: flex;
		align-items: flex-start;
		flex-shrink: 0;
		gap: @spacing-50;
		padding: @spacing-100 @spacing-150;

		&__icon {
			flex-shrink: 0;
			height: @line-height-small;
		}

		&__title {
			flex-grow: 1;
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-small;
		}

		&__button-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: @line-height-small;
			margin-right: -@spacing-50;
			margin-left: auto;
		}
	}

	// Match Dialog: scrollable body and footer as flex siblings; `margin-top: auto` on the
	// footer pins it to the bottom when the sheet has extra vertical space.
	&__body {
		min-height: 0;
		padding: @spacing-50 @spacing-150;
		overflow-y: auto;
		.cdx-mixin-body-text();

		&--no-footer {
			padding-bottom: @spacing-150;
		}

		// Zero-out margin/padding on edge children like PopoverBottomSheet __body
		> *:first-child {
			margin-top: 0;
			padding-top: 0;
		}

		> *:last-child {
			margin-bottom: 0;
			padding-bottom: 0;
		}
		-webkit-overflow-scrolling: touch;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		overscroll-behavior: contain;
	}

	&__footer {
		margin-top: auto;
		padding: @spacing-100 @spacing-150 @spacing-100 @spacing-150;
		padding-bottom: calc( @spacing-150 + env( safe-area-inset-bottom, 0px ) );

		&__actions {
			display: flex;
			flex-direction: row-reverse;
			gap: @spacing-75;

			// Needed because iOS Safari < 14 does not support `gap` for `display:flex`
			// @see https://ppuzio.medium.com/flexbox-gap-workaround-for-safari-on-ios-14-13-and-lower-ffcae589eb69
			@supports ( -webkit-touch-callout: none ) and ( not ( translate: none ) ) {
				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-button:not( :last-child ) {
					margin-right: @spacing-75;
				}
			}

			/* stylelint-disable max-nesting-depth -- stacked actions + @supports gap fallback */
			&--stacked {
				flex-direction: column;
				width: @size-full;

				.cdx-button {
					max-width: none;
				}

				// Needed because iOS Safari < 14 does not support `gap` for `display:flex`
				// @see https://ppuzio.medium.com/flexbox-gap-workaround-for-safari-on-ios-14-13-and-lower-ffcae589eb69
				@supports ( -webkit-touch-callout: none ) and ( not ( translate: none ) ) {
					.cdx-button:not( :last-child ) {
						margin-right: 0;
						margin-bottom: @spacing-75;
					}
				}
			}
			/* stylelint-enable max-nesting-depth */
		}
	}
}

.cdx-popover-bottom-sheet-focus-trap {
	// This element is not used for visual styling, just
	// focus management. It needs to be invisible but cannot
	// have display:none, and its position in the markup is
	// important (must be inside the bottom sheet element).
	// Set position to absolute so that this element is
	// omitted from all flex layout calculations
	position: absolute;

	// Don't show visible focus outline for the focus-trap element
	&:focus {
		outline: 0;
	}
}

// When content overflows the body, add dividers between header / footer and the scroll pane
.cdx-popover-bottom-sheet--dividers {
	.cdx-popover-bottom-sheet__header {
		border-bottom: @border-subtle;
	}

	.cdx-popover-bottom-sheet__footer {
		border-top: @border-subtle;
	}
}

// Transition animations
// Backdrop fades in/out, sheet slides up/down
.cdx-popover-bottom-sheet-enter-active,
.cdx-popover-bottom-sheet-leave-active {
	transition-duration: @transition-duration-medium;
	transition-timing-function: @transition-timing-function-system;
}

.cdx-popover-bottom-sheet-enter-active {
	transition-property: @transition-property-fade;

	.cdx-popover-bottom-sheet {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		transition-property: transform;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}
}

.cdx-popover-bottom-sheet-leave-active {
	transition-property: @transition-property-fade;

	.cdx-popover-bottom-sheet {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		transition-property: transform;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}
}

.cdx-popover-bottom-sheet-enter-from {
	opacity: @opacity-transparent;

	.cdx-popover-bottom-sheet {
		transform: translateY( 100% );
	}
}

.cdx-popover-bottom-sheet-leave-to {
	opacity: @opacity-transparent;

	.cdx-popover-bottom-sheet {
		transform: translateY( 100% );
	}
}
</style>
