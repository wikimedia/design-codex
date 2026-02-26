<template>
	<div class="cdx-demo-button-with-icon">
		<cdx-button @click="onClick">
			<cdx-icon :icon="cdxIconDownload" />
			Download
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Continue
			<cdx-icon :icon="cdxIconArrowNext" />
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowNext, cdxIconDownload } from '@wikimedia/codex-icons';

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
			cdxIconArrowNext,
			cdxIconDownload,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-button-with-icon {
	display: flex;
	flex-direction: row;
	gap: @spacing-75;
}
</style>
