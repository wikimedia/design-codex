<template>
	<cdx-table
		caption="List of MediaWikis"
		:columns="columns"
		:data="data"
		:show-vertical-borders="true"
	>
		<template #thead>
			<thead>
				<tr>
					<th scope="col" rowspan="2">
						Project
					</th>
					<th
						scope="col"
						rowspan="2"
						class="cdx-table__table__cell--align-number"
					>
						No. of wikis
					</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">
						Active
					</th>
					<th scope="col" class="cdx-table__table__cell--align-number">
						All
					</th>
				</tr>
			</thead>
		</template>

		<template #tfoot>
			<tfoot>
				<tr>
					<th scope="row">
						Total:
					</th>
					<td
						v-for="( total, index ) in totals"
						:key="index"
						class="cdx-table__table__cell--align-number"
					>
						{{ total }}
					</td>
				</tr>
			</tfoot>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TableWithSlots',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wiki' },
			{ id: 'nowikis', textAlign: 'number' },
			{ id: 'activeusers', textAlign: 'number' },
			{ id: 'users', textAlign: 'number' }
		];

		const data = [
			{
				wiki: 'wikipedias',
				nowikis: 342,
				activeusers: 292249,
				users: 113556337
			},
			{
				wiki: 'wiktionaries',
				nowikis: 193,
				activeusers: 5764,
				users: 7275027
			},
			{
				wiki: 'wikiquotes',
				nowikis: 96,
				activeusers: 2042,
				users: 4261041
			}
		];

		const totals = data.reduce( ( a, b ) => [
			a[ 0 ] + b.nowikis,
			a[ 1 ] + b.activeusers,
			a[ 2 ] + b.users
		], [ 0, 0, 0 ] );

		return {
			columns,
			data,
			totals
		};
	}
} );
</script>
