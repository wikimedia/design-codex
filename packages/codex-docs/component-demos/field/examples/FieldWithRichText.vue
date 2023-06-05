<template>
	<cdx-field>
		<cdx-select
			v-model:selected="selection"
			:menu-items="menuItems"
			default-label="Choose an option"
		/>

		<template #label>
			Input type
		</template>
		<template #description>
			<a href="#">Wikifunctions</a> input type
		</template>
		<template #help-text>
			What kind of data does the function accept? See <a href="#">list of input types</a>.
		</template>
	</cdx-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	CdxField,
	CdxSelect
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithRichText',
	components: {
		CdxField,
		CdxSelect
	},
	setup() {
		const selection = ref( '' );
		const menuItems = [
			{ value: 'boolean' },
			{ value: 'function' },
			{ value: 'object' },
			{ value: 'string' }
		];

		return {
			selection,
			menuItems
		};
	}
} );
</script>
