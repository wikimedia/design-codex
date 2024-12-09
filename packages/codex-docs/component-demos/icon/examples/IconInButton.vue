<template>
	<cdx-button>
		<cdx-icon :icon="cdxIconNext" />
		Next
	</cdx-button>
	<br><br>
	<cdx-button weight="primary" action="destructive">
		<cdx-icon :icon="cdxIconTrash" />
		Remove
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon, CdxButton } from '@wikimedia/codex';
import { cdxIconNext, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconInButton',
	components: { CdxIcon, CdxButton },
	setup() {
		return {
			cdxIconNext,
			cdxIconTrash
		};
	}
} );
</script>
