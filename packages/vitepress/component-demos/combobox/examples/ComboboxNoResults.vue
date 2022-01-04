<template>
	<div>
		<cdx-combobox
			v-model="selection"
			:options="options"
			placeholder="Type or choose an option"
		>
			<template v-if="options.length < 1" #footer>
				Sorry, no options to display.
			</template>
		</cdx-combobox>

		<p>
			The current value is {{ selection }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox } from 'vue-components/src/lib';
import { MenuOption } from 'vue-components/src/types';

const options: MenuOption[] = [];

export default defineComponent( {
	name: 'ComboboxNoResults',
	components: { CdxCombobox },

	data() {
		return {
			options: options,
			selection: ''
		};
	}
} );
</script>
