import { shallowMount } from '@vue/test-utils';
import { ButtonAction, ButtonType } from '../../types';
import { ButtonActions, ButtonTypes } from '../../constants';
import CdxButton from './Button.vue';
import CdxIcon from '../icon/Icon.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: { action?: ButtonAction, type?: ButtonType },
		slot: string,
		attrs?: Record<string, unknown>
	];

	const cases: Case[] = [
		[ 'No props and no slot', {}, '' ],
		...ButtonActions.map( ( action ) : Case => [
			`${action} action`,
			{ action },
			''
		] ),
		...ButtonTypes.map( ( type ) : Case => [
			`${type} type`,
			{ type },
			''
		] ),
		[ 'Slotted', {}, '<span>Label</span>' ],
		[ 'Icon-only', {}, '<svg></svg>', { 'aria-label': 'icon-only-example' } ]

	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot, attrs = {} ) => {
		const wrapper = shallowMount( CdxButton,
			{
				props: props,
				slots: { default: slot },
				attrs: attrs
			} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits click events', async () => {
	const wrapper = shallowMount( CdxButton );
	await wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );

describe( 'detects icon-only buttons', () => {
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
		[ 'Hidden conditional CdxICon component', '<cdx-icon v-if="false" icon="foo" />', false ],
		[ 'v-for generating a single CdxIcon component', '<cdx-icon v-for="icon in [ \'foo\' ]" :icon="icon" />', true ],
		[ 'v-for generating three CdxIcon components', '<cdx-icon v-for="icon in [ \'foo\', \'bar\', \'baz\' ]" :icon="icon" />', false ]
	];

	test.each( cases )( 'Case %# %s: %s => %p', ( _, content, expectedIconOnly ) => {
		const wrapper = shallowMount( CdxButton, {
			attrs: {
				// Avoid warnings about missing aria-label for icon-only buttons.
				'aria-label': 'Foo'
			},
			slots: {
				default: content
			},
			global: {
				components: {
					CdxIcon
				}
			}
		} );
		expect( wrapper.classes( 'cdx-button--icon-only' ) ).toBe( expectedIconOnly );
	} );
} );
