<template>
	<cdx-text-input
		input-type="search"
		:start-icon="cdxIconSearch"
		:end-icon="cdxIconInfoFilled"
		:clearable="true"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputWithIcons',
	components: { CdxTextInput },
	setup() {
		return {
			cdxIconSearch,
			cdxIconInfoFilled
		};
	}
} );
</script>
