<template>
	<div class="cdx-demo-button-types">
		<div class="cdx-demo-button-types__neutral">
			<cdx-button>
				Normal neutral
			</cdx-button>
			<cdx-button weight="quiet">
				Quiet neutral
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__progressive">
			<cdx-button action="progressive">
				Normal progressive
			</cdx-button>
			<cdx-button action="progressive" weight="primary">
				Primary progressive
			</cdx-button>
			<cdx-button action="progressive" weight="quiet">
				Quiet progressive
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__destructive">
			<cdx-button action="destructive">
				Normal destructive
			</cdx-button>
			<cdx-button action="destructive" weight="primary">
				Primary destructive
			</cdx-button>
			<cdx-button action="destructive" weight="quiet">
				Quiet destructive
			</cdx-button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonTypes',
	components: { CdxButton }
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-button-types {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;

	> div {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
