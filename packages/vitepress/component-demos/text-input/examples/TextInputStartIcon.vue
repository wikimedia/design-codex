<template>
	<CdxTextInput type="search" :start-icon="cdxIconSearch" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxTextInput from 'vue-components/src/components/text-input/TextInput.vue';
import { cdxIconSearch } from 'icons';

export default defineComponent( {
	name: 'TextInputStartIcon',
	components: { CdxTextInput },
	setup() {
		return {
			cdxIconSearch
		};
	}
} );
</script>
