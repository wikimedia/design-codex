<template>
	<table class="cdx-docs-button-demo-table">
		<thead>
			<tr>
				<th aria-hidden="true" />
				<th
					v-for="size in sizes"
					:key="size"
					colspan="4"
				>
					{{ sizeLabel( size ) }} size
				</th>
			</tr>
			<tr>
				<th aria-hidden="true" />
				<template v-for="size in sizes">
					<th v-for="weight in weights" :key="`${size}-${weight}`">
						{{ weightLabel( weight ) }}
					</th>
				</template>
			</tr>
		</thead>
		<tbody>
			<template v-for="action in actions">
				<tr
					v-for="disabled in [ false, true ]"
					:key="`${action}-${Number( disabled )}`"
				>
					<th>
						{{ action || 'undefined' }}
						{{ disabled ? ' disabled' : '' }}
					</th>
					<template v-for="size in sizes">
						<td
							v-for="weight in weights"
							:key="`${size}-${weight}`"
						>
							<slot
								:action="action"
								:size="size"
								:weight="weight"
								:disabled="disabled"
							/>
						</td>
					</template>
				</tr>
			</template>
		</tbody>
	</table>
</template>

<script lang="ts" setup>
import { ButtonActions, ButtonSizes, ButtonWeights } from '../constants';
import { ButtonSize, ButtonWeight } from '../types';

const actions = [ undefined, ...ButtonActions ] as const;
const sizes = [ undefined, ...ButtonSizes ] as const;
const weights = [ undefined, ...ButtonWeights ] as const;

function sizeLabel( size: ButtonSize|undefined ) {
	const sizeLabels: Record<ButtonSize, string> = {
		medium: 'Medium',
		large: 'Large'
	};
	return size === undefined ? 'undefined' : sizeLabels[ size ];
}

function weightLabel( weight: ButtonWeight|undefined ) {
	const weightLabels: Record<ButtonWeight, string> = {
		normal: 'Normal',
		primary: 'Primary',
		quiet: 'Quiet'
	};
	return weight === undefined ? 'undefined' : weightLabels[ weight ];
}
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-button-demo-table {
	td {
		text-align: center;
	}

	th {
		font-weight: @font-weight-normal;
	}
}
</style>
