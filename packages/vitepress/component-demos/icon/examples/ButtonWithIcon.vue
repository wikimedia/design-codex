<template>
	<cdx-button action="progressive" type="primary">
		<cdx-icon :icon="cdxIconArrowNext" /> Continue
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CdxButton from 'vue-components/src/components/button/Button.vue';
import CdxIcon from 'vue-components/src/components/icon/Icon.vue';
import { cdxIconArrowNext } from 'icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconArrowNext
		};
	}
} );
</script>
