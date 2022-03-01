<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-combobox
			v-model="selection"
			:options="options"
			placeholder="Type or choose an option"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, MenuOption } from '@wikimedia/codex';

const options: MenuOption[] = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxBasic',
	components: { CdxCombobox },

	data() {
		return {
			options: options,
			selection: ''
		};
	}
} );
</script>
