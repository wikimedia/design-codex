import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import useIconOnlyButton from './useIconOnlyButton';
import CdxIcon from '../components/icon/Icon.vue';

describe( 'useIconOnlyButton', () => {
	type Case = [
		msg: string,
		content: string,
		expectedIconOnly: boolean
	];

	const cases: Case[] = [
		[ 'Empty', '', false ],
		[ 'SVG tag', '<svg></svg>', true ],
		[ 'BR tag', '<br />', false ],
		[ 'CdxIcon component', '<cdx-icon icon="foo" />', true ],
		[ 'CdxIcon component with text', '<cdx-icon icon="foo" /> Foo', false ],
		[ 'Two CdxIcon components', '<cdx-icon icon="foo" /><cdx-icon icon="bar" />', false ],
		[ 'CdxIcon component with comment', '<!-- Icon below --><cdx-icon icon="foo" />', true ],
		[ 'CdxIcon component with hidden conditional span', '<cdx-icon icon="foo" /><span v-if="false">Conditional</span>', true ],
		[ 'CdxIcon component with shown conditional span', '<cdx-icon icon="foo" /><span v-if="true">Conditional</span>', false ],
		[ 'CdxIcon component with expression that expands to nothing', '<cdx-icon icon="foo" />{{ "" }}', true ],
		[ 'CdxIcon component with expression that expands to something', '<cdx-icon icon="foo" />{{ "Foo" }}', false ],
		[ 'Hidden conditional CdxIcon component', '<cdx-icon v-if="false" icon="foo" />', false ],
		[ 'v-for generating a single CdxIcon component', '<cdx-icon v-for="icon in [ \'foo\' ]" :icon="icon" />', true ],
		[ 'v-for generating three CdxIcon components', '<cdx-icon v-for="icon in [ \'foo\', \'bar\', \'baz\' ]" :icon="icon" />', false ],
		[ 'component tag conditionally generating a CdxIcon component', '<component :is="true ? \'CdxIcon\' : \'p\'" icon="foo" />', true ],
		[ 'component tag conditionally generating a p tag', '<component :is="false ? \'CdxIcon\' : \'p\'" icon="foo" />', false ]
	];

	const TestComponent = defineComponent( {
		setup( props, { slots, attrs } ) {
			const isIconOnly = useIconOnlyButton( slots.default, attrs, 'IconOnlyButtonTest' );

			return {
				isIconOnly
			};
		}
	} );

	test.each( cases )( 'Case %# %s: %s => %p', ( _, content, expectedIconOnly ) => {
		const wrapper = mount( TestComponent, {
			slots: { default: content },
			global: {
				components: { CdxIcon }
			}
		} );
		expect( wrapper.vm.isIconOnly ).toBe( expectedIconOnly );
	} );
} );
