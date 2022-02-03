<template>
	<cdx-text-input input-type="search" :start-icon="cdxIconSearch" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';

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
