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
					<cdx-toggle-button
						v-model="smallButtonValue"
						size="small"
						@click="onClick">
						small button
					</cdx-toggle-button>
				</td>
				<td>
					<cdx-toggle-button
						v-model="smallButtonIconValue"
						aria-label="Small button example"
						size="small"
						@click="onClick">
						<cdx-icon size="small" :icon="cdxIconBell" />
					</cdx-toggle-button>
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
					<cdx-toggle-button v-model="mediumButtonValue" @click="onClick">
						Medium button
					</cdx-toggle-button>
				</td>
				<td>
					<cdx-toggle-button
						v-model="mediumButtonIconValue"
						aria-label="Medium button example"
						@click="onClick">
						<cdx-icon :icon="cdxIconBell" />
					</cdx-toggle-button>
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
					<cdx-toggle-button
						v-model="largeButtonValue"
						size="large"
						@click="onClick">
						Large button
					</cdx-toggle-button>
				</td>
				<td>
					<cdx-toggle-button
						v-model="largeButtonIconValue"
						aria-label="Large button example"
						size="large"
						@click="onClick">
						<cdx-icon :icon="cdxIconBell" />
					</cdx-toggle-button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonSizes',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			smallButtonValue: ref( false ),
			smallButtonIconValue: ref( false ),
			mediumButtonValue: ref( false ),
			mediumButtonIconValue: ref( false ),
			largeButtonValue: ref( false ),
			largeButtonIconValue: ref( false ),
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
