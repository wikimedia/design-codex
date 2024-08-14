<template>
	<cdx-button v-tooltip:top="'This is a tooltip'">
		Button with tooltip
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TooltipPlacement',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
