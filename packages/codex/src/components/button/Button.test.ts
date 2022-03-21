import { mount } from '@vue/test-utils';
import { ButtonAction, ButtonType } from '../../types';
import { ButtonActions, ButtonTypes } from '../../constants';
import CdxButton from './Button.vue';

describe( 'matches the snapshot', () => {
	type Case = [msg: string, props: { action?: ButtonAction, type?: ButtonType }, slot: string];

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
		[ 'Slotted', {}, '<span>Label</span>' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = mount( CdxButton, { props: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits click events', async () => {
	const wrapper = mount( CdxButton );
	await wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );
