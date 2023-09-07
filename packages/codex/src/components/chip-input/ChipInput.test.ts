import { mount, shallowMount } from '@vue/test-utils';
import CdxChipInput from './ChipInput.vue';
import CdxInputChip from '../input-chip/InputChip.vue';
import { ChipInputItem, ValidationStatusType } from '../../types';
import { cdxIconArticle } from '@wikimedia/codex-icons';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			inputChips: ChipInputItem[],
			separateInput?: boolean,
			status?: ValidationStatusType,
			disabled?: boolean,
		}
	];

	const cases: Case[] = [
		[ 'Default props', { inputChips: [ { value: 'Sample chip' } ] } ],
		[ 'No input chips', { inputChips: [] } ],
		[ 'With separate input', { inputChips: [ { value: 'Sample chip' } ], separateInput: true } ],
		[ 'With error', { inputChips: [ { value: 'Sample chip' } ], status: 'error' } ],
		[ 'Disabled', { inputChips: [ { value: 'Sample chip' } ], disabled: true } ],
		[ 'Input chips with icon', { inputChips: [ { value: 'Sample chip', icon: cdxIconArticle } ] } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( CdxChipInput, {
			props: {
				chipAriaDescription: 'Press Enter to edit or Delete to remove',
				...props
			}
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Basic usage', () => {
	it( 'emits the update:input-chips event when a new chip is added', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			chipAriaDescription: 'Press Enter to edit or Delete to remove',
			inputChips: []
		} } );
		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'New Chip' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
	} );

	it( 'adds a new chip with the input value on blur', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			chipAriaDescription: 'Press Enter to edit or Delete to remove',
			inputChips: []
		} } );
		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'New Chip' );
		await inputElement.trigger( 'blur' );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
	} );

	it( 'emits the update:input-chips event when a chip is removed', async () => {
		const wrapper = mount( CdxChipInput, { props: {
			chipAriaDescription: 'Press Enter to edit or Delete to remove',
			inputChips: [
				{ value: 'chip 1' },
				{ value: 'chip 2' }
			]
		} } );
		const firstChip = wrapper.findComponent( CdxInputChip );
		await firstChip.find( 'button' ).trigger( 'click' );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'chip 2' } ] ] );
		// Make sure the chip's value wasn't added to the input.
		const inputElement = wrapper.get( 'input' );
		expect( inputElement.element.value ).toBe( '' );
	} );

	describe( 'when a chip is clicked', () => {
		it( 'removes the chip and adds the value to the input', async () => {
			const wrapper = mount( CdxChipInput, { props: {
				chipAriaDescription: 'Press Enter to edit or Delete to remove',
				inputChips: [
					{ value: 'chip 1' },
					{ value: 'chip 2' }
				]
			} } );
			const inputElement = wrapper.get( 'input' );
			const firstChip = wrapper.findComponent( CdxInputChip );
			await firstChip.find( '.cdx-input-chip' ).trigger( 'click' );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'chip 2' } ] ] );
			expect( inputElement.element.value ).toBe( 'chip 1' );
		} );

		describe( 'and the input has a value', () => {
			it( 'adds a new chip with the value of the input', async () => {
				const wrapper = mount( CdxChipInput, { props: {
					chipAriaDescription: 'Press Enter to edit or Delete to remove',
					inputChips: [
						{ value: 'chip 1' },
						{ value: 'chip 2' }
					],
					'onUpdate:inputChips': ( e: ChipInputItem[] ) => wrapper.setProps( { inputChips: e } )
				} } );
				const inputElement = wrapper.get( 'input' );
				const firstChip = wrapper.findComponent( CdxInputChip );

				// Add a value in the input.
				await inputElement.setValue( 'New Chip' );
				// We have to trigger a blur, which happens automatically when a chip is clicked in
				// the browser, because this is how the new chip gets added.
				await inputElement.trigger( 'blur' );
				// Then click the first chip.
				await firstChip.find( '.cdx-input-chip' ).trigger( 'click' );

				expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'chip 1' }, { value: 'chip 2' }, { value: 'New Chip' } ] ] );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 1 ] ).toEqual( [ [ { value: 'chip 2' }, { value: 'New Chip' } ] ] );
				expect( inputElement.element.value ).toBe( 'chip 1' );
			} );
		} );
	} );

	it( 'sets the outer div class to focused when the input is focused', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			chipAriaDescription: 'Press Enter to edit or Delete to remove',
			inputChips: []
		} } );
		const inputElement = wrapper.find( 'input' );

		expect( wrapper.classes() ).not.toContain( 'cdx-chip-input--focused' );

		await inputElement.trigger( 'focus' );
		expect( wrapper.classes() ).toContain( 'cdx-chip-input--focused' );

	} );

	describe( 'when a duplicate chip is added', () => {
		it( 'does not emit the update:input-chips event', async () => {
			const wrapper = shallowMount( CdxChipInput, { props: {
				chipAriaDescription: 'Press Enter to edit or Delete to remove',
				inputChips: [ { value: 'Do not duplicate chips' } ]
			} } );

			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Do not duplicate chips' );
			await inputElement.trigger( 'keydown', { key: 'Enter' } );

			expect( wrapper.emitted( 'update:input-chips' ) ).toBeFalsy();
		} );

		it( 'sets the outer div class to error', async () => {
			const wrapper = shallowMount( CdxChipInput, { props: {
				chipAriaDescription: 'Press Enter to edit or Delete to remove',
				inputChips: [ { value: 'Do not duplicate chips' } ]
			} } );

			expect( wrapper.classes() ).not.toContain( 'cdx-chip-input--status-error' );

			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Do not duplicate chips' );
			await inputElement.trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.classes() ).toContain( 'cdx-chip-input--status-error' );
		} );

		it( 'clears the error status if the duplicate chip is removed', async () => {
			const wrapper = mount( CdxChipInput, { props: {
				chipAriaDescription: 'Press Enter to edit or Delete to remove',
				inputChips: [ { value: 'Do not duplicate chips' } ],
				'onUpdate:inputChips': ( e: ChipInputItem[] ) => wrapper.setProps( { inputChips: e } )
			} } );

			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Do not duplicate chips' );
			await inputElement.trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.classes() ).toContain( 'cdx-chip-input--status-error' );

			const firstChip = wrapper.findComponent( CdxInputChip );
			await firstChip.find( 'button' ).trigger( 'click' );
			expect( wrapper.classes() ).not.toContain( 'cdx-chip-input--status-error' );
		} );
	} );
} );
