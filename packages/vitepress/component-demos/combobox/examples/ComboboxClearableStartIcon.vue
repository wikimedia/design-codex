<template>
	<div>
		<cdx-combobox
			v-model="selection"
			:options="options"
			placeholder="Type or choose an option"
			:start-icon="icon"
			:clearable="true"
		/>

		<p>
			The current value is {{ selection }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox } from 'vue-components/src/lib';
import { MenuOption } from 'vue-components/src/types';
import { cdxIconSearch } from 'icons';

const options: MenuOption[] = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxClearableStartIcon',
	components: { CdxCombobox },

	data() {
		return {
			options: options,
			selection: '',
			icon: cdxIconSearch
		};
	}
} );
</script>
