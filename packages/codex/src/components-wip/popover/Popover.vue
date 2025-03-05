<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<transition name="cdx-popover-transition">
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
						<div class="cdx-popover__header__close-button-wrapper">
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
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject, toRef, ref, watch, onMounted, onUnmounted } from 'vue';
import { CdxButton, CdxIcon, PrimaryModalAction, ModalAction } from '../../lib';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';
import useI18nWithOverride from '../../composables/useI18nWithOverride';
import { useFloating, MaybeElement, offset, flip, autoUpdate, size } from '@floating-ui/vue';
import { PositionConfig } from '../../types';
import { unwrapElement } from '../../utils/unwrapElement';

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
		 * The triggering element that opens and closes the popover. This should be a template ref.
		 *
		 * This must be provided so the popover can be positioned relative to the triggering
		 * element. If omitted, the popover will not display.
		 */
		anchor: {
			type: Object as PropType<MaybeElement<HTMLElement> | null>,
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
		positionConfig: {
			type: Object as PropType<PositionConfig | null>,
			default: null
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
		// Floating UI behavior.
		const floating = ref<HTMLDivElement>();
		const reference = toRef( props, 'anchor' );
		const clipPadding = 16;
		const minClipWidth = 256;
		const minClipHeight = 128;
		const computedPlacement = computed( () => props.positionConfig?.placement ?? 'bottom-start' );
		const computedMiddleware = computed( () => [
			// Margin space (px) between Popover and its triggering element.
			offset( 4 ),
			// Default flip behavior will flip floating element across the main axis.
			flip(),
			size( {
				// Spacing between the floating element and the viewport.
				padding: clipPadding,
				// Apply styles based on available width/height.
				apply( { availableWidth, availableHeight, elements } ) {
					Object.assign( elements.floating.style, {
						width: `${ Math.max( minClipWidth, availableWidth ) }px`,
						maxHeight: `${ Math.max( minClipHeight, availableHeight ) }px`
					} );
				}
			} )
			// TODO: Add arrow middleware
		] );
		const { floatingStyles } = useFloating( reference, floating, {
			whileElementsMounted: autoUpdate,
			placement: computedPlacement,
			middleware: computedMiddleware
		} );

		// Determine where to teleport the Popover to.
		const providedTarget = inject<string|HTMLElement|undefined>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => providedTarget ?? 'body' );

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
			const isOutsidePopoverAndTrigger = (
				( floating.value && !floating.value.contains( event.target as Node ) ) &&
				( reference.value && event.target !== unwrapElement( reference.value ) )
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

		onMounted( () => {
			if ( props.open ) {
				document.addEventListener( 'keydown', onKeydown );
				document.addEventListener( 'mousedown', onFocusOut );
				document.addEventListener( 'focusin', onFocusOut );
			}

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
			floatingStyles
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-popover {
	background-color: @background-color-base;
	position: absolute;
	// TODO: Replace with a popover design token.
	z-index: @z-index-tooltip;
	box-sizing: @box-sizing-base;
	min-width: @size-1600;
	max-width: @size-3200;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-100;
	box-shadow: @box-shadow-medium;
	overflow-y: auto;

	&__header {
		display: flex;
		align-items: flex-start;
		gap: @spacing-50;
		margin-bottom: @spacing-100;

		&__icon {
			// Vertically align the icon with the first line of the title.
			height: unit( @line-height-medium, em );
			margin-right: @spacing-50;
		}

		&__title {
			font-weight: @font-weight-semi-bold;
		}

		&__close-button-wrapper {
			// Vertically center the button within the wrapper div.
			display: flex;
			flex-direction: column;
			justify-content: center;
			// Vertically center the wrapper div with the first line of the title.
			height: unit( @line-height-medium, em );
			// Move the button over so the edge of the icon aligns with the edge of the content.
			// This makes the quiet button seem to take up less space.
			margin-right: -@spacing-50;
			// Send to the end of the flex container.
			margin-left: auto;
		}
	}

	&__footer {
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
}
</style>
