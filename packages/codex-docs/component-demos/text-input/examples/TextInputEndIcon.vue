<template>
	<cdx-text-input :end-icon="cdxIconInfoFilled" :disabled="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';
import { cdxIconInfoFilled } from '@wikimedia/codex-icons';

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
