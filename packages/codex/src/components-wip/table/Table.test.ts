import { mount } from '@vue/test-utils';
import CdxTable from './Table.vue';
import { TableColumn } from '../../types';

const columnsBasic = [
	{ id: 'col1', label: 'Column 1' },
	{ id: 'col2', label: 'Column 2' },
	{ id: 'col3', label: 'Column 3' }
];

const dataBasic = [
	{ col1: 'One', col2: 'Two', col3: 'Three' },
	{ col1: 1, col2: 2, col3: 3 },
	{ col1: 'Four', col2: 'Five', col3: 'Six' },
	{ col1: 4, col2: 5, col3: 6 }
];

const dataOutOfOrder = [
	{ col2: 'Two', col1: 'One', col3: 'Three' },
	{ col2: 2, col3: 3, col1: 1 },
	{ col1: 'Four', col3: 'Six', col2: 'Five' },
	{ col3: 6, col1: 4, col2: 5 }
];

const columnsTextAlign = [
	{ id: 'col1', label: 'Column 1', textAlign: 'start' },
	{ id: 'col2', label: 'Column 2', textAlign: 'center' },
	{ id: 'col3', label: 'Column 3', textAlign: 'end' }
];

const columnsWithWidths = [
	{ id: 'col1', label: 'Column 1', width: '20%' },
	{ id: 'col2', label: 'Column 2', minWidth: '100px' },
	{ id: 'col3', label: 'Column 3', width: '20%', minWidth: '100px' }
];

const tfoot = `<tfoot>
	<tr>
		<td>One</td>
		<td>Two</td>
		<td>Three</td>
	</tr>
</tfoot>
`;

const itemSlot = '<p>{{params.item}}</p>';

const columnsSingleSort = [
	{ id: 'year', label: 'Year', textAlign: 'end', allowSort: true },
	{ id: 'name', label: 'Last name', allowSort: true },
	{ id: 'age', label: 'Age at win', textAlign: 'end', allowSort: true }
];

const dataSingleSort = [
	{ year: 2023, name: 'Goldin', age: 77 },
	{ year: 2022, name: 'Bernanke', age: 69 },
	{ year: 2022, name: 'Diamond', age: 69 },
	{ year: 2022, name: 'Dybvig', age: 67 },
	{ year: 2021, name: 'Card', age: 65 },
	{ year: 2021, name: 'Angrist', age: 61 },
	{ year: 2021, name: 'Imbens', age: 58 }
];

describe( 'Table', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			columns?: TableColumn[],
			data?: Record<string, string|number|object>[],
			hideCaption?: boolean,
			useRowHeaders?: boolean,
			useRowSelection?: boolean,
			slots?: {
				header?: string,
				footer?: string,
				default?: string,
				[ 'item-col1' ]?: string
			}
		];

		const cases: Case[] = [
			[ 'Basic table', columnsBasic, dataBasic ],
			[ 'With out-of-order data', columnsBasic, dataOutOfOrder ],
			[ 'With text alignment', columnsTextAlign, dataBasic ],
			[ 'With hidden caption', columnsBasic, dataBasic, true ],
			[ 'With row headers', columnsBasic, dataBasic, false, true ],
			[ 'With column width settings', columnsWithWidths, dataBasic, false, true ],
			[ 'With row selection', columnsBasic, dataBasic, false, false, true ],
			[
				'With header and footer slots',
				columnsBasic,
				dataBasic,
				false,
				false,
				false,
				{ header: 'Header slot content', footer: 'Footer slot content' }
			],
			[
				'With tfoot',
				columnsBasic,
				dataBasic,
				false,
				false,
				false,
				{ default: tfoot }
			],
			[
				'With item slot',
				columnsBasic,
				dataBasic,
				false,
				false,
				false,
				{ 'item-col1': itemSlot }
			],
			[
				'With sort icon',
				columnsSingleSort,
				dataSingleSort,
				false,
				false,
				false,
				{ header: 'Header slot content', footer: 'Footer slot content' }
			]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			(
				_,
				columns = [],
				data = [],
				hideCaption = false,
				useRowHeaders = false,
				useRowSelection = false,
				slots = {}
			) => {
				const wrapper = mount( CdxTable, {
					props: { caption: 'Table caption', columns, data, hideCaption, useRowHeaders, useRowSelection },
					slots
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when row selection is enabled', () => {
		describe( 'and a single row is selected', () => {
			it( 'emits update:selectedRow event with the single row index', async () => {
				const wrapper = mount( CdxTable, {
					props: {
						caption: 'Table caption',
						columns: columnsBasic,
						data: dataBasic,
						useRowSelection: true,
						selectedRows: []
					}
				} );
				const firstRowInput = wrapper.find( 'tbody' ).find( 'input' );
				firstRowInput.element.checked = true;
				await firstRowInput.trigger( 'change' );

				expect( wrapper.emitted( 'update:selectedRows' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:selectedRows' )?.[ 0 ] ).toEqual( [ [ 0 ] ] );
			} );
		} );

		describe( 'and the "select all" checkbox is checked', () => {
			it( 'handles update:selectedRow events properly', async () => {
				const wrapper = mount( CdxTable, {
					props: {
						caption: 'Table caption',
						columns: columnsBasic,
						data: dataBasic,
						useRowSelection: true,
						selectedRows: []
					}
				} );

				// Select all is checked.
				const selectAllInput = wrapper.find( 'thead' ).find( 'input' );
				selectAllInput.element.checked = true;
				await selectAllInput.trigger( 'change' );

				expect( wrapper.emitted( 'update:selectedRows' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:selectedRows' )?.[ 0 ] ).toEqual( [ [ 0, 1, 2, 3 ] ] );

				// Simulate the parent responding to the update:selectedRows event.
				await wrapper.setProps( { selectedRows: [ 0, 1, 2, 3 ] } );

				// One row is unselected.
				const firstRowInput = wrapper.find( 'tbody' ).find( 'input' );
				firstRowInput.element.checked = false;
				await firstRowInput.trigger( 'change' );

				expect( wrapper.emitted( 'update:selectedRows' )?.[ 1 ] ).toEqual( [ [ 1, 2, 3 ] ] );

				// Simulate the parent responding to the update:selectedRows event.
				await wrapper.setProps( { selectedRows: [ 1, 2, 3 ] } );

				// Select all is checked again.
				selectAllInput.element.checked = true;
				await selectAllInput.trigger( 'change' );

				expect( wrapper.emitted( 'update:selectedRows' )?.[ 0 ] ).toEqual( [ [ 0, 1, 2, 3 ] ] );
			} );
		} );

		describe( 'When all rows are set as selected via props', () => {
			it( 'should render with the "select all" checkbox in a checked state', () => {
				const wrapper = mount( CdxTable, {
					props: {
						caption: 'Table caption',
						columns: columnsBasic,
						data: dataBasic,
						useRowSelection: true,
						selectedRows: [ 0, 1, 2, 3 ]
					}
				} );

				const selectAllInput = wrapper.find( 'thead' ).find( 'input' );
				expect( selectAllInput.element.checked ).toBe( true );
			} );
		} );
	} );

	describe( 'when sorting is enabled', () => {
		describe( 'and a sortable column is clicked', () => {
			it( 'emits update:sort event to update the sort prop value', async () => {
				const wrapper = mount( CdxTable, {
					props: {
						caption: 'Table caption',
						columns: columnsSingleSort,
						data: dataSingleSort,
						sort: {}
					}
				} );

				// Find the first `th` element.
				const firstTableHeader = wrapper.find( 'th' );

				// Trigger a click event on the first `th` element.
				await firstTableHeader.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:sort' )?.[ 0 ] ).toEqual( [ { year: 'asc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'asc' } } );

				// Trigger another click event on the first `th` element.
				await firstTableHeader.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 1 ] ).toEqual( [ { year: 'desc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'desc' } } );

				// Trigger another click event on the first `th` element.
				await firstTableHeader.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 2 ] ).toEqual( [ { year: 'none' } ] );
				expect( wrapper.emitted( 'update:sort' )?.length ).toBe( 3 );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'none' } } );

				// Find the second `th` element and trigger a click event.
				await wrapper.findAll( 'th' ).at( 1 )?.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 3 ] ).toEqual( [ { name: 'asc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { name: 'asc' } } );

				// Find the third `th` element and trigger a click event.
				await wrapper.findAll( 'th' ).at( 2 )?.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 4 ] ).toEqual( [ { age: 'asc' } ] );
			} );
		} );
	} );
} );
