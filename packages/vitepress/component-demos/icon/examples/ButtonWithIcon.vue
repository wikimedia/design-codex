<template>
	<cdx-button action="destructive" type="primary">
		<cdx-icon :icon="cdxIconTrash" /> Delete this file
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxButton from 'vue-components/src/components/button/Button.vue';
import CdxIcon from 'vue-components/src/components/icon/Icon.vue';
import { cdxIconTrash } from 'icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
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
