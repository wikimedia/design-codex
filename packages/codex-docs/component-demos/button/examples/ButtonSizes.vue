<template>
	<table>
		<caption>
			Button size examples for all supported <code>size</code> values.
		</caption>
		<tr>
			<th>
				<cdx-button aria-label="Medium button example">
					<cdx-icon :icon="cdxIconBell" @click="onClick" />
				</cdx-button>
			</th>
			<td>
				<span>Medium button</span>
			</td>
			<td>
				<span>32px</span>
			</td>
		</tr>
		<tr>
			<th>
				<cdx-button aria-label="Large button example" size="large">
					<cdx-icon :icon="cdxIconBell" @click="onClick" />
				</cdx-button>
			</th>
			<td>
				<span>Large button</span>
			</td>
			<td>
				<span>44px</span>
			</td>
		</tr>
	</table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'ButtonSizes',
	components: { CdxButton, CdxIcon },
	setup() {
		const onClick = getEventLogger<Event>( 'click' );

		return {
			cdxIconBell,
			onClick
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
