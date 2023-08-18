import { shallowMount } from '@vue/test-utils';
import { ButtonAction, ButtonWeight, ButtonType } from '../../types';
import { ButtonActions, ButtonWeights, ButtonTypes } from '../../constants';
import CdxButton from './Button.vue';
import CdxIcon from '../icon/Icon.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: { action?: ButtonAction, weight?: ButtonWeight, type?: ButtonType },
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
		...ButtonWeights.map( ( weight ) : Case => [
			`${weight} weight`,
			{ weight },
			''
		] ),
		...ButtonTypes.map( ( type ) : Case => [
			`${type} type`,
			{ type },
			''
		] ),
		[ 'Slotted', {}, '<span>Label</span>' ],
		[ 'Icon-only (SVG)', {}, '<svg></svg>', { 'aria-label': 'Icon-only example' } ],
		[ 'Icon-only (CdxIcon)', {}, '<cdx-icon icon=\'<path d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z"/>\' />', { 'aria-hidden': true } ]

	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot, attrs = {} ) => {
		const wrapper = shallowMount( CdxButton,
			{
				props,
				slots: { default: slot },
				attrs,
				global: {
					components: {
						CdxIcon
					}
				}
			} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits click events', async () => {
	const wrapper = shallowMount( CdxButton );
	await wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().click ).toBeTruthy();
} );

describe( 'when pressed via keyboard', () => {
	it( 'looks active on space keydown, then not on keyup', async () => {
		const wrapper = shallowMount( CdxButton );
		await wrapper.get( 'button' ).trigger( 'keydown.space' );
		expect( wrapper.element.classList ).toContain( 'cdx-button--is-active' );
		await wrapper.get( 'button' ).trigger( 'keyup.space' );
		expect( wrapper.element.classList ).not.toContain( 'cdx-button--is-active' );
	} );

	it( 'looks active on enter keydown, then not on keyup', async () => {
		const wrapper = shallowMount( CdxButton );
		await wrapper.get( 'button' ).trigger( 'keydown.enter' );
		expect( wrapper.element.classList ).toContain( 'cdx-button--is-active' );
		await wrapper.get( 'button' ).trigger( 'keyup.enter' );
		expect( wrapper.element.classList ).not.toContain( 'cdx-button--is-active' );
	} );
} );
