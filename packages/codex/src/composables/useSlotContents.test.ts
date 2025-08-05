import { defineComponent, VNode } from 'vue';
import useSlotContents from './useSlotContents';
import parseSlotContents from '../testutils/parseSlotContents';

/**
 * Placeholder component used in tests where a component node is needed.
 */
const MockComponent = defineComponent( {
	name: 'MockComponent',
	template: '<div class="mock"><slot /></div>'
} );

describe( 'useSlotContents', () => {
	type Case = [
		msg: string,
		slotContents: string,
		expected: ( string | Partial<VNode> )[]
	];
	const cases: Case[] = [
		[
			'comment and text',
			`
			<!-- Comment -->
			Text
			`,
			[ ' Text' ]
		],
		[
			'comment, text, component and HTML element',
			`
			<!-- Comment -->
			Text
			<mock-component foo="bar" />
			<h2>Hello</h2>
			`,
			[
				' Text ',
				{
					type: { name: 'MockComponent' },
					props: { foo: 'bar' }
				},
				{
					type: 'h2',
					children: 'Hello'
				}
			]
		],
		[
			'v-for over components',
			`
			<mock-component
				v-for="num in [ 1, 2, 3, 4 ]"
				:key="num"
				:foo="num"
			/>
			`,
			[
				{
					type: { name: 'MockComponent' },
					props: { foo: 1 }
				},
				{
					type: { name: 'MockComponent' },
					props: { foo: 2 }
				},
				{
					type: { name: 'MockComponent' },
					props: { foo: 3 }
				},
				{
					type: { name: 'MockComponent' },
					props: { foo: 4 }
				}
			]
		]
	];

	test.each( cases )( 'Case %#: %s', ( _, slotContents, expected ) => {
		const parsed = parseSlotContents( slotContents, { MockComponent } );
		expect( useSlotContents( parsed ) ).toMatchObject( expected );
	} );
} );
