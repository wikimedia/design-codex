<template>
	<cdx-button action="destructive">
		<cdx-icon :icon="cdxIconLock" icon-label="Lock" />
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconLock } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'DestructiveIconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconLock
		};
	}
} );
</script>
