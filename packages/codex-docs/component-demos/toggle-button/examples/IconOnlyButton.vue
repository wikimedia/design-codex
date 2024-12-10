<template>
	<cdx-toggle-button
		v-model="buttonValue"
		aria-label="Edit"
	>
		<cdx-icon :icon="cdxIconEdit" />
	</cdx-toggle-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		return {
			buttonValue,
			cdxIconEdit
		};
	}
} );
</script>
