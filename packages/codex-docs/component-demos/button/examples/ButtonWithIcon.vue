<template>
	<cdx-button @click="onClick">
		<cdx-icon :icon="cdxIconArrowPrevious" /> Go back
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowPrevious } from '@wikimedia/codex-icons';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		const onClick = getEventLogger<Event>( 'click' );

		return {
			cdxIconArrowPrevious,
			onClick
		};
	}
} );
</script>
