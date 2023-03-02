<template>
	<div>
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
	</div>
</template>

<script lang="ts" setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { ButtonActions, ButtonWeights } from '../../../../codex/src/constants';
import { cdxIconTrash } from '@wikimedia/codex-icons';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';
const onClick = getEventLogger<Event>( 'click' );
</script>
