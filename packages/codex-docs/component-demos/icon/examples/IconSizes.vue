<template>
	<table>
		<caption>
			Icon size examples for all supported <code>size</code> values.
		</caption>
		<tr>
			<th>
				<cdx-icon
					:icon="cdxIconLogoWikimedia"
					size="medium"
					icon-label="Example icon at medium size"
				/>
			</th>
			<td>
				<span>Medium Icon</span>
			</td>
			<td>
				<span>20px</span>
			</td>
		</tr>
		<tr>
			<th>
				<cdx-icon
					:icon="cdxIconLogoWikimedia"
					size="small"
					icon-label="Example icon at small size"
				/>
			</th>
			<td>
				<span>Small Icon</span>
			</td>
			<td>
				<span>16px</span>
			</td>
		</tr>
		<tr>
			<th>
				<cdx-icon
					:icon="cdxIconLogoWikimedia"
					size="x-small"
					icon-label="Example icon at extra-small size"
				/>
			</th>
			<td>
				<span>Extra-small Icon</span>
			</td>
			<td>
				<span>12px</span>
			</td>
		</tr>
	</table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconLogoWikimedia } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconSizes',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLogoWikimedia
		};
	}
} );
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

table {
	width: @size-full;
}

caption {
	margin-top: @spacing-25;
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	text-align: left;
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	caption-side: bottom;
}
</style>
