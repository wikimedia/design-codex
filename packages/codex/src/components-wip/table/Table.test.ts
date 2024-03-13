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

const tfoot = `<tfoot>
	<tr>
		<td>One</td>
		<td>Two</td>
		<td>Three</td>
	</tr>
</tfoot>
`;

const itemSlot = '<p>{{params.item}}</p>';

describe( 'Table', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			columns?: TableColumn[],
			data?: Record<string, string|number|object>[],
			hideCaption?: boolean,
			useRowHeaders?: boolean,
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
			[
				'With header and footer slots',
				columnsBasic,
				dataBasic,
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
				{ default: tfoot }
			],
			[
				'With item slot',
				columnsBasic,
				dataBasic,
				false,
				false,
				{ 'item-col1': itemSlot }
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
				slots = {}
			) => {
				const wrapper = mount( CdxTable, {
					props: { caption: 'Table caption', columns, data, hideCaption, useRowHeaders },
					slots
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );
} );
