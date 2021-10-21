<template>
	<p>
		<cdx-icon :icon="cdxIconCheck" />
		You're done!
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxIcon from 'vue-components/src/components/icon/Icon.vue';
import { cdxIconCheck } from 'icons';

export default defineComponent( {
	name: 'SimpleIcon',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconCheck
		};
	}
} );
</script>
