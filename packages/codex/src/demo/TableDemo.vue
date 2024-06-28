<template>
	<section id="cdx-table">
		<h2>Tables</h2>
		<p>
			See also an extended set of <a href="demos/table.html">Table demos</a>.
		</p>

		<cdx-table
			caption="Table caption"
			:columns="columns"
			:data="data"
		/>

		<h3>
			With basic pagination enabled
		</h3>
		<cdx-table
			caption="Paginated table example"
			:columns="paginatedColumns"
			:data="paginatedData"
			:paginate="true"
			pagination-position="both"
			:pagination-size-options="paginationOptions"
		/>
	</section>
</template>

<script lang="ts" setup>
import { CdxTable, TableColumn, TableRow } from '../lib';

const columns = [
	{ id: 'user', label: 'User' },
	{ id: 'ip', label: 'IP(s)' },
	{ id: 'userAgent', label: 'User Agent(s)' }
];

const ids = [
	'Abc',
	'Twoword Username',
	'Shortish',
	'123.45.6.789',
	'Short',
	'PascalCase'
];
const ip = '123.45.6.789';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64, x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 [10]';
const data = [
	{ user: ids[ 0 ], ip, userAgent },
	{ user: ids[ 1 ], ip, userAgent },
	{ user: ids[ 2 ], ip, userAgent },
	{ user: ids[ 3 ], ip, userAgent },
	{ user: ids[ 4 ], ip, userAgent },
	{ user: ids[ 5 ], ip, userAgent }
];

// pagination example
const paginatedColumns: TableColumn[] = [
	{ id: 'name', label: 'Record Name' },
	{ id: 'id', label: 'Record ID' }
];

// Set up table data in excess of what is displayed
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const paginatedData: TableRow[] = [];
let counter = 1001;

const paginationOptions = [
	{ value: 5 },
	{ value: 10 },
	{ value: 15 },
	{ value: 20 },
	{ value: 50 }
];

alpha.split( '' ).forEach( ( letter ) => {
	paginatedData.push( {
		id: counter,
		name: letter.repeat( 5 )
	} );

	counter++;
} );
</script>
