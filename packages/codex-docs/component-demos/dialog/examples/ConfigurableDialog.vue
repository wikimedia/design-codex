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
		:show-dividers="showDividers"
		:stacked-actions="stackedActions"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@default="open = false"
		@primary="open = false"
	>
		<slot />

		<template v-if="optionalFooterText" #footer-text>
			Optional footer text can contain <strong>formatting elements</strong>
			and <a href="#">links</a>.
		</template>

		<template v-if="optionalFooterContent === 'checkbox'" #footer-optional>
			<cdx-checkbox
				v-model="optionalDialogCheckboxState"
				:inline="true"
			>
				Don't show again
			</cdx-checkbox>
		</template>

		<template v-else-if="optionalFooterContent === 'button'" #footer-optional>
			<cdx-button type="quiet" aria-label="settings">
				<cdx-icon :icon="cdxIconSettings" />
			</cdx-button>
		</template>
	</cdx-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from 'vue';
import { cdxIconSettings } from '@wikimedia/codex-icons';
import {
	CdxButton,
	CdxDialog,
	CdxIcon,
	CdxCheckbox
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'ConfigurableDialog',
	components: {
		CdxButton,
		CdxDialog,
		CdxIcon,
		CdxCheckbox
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
		},
		optionalFooterText: {
			type: Boolean,
			default: false
		},
		optionalFooterContent: {
			type: String as PropType<'none'|'checkbox'|'button'>,
			default: 'none'
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

		const optionalDialogCheckboxState = ref( false );

		return {
			open,
			primaryAction,
			defaultAction,
			optionalDialogCheckboxState,
			cdxIconSettings
		};
	}
} );
</script>
