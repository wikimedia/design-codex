<template>
	<table class="cdx-demo-button-sizes">
		<caption>
			Button size examples for all supported <code>size</code> values.
		</caption>
		<thead>
			<tr>
				<th>Size</th>
				<th>Min-size</th>
				<th>Text button</th>
				<th>Icon-only button</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<span>Small</span>
				</td>
				<td>
					<span>24px</span>
				</td>
				<td>
					<cdx-button size="small" @click="onClick">
						small button
					</cdx-button>
				</td>
				<td>
					<cdx-button
						aria-label="Small button example"
						size="small"
						@click="onClick">
						<cdx-icon size="small" :icon="cdxIconBell" />
					</cdx-button>
				</td>
			</tr>
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
		</tbody>
	</table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonSizes',
	components: { CdxButton, CdxIcon },
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconBell,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-button-sizes {
	table {
		width: @size-full;
	}

	caption {
		margin-top: @spacing-25;
		text-align: left;
		caption-side: bottom;
	}
}
</style>
