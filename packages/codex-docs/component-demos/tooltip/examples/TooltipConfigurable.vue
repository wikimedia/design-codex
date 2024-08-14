<template>
	<cdx-button
		:key="`${ textContent }-${ placement }`"
		v-tooltip:[placement]="textContent"
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
		placement: {
			type: String,
			default: ''
		}
	}
} );
</script>
