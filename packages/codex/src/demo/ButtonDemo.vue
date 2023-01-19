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
							v-for="buttonType in [ ...ButtonTypes, undefined ]"
							:key="`type-${buttonType}`">
							<cdx-button
								:type="buttonType"
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
							v-for="buttonType in [ ...ButtonTypes, undefined ]"
							:key="`type-${buttonType}`">
							<!-- eslint-disable max-len -->
							<button
								:class="`cdx-button cdx-button--action-${buttonAction} cdx-button--type-${buttonType}`"
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
import { ButtonActions, ButtonTypes } from '../constants';
import { cdxIconTrash } from '@wikimedia/codex-icons';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';

const onClick = getEventLogger<Event>( 'click' );
</script>

<style lang="less">
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon {
	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @param-is-button-icon: true );
	}
}
</style>
