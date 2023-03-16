<template>
	<section id="cdx-dialog">
		<h2>Dialog</h2>
		<p>
			<cdx-button @click="showDialog1 = true">
				Dialog with stacked actions
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog2 = true">
				Teleported Dialog with no header
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog3 = true">
				Dialog with title, subtitle, and footer text
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog4 = true">
				Minimum possible Dialog
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog5 = true">
				Dialog with custom header and footer
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog6 = true">
				Class fallthrough example
			</cdx-button>
		</p>

		<cdx-dialog
			v-model:open="showDialog1"
			close-button-label="close"
			:stacked-actions="true"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 1"
			@default="showDialog1 = false"
			@primary="showDialog1 = false"
		>
			<p>This dialog is displayed in-place using CSS positioning</p>
		</cdx-dialog>

		<teleport to="#teleport-target">
			<cdx-dialog
				v-model:open="showDialog2"
				:primary-action="{ actionType: 'destructive', label: 'Destroy!' }"
				:default-action="{ label: 'Cancel' }"
				title="Example Dialog 2"
				:hide-title="true"
				@default="showDialog2 = false"
				@primary="showDialog2 = false"
			>
				<p>
					This dialog is teleported to the #teleport-target element
					elsewhere on the page.
				</p>
			</cdx-dialog>
		</teleport>

		<cdx-dialog
			v-model:open="showDialog3"
			close-button-label="close"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 3"
			subtitle="Subtitle example"
			@default="showDialog3 = false"
			@primary="showDialog3 = false"
		>
			<p>Example dialog with subtitle and footer text</p>

			<template #footer-text>
				This is some example <a href="#">footer text</a> blah blah blah.
			</template>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog4"
			title="Example Dialog 4"
			:hide-title="true"
		>
			<p>Minimum possible dialog</p>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog5"
			title="Example Dialog 5"
			class="my-custom-dialog"
		>
			<template #header>
				<div>
					<h2>Introduction</h2>
				</div>
				<div>
					<cdx-button
						weight="quiet"
						aria-label="close"
						@click="showDialog5 = false;"
					>
						Skip
					</cdx-button>
				</div>
			</template>

			<p>
				The header and footer slots of this dialog have been
				completely customized with custom buttons, styles, and
				markup.
			</p>

			<template #footer>
				<cdx-checkbox v-model="checkboxValue">
					Don't show again
				</cdx-checkbox>

				<cdx-button
					weight="primary"
					action="progressive"
					aria-label="Next"
					@click="showDialog5 = false"
				>
					<cdx-icon :icon="cdxIconNext" />
				</cdx-button>
			</template>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog6"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 6"
			class="foo-dialog"
			@default="showDialog6 = false"
			@primary="showDialog6 = false"
		>
			<p>
				Example of attribute fall-through. The <code>foo-dialog</code>
				class applied here gets applied to the inner dialog element
				as opposed to the outer backdrop element without conflicting
				with internally computed classes.
			</p>
		</cdx-dialog>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxDialog, CdxButton, CdxCheckbox, CdxIcon } from '../lib';
import { cdxIconNext } from '@wikimedia/codex-icons';

const showDialog1 = ref( false );
const showDialog2 = ref( false );
const showDialog3 = ref( false );
const showDialog4 = ref( false );
const showDialog5 = ref( false );
const showDialog6 = ref( false );

const checkboxValue = ref( false );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-custom-dialog {
	header {
		background-color: @background-color-progressive-subtle;
		display: flex;
		align-items: flex-start;
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
		padding: @spacing-50 @spacing-100;
	}
}

.foo-dialog {
	background-color: @background-color-progressive-subtle;
}
</style>
