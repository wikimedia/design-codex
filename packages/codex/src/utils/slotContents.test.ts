import { defineComponent } from 'vue';
import { isComponentVNode, isTagVNode } from './slotContents';
import parseSlotContents from '../testutils/parseSlotContents';

/**
 * Placeholder component used in tests where a component node is needed.
 */
const MockComponent = defineComponent( {
	name: 'MockComponent',
	template: '<div class="mock"><slot /></div>'
} );

type VNodeCase = [
	msg: string,
	vnodeAsText: string,
	componentVNode: string|false,
	tagVNode: string|false
];
const vnodeCases: VNodeCase[] = [
	[ 'Comment', '<!-- Comment -->', false, false ],
	[ 'Text', 'Foo', false, false ],
	[ 'Tag', '<h2>Foo</h2>', false, 'h2' ],
	[ 'Component', '<mock-component foo="bar" />', 'MockComponent', false ],
	[ 'Component with slot content', '<mock-component foo="bar"><p>Hello</p></mock-component>', 'MockComponent', false ],
	[ 'v-for over tag', '<h2 v-for="i in [ 1, 2, 3, 4 ]">{{ i }}</h2>', false, false ],
	[ 'v-for over component', '<mock-component v-for="i in [ 1, 2, 3, 4 ]">{{ i }}</mock-component>', false, false ]
];

describe( 'isComponentVNode', () => {
	test.each( vnodeCases )( 'Case %#: %s', ( _, vnodeAsText, componentVNode ) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const vnode = parseSlotContents( vnodeAsText, { MockComponent } )![ 0 ];

		/* eslint-disable jest/no-conditional-expect */
		if ( typeof componentVNode === 'string' ) {
			expect( isComponentVNode( vnode ) ).toBe( true );
			expect( isComponentVNode( vnode, componentVNode ) ).toBe( true );
		} else {
			expect( isComponentVNode( vnode ) ).toBe( componentVNode );
		}
		/* eslint-enable jest/no-conditional-expect */
	} );
} );

describe( 'isTagVNode', () => {
	test.each( vnodeCases )( 'Case %#: %s', ( _, vnodeAsText, _componentVNode, tagVNode ) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const vnode = parseSlotContents( vnodeAsText, { MockComponent } )![ 0 ];

		/* eslint-disable jest/no-conditional-expect */
		if ( typeof tagVNode === 'string' ) {
			expect( isTagVNode( vnode ) ).toBe( true );
			expect( isTagVNode( vnode, tagVNode ) ).toBe( true );
		} else {
			expect( isTagVNode( vnode ) ).toBe( tagVNode );
		}
		/* eslint-enable jest/no-conditional-expect */
	} );
} );
