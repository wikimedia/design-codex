<template>
	<section id="cdx-dialog">
		<h2>Dialog</h2>
		<p>
			<cdx-button @click="showDialog1 = true">
				Launch Dialog 1
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog2 = true">
				Launch Dialog 2
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog3 = true">
				Launch Dialog 3
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
			<p>Example dialog with new subtitle and optional action</p>

			<template #footer-text>
				This is some example <a href="#">footer text</a> blah blah blah.
			</template>

			<template #footer-optional>
				<cdx-checkbox
					v-model="dialog3CheckboxState"
					:inline="true"
				>
					Don't show again
				</cdx-checkbox>
			</template>
		</cdx-dialog>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxDialog, CdxButton, CdxCheckbox } from '../lib';

const showDialog1 = ref( false );
const showDialog2 = ref( false );
const showDialog3 = ref( false );
const dialog3CheckboxState = ref( false );
</script>
