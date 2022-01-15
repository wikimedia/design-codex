<template>
	<cdx-text-input :end-icon="cdxIconInfoFilled" :disabled="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxTextInput from 'vue-components/src/components/text-input/TextInput.vue';
import { cdxIconInfoFilled } from 'icons';

export default defineComponent( {
	name: 'TextInputEndIcon',
	components: { CdxTextInput },
	setup() {
		return {
			cdxIconInfoFilled
		};
	}
} );
</script>
