<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		:title="title"
		:hide-title="hideTitle"
		:close-button-label="closeButtonLabel"
		:show-dividers="showDividers"
		:stacked-actions="stackedActions"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@default="open = false"
	>
		<slot />
	</cdx-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from 'vue';

import {
	CdxButton,
	CdxDialog
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'ConfigurableDialog',
	components: {
		CdxButton,
		CdxDialog
	},
	props: {
		title: {
			type: String,
			default: 'Dialog title'
		},
		hideTitle: {
			type: Boolean,
			default: false
		},
		closeButtonLabel: {
			type: String,
			default: ''
		},
		showDividers: {
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
			type: String as PropType<'progressive'|'destructive'>,
			default: 'progressive'
		},
		primaryActionDisabled: {
			type: Boolean,
			default: false
		},
		useDefaultAction: {
			type: Boolean,
			default: false
		},
		defaultActionLabel: {
			type: String,
			default: ''
		},
		defaultActionDisabled: {
			type: Boolean,
			default: false
		}
	},
	setup( props ) {
		const open = ref( false );

		const primaryAction = computed( () => {
			return props.usePrimaryAction ?
				{
					label: props.primaryActionLabel,
					actionType: props.primaryActionType,
					disabled: props.primaryActionDisabled
				} : undefined;
		} );

		const defaultAction = computed( () => {
			return props.useDefaultAction ?
				{
					label: props.defaultActionLabel,
					disabled: props.defaultActionDisabled
				} : undefined;
		} );

		return {
			open,
			primaryAction,
			defaultAction
		};
	}
} );
</script>
