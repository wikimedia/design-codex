<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<div
			v-if="open"
			class="cdx-popover"
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
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject, toRef } from 'vue';
import { CdxButton, CdxIcon, PrimaryModalAction, ModalAction } from '../../lib';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';
import useI18nWithOverride from '../../composables/useI18nWithOverride';

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
		// TODO: Add Floating UI behavior and pass floating and reference elements as args.

		// Determine where to teleport the Popover to.
		const providedTarget = inject<string|HTMLElement|undefined>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => providedTarget ?? 'body' );

		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-dialog-close-button-label',
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

		return {
			computedTarget,
			translatedCloseButtonLabel,
			showHeader,
			showFooter,
			footerActionsClasses,
			close,
			cdxIconClose
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
	min-width: @size-1600;
	max-width: @size-3200;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-100;

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: @spacing-100;

		&__icon {
			margin-right: @spacing-50;
		}

		&__title {
			font-weight: @font-weight-semi-bold;
		}

		&__close-button {
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
