<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<!-- Focus trap start -->
		<div
			v-if="open"
			ref="focusTrapStart"
			tabindex="0"
			@focus="focusLast"
		/>
		<transition :name="transitionName" appear>
			<div
				v-if="open"
				ref="backdrop"
				class="cdx-popover__backdrop"
				:class="backdropClassObject"
				@mousedown="onBackdropMouseDown"
				@click="onBackdropClick"
			>
				<div
					ref="panel"
					class="cdx-popover"
					:class="panelClassObject"
					:style="panelInlineStyles"
					:role="isBottomSheet ? 'dialog' : undefined"
					:aria-modal="isBottomSheet ? 'true' : undefined"
					v-bind="$attrs"
					@click="onPanelClick"
				>
					<div
						ref="focusHolder"
						class="cdx-popover-focus-trap"
						tabindex="-1"
					/>
					<header
						v-if="showHeader || $slots.header"
						class="cdx-popover__header"
					>
						<!-- @slot Customizable Popover header. -->
						<slot name="header">
							<cdx-icon
								v-if="icon"
								class="cdx-popover__header__icon"
								:icon
							/>
							<div
								v-if="title"
								class="cdx-popover__header__title"
							>
								{{ title }}
							</div>
							<div class="cdx-popover__header__button-wrapper">
								<cdx-button
									v-if="useCloseButton"
									class="cdx-popover__header__close-button"
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
						ref="bodyEl"
						class="cdx-popover__body"
						:class="{ 'cdx-popover__body--no-footer': !showFooter && !$slots.footer }"
					>
						<!-- @slot Popover body content. -->
						<slot />
					</div>

					<footer
						v-if="showFooter || $slots.footer"
						class="cdx-popover__footer"
					>
						<!-- @slot Customizable Popover footer. -->
						<slot name="footer">
							<div
								class="cdx-popover__footer__actions"
								:class="footerActionsClasses"
							>
								<cdx-button
									v-if="primaryAction"
									class="cdx-popover__footer__primary-action"
									weight="primary"
									:action="primaryAction.actionType"
									:disabled="primaryAction.disabled"
									@click="$emit( 'primary' )"
								>
									{{ primaryAction.label }}
								</cdx-button>

								<cdx-button
									v-if="defaultAction"
									class="cdx-popover__footer__default-action"
									:disabled="defaultAction.disabled"
									@click="$emit( 'default' )"
								>
									{{ defaultAction.label }}
								</cdx-button>
							</div>
						</slot>
					</footer>
					<div
						v-if="!isBottomSheet"
						ref="arrowRef"
						class="cdx-popover__arrow"
						:style="arrowStyles"
					/>
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
import {
	defineComponent,
	PropType,
	ComponentPublicInstance,
	computed,
	inject,
	toRef,
	ref,
	watch,
	onMounted,
	onUnmounted,
	nextTick,
	reactive,
	unref
} from 'vue';
import { useFloating, offset, flip, autoUpdate, size, arrow, Side, Placement } from '@floating-ui/vue';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useI18nWithOverride from '../../composables/useI18nWithOverride';
import useBreakpoint from '../../composables/useBreakpoint';
import useResizeObserver from '../../composables/useResizeObserver';
import useScrollLock from '../../composables/useScrollLock';
import useFocusTrap from '../../composables/useFocusTrap';
import { unwrapElement } from '../../utils/unwrapElement';
import { PrimaryModalAction, ModalAction, TeleportTarget } from '../../types';
import { oppositeSides } from '../../constants';

/**
 * A Popover is a localized, non-disruptive container that is overlaid on a web page or app,
 * near its trigger, in order to present necessary information and tasks.
 */
export default defineComponent( {
	name: 'CdxPopover',

	components: { CdxButton, CdxIcon },

	inheritAttrs: false,

	props: {
		/**
		 * The triggering element that opens and closes the popover. This should be a template ref,
		 * which can be either an HTML element or a Vue component.
		 *
		 * This must be provided so the popover can be positioned relative to the triggering
		 * element (floating mode). Optional when only the bottom sheet variant is used on mobile.
		 */
		anchor: {
			type: Object as PropType<HTMLElement | ComponentPublicInstance | null>,
			default: null
		},

		/**
		 * Whether the popover is visible.
		 * Should be provided via a v-model:open binding in the parent scope.
		 */
		open: {
			type: Boolean,
			default: false
		},

		/**
		 * Title text at the top of the popover.
		 */
		title: {
			type: String,
			default: ''
		},

		/**
		 * Icon displayed at the start of the popover.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},

		/**
		 * Add an icon-only close button to the popover header.
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
		 * On mobile, the action buttons are stacked vertically by default.
		 */
		stackedActions: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to disable the use of teleport and render the Popover in its
		 * original location in the document.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
		},

		/**
		 * Positioning options for the Popover (floating mode only).
		 */
		placement: {
			type: String as PropType<Placement>,
			default: 'bottom'
		},

		/**
		 * Whether to use the bottom sheet variant on mobile devices.
		 * When true, the popover will render as a bottom sheet on mobile breakpoints.
		 */
		useBottomSheet: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to hide the backdrop/scrim behind the bottom sheet.
		 * Only applies when useBottomSheet is true and the bottom sheet layout is active.
		 */
		hideBackdrop: {
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
		const breakpoint = useBreakpoint();
		const isBottomSheet = computed( () => props.useBottomSheet && breakpoint.mobile );

		// Teleport target + labels
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

		// Labels
		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-popover-close-button-label',
			'Close'
		);

		// Template class/state bindings (shared by both modes)
		const transitionName = computed( () => isBottomSheet.value ? 'cdx-popover-bottom-sheet' : 'cdx-popover-floating' );
		const showHeader = computed( () => !!props.title || !!props.icon || props.useCloseButton );
		const showFooter = computed( () => !!props.primaryAction || !!props.defaultAction );
		const showDividers = ref( false );

		const footerActionsClasses = computed( () => ( {
			'cdx-popover__footer__actions--vertical': props.stackedActions
		} ) );

		const backdropClassObject = computed( () => ( {
			'cdx-popover__backdrop--bottom-sheet': isBottomSheet.value,
			'cdx-popover__backdrop--no-backdrop': isBottomSheet.value && props.hideBackdrop,
		} ) );

		const panelClassObject = computed( () => ( {
			'cdx-popover--bottom-sheet': isBottomSheet.value,
			'cdx-popover--dividers': isBottomSheet.value && showDividers.value
		} ) );

		// Floating placement / arrow styles
		const placementRef = toRef( props, 'placement' );
		const panel = ref<HTMLDivElement>();
		const backdrop = ref<HTMLDivElement>();
		const arrowRef = ref<HTMLDivElement>();
		const bodyEl = ref<HTMLDivElement>();
		const reference = toRef( props, 'anchor' );

		// TODO: Convert hardcoded values to JS Token T388062.
		const clipPadding = 16;
		// 256px was causing issues in small screens < 412px, see T395085
		const minClipWidth = 192; // TODO: Should be `@size-1200`, which is in rems.
		const minClipHeight = 200;
		const maxClipWidth = 512; // TODO: Should be `@size-3200`, which is in rems.

		// triangle math; this holds for right triangles (of which our arrow tip is one)
		// leaving the full calculation here for posterity, and also in case we ever pull
		// in a dynamic token value for the length of the sides or offset distance
		const sideA = 16;
		const sideB = 16;
		const sideC = Math.sqrt( ( sideA ** 2 ) + ( sideB ** 2 ) );
		const triangleHeight = sideC / 2;
		const arrowOffset = 4;
		const offsetDistance = triangleHeight + arrowOffset;

		const computedMiddleware = computed( () => {
			if ( isBottomSheet.value ) {
				return [];
			}
			return [
				offset( offsetDistance ),
				// Default flip behavior will flip floating element across the main axis
				flip(),
				size( {
					// Spacing between the floating element and the viewport.
					padding: clipPadding,
					// Apply styles based on available width/height.
					apply( { availableWidth, availableHeight, elements } ) {
						// Max width possible is the availableWidth up to the max clip width.
						const maxWidth = Math.min( maxClipWidth, availableWidth );
						Object.assign( elements.floating.style, {
							// Effective max width is the possible max width
							// down to the min clip width.
							maxWidth: `${ Math.max( minClipWidth, maxWidth ) }px`,
							maxHeight: `${ Math.max( minClipHeight, availableHeight ) }px`
						} );
					}
				} ),
				arrow( { element: arrowRef } )
			];
		} );

		const {
			floatingStyles,
			middlewareData,
			placement,
			x,
			y
		} = useFloating( reference, panel, {
			whileElementsMounted: autoUpdate,
			placement: placementRef,
			middleware: computedMiddleware
		} );

		const arrowStyles = reactive<Record<Side | 'transform', string>>( {
			left: '0',
			top: '0',
			right: '0',
			bottom: '0',
			transform: 'none'
		} );

		const oppositeSide = computed( () => oppositeSides[ placement.value ] );

		// Check for changes in popover, and update the arrow inline styles.
		watch( [ x, y ], () => {
			if ( isBottomSheet.value || !middlewareData.value.arrow ) {
				return;
			}
			const { x: arrowX, y: arrowY } = middlewareData.value.arrow;

			arrowStyles.left = arrowX ? `${ arrowX }px` : '';
			arrowStyles.top = arrowY ? `${ arrowY }px` : '';
			arrowStyles.right = '';
			arrowStyles.bottom = '';

			// Apply negative px to the placement's opposite side when popover flips.
			// We also need to account for the 1px border width.
			arrowStyles[ oppositeSide.value ] = `${ ( -16 / 2 ) - 1 }px`;

			// A note on rotation:
			//
			// The "arrow" we use for the popover is just a CSS box. Then we
			// apply "clip-path: polygon()" to mask out part of the shape
			// (so that it appears seamlessly connected with the adjacent
			// Popover body.
			//
			// After applying the clipping mask, the resulting shape needs
			// to be rotated by 45 degrees (to point up), or by 45 degrees
			// plus some multiple of 90 degrees (to point in a different
			// direction).
			const arrowTransforms = {
				top: 'rotate( 45deg )',
				right: 'rotate( 135deg )',
				bottom: 'rotate( 225deg )',
				left: 'rotate( 315deg )'
			};

			arrowStyles.transform = arrowTransforms[ oppositeSide.value ];
		} );

		// Bottom sheet: viewport + dynamic sheet styles
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
		 * Reset viewport state to defaults.
		 */
		function resetViewport() {
			visualViewportHeight.value = window.innerHeight;
			visualViewportOffsetTop.value = 0;
			initialLayoutViewportHeight.value = 0;
		}

		/**
		 * Update tracked viewport height and top offset.
		 *
		 * @param height - Current visual viewport height
		 * @param offsetTop - Current visual viewport top offset
		 */
		function setViewport( height: number, offsetTop: number ) {
			visualViewportHeight.value = height;
			visualViewportOffsetTop.value = offsetTop;
		}

		let updateViewportRaf = 0;

		/**
		 * Cancel any scheduled viewport measurement frame.
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
		 * Attach visual viewport listeners (resize/scroll).
		 */
		function setViewportListeners() {
			if ( window.visualViewport ) {
				window.visualViewport.addEventListener( 'resize', updateViewport );
				window.visualViewport.addEventListener( 'scroll', updateViewport );
			}
		}

		/**
		 * Remove visual viewport listeners to prevent leaks.
		 */
		function removeViewportListeners() {
			if ( window.visualViewport ) {
				window.visualViewport.removeEventListener( 'resize', updateViewport );
				window.visualViewport.removeEventListener( 'scroll', updateViewport );
			}
		}

		/**
		 * Dynamic styles for the bottom sheet.
		 * Calculates padding-bottom to account for keyboard height.
		 */
		const sheetStyles = computed( () => {
			if ( !isBottomSheet.value ) {
				return {};
			}
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
			if ( paddingBottomValue <= 0 ) {
				return {};
			}
			return {
				paddingBottom: `${ paddingBottomValue }px`
			};
		} );

		const scrollableDimensions = useResizeObserver( bodyEl );
		const currentScrollableHeight = computed( () => scrollableDimensions.value.height ?? 0 );

		/**
		 * Show dividers when the body content overflows the container.
		 */
		watch( currentScrollableHeight, () => {
			if ( !isBottomSheet.value || !bodyEl.value ) {
				return;
			}
			showDividers.value = bodyEl.value.clientHeight < bodyEl.value.scrollHeight;
		} );

		/**
		 * Reset dividers when bottom sheet is not active.
		 */
		watch( isBottomSheet, () => {
			if ( !isBottomSheet.value ) {
				showDividers.value = false;
			}
		} );

		const panelInlineStyles = computed( () => isBottomSheet.value ?
			sheetStyles.value :
			floatingStyles.value
		);

		const isSheetOpen = computed( () => props.open && isBottomSheet.value );
		useScrollLock( isSheetOpen );

		// Events
		let mousedownOnBackdrop = false;

		/**
		 * Close the popover by emitting an update event to the parent.
		 */
		function close() {
			emit( 'update:open', false );
		}

		/**
		 * Stop click propagation only for bottom sheet mode so backdrop clicks can close it.
		 *
		 * @param e - Click event from the panel container
		 */
		function onPanelClick( e: MouseEvent ) {
			if ( isBottomSheet.value ) {
				e.stopPropagation();
			}
		}

		/**
		 * Track whether the interaction started on the backdrop.
		 *
		 * @param e - Mousedown event
		 */
		function onBackdropMouseDown( e: MouseEvent ) {
			if ( !isBottomSheet.value ) {
				return;
			}
			mousedownOnBackdrop = e.target === backdrop.value;
		}

		/**
		 * Close only when both mousedown and click occurred on backdrop.
		 */
		function onBackdropClick() {
			if ( !isBottomSheet.value || !mousedownOnBackdrop ) {
				return;
			}
			close();
		}

		/**
		 * Close popover on Escape.
		 *
		 * @param event - Keyboard event
		 */
		function onKeydown( event: KeyboardEvent ) {
			if ( event.key === 'Escape' ) {
				close();
			}
		}

		/**
		 * In floating mode, close when focus/mousedown moves outside popover and trigger.
		 *
		 * @param event - Focus or mouse event dispatched on document
		 */
		function onFocusOut( event: MouseEvent | FocusEvent ) {
			if ( isBottomSheet.value ) {
				return;
			}
			const referenceEl = unwrapElement( reference.value );
			const isOutsidePopoverAndTrigger = (
				// Don't close the popover when the viewport's native scrollbar is clicked (T388302)
				event.target !== document.documentElement &&
				// ...or when the popover or something inside it is clicked
				( panel.value && !panel.value.contains( event.target as Node ) ) &&
				// ...or when the trigger or something inside it is clicked
				( !referenceEl?.contains( event.target as Node ) )
			);

			if ( isOutsidePopoverAndTrigger ) {
				close();
			}
		}

		// Focus trap
		const anchorForFocusTrap = ref<
			HTMLElement | ComponentPublicInstance | null | undefined
		>( null );
		watch(
			reference,
			() => {
				anchorForFocusTrap.value = reference.value;
			},
			{ immediate: true }
		);

		const {
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			focusFirst,
			focusLast,
			activateFocusTrap,
			deactivateFocusTrap
		} = useFocusTrap( {
			containerRef: panel,
			bodyRef: bodyEl,
			anchorRef: anchorForFocusTrap,
			preventScroll: true
		} );

		// Open / close lifecycle helpers
		/**
		 * Remove floating-mode listeners and deactivate the focus trap.
		 */
		function teardownFloating() {
			document.removeEventListener( 'keydown', onKeydown );
			document.removeEventListener( 'mousedown', onFocusOut );
			document.removeEventListener( 'focusin', onFocusOut );
			deactivateFocusTrap();
		}

		/**
		 * Set up floating-mode document listeners and activate the focus trap.
		 */
		async function setupFloating() {
			document.addEventListener( 'keydown', onKeydown );
			document.addEventListener( 'mousedown', onFocusOut );
			document.addEventListener( 'focusin', onFocusOut );
			await activateFocusTrap();
		}

		/**
		 * Remove floating-mode inline styles written by Floating UI middleware.
		 */
		function clearFloatingInlineStyles() {
			panel.value?.style.removeProperty( 'max-width' );
			panel.value?.style.removeProperty( 'max-height' );
			panel.value?.style.removeProperty( 'left' );
			panel.value?.style.removeProperty( 'top' );
			panel.value?.style.removeProperty( 'position' );
		}

		/**
		 * Set up bottom-sheet listeners/viewport tracking and activate focus trap.
		 */
		async function openBottomSheet() {
			// Floating UI writes some layout styles directly to the panel element.
			// Clear those when switching to bottom sheet.
			clearFloatingInlineStyles();

			document.addEventListener( 'keydown', onKeydown );
			updateViewport();
			setViewportListeners();
			await activateFocusTrap();
		}

		/**
		 * Tear down bottom-sheet listeners/viewport tracking and deactivate focus trap.
		 */
		function closeBottomSheet() {
			document.removeEventListener( 'keydown', onKeydown );
			removeViewportListeners();
			cancelPendingViewportUpdate();
			resetViewport();
			deactivateFocusTrap();
		}

		/**
		 * Close the popover.
		 *
		 * @param isBottomSheetValue - Whether the bottom sheet is active
		 */
		function closePopover( isBottomSheetValue: boolean ) {
			if ( isBottomSheetValue ) {
				closeBottomSheet();
			} else {
				teardownFloating();
			}
		}

		/**
		 * Open the popover.
		 *
		 * @param isBottomSheetValue - Whether the bottom sheet is active
		 */
		async function openPopover( isBottomSheetValue: boolean ) {
			if ( isBottomSheetValue ) {
				// Capture initial viewport height BEFORE opening the sheet
				// Use document.documentElement.clientHeight as it's more stable than
				// window.innerHeight which can change during scrolling on iOS Safari
				initialLayoutViewportHeight.value = document.documentElement.clientHeight;
				await openBottomSheet();
			} else {
				await setupFloating();
			}
		}

		watch( () => props.open, async ( isOpen ) => {
			if ( isOpen ) {
				await openPopover( isBottomSheet.value );
				return;
			}

			closePopover( isBottomSheet.value );
		} );

		watch( isBottomSheet, async ( sheet, prevSheet ) => {
			if ( !props.open || sheet === prevSheet ) {
				return;
			}

			// Close the previous popover and open the new one.
			// This is necessary to avoid stale max-size/position values persisting.
			closePopover( prevSheet );
			await openPopover( sheet );
		} );

		onMounted( async () => {
			if ( props.open ) {
				await openPopover( isBottomSheet.value );
			}

			if ( isBottomSheet.value ) {
				updateViewport();
			}

			await nextTick();
			if ( props.anchor === null ) {
				// eslint-disable-next-line no-console
				console.warn( '[CdxPopover]: The "anchor" prop must be provided to position the popover in floating mode.' );
			}
		} );

		onUnmounted( () => {
			document.removeEventListener( 'keydown', onKeydown );
			document.removeEventListener( 'mousedown', onFocusOut );
			document.removeEventListener( 'focusin', onFocusOut );
			removeViewportListeners();
			cancelPendingViewportUpdate();
			deactivateFocusTrap();
		} );

		return {
			computedTarget,
			translatedCloseButtonLabel,
			showHeader,
			showFooter,
			footerActionsClasses,
			close,
			cdxIconClose,
			transitionName,
			backdropClassObject,
			panelClassObject,
			panelInlineStyles,
			backdrop,
			panel,
			arrowRef,
			arrowStyles,
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			bodyEl,
			focusFirst,
			focusLast,
			isBottomSheet,
			onBackdropMouseDown,
			onBackdropClick,
			onPanelClick
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import (reference) '../../themes/mixins/public/typography.less';

/* No-op transition for floating mode (shared <transition> shell). */
.cdx-popover-floating-enter-active,
.cdx-popover-floating-leave-active {
	transition-property: none;
	transition-duration: 0s;
}

// Backdrop styles only apply in bottom-sheet mode.
.cdx-popover__backdrop--bottom-sheet {
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
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
		scale-unlimited/declaration-strict-value */
	height: 100dvh;
}

.cdx-popover__backdrop--no-backdrop {
	background-color: @background-color-transparent;
}

.cdx-popover {
	background-color: @background-color-base;
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: @z-index-popover;
	box-sizing: @box-sizing-base;
	// Note that max-width is set by FloatingUI's size middleware.
	min-width: @size-1200;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-100;
	box-shadow: @box-shadow-medium;

	&__header {
		display: flex;
		align-items: flex-start;
		flex-shrink: 0;
		gap: @spacing-50;
		margin-bottom: @spacing-50;

		&__icon {
			// Ensure the icon doesn't shrink when space is limited in the header.
			flex-shrink: 0;
			// Setting the height of the icon to the line-height of the accompanying text
			// to ensure centering of the icon to text
			height: @line-height-small;
		}

		&__title {
			font-family: @font-family-base;
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-small;
		}

		&__button-wrapper {
			// Vertically center the button within the wrapper `<div>` element.
			display: flex;
			flex-direction: column;
			justify-content: center;
			// Setting the height of the button wrapper to the line-height of the
			// accompanying text to ensure centering of the button to text
			height: @line-height-small;
			// Move the button over so the edge of the icon aligns with the edge of the content.
			// This makes the quiet button seem to take up less space.
			margin-right: -@spacing-50;
			margin-left: auto;
		}
	}

	&__body {
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: auto;
		font-size: @font-size-medium;
		line-height: @line-height-small;
	}

	&__footer {
		flex-shrink: 0;
		margin-top: @spacing-100;

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
			&--vertical {
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

			@media ( max-width: @min-width-breakpoint-tablet ) {
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

	&__arrow {
		background-color: @background-color-base;
		position: absolute;
		width: @size-100;
		height: @size-100;
		border: @border-base;
		border-top-left-radius: @border-radius-base;
		box-shadow: @box-shadow-medium;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		clip-path: polygon( 0 0, 100% 0, 0 100% );
	}

	&--bottom-sheet {
		position: static;
		// Fallback for browsers without dynamic viewport units support.
		max-height: calc( @size-full - @size-800 );
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
		scale-unlimited/declaration-strict-value */
		max-height: 90dvh;
		border-top: @border-base;
		border-right: 0;
		border-bottom: 0;
		border-left: 0;
		border-radius: 0;
		padding: 0;
		// Account for safe area at top (notch, status bar, etc.)
		// @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env
		padding-top: env( safe-area-inset-top, 0 );
		box-shadow: @box-shadow-large;

		.cdx-popover__header {
			margin-bottom: 0;
			padding: @spacing-100 @spacing-150;

			.cdx-popover__header__title {
				flex-grow: 1;
			}
		}

		.cdx-popover__body {
			min-height: 0;
			padding: @spacing-50 @spacing-150;
			-webkit-overflow-scrolling: touch;
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			overscroll-behavior: contain;

			&--no-footer {
				padding-bottom: @spacing-150;
			}

			// Zero-out margin/padding on edge children
			> *:first-child {
				margin-top: 0;
				padding-top: 0;
			}

			> *:last-child {
				margin-bottom: 0;
				padding-bottom: 0;
			}
		}

		.cdx-popover__footer {
			margin-top: auto;
			padding: @spacing-100 @spacing-150 @spacing-100 @spacing-150;
			padding-bottom: calc( @spacing-150 + env( safe-area-inset-bottom, 0px ) );
		}
	}

	// When content overflows the body, add dividers between header / footer and the scroll pane
	&--dividers {
		.cdx-popover__header {
			border-bottom: @border-subtle;
		}

		.cdx-popover__footer {
			border-top: @border-subtle;
		}
	}
}

// Backdrop fades in/out, sheet slides up/down
.cdx-popover-bottom-sheet-enter-active,
.cdx-popover-bottom-sheet-leave-active {
	transition-duration: @transition-duration-medium;
	transition-timing-function: @transition-timing-function-system;
}

.cdx-popover-bottom-sheet-enter-active {
	transition-property: @transition-property-fade;

	.cdx-popover--bottom-sheet {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		transition-property: transform;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}
}

.cdx-popover-bottom-sheet-leave-active {
	transition-property: @transition-property-fade;

	.cdx-popover--bottom-sheet {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		transition-property: transform;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}
}

.cdx-popover-bottom-sheet-enter-from {
	opacity: @opacity-transparent;

	.cdx-popover--bottom-sheet {
		transform: translateY( 100% );
	}
}

.cdx-popover-bottom-sheet-leave-to {
	opacity: @opacity-transparent;

	.cdx-popover--bottom-sheet {
		transform: translateY( 100% );
	}
}

.cdx-popover-focus-trap {
	// This element is not used for visual styling, just
	// focus management. It needs to be invisible but cannot
	// have display:none, and its position in the markup is
	// important (must be inside the popover element).
	// Set position to absolute so that this element is
	// omitted from all flex layout calculations
	position: absolute;

	// Don't show visible focus outline for the focus-trap element
	&:focus {
		outline: 0;
	}
}

</style>
