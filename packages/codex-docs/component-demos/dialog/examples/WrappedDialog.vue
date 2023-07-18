<!-- WrappedDialog.vue -->
<template>
	<cdx-dialog
		v-model:open="wrappedModel"
		:title="title"
		class="wrapped-dialog"
	>
		<template #header>
			<div>
				<h2>{{ title }}</h2>
			</div>
			<div>
				<cdx-button
					weight="quiet"
					aria-label="close"
					@click="wrappedModel = false"
				>
					Skip
				</cdx-button>
			</div>
		</template>

		<slot />

		<template #footer>
			<cdx-checkbox v-model="checkboxValue">
				Don't show again
			</cdx-checkbox>

			<!-- This button is wired to emit a custom "next" event instead of
			simply closing the dialog -->
			<cdx-button
				weight="primary"
				action="progressive"
				aria-label="Next"
				@click="$emit( 'next' )"
			>
				<cdx-icon :icon="cdxIconNext" />
			</cdx-button>
		</template>
	</cdx-dialog>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue';
import { CdxButton, CdxCheckbox, CdxDialog, CdxIcon, useModelWrapper } from '@wikimedia/codex';
import { cdxIconNext } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'WrappedDialog',

	components: {
		CdxButton,
		CdxCheckbox,
		CdxDialog,
		CdxIcon
	},

	props: {
		open: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: 'Title'
		}
	},

	emits: [
		'update:open',
		'next'
	],

	setup( props, { emit } ) {
		const checkboxValue = ref( false );
		const wrappedModel = useModelWrapper( toRef( props, 'open' ), emit, 'update:open' );

		return {
			checkboxValue,
			cdxIconNext,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.wrapped-dialog {
	header {
		background-color: @background-color-progressive-subtle;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		// Custom bigger height.
		height: @size-800;
		padding: @spacing-100 @spacing-100 0 @spacing-100;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	footer {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-top: @border-style-base @border-width-base @border-color-subtle;
		padding: @spacing-75 @spacing-100 @spacing-50 @spacing-100;
	}
}
</style>
