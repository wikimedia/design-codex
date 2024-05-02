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
					<th rowspan="2">
						Project
					</th>
					<th rowspan="2" class="cdx-table__cell--align-end">
						No. of wikis
					</th>
					<th colspan="2" class="cdx-table__cell--align-center">
						Users
					</th>
				</tr>
				<tr>
					<th class="cdx-table__cell--align-end">
						Active
					</th>
					<th class="cdx-table__cell--align-end">
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
						class="cdx-table__cell--align-end"
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
			{ id: 'nowikis', textAlign: 'end' },
			{ id: 'activeusers', textAlign: 'end' },
			{ id: 'users', textAlign: 'end' }
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
