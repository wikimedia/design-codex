<template>
	<!-- Bottom Sheet variant for mobile (when useBottomSheet is true and on mobile) -->
	<cdx-popover-bottom-sheet
		v-if="shouldUseBottomSheet"
		:open="open"
		:title="title"
		:icon="icon"
		:use-close-button="useCloseButton"
		:close-button-label="closeButtonLabel"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		:stacked-actions="stackedActions"
		:hide-backdrop="hideBackdrop"
		:render-in-place="renderInPlace"
		v-bind="$attrs"
		@update:open="$emit( 'update:open', $event )"
		@primary="$emit( 'primary' )"
		@default="$emit( 'default' )"
	>
		<template v-if="$slots.header" #header>
			<slot name="header" />
		</template>
		<slot />
		<template v-if="$slots.footer" #footer>
			<slot name="footer" />
		</template>
	</cdx-popover-bottom-sheet>

	<!-- Floating Popover variant (default or when useBottomSheet is true but on desktop) -->
	<cdx-popover-floating
		v-else
		:open="open"
		:anchor="anchor"
		:title="title"
		:icon="icon"
		:use-close-button="useCloseButton"
		:close-button-label="closeButtonLabel"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		:stacked-actions="stackedActions"
		:placement="placement"
		:render-in-place="renderInPlace"
		v-bind="$attrs"
		@update:open="$emit( 'update:open', $event )"
		@primary="$emit( 'primary' )"
		@default="$emit( 'default' )"
	>
		<template v-if="$slots.header" #header>
			<slot name="header" />
		</template>
		<slot />
		<template v-if="$slots.footer" #footer>
			<slot name="footer" />
		</template>
	</cdx-popover-floating>
</template>

<script lang="ts">
import { defineComponent, PropType, ComponentPublicInstance, computed } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import { Placement } from '@floating-ui/vue';

import CdxPopoverBottomSheet from './PopoverBottomSheet.vue';
import CdxPopoverFloating from './PopoverFloating.vue';

import { PrimaryModalAction, ModalAction } from '../../types';
import useBreakpoint from '../../composables/useBreakpoint';

/**
 * A Popover is a localized, non-disruptive container that is overlaid on a web page or app,
 * near its trigger, in order to present necessary information and tasks.
 */
export default defineComponent( {
	name: 'CdxPopover',

	components: {
		CdxPopoverBottomSheet,
		CdxPopoverFloating
	},

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
		 * Only applies when useBottomSheet is true.
		 */
		hideBackdrop: {
			type: Boolean,
			default: false
		},

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

	setup( props ) {
		const breakpoint = useBreakpoint();

		// Only use bottom sheet if the prop is enabled AND we're on mobile
		const shouldUseBottomSheet = computed( () => props.useBottomSheet && breakpoint.mobile );

		return {
			shouldUseBottomSheet
		};
	}
} );
</script>
