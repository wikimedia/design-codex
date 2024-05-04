<template>
	<cdx-button
		:key="`${ textContent }-${ position }`"
		v-tooltip:[position]="textContent"
	>
		Button with Tooltip
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TooltipConfigurable',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	},
	props: {
		textContent: {
			type: String,
			default: ''
		},
		position: {
			type: String,
			default: ''
		}
	}
} );
</script>
