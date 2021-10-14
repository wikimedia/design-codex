import { shallowMount, mount } from '@vue/test-utils';
import { ButtonActions, ButtonTypes } from '../../constants';
import CdxButton from './Button.vue';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: Record<keyof unknown, unknown>, slot: string];

	const cases: Case[] = [
		[ 'No props and no slot', {}, '' ],
		// eslint-disable-next-line es/no-object-values
		...( Object.values( ButtonActions ).map( ( action ) => [
			`${action} action`,
			{ action },
			''
		] ) as Case[] ),
		// eslint-disable-next-line es/no-object-values
		...( Object.values( ButtonTypes ).map( ( type ) => [
			`${type} type`,
			{ type },
			''
		] ) as Case [] ),
		[ 'Slotted', {}, '<span>Label</span>' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = mount( CdxButton, { props: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits click events', () => {
	const wrapper = shallowMount( CdxButton );
	wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );
