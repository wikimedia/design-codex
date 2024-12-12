<template>
	<div class="cdx-demo-info-chips">
		<div>
			<cdx-info-chip status="warning">
				1 test has not run
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="error">
				2 tests are failing
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="success">
				All tests are passing
			</cdx-info-chip>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipsWithStatuses',
	components: {
		CdxInfoChip
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
