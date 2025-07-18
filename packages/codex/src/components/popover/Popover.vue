<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<div
			v-if="open"
			ref="floating"
			class="cdx-popover"
			:style="floatingStyles"
			v-bind="$attrs"
		>
			<header v-if="showHeader || $slots.header" class="cdx-popover__header">
				<!-- @slot Customizable Popover header. -->
				<slot name="header">
					<cdx-icon
						v-if="icon"
						class="cdx-popover__header__icon"
						:icon
					/>
					<div v-if="title" class="cdx-popover__header__title">
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

			<div class="cdx-popover__body">
				<!-- @slot Popover body content. -->
				<slot />
			</div>

			<footer v-if="showFooter || $slots.footer" class="cdx-popover__footer">
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
				ref="arrowRef"
				class="cdx-popover__arrow"
				:style="arrowStyles"
			/>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ComponentPublicInstance, computed, inject, toRef, ref, watch, onMounted, onUnmounted, nextTick, reactive, unref } from 'vue';
import { useFloating, offset, flip, autoUpdate, size, arrow, Side, Placement } from '@floating-ui/vue';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useI18nWithOverride from '../../composables/useI18nWithOverride';
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

	/**
	 * The popover will inherit attributes, not the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * The triggering element that opens and closes the popover. This should be a template ref,
		 * which can be either an HTML element or a Vue component.
		 *
		 * This must be provided so the popover can be positioned relative to the triggering
		 * element.
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
		 * Positioning options for the Popover.
		 */
		placement: {
			type: String as PropType<Placement>,
			default: 'bottom'
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
		// Destructure "placement" prop to a reactive ref so we can pass
		// it to useFloating
		const placementRef = toRef( props, 'placement' );

		// Floating UI behavior.
		const floating = ref<HTMLDivElement>();
		const reference = toRef( props, 'anchor' );
		const arrowRef = ref<HTMLDivElement>();

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
		const sideC = Math.sqrt( ( sideA ** 2 ) + ( sideB ** 2 ) ); // Per Pythagoras
		const triangleHeight = sideC / 2;
		const arrowOffset = 4; // desired distance between arrow point and anchor element
		const offsetDistance = triangleHeight + arrowOffset;

		const computedMiddleware = computed( () => [
			offset( offsetDistance ),
			// Default flip behavior will flip floating element across the main axis.
			flip(),
			size( {
				// Spacing between the floating element and the viewport.
				padding: clipPadding,
				// Apply styles based on available width/height.
				apply( { availableWidth, availableHeight, elements } ) {
					// Max width possible is the availableWidth up to the max clip width.
					const maxWidth = Math.min( maxClipWidth, availableWidth );
					Object.assign( elements.floating.style, {
						// Effective max width is the possible max width down to the min clip width.
						maxWidth: `${ Math.max( minClipWidth, maxWidth ) }px`,
						maxHeight: `${ Math.max( minClipHeight, availableHeight ) }px`
					} );
				}
			} ),
			arrow( { element: arrowRef } )
		] );

		const {
			floatingStyles,
			middlewareData,
			placement,
			x,
			y
		} = useFloating( reference, floating, {
			whileElementsMounted: autoUpdate,
			placement: placementRef,
			middleware: computedMiddleware
		} );

		const arrowStyles = reactive<Record<Side|'transform', string>>( {
			left: '0',
			top: '0',
			right: '0',
			bottom: '0',
			transform: 'none'
		} );

		const oppositeSide = computed( () => oppositeSides[ placement.value ] );

		// Check for changes in popover, and update the arrow inline styles.
		watch( [ x, y ], () => {
			if ( middlewareData.value.arrow ) {
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
			}
		} );

		// Determine where to teleport the Popover to.
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-popover-close-button-label',
			'Close'
		);

		const showHeader = computed( () => !!props.title || !!props.icon || props.useCloseButton );
		const showFooter = computed( () => !!props.primaryAction || !!props.defaultAction );

		const footerActionsClasses = computed( () => ( {
			'cdx-popover__footer__actions--vertical': props.stackedActions,
			'cdx-popover__footer__actions--horizontal': !props.stackedActions
		} ) );

		/**
		 * Close the popover by emitting an event to the parent.
		 */
		function close() {
			emit( 'update:open', false );
		}

		/**
		 * Global "Escape" key handler.
		 * Close the popover when Escape key is pressed.
		 *
		 * @param event
		 */
		function onKeydown( event: KeyboardEvent ) {
			if ( event.key === 'Escape' ) {
				close();
			}
		}

		/**
		 * Close the popover when focus is lost e.g. mousedown and focus events
		 * that occur outside the Popover.
		 *
		 * @param event
		 */
		function onFocusOut( event: MouseEvent | FocusEvent ) {
			// Check if the event occurred outside Popover and trigger.
			const referenceEl = unwrapElement( reference.value );
			const isOutsidePopoverAndTrigger = (
				// Don't close the popover when the viewport's native scrollbar is clicked (T388302)
				event.target !== document.documentElement &&
				// ...or when the popover or something inside it is clicked
				( floating.value && !floating.value.contains( event.target as Node ) ) &&
				// ...or when the trigger or something inside it is clicked
				( !referenceEl?.contains( event.target as Node ) )
			);

			if ( isOutsidePopoverAndTrigger ) {
				close();
			}
		}

		watch( () => props.open, ( isOpen ) => {
			if ( isOpen ) {
				document.addEventListener( 'keydown', onKeydown );
				document.addEventListener( 'mousedown', onFocusOut );
				document.addEventListener( 'focusin', onFocusOut );
			} else {
				document.removeEventListener( 'keydown', onKeydown );
				document.removeEventListener( 'mousedown', onFocusOut );
				document.removeEventListener( 'focusin', onFocusOut );
			}
		} );

		onMounted( async () => {
			if ( props.open ) {
				document.addEventListener( 'keydown', onKeydown );
				document.addEventListener( 'mousedown', onFocusOut );
				document.addEventListener( 'focusin', onFocusOut );
			}

			await nextTick();
			if ( props.anchor === null ) {
				// eslint-disable-next-line no-console
				console.warn( '[CdxPopover]: The "anchor" prop must be provided to position the CdxPopover.' );

			}
		} );

		onUnmounted( () => {
			document.removeEventListener( 'keydown', onKeydown );
			document.removeEventListener( 'mousedown', onFocusOut );
			document.removeEventListener( 'focusin', onFocusOut );
		} );

		return {
			computedTarget,
			translatedCloseButtonLabel,
			showHeader,
			showFooter,
			footerActionsClasses,
			close,
			cdxIconClose,
			floating,
			floatingStyles,
			arrowRef,
			arrowStyles
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

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
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-small;
		}

		&__button-wrapper {
			// Vertically center the button within the wrapper div.
			display: flex;
			flex-direction: column;
			justify-content: center;
			// Setting the height of the button wrapper to the line-height of the
			// accompanying text to ensure centering of the button to text
			height: @line-height-small;
			// Move the button over so the edge of the icon aligns with the edge of the content.
			// This makes the quiet button seem to take up less space.
			margin-right: -@spacing-50;
			// Send to the end of the flex container.
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
			gap: @spacing-75;

			&--horizontal {
				flex-direction: row-reverse;
			}

			&--vertical {
				flex-direction: column;
				width: @size-full;
			}
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
}
</style>
