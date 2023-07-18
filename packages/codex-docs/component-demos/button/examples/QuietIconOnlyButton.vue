<template>
	<cdx-button
		weight="quiet"
		aria-label="Help"
		@click="onClick"
	>
		<cdx-icon :icon="cdxIconHelp" />
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHelp } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'QuietIconOnlyButton',
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
			cdxIconHelp,
			onClick
		};
	}
} );
</script>
