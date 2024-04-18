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

const columnsSortable = [
	{ id: 'col1', label: 'Column 1' },
	{ id: 'col2', label: 'Column 2', allowSort: true },
	{ id: 'col3', label: 'Column 3' }
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
				columnsSortable,
				dataBasic,
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
} );
