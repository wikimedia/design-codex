<template>
	<demo-base-layout class="cdx-demo-tooltip-page">
		<template #header>
			Codex Tooltip demos
		</template>
		<template #content>
			<h2>Tooltip demos</h2>
			<p>
				The Tooltip component is implemented as a Vue.js directive.
				This means that rather than existing as a stand-alone component,
				it can be added to any component or markup element inside of a
				Vue.js template.
			</p>
			<p>
				Tooltips appear on focus or on hover. The ARIA "tooltip" role
				is used to define accessible behavior.
			</p>
			<hr>

			<h2>Button Examples</h2>
			<p>
				The tooltip can be configured to appear on any side of the element
				it is bound to. "Bottom" is used by default.
			</p>

			<cdx-button v-tooltip="'This is a tooltip'">
				Button with Tooltip on the bottom
			</cdx-button>
			<br>
			<br>
			<br>
			<cdx-button v-tooltip:right="'This is a different tooltip'">
				Button with Tooltip on the right
			</cdx-button>
			<br>
			<br>
			<br>
			<cdx-button v-tooltip:left="'This is a different tooltip'">
				Button with Tooltip on the left
			</cdx-button>
			<br>
			<br>
			<br>

			<cdx-button v-tooltip:bottom-start="'This is a different tooltip'">
				Button with Tooltip at the "bottom start" corner
			</cdx-button>

			<br>
			<br>
			<br>

			<cdx-button v-tooltip:top="'Icon-only buttons in particular can benefit from tooltips'">
				<cdx-icon :icon="cdxIconAppearance" />
			</cdx-button>

			<br>
			<br>
			<br>

			<hr>
			<h2>Form field examples</h2>

			<input
				v-tooltip:right="'This is a helpful tooltip'"
				class="cdx-text-input__input"
				type="text"
			>
		</template>
	</demo-base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '../lib';
import { cdxIconAppearance } from '@wikimedia/codex-icons';
import { CdxTooltip } from '../lib-wip';
import DemoBaseLayout from './DemoBaseLayout.vue';

export default defineComponent( {
	name: 'TooltipDemoPage',
	components: {
		CdxButton,
		CdxIcon,
		DemoBaseLayout
	},
	directives: {
		tooltip: CdxTooltip
	},

	data() {
		return {
			cdxIconAppearance
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

body {
	font-family: @font-family-system-sans;
}

h1 {
	font-size: @font-size-xxx-large;
}

h2 {
	font-size: @font-size-xx-large;
}

h3 {
	font-size: @font-size-large;
}

pre {
	white-space: pre-line;
}

/* stylelint-disable scale-unlimited/declaration-strict-value */
.cdx-demo-tooltip-page {
	max-width: 40em;
	margin: 0 auto;
	padding-bottom: @size-400;
}
</style>
