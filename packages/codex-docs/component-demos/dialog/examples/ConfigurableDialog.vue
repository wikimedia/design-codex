<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>
	<cdx-dialog
		v-model:open="open"
		v-bind="propValues"
		@default="open = false"
	>
		<p>Use the controls below to change the features of this dialog.</p>
		<cdx-docs-controls
			dir="ltr"
			:controls-with-values="controlsWithValues"
			@control-change="handleControlChange"
		/>
	</cdx-dialog>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	ref
} from 'vue';

import {
	CdxButton,
	CdxDialog,
	PrimaryDialogAction,
	DialogAction
} from '@wikimedia/codex';

import CdxDocsControls from '../../../src/components/controls/Controls.vue';

import {
	ControlConfigWithValue,
	PropValuesWithIcons
} from '../../../src/types';

export default defineComponent( {
	name: 'ConfigurableDialog',
	components: {
		CdxButton,
		CdxDialog,
		CdxDocsControls
	},
	setup() {
		const open = ref( false );
		const controlsWithValues = ref<ControlConfigWithValue[]>( [
			{ name: 'title', type: 'text', value: 'Configurable dialog' },
			{ name: 'hideTitle', type: 'boolean', value: false },
			{ name: 'closeButtonLabel', type: 'text', value: 'Close' },
			// { name: 'fullscreen', type: 'boolean', value: false },
			{ name: 'stackedActions', type: 'boolean', value: false },
			{ name: 'usePrimaryAction', type: 'boolean', value: true },
			{ name: 'primaryActionLabel', type: 'text', value: 'Save' },
			{ name: 'primaryActionType', type: 'radio', options: [ 'progressive', 'destructive' ], value: 'progressive' },
			{ name: 'primaryActionDisabled', type: 'boolean', value: false },
			{ name: 'useDefaultAction', type: 'boolean', value: true },
			{ name: 'defaultActionLabel', type: 'text', value: 'Close dialog' },
			{ name: 'defaultActionDisabled', type: 'boolean', value: false }
		] );
		const propValues = computed( () => {
			const values: PropValuesWithIcons = {};
			for ( const control of controlsWithValues.value ) {
				values[ control.name ] = control.value;
			}

			const primaryAction = values.usePrimaryAction ? {
				label: values.primaryActionLabel,
				actionType: values.primaryActionType,
				disabled: values.primaryActionDisabled
			} : undefined;

			const defaultAction = values.useDefaultAction ? {
				label: values.defaultActionLabel,
				disabled: values.defaultActionDisabled
			} : undefined;

			return {
				// These values are typed as the value types of PropValuesWithIcons, but we need to
				// narrow it down for the cdx-dialog component.
				title: values.title as string,
				hideTitle: values.hideTitle as boolean,
				closeButtonLabel: values.closeButtonLabel as string,
				fullscreen: values.fullscreen as boolean,
				stackedActions: values.stackedActions as boolean,
				primaryAction: primaryAction as PrimaryDialogAction,
				defaultAction: defaultAction as DialogAction
			};
		} );
		/**
		 * Store new control value so it can be passed back into the demo.
		 *
		 * @param name The prop
		 * @param value The new value
		 */
		const handleControlChange = ( name: string, value: string | number | boolean ) => {
			const control = controlsWithValues.value.find( ( c ) => c.name === name );
			if ( control ) {
				control.value = value;
			}
		};
		return {
			open,
			controlsWithValues,
			propValues,
			handleControlChange
		};
	}
} );
</script>

<style lang="less" scoped>
p {
	margin-top: 0;
}
</style>
