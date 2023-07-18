<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		:title="title"
		:subtitle="subtitle"
		:hide-title="hideTitle"
		:close-button-label="closeButtonLabel"
		:stacked-actions="stackedActions"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@default="open = false"
		@primary="open = false"
	>
		<template #default>
			<slot />
		</template>

		<template v-if="$slots[ 'footer-text' ]" #footer-text>
			<slot name="footer-text" />
		</template>
	</cdx-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
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
		subtitle: {
			type: String,
			default: null
		},
		hideTitle: {
			type: Boolean,
			default: false
		},
		closeButtonLabel: {
			type: String,
			default: ''
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
