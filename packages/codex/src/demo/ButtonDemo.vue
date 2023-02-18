<template>
	<section id="cdx-button">
		<h2>
			Button
		</h2>

		<table>
			<thead>
				<tr>
					<th />
					<th>Normal</th>
					<th>Primary</th>
					<th>Quiet</th>
					<th>undefined</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="buttonAction in [ ...ButtonActions, undefined ]">
					<tr
						v-for="disabled in [ true, false ]"
						:key="`action-${buttonAction}-${Number( disabled )}`"
					>
						<th>
							{{ buttonAction || 'undefined' }}
							{{ disabled ? ' disabled' : '' }}
						</th>
						<td
							v-for="buttonWeight in [ ...ButtonWeights, undefined ]"
							:key="`weight-${buttonWeight}`">
							<cdx-button
								:weight="buttonWeight"
								:action="buttonAction"
								:disabled="disabled"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>
					</tr>
				</template>
			</tbody>
		</table>

		<h3>Fallback using old `type` prop</h3>
		<table>
			<thead>
				<tr>
					<th />
					<th>Normal</th>
					<th>Primary</th>
					<th>Quiet</th>
					<th>undefined</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="buttonAction in [ ...ButtonActions, undefined ]">
					<tr
						v-for="disabled in [ true, false ]"
						:key="`action-${buttonAction}-${Number( disabled )}`"
					>
						<th>
							{{ buttonAction || 'undefined' }}
							{{ disabled ? ' disabled' : '' }}
						</th>
						<td
							v-for="buttonWeight in [ ...ButtonWeights, undefined ]"
							:key="`type-${buttonWeight}`">
							<cdx-button
								:type="buttonWeight"
								:action="buttonAction"
								:disabled="disabled"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>
					</tr>
				</template>
			</tbody>
		</table>

		<h3>CSS-only version</h3>
		<table>
			<thead>
				<tr>
					<th />
					<th>Normal</th>
					<th>Primary</th>
					<th>Quiet</th>
					<th>undefined</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="buttonAction in [ ...ButtonActions, undefined ]">
					<tr
						v-for="disabled in [ true, false ]"
						:key="`action-${buttonAction}-${Number( disabled )}`"
					>
						<th>
							{{ buttonAction || 'undefined' }}
							{{ disabled ? ' disabled' : '' }}
						</th>
						<td
							v-for="buttonWeight in [ ...ButtonWeights, undefined ]"
							:key="`weight-${buttonWeight}`">
							<!-- eslint-disable max-len -->
							<button
								:class="`cdx-button cdx-button--action-${buttonAction} cdx-button--weight-${buttonWeight}`"
								:disabled="disabled"
							>
								<span class="cdx-button__icon cdx-demo-css-icon--trash" />
								Button
							</button>
							<!-- eslint-enable max-len -->
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts" setup>
import { CdxButton, CdxIcon } from '../lib';
import { ButtonActions, ButtonWeights } from '../constants';
import { cdxIconTrash } from '@wikimedia/codex-icons';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';

const onClick = getEventLogger<Event>( 'click' );
</script>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon {
	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @param-is-button-icon: true );
	}
}
</style>
