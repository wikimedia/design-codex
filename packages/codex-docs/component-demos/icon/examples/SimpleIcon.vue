<template>
	<p>
		<cdx-icon :icon="cdxIconTag" />
		Label
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconTag } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'SimpleIcon',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconTag
		};
	}
} );
</script>
