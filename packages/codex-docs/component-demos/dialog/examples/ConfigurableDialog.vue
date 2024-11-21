<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			:title="title"
			:subtitle="subtitle"
			:hide-title="hideTitle"
			:use-close-button="useCloseButton"
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
	</client-only>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxButton, CdxDialog } from '@wikimedia/codex';

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

		const primaryAction = computed( () => props.usePrimaryAction ?
			{
				label: props.primaryActionLabel,
				actionType: props.primaryActionType,
				disabled: props.primaryActionDisabled
			} : undefined );

		const defaultAction = computed( () => props.useDefaultAction ?
			{
				label: props.defaultActionLabel,
				disabled: props.defaultActionDisabled
			} : undefined );

		return {
			open,
			primaryAction,
			defaultAction
		};
	}
} );
</script>
