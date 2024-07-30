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
			caption="Basic pagination example"
			:columns="paginatedColumns"
			:data="paginatedData"
			:paginate="true"
			pagination-position="both"
			:pagination-size-options="paginationOptions"
		/>

		<h3>
			Pagination of remote data
		</h3>

		<cdx-table
			caption="Server-side pagination example"
			:columns="paginatedColumns"
			:data="apiData"
			:paginate="true"
			:server-pagination="true"
			pagination-position="both"
			:total-rows="52"
			:pagination-size-options="paginationOptions"
			:pending="pending"
			@load-more="fetchData"
		/>

		<h3>
			Pagination of remote indeterminate data
		</h3>

		<cdx-table
			caption="Indeterminate example"
			:columns="paginatedColumns"
			:data="apiDataIndeterminate"
			:paginate="true"
			:server-pagination="true"
			pagination-position="both"
			:pagination-size-options="paginationOptions"
			:pending="pendingIndeterminate"
			@load-more="fetchDataIndeterminate"
		>
			<template #empty-state>
				No more results to display
			</template>
		</cdx-table>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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

const apiData = ref<TableRow[]>( paginatedData.slice( 0, 10 ) );
const pending = ref( false );

function retrieve( offset: number, rows: number ) {
	apiData.value = paginatedData.slice( offset, rows + offset );
	pending.value = false;
}
const fetchData = ( offset: number, rows: number ) => {
	pending.value = true;

	return setTimeout( () => {
		retrieve( offset, rows );
	}, 1500 );
};

// Set up an "indeterminate" paginated example
const longAlpha = alpha.repeat( 1 );
const paginatedDataIndeterminate: TableRow[] = [];

let counter2 = 1001;

longAlpha.split( '' ).forEach( ( letter ) => {
	paginatedDataIndeterminate.push( {
		id: counter2,
		name: letter.repeat( 5 )
	} );

	counter2++;
} );

const apiDataIndeterminate = ref<TableRow[]>( paginatedDataIndeterminate.slice( 0, 10 ) );
const pendingIndeterminate = ref( false );

function retrieveIndeterminate( offset: number, rows: number ) {
	apiDataIndeterminate.value = paginatedDataIndeterminate.slice( offset, rows + offset );
	pendingIndeterminate.value = false;
}

const fetchDataIndeterminate = ( offset: number, rows: number ) => {
	pendingIndeterminate.value = true;

	return setTimeout( () => {
		retrieveIndeterminate( offset, rows );
	}, 1500 );
};
</script>
