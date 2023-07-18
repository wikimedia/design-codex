<template>
	<cdx-button aria-label="Back" @click="onClick">
		<cdx-icon :icon="cdxIconPrevious" />
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
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
			cdxIconPrevious,
			onClick
		};
	}
} );
</script>
