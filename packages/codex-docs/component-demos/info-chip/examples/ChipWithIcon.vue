<template>
	<div class="cdx-demo-info-chips">
		<div>
			<cdx-info-chip status="subtle" :icon="cdxIconCamera">
				Photos
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip :icon="cdxIconCamera">
				Photos
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="progressive" :icon="cdxIconCamera">
				Photos
			</cdx-info-chip>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';
import { cdxIconCamera } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipWithIcon',
	components: {
		CdxInfoChip
	},
	setup() {
		return {
			cdxIconCamera
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-info-chips {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;
}
</style>
