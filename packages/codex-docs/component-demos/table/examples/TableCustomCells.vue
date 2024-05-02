<template>
	<cdx-table
		class="cdx-docs-table-custom-cells"
		caption="Active blocks"
		:columns="columns"
		:data="data"
	>
		<!-- Get cell data and output it in a specific format. -->
		<template #item-time="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<!-- Get cell data, an array in this case, and output it as a list. -->
		<template #item-parameters="{ item }">
			<ul>
				<li v-for="( parameter, index ) in item" :key="index">
					{{ parameter }}
				</li>
			</ul>
		</template>

		<!-- Get data for the entire row so we can grab the block id and perform an action. -->
		<template #item-actions="{ row }">
			<div class="cdx-docs-table-custom-cells__actions">
				<cdx-button
					weight="quiet"
					aria-label="Edit"
					@click="editBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconEdit" />
				</cdx-button>
				<cdx-button
					weight="quiet"
					action="destructive"
					aria-label="Remove"
					@click="removeBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconTrash" />
				</cdx-button>
			</div>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable, CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconTrash } from '@wikimedia/codex-icons';
import getFormattedDate from '../../../src/utils/getFormattedDate';

export default defineComponent( {
	name: 'TableCustomCells',
	components: { CdxTable, CdxButton, CdxIcon },
	setup() {
		const columns = [
			{ id: 'time', label: 'Timestamp' },
			{ id: 'target', label: 'Target' },
			{ id: 'parameters', label: 'Block parameters' },
			{ id: 'actions', label: 'Actions' }
		];

		const data = [
			{
				id: 1236,
				time: 1701363480000,
				target: 'Username1',
				parameters: [ 'editing (sitewide)', 'account creation disabled' ]
			},
			{
				id: 1235,
				time: 1700752560000,
				target: 'Username2',
				parameters: [ 'account creation disabled' ]
			},
			{
				id: 1234,
				time: 1699787580000,
				target: 'Username3',
				parameters: [ 'autoblock disabled', 'account creation disabled' ]
			}
		];

		function editBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Edit block ' + blockId );
		}

		function removeBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Remove block ' + blockId );
		}

		return {
			columns,
			data,
			cdxIconEdit,
			cdxIconTrash,
			editBlock,
			removeBlock,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-custom-cells {
	ul {
		margin: 0;
		padding-left: @spacing-100;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
