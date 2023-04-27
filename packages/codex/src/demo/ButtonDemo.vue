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
		<h3>Flush layout for buttons</h3>
		<h4>Regular buttons</h4>
		<div class="cdx-demo-flush-layout cdx-demo-flush-layout--regular">
			<div class="cdx-demo-flush-layout__buttons">
				<cdx-button weight="quiet">
					Button one
				</cdx-button>
				<cdx-button weight="quiet">
					Button two
				</cdx-button>
			</div>
			<div class="cdx-demo-flush-layout__content">
				<p>
					Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
					peppermint asian pear frosted gingerbread bites Southern Italian almond milk
					chai latte mint golden cayenne pepper.
				</p>
			</div>
		</div>

		<h4>Icon-only buttons</h4>
		<div class="cdx-demo-flush-layout cdx-demo-flush-layout--icon-only">
			<div class="cdx-demo-flush-layout__buttons">
				<cdx-button weight="quiet" aria-label="Align left">
					<cdx-icon :icon="cdxIconAlignLeft" />
				</cdx-button>
				<cdx-button weight="quiet" aria-label="Align right">
					<cdx-icon :icon="cdxIconAlignRight" />
				</cdx-button>
			</div>
			<div class="cdx-demo-flush-layout__content">
				<p>
					Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
					peppermint asian pear frosted gingerbread bites Southern Italian almond milk
					chai latte mint golden cayenne pepper.
				</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxButton, CdxIcon } from '../lib';
import { ButtonActions, ButtonWeights } from '../constants';
import { cdxIconTrash, cdxIconAlignLeft, cdxIconAlignRight } from '@wikimedia/codex-icons';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';

const onClick = getEventLogger<Event>( 'click' );
</script>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';
@import ( reference ) '../themes/mixins/public/button-layout-flush.less';

.cdx-demo-css-icon {
	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @param-is-button-icon: true );
	}
}

.cdx-demo-flush-layout {
	&--regular {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start' );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end' );
		}
	}

	&--icon-only {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start', true );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end', true );
		}
	}

	&__buttons {
		display: flex;
		justify-content: space-between;
	}

	&__content {
		margin-top: @spacing-100;
		border: @border-base;
		padding: @spacing-100;
	}
}
</style>
