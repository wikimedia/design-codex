<template>
	<div>
		<cdx-combobox
			v-model="selection"
			:options="options"
			placeholder="Type or choose an option"
		>
			<template #menu-option="{ option }">
				<cdx-icon v-if="option.icon" :icon="option.icon" />
			</template>
		</cdx-combobox>

		<p>
			The current value is {{ selection }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, CdxIcon, MenuOption } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const options: MenuOption[] = [
	{ value: 'camera', icon: cdxIconCamera },
	{ value: 'book', icon: cdxIconBook },
	{ value: 'clock', icon: cdxIconClock }
];

export default defineComponent( {
	name: 'ComboboxCustomOption',
	components: { CdxCombobox, CdxIcon },

	data() {
		return {
			options: options,
			selection: ''
		};
	}
} );
</script>
