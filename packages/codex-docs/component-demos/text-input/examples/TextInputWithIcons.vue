<template>
	<cdx-text-input
		v-model="inputValue"
		input-type="search"
		:start-icon="cdxIconSearch"
		:end-icon="cdxIconInfoFilled"
		:clearable="true"
		aria-label="Clearable TextInput with icons demo"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputWithIcons',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			cdxIconSearch,
			cdxIconInfoFilled,
			inputValue
		};
	}
} );
</script>
