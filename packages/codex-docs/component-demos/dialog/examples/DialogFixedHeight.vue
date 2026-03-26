<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			:fixed-height="400"
			title="Dialog with fixed height"
			:use-close-button="true"
			:default-action="defaultAction"
			:primary-action="primaryAction"
			@default="open = false"
		>
			This Dialog is demonstrating a custom fixed height.
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogWithSelect',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const defaultAction = {
			label: 'Close'
		};
		const primaryAction = {
			label: 'Okay',
			actionType: 'progressive'
		};

		return {
			open,
			defaultAction,
			primaryAction
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
