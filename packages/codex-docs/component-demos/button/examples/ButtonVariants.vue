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
	</div>
</template>

<script lang="ts" setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { ButtonActions, ButtonTypes } from '../../../../codex/src/constants';
import { cdxIconTrash } from '@wikimedia/codex-icons';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';
const onClick = getEventLogger<Event>( 'click' );
</script>
