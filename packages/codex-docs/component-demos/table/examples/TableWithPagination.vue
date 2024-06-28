<template>
	<cdx-table
		caption="Paginated table example"
		:columns="paginatedColumns"
		:data="paginatedData"
		:paginate="true"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

// pagination example
const paginatedColumns = [
	{ id: 'name', label: 'Record Name' },
	{ id: 'id', label: 'Record ID' }
];

// Set up table data in excess of what is displayed
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const paginatedData = [];
let counter = 1001;

alpha.split( '' ).forEach( ( letter ) => {
	paginatedData.push( {
		id: counter,
		name: letter.repeat( 5 )
	} );
	counter++;
} );

export default defineComponent( {
	name: 'TableWithPagination',
	components: {
		CdxTable
	},

	setup() {
		return {
			paginatedColumns,
			paginatedData
		};
	}
} );
</script>
