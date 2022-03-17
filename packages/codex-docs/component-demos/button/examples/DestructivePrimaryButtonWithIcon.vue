<template>
	<cdx-button action="destructive" type="primary">
		<cdx-icon :icon="cdxIconTrash" /> Delete
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'DestructivePrimaryButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconTrash
		};
	}
} );
</script>
