<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		v-model:sort="sort"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
		@update:sort="onSort"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header-content">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<span class="cdx-docs-table-with-selection__header-content__buttons">
					<cdx-button @click="handleRerun">
						Rerun
					</cdx-button>
					<cdx-button @click="handleDisconnect">
						Disconnect
					</cdx-button>
				</span>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			/>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable, CdxButton, CdxInfoChip, CdxIcon, TableRowIdentifier } from '@wikimedia/codex';
import { cdxIconCheck, cdxIconClose } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<string[]>} */
		const selectedRows = ref( [] );

		const sort = ref( { name: 'asc' } );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px', allowSort: true },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				[ TableRowIdentifier ]: 'Z11401',
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				[ TableRowIdentifier ]: 'Z11405',
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11402',
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11404',
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].result = true;
				}
			} );
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].status = false;
				}
			} );
		}

		function onSort( newSort ) {
			const sortOrder = newSort.name;

			function sortAlphabetically( sortDir ) {
				data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a.name.label.localeCompare( b.name.label ) );
				} );
			}

			// Reset default sort order.
			if ( sortOrder === 'none' ) {
				sortAlphabetically( 'asc' );
				sort.value = { name: 'asc' };
				return;
			}

			sortAlphabetically( sortOrder );
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			sort,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			onSort,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-selection {
	&__header-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: @spacing-50;

		&__buttons {
			display: flex;
			gap: @spacing-50;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
