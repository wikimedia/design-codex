<template>
	<div class="cdx-demo-buttons-and-links">
		<a class="cdx-docs-link" href="#">Link</a>
		<a class="cdx-docs-link" href="#">Link</a>
		<cdx-button>
			Button
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Button
		</cdx-button>
		<cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonsAndLinks',
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
			cdxIconEllipsis,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-buttons-and-links {
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: @spacing-75;
}
</style>
