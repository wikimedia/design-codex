<template>
	<cdx-table
		v-model:sort="sort"
		class="cdx-docs-table-with-sort"
		caption="Contributions"
		:columns="columns"
		:data="data"
		@update:sort="onSort"
	>
		<template #item-wiki="{ item }">
			<a :href="`https://${ item }.org`">{{ item }}</a>
		</template>

		<template #item-date="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<template #item-size="{ item }">
			<span v-if="item > 0" class="cdx-docs-table-with-sort__size--positive">
				+{{ item }}
			</span>
			<span v-else-if="item === 0">
				{{ item }}
			</span>
			<span v-else class="cdx-docs-table-with-sort__size--negative">
				{{ item }}
			</span>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable } from '@wikimedia/codex';
import getFormattedDate from '../../../src/utils/getFormattedDate';

export default defineComponent( {
	name: 'TableWithSort',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'user', label: 'Username', allowSort: true },
			{ id: 'wiki', label: 'Wiki project', allowSort: true },
			{ id: 'title', label: 'Page title', allowSort: true },
			{ id: 'date', label: 'Date', allowSort: true, textAlign: 'number' },
			{ id: 'size', label: 'Size', allowSort: true, textAlign: 'number' }
		];

		// Data is a ref so we can change it on sort.
		const data = ref( [
			{
				user: 'Username1',
				wiki: 'de.wikipedia',
				title: 'Bahnstromleitung',
				date: 1703743920000,
				size: 9
			},
			{
				user: 'Username2',
				wiki: 'commons.wikimedia',
				title: 'Xanthium.jpg',
				date: 1704193920000,
				size: -70
			},
			{
				user: 'Username3',
				wiki: 'de.wikipedia',
				title: 'Berlin',
				date: 1704387480000,
				size: 652
			},
			{
				user: 'Username4',
				wiki: 'en.wikipedia',
				title: 'Stability Model',
				date: 1702571100000,
				size: 42
			}
		] );

		// Initially sort by username.
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<import('@wikimedia/codex').TableSort>} */
		const sort = ref( { user: 'asc' } );

		function onSort( newSort ) {
			const sortKey = Object.keys( newSort )[ 0 ];
			const sortOrder = newSort[ sortKey ];

			function sortNumerically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					if ( sortDir === 'asc' ) {
						return b[ columnId ] - a[ columnId ];
					}
					return a[ columnId ] - b[ columnId ];
				} );
			}

			function sortAlphabetically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a[ columnId ].localeCompare( b[ columnId ] ) );
				} );
			}

			// If the new sort order is 'none', go back to the initial sort.
			if ( sortOrder === 'none' ) {
				data.value = sortAlphabetically( 'user', 'asc' );
				sort.value = { user: 'asc' };
				return;
			}

			// Sort data.
			switch ( sortKey ) {
				case 'user':
				case 'wiki':
				case 'title':
					data.value = sortAlphabetically( sortKey, sortOrder );
					return;
				case 'date':
				case 'size':
					data.value = sortNumerically( sortKey, sortOrder );
					return;
				default:
					return;
			}
		}

		return {
			columns,
			data,
			sort,
			onSort,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-sort {
	&__size {
		&--positive {
			color: @color-success;
		}

		&--negative {
			color: @color-destructive;
		}
	}
}
</style>
