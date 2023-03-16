<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="My custom dialog"
		class="my-custom-dialog"
	>
		<template #header>
			<div>
				<h2>My custom dialog</h2>
			</div>
			<div>
				<cdx-button
					weight="quiet"
					@click="open = false"
				>
					Close
				</cdx-button>
			</div>
		</template>

		<p>
			The header and footer slots of this dialog have been
			completely customized with custom buttons, styles, and
			markup.
		</p>

		<template #footer>
			<cdx-checkbox v-model="checkboxValue" :inline="true">
				Footer checkbox
			</cdx-checkbox>

			<cdx-button
				weight="primary"
				action="progressive"
				aria-label="Next"
				@click="open = false"
			>
				<cdx-icon :icon="cdxIconNext" />
			</cdx-button>
		</template>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog,
	CdxCheckbox,
	CdxIcon
} from '@wikimedia/codex';

import {
	cdxIconNext
} from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'DialogCustomHeader',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );
		const checkboxValue = ref( false );

		return {
			open,
			checkboxValue,
			cdxIconNext
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-custom-dialog {
	header {
		background-color: @background-color-progressive-subtle;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		height: 200px;
		padding: @spacing-100;

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
		padding: @spacing-100;
	}
}
</style>
