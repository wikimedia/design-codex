import { mount } from '@vue/test-utils';
import CdxTable from './Table.vue';
import CdxTablePager from './TablePager.vue';
import { TableColumn, TableRow, TablePaginationPosition } from '../../types';
import { TableRowIdentifier } from '../../constants';

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
	{ id: 'col3', label: 'Column 3', textAlign: 'end' },
	{ id: 'col3', label: 'Column 3', textAlign: 'number' }
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
	{ id: 'year', label: 'Year', textAlign: 'number', allowSort: true },
	{ id: 'name', label: 'Last name', allowSort: true },
	{ id: 'age', label: 'Age at win', textAlign: 'number', allowSort: true }
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

const dataSortAndSelection = [
	{ [ TableRowIdentifier ]: 'goldin', year: 2023, name: 'Goldin', age: 77 },
	{ [ TableRowIdentifier ]: 'bernanke', year: 2022, name: 'Bernanke', age: 69 },
	{ [ TableRowIdentifier ]: 'diamond', year: 2022, name: 'Diamond', age: 69 },
	{ [ TableRowIdentifier ]: 'dybvig', year: 2022, name: 'Dybvig', age: 67 },
	{ [ TableRowIdentifier ]: 'card', year: 2021, name: 'Card', age: 65 },
	{ [ TableRowIdentifier ]: 'angrist', year: 2021, name: 'Angrist', age: 61 },
	{ [ TableRowIdentifier ]: 'imbens', year: 2021, name: 'Imbens', age: 58 }
];

const dataSortAndSelectionSorted = [
	{ [ TableRowIdentifier ]: 'angrist', year: 2021, name: 'Angrist', age: 61 },
	{ [ TableRowIdentifier ]: 'bernanke', year: 2022, name: 'Bernanke', age: 69 },
	{ [ TableRowIdentifier ]: 'card', year: 2021, name: 'Card', age: 65 },
	{ [ TableRowIdentifier ]: 'diamond', year: 2022, name: 'Diamond', age: 69 },
	{ [ TableRowIdentifier ]: 'dybvig', year: 2022, name: 'Dybvig', age: 67 },
	{ [ TableRowIdentifier ]: 'goldin', year: 2023, name: 'Goldin', age: 77 },
	{ [ TableRowIdentifier ]: 'imbens', year: 2021, name: 'Imbens', age: 58 }
];

const columnsPagination = [
	{ id: 'name', label: 'Record Name' },
	{ id: 'id', label: 'Record ID' }
];

const dataPagination: TableRow[] = [];

// Set up table data in excess of what is displayed
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let counter = 1001;
alpha.split( '' ).forEach( ( letter ) => {
	dataPagination.push( {
		id: counter,
		name: letter.repeat( 5 )
	} );

	counter++;
} );

describe( 'Table', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			columns?: TableColumn[],
			data?: Record<string, string|number|object>[],
			hideCaption?: boolean,
			useRowHeaders?: boolean,
			useRowSelection?: boolean,
			paginate?: boolean,
			paginationPosition?: TablePaginationPosition,
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
				false,
				undefined,
				{ header: 'Header slot content', footer: 'Footer slot content' }
			],
			[
				'With tfoot',
				columnsBasic,
				dataBasic,
				false,
				false,
				false,
				false,
				undefined,
				{ default: tfoot }
			],
			[
				'With item slot',
				columnsBasic,
				dataBasic,
				false,
				false,
				false,
				false,
				undefined,
				{ 'item-col1': itemSlot }
			],
			[
				'With sort icon',
				columnsSingleSort,
				dataSingleSort,
				false,
				false,
				false,
				false,
				undefined,
				{ header: 'Header slot content', footer: 'Footer slot content' }
			],
			[ 'With empty state', [], [], false, false, false ],
			[
				'With basic pagination',
				columnsPagination,
				dataPagination,
				false,
				false,
				false,
				true,
				'both'
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
				paginate = false,
				paginationPosition = 'bottom',
				slots = {}
			) => {
				const wrapper = mount( CdxTable, {
					props: { caption: 'Table caption', columns, data, hideCaption, useRowHeaders, useRowSelection, paginate, paginationPosition },
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

		describe( 'and a single row or some rows are selected', () => {
			it( 'the "select all" checkbox is in an indeterminate state', async () => {
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
				const secondRowInput = wrapper.find( 'tbody' ).findAll( 'input' )[ 1 ];
				const selectAllInput = wrapper.find( 'thead' ).find( 'input' );

				// Simulate selecting the first checkbox input.
				firstRowInput.element.checked = true;
				await firstRowInput.trigger( 'change' );

				expect( selectAllInput.element.checked ).toBeFalsy();
				expect( wrapper.vm.selectAllIndeterminate ).toBeTruthy();

				// Simulate selecting the second checkbox input.
				secondRowInput.element.checked = true;
				await secondRowInput.trigger( 'change' );

				// eslint-disable-next-line no-unused-expressions, jest/valid-expect
				expect( secondRowInput.element.checked ).toBeTruthy;
				expect( selectAllInput.element.checked ).toBeFalsy();
				expect( wrapper.vm.selectAllIndeterminate ).toBeTruthy();
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

		describe( 'And sorting is also enabled', () => {
			describe( 'and a single row is selected', () => {
				it( 'emits update:selectedRow event with the single row index', async () => {
					const wrapper = mount( CdxTable, {
						props: {
							caption: 'Table caption',
							columns: columnsSingleSort,
							data: dataSortAndSelection,
							useRowSelection: true,
							selectedRows: [],
							sort: {}
						}
					} );
					const firstRowInput = wrapper.find( 'tbody' ).find( 'input' );
					firstRowInput.element.checked = true;
					await firstRowInput.trigger( 'change' );

					expect( wrapper.emitted( 'update:selectedRows' ) ).toBeTruthy();
					expect( wrapper.emitted( 'update:selectedRows' )?.[ 0 ] ).toEqual( [ [ 'goldin' ] ] );
				} );

				describe( 'and a sortable column is clicked', () => {
					it( 'emits update:sort event to update the sort prop value', async () => {
						const wrapper = mount( CdxTable, {
							props: {
								caption: 'Table caption',
								columns: columnsSingleSort,
								data: dataSortAndSelection,
								useRowSelection: true,
								selectedRows: [ 'goldin' ],
								sort: {}
							}
						} );

						let firstRowInput = wrapper.find( 'tbody' ).find( 'input' );
						expect( firstRowInput.element.checked ).toBeTruthy();

						// Find the "name" header button.
						const nameTableHeader = wrapper.findAll( 'button' )[ 1 ];

						// Trigger a click event on the first `th` element.
						await nameTableHeader.trigger( 'click' );
						expect( wrapper.emitted( 'update:sort' ) ).toBeTruthy();
						expect( wrapper.emitted( 'update:sort' )?.[ 0 ] ).toEqual( [ { name: 'asc' } ] );

						// Simulate the parent responding to the update:sort event.
						await wrapper.setProps( { sort: { year: 'asc' } } );
						await wrapper.setProps( { data: dataSortAndSelectionSorted } );

						// Find the new first row input.
						firstRowInput = wrapper.find( 'tbody' ).find( 'input' );
						// Find the one with 'goldin' now.
						const sixthRowInput = wrapper.find( 'tbody' ).findAll( 'input' )[ 5 ];
						// Confirm that 'goldin' is still checked and the first row is not.
						expect( firstRowInput.element.checked ).toBeFalsy();
						expect( sixthRowInput.element.checked ).toBeTruthy();

					} );
				} );
			} );

			describe( 'and the "select all" checkbox is checked', () => {
				it( 'handles update:selectedRow events properly', async () => {
					const wrapper = mount( CdxTable, {
						props: {
							caption: 'Table caption',
							columns: columnsSingleSort,
							data: dataSortAndSelection,
							useRowSelection: true,
							selectedRows: [],
							sort: {}
						}
					} );

					// Select all is checked.
					const selectAllInput = wrapper.find( 'thead' ).find( 'input' );
					selectAllInput.element.checked = true;
					await selectAllInput.trigger( 'change' );

					expect( wrapper.emitted( 'update:selectedRows' ) ).toBeTruthy();
					expect( wrapper.emitted( 'update:selectedRows' )?.[ 0 ] ).toEqual( [ [
						'goldin', 'bernanke', 'diamond', 'dybvig', 'card', 'angrist', 'imbens'
					] ] );

				} );
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

				// Find the first `<button>` in a `<th>` element.
				const firstTableHeaderButton = wrapper.find( '.cdx-table__table__sort-button' );

				// Trigger a click event on the first `<button>` within the `<th>` element.
				await firstTableHeaderButton.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:sort' )?.[ 0 ] ).toEqual( [ { year: 'asc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'asc' } } );

				// Trigger another click event on the first `<button>` element.
				await firstTableHeaderButton.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 1 ] ).toEqual( [ { year: 'desc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'desc' } } );

				// Trigger another click event on the first `<button>` element.
				await firstTableHeaderButton.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 2 ] ).toEqual( [ { year: 'none' } ] );
				expect( wrapper.emitted( 'update:sort' )?.length ).toBe( 3 );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { year: 'none' } } );

				// Find the second `<button>` element and trigger a click event.
				await wrapper.findAll( '.cdx-table__table__sort-button' ).at( 1 )?.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 3 ] ).toEqual( [ { name: 'asc' } ] );

				// Simulate the parent responding to the update:sort event.
				await wrapper.setProps( { sort: { name: 'asc' } } );

				// Find the third `<button>` element and trigger a click event.
				await wrapper.findAll( '.cdx-table__table__sort-button' ).at( 2 )?.trigger( 'click' );
				expect( wrapper.emitted( 'update:sort' )?.[ 4 ] ).toEqual( [ { age: 'asc' } ] );
			} );
		} );
	} );

	describe( 'when pagination is not enabled', () => {
		it( 'does not show the pagination controls', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: false
				}
			} );

			expect( wrapper.findComponent( CdxTablePager ).exists() ).toBe( false );
		} );

		it( 'displays all rows', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: false
				}
			} );

			const rows = wrapper.findAll( 'tbody tr' );
			expect( rows.length ).toEqual( 52 );
		} );
	} );

	describe( 'when pagination is enabled', () => {
		it( 'shows the pagination controls once if set to "top"', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true,
					paginationPosition: 'top'
				}
			} );

			const pagers = wrapper.findAllComponents( CdxTablePager );
			expect( pagers.length ).toEqual( 1 );
		} );

		it( 'shows the pagination controls once if set to "bottom"', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true,
					paginationPosition: 'bottom'
				}
			} );

			const pagers = wrapper.findAllComponents( CdxTablePager );
			expect( pagers.length ).toEqual( 1 );
		} );

		it( 'shows the pagination controls twice if set to "both"', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true,
					paginationPosition: 'both'
				}
			} );

			const pagers = wrapper.findAllComponents( CdxTablePager );
			expect( pagers.length ).toEqual( 2 );
		} );

		it( 'shows 10 rows if no paginationSizeDefault is provided', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const rows = wrapper.findAll( 'tbody tr' );
			expect( rows.length ).toEqual( 10 );
		} );

		it( 'shows a number of rows equal to paginationSizeDefault if provided', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true,
					paginationSizeDefault: 7
				}
			} );

			const rows = wrapper.findAll( 'tbody tr' );
			expect( rows.length ).toEqual( 7 );
		} );

		it( 'shows the "first" and "previous" buttons as disabled at the beginning of the sequence', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnFirst = wrapper.find( 'button.cdx-table-pager__button-first' );
			const btnPrev = wrapper.find( 'button.cdx-table-pager__button-prev' );
			expect( btnFirst.attributes() ).toHaveProperty( 'disabled' );
			expect( btnPrev.attributes() ).toHaveProperty( 'disabled' );
		} );

		it( 'shows the "next" and "last" buttons as enabled at the beginning of the sequence', () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnNext = wrapper.find( 'button.cdx-table-pager__button-next' );
			const btnLast = wrapper.find( 'button.cdx-table-pager__button-last' );
			expect( btnNext.attributes() ).not.toHaveProperty( 'disabled' );
			expect( btnLast.attributes() ).not.toHaveProperty( 'disabled' );
		} );

		it( 'shows the "next" and "last" buttons as disabled at the end of the sequence', async () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnNext = wrapper.find( 'button.cdx-table-pager__button-next' );
			const btnLast = wrapper.find( 'button.cdx-table-pager__button-last' );
			await btnLast.trigger( 'click' );
			expect( btnNext.attributes() ).toHaveProperty( 'disabled' );
			expect( btnLast.attributes() ).toHaveProperty( 'disabled' );
		} );

		it( 'shows the "first" and "prev" buttons as enabled at the end of the sequence', async () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnFirst = wrapper.find( 'button.cdx-table-pager__button-first' );
			const btnPrev = wrapper.find( 'button.cdx-table-pager__button-prev' );
			const btnLast = wrapper.find( 'button.cdx-table-pager__button-last' );
			await btnLast.trigger( 'click' );
			expect( btnFirst.attributes() ).not.toHaveProperty( 'disabled' );
			expect( btnPrev.attributes() ).not.toHaveProperty( 'disabled' );
		} );

		it( 'pages forward through the results each time "next" is clicked', async () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnNext = wrapper.find( 'button.cdx-table-pager__button-next' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'AAAAA' );

			await btnNext.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'KKKKK' );

			await btnNext.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'UUUUU' );

			await btnNext.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'eeeee' );

			await btnNext.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'ooooo' );

			await btnNext.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'yyyyy' );
		} );

		it( 'jumps to the last page of results when "last" is clicked', async () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnLast = wrapper.find( 'button.cdx-table-pager__button-last' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'AAAAA' );

			await btnLast.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'yyyyy' );
			expect( wrapper.findAll( 'tbody tr' ).length ).toEqual( 2 );
		} );

		it( 'pages backwards through the results each time "prev" is clicked', async () => {
			const wrapper = mount( CdxTable, {
				props: {
					caption: 'Paginated table',
					data: dataPagination,
					columns: columnsPagination,
					paginate: true
				}
			} );

			const btnLast = wrapper.find( 'button.cdx-table-pager__button-last' );
			const btnPrev = wrapper.find( 'button.cdx-table-pager__button-prev' );
			await btnLast.trigger( 'click' );

			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'yyyyy' );
			expect( wrapper.findAll( 'tbody tr' ).length ).toEqual( 2 );

			await btnPrev.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'ooooo' );

			await btnPrev.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'eeeee' );

			await btnPrev.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'UUUUU' );

			await btnPrev.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'KKKKK' );

			await btnPrev.trigger( 'click' );
			expect( wrapper.find( 'tbody tr td' ).text() ).toBe( 'AAAAA' );
		} );
	} );
} );
