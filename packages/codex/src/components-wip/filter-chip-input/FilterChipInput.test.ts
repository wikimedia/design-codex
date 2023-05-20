import { mount, shallowMount } from '@vue/test-utils';
import CdxFilterChipInput from './FilterChipInput.vue';
import CdxFilterChip from '../filter-chip/FilterChip.vue';
import { FilterChipInputItem, ValidationStatusType } from '../../types';
import { cdxIconArticle } from '@wikimedia/codex-icons';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			inputChips: FilterChipInputItem[],
			status?: ValidationStatusType,
			disabled?: boolean,
		}
	];

	const cases: Case[] = [
		[ 'Default props', { inputChips: [ { value: 'Sample chip' } ] } ],
		[ 'No input chips', { inputChips: [] } ],
		[ 'With error', { inputChips: [ { value: 'Sample chip' } ], status: 'error' } ],
		[ 'Disabled', { inputChips: [ { value: 'Sample chip' } ], disabled: true } ],
		[ 'Input chips with icon', { inputChips: [ { value: 'Sample chip', icon: cdxIconArticle } ] } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( CdxFilterChipInput,
			{ props: { removeButtonLabel: 'remove', ...props } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Basic usage', () => {
	it( 'emits the update:input-chips event when a new chip is added', async () => {
		const wrapper = shallowMount( CdxFilterChipInput, { props: {
			removeButtonLabel: 'remove',
			inputChips: []
		} } );
		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'New Chip' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
	} );

	it( 'emits the update:input-chips event when a chip is removed', async () => {
		const wrapper = mount( CdxFilterChipInput, { props: {
			removeButtonLabel: 'remove',
			inputChips: [
				{ value: 'chip 1' },
				{ value: 'chip 2' }
			]
		} } );
		const firstChip = wrapper.findComponent( CdxFilterChip );
		await firstChip.find( 'button' ).trigger( 'click' );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'chip 2' } ] ] );
	} );

	it( 'sets the outer div class to focused when the input is focused', async () => {
		const wrapper = shallowMount( CdxFilterChipInput, { props: {
			removeButtonLabel: 'remove',
			inputChips: []
		} } );
		const inputElement = wrapper.find( 'input' );

		expect( wrapper.classes() ).not.toContain( 'cdx-filter-chip-input--focused' );

		await inputElement.trigger( 'focus' );
		expect( wrapper.classes() ).toContain( 'cdx-filter-chip-input--focused' );

	} );

	it( 'does not emit the update:input-chips event when a duplicate chip is added', async () => {
		const wrapper = shallowMount( CdxFilterChipInput, { props: {
			removeButtonLabel: 'remove',
			inputChips: [ { value: 'Do not duplicate chips' } ]
		} } );

		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'Do not duplicate chips' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );

		expect( wrapper.emitted( 'update:input-chips' ) ).toBeFalsy();
	} );

	it( 'sets the outer div class to error when a duplicate chip is added', async () => {
		const wrapper = shallowMount( CdxFilterChipInput, { props: {
			removeButtonLabel: 'remove',
			inputChips: [ { value: 'Do not duplicate chips' } ]
		} } );

		expect( wrapper.classes() ).not.toContain( 'cdx-filter-chip-input--status-error' );

		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'Do not duplicate chips' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.classes() ).toContain( 'cdx-filter-chip-input--status-error' );
	} );
} );
