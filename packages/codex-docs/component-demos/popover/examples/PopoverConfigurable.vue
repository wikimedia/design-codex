<template>
	<cdx-toggle-button
		ref="toggleButton"
		v-model="showPopover"
	>
		Open Popover
	</cdx-toggle-button>

	<cdx-popover
		v-model:open="showPopover"
		:anchor="toggleButton"
		:render-in-place="true"
		:placement
		:title
		:icon
		:use-close-button
		:stacked-actions
		:primary-action
		:default-action
		@default="showPopover = false"
		@primary="showPopover = false"
	>
		<template #default>
			<slot />
		</template>
	</cdx-popover>
</template>

<script>
import { defineComponent, ref, computed, useTemplateRef } from 'vue';
import { CdxPopover, CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'PopoverConfigurable',
	components: {
		CdxPopover,
		CdxToggleButton
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		icon: {
			type: [ String, Object ],
			default: ''
		},
		useCloseButton: {
			type: Boolean,
			default: false
		},
		stackedActions: {
			type: Boolean,
			default: false
		},
		usePrimaryAction: {
			type: Boolean,
			default: false
		},
		primaryActionLabel: {
			type: String,
			default: ''
		},
		primaryActionType: {
			type: String,
			default: 'progressive'
		},
		useDefaultAction: {
			type: Boolean,
			default: false
		},
		defaultActionLabel: {
			type: String,
			default: ''
		},
		placement: {
			type: String,
			default: 'bottom'
		}
	},
	setup( props ) {
		const toggleButton = useTemplateRef( 'toggleButton' );
		const showPopover = ref( false );

		const primaryAction = computed( () => props.usePrimaryAction && props.primaryActionLabel ?
			{
				label: props.primaryActionLabel,
				actionType: props.primaryActionType
			} : undefined );

		const defaultAction = computed( () => props.useDefaultAction && props.defaultActionLabel ?
			{
				label: props.defaultActionLabel
			} : undefined );

		return {
			toggleButton,
			showPopover,
			primaryAction,
			defaultAction
		};
	}
} );
</script>
