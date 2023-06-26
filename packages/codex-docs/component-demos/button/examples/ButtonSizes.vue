<template>
	<table>
		<caption>
			Button size examples for all supported <code>size</code> values.
		</caption>
		<thead>
			<th>Size</th>
			<th>Min-size</th>
			<th>Text button</th>
			<th>Icon-only button</th>
		</thead>
		<tr>
			<td>
				<span>Medium</span>
			</td>
			<td>
				<span>32px</span>
			</td>
			<td>
				<cdx-button @click="onClick">
					Medium button
				</cdx-button>
			</td>
			<td>
				<cdx-button aria-label="Medium button example" @click="onClick">
					<cdx-icon :icon="cdxIconBell" />
				</cdx-button>
			</td>
		</tr>
		<tr>
			<td>
				<span>Large</span>
			</td>
			<td>
				<span>44px</span>
			</td>
			<td>
				<cdx-button size="large" @click="onClick">
					Large button
				</cdx-button>
			</td>
			<td>
				<cdx-button
					aria-label="Large button example"
					size="large"
					@click="onClick"
				>
					<cdx-icon :icon="cdxIconBell" />
				</cdx-button>
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
	text-align: left;
	caption-side: bottom;
}
</style>
