<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<div
			v-if="open"
			class="cdx-popover"
			v-bind="$attrs"
		>
			<div class="cdx-popover__header">
				<div class="cdx-popover__header__title">
					Popover title
				</div>
				<cdx-button
					v-if="useCloseButton"
					class="cdx-popover__close-button"
					weight="quiet"
					type="button"
					:aria-label="closeButtonLabel"
					@click="close"
				>
					<cdx-icon :icon="cdxIconClose" />
				</cdx-button>
			</div>
			<div class="cdx-popover__body">
				<slot />
			</div>
			<div class="cdx-popover__footer">
				<div class="cdx-popover__footer__action">
					<cdx-button>
						Action 1
					</cdx-button>
					<cdx-button action="progressive" weight="primary">
						Action 2
					</cdx-button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { CdxButton, CdxIcon } from '../../lib';
import { cdxIconClose } from '@wikimedia/codex-icons';
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
		 * Add an icon-only close button to the popover header.
		 */
		useCloseButton: {
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
		'update:open'
	],
	setup( props, { emit } ) {
		// TODO: Add Floating UI behavior and pass floating and reference elements as args.

		// Determine where to teleport the Popover to.
		const providedTarget = inject<string|HTMLElement|undefined>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => providedTarget ?? 'body' );

		// TODO: Replace label with a translatable i18n string.
		const closeButtonLabel = 'Close';

		/**
		 * Close the popover by emitting an event to the parent.
		 */
		function close() {
			emit( 'update:open', false );
		}

		return {
			computedTarget,
			closeButtonLabel,
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
		justify-content: space-between;

		&__title {
			font-weight: @font-weight-semi-bold;
		}
	}

	&__header,
	&__body {
		margin-bottom: @spacing-100;
	}

	&__footer {
		&__action {
			text-align: right;

			button:first-child {
				margin-right: @spacing-75;
			}

			// TODO: Add 12px margin between vertically stacked actions.
		}
	}
}
</style>
