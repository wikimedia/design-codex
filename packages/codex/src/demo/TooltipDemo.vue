<template>
	<section id="cdx-tooltip">
		<h2>Tooltip Demo</h2>

		<p>
			See also an extended set of <a href="demos/tooltip.html">Tooltip demos</a>.
		</p>

		<cdx-button v-tooltip:left="'This is a tooltip'">
			Button with tooltip on the left
		</cdx-button>

		<br>
		<br>
		<br>

		<cdx-button v-tooltip:right="'This is a different tooltip'">
			Button with tooltip on the right
		</cdx-button>

		<br>
		<br>
		<br>

		<cdx-button v-tooltip:bottom-start="'This is a different tooltip'">
			Button with tooltip at bottom-start
		</cdx-button>

		<br>
		<br>
		<br>

		<cdx-button v-tooltip="'This is a different tooltip'">
			Button with tooltip in default location
		</cdx-button>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton } from '../lib';
import { CdxTooltip } from '../lib-wip';

export default defineComponent( {
	name: 'TooltipDemo',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
