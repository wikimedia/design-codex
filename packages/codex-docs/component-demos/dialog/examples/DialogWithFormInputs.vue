<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			class="cdx-demo-dialog-form-inputs"
			title="Dialog with form inputs"
			:use-close-button="true"
			:default-action="defaultAction"
			:primary-action="primaryAction"
			@default="open = false"
		>
			<cdx-field>
				<template #label>
					Text
				</template>
				<cdx-text-input
					v-model="inputValue"
					class="cdx-demo-dialog-form-inputs__text-input"
				/>
			</cdx-field>
			<cdx-field>
				<template #label>
					Options
				</template>
				<cdx-select
					v-model:selected="selected"
					class="cdx-demo-dialog-form-inputs__select"
					:menu-items="menuItems"
					default-label="Select an option"
				/>
			</cdx-field>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxField, CdxSelect, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogWithSelect',
	components: {
		CdxButton,
		CdxDialog,
		CdxField,
		CdxSelect,
		CdxTextInput
	},
	setup() {
		const open = ref( false );

		const defaultAction = {
			label: 'Close'
		};
		const primaryAction = {
			label: 'Submit',
			actionType: 'progressive'
		};

		const inputValue = ref( '' );

		const menuItems = [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
			{ label: 'Option C', value: 'c' },
			{ label: 'Option D', value: 'd' }
		];
		const selected = ref( null );

		return {
			open,
			defaultAction,
			primaryAction,
			menuItems,
			selected,
			inputValue
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-dialog-form-inputs {
	&__select {
		min-width: @size-full;
	}
}
</style>
