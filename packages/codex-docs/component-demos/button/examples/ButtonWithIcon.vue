<template>
	<cdx-button @click="onClick">
		<cdx-icon :icon="cdxIconArrowPrevious" /> Go back
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconArrowPrevious,
			onClick
		};
	}
} );
</script>
