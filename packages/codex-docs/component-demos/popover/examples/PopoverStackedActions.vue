<template>
	<cdx-toggle-button
		ref="triggerElement"
		v-model="showPopover"
		aria-label="Alert notification"
		@update:model-value="onUpdate"
	>
		<cdx-icon :icon="cdxIconBell" />
	</cdx-toggle-button>
	<cdx-popover
		v-model:open="showPopover"
		:anchor="triggerElement"
		placement="bottom-start"
		:render-in-place="true"
		title="Alerts"
		:use-close-button="true"
		:icon="cdxIconBell"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		:stacked-actions="true"
		@primary="showPopover = false"
		@default="showPopover = false"
	>
		2 alerts from Wikitech and MediaWiki.
	</cdx-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxPopover, CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'PopoverStackedActions',
	components: {
		CdxPopover,
		CdxToggleButton,
		CdxIcon
	},
	setup() {
		// Template ref for the Popover's trigger element needed to properly position the Popover.
		const triggerElement = ref();
		// Toggle the button's state and popover visibility.
		const showPopover = ref( false );
		// When the toggle button's state changes, an event is emitted to update
		// the state in the parent component.
		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		// Footer action buttons.
		const defaultAction = { label: 'Cancel' };
		const primaryAction = { label: 'View notifications', actionType: 'progressive' };

		return {
			showPopover,
			onUpdate,
			triggerElement,
			cdxIconBell,
			defaultAction,
			primaryAction
		};
	}
} );
</script>
