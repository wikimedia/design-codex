<template>
	<div>
		<table>
			<thead>
				<tr>
					<th aria-hidden="true" />
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

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { ButtonActions, ButtonWeights } from '../../../../codex/src/constants';
import { cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonVariants',
	components: { CdxButton, CdxIcon },
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			onClick,
			cdxIconTrash,
			ButtonActions,
			ButtonWeights
		};
	}
} );
</script>
