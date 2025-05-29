<template>
	<p>
		<cdx-icon class="cdx-demo-icon-success" :icon="cdxIconSuccess" />
		Success!
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconSuccess } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconColor',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconSuccess
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-icon-success {
	color: @color-icon-success;
}
</style>
