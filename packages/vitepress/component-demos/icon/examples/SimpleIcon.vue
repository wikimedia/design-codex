<template>
	<p>
		<cdx-icon :icon="cdxIconTag" />
		Label
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxIcon from 'vue-components/src/components/icon/Icon.vue';
import { cdxIconTag } from 'icons';

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
