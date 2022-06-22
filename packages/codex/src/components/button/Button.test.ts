import { shallowMount } from '@vue/test-utils';
import { ButtonAction, ButtonType } from '../../types';
import { ButtonActions, ButtonTypes } from '../../constants';
import CdxButton from './Button.vue';

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
		[ 'Icon Only', {}, '<svg></svg>', { 'aria-label': 'icon-only-example' } ]

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
