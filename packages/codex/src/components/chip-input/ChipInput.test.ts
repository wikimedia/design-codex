import { mount, shallowMount } from '@vue/test-utils';
import CdxChipInput from './ChipInput.vue';
import CdxInputChip from '../input-chip/InputChip.vue';
import { ChipInputItem, ValidationStatusType } from '../../types';
import { cdxIconArticle } from '@wikimedia/codex-icons';
import { nextTick } from 'vue';

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
		const wrapper = shallowMount( CdxChipInput, { props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Basic usage', () => {
	it( 'emits the update:input-chips event when a new chip is added', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			inputChips: []
		} } );
		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'New Chip' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
	} );

	it( 'adds a new chip with the input value when focus leaves the component', async () => {
		const wrapper = mount( CdxChipInput, {
			props: { inputChips: [] },
			attachTo: 'body'
		} );
		const inputElement = wrapper.get( 'input' );
		const statusMessage = wrapper.get( '.cdx-chip-input__aria-status' );
		inputElement.element.focus();
		await inputElement.setValue( 'New Chip' );
		inputElement.element.blur();
		await nextTick();
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
		// Updates the status message when a new chip is added.
		expect( statusMessage.text() ).toBe( 'Chip New Chip was added.' );
	} );

	it( 'does not a new chip with the input value when focus moves from the input to a chip', async () => {
		const wrapper = mount( CdxChipInput, {
			props: {
				inputChips: [ { value: 'Existing chip' } ]
			},
			attachTo: 'body'
		} );
		const inputElement = wrapper.get( 'input' );
		const chip = wrapper.findComponent( CdxInputChip );
		inputElement.element.focus();
		await inputElement.setValue( 'New Chip' );
		( chip.element as HTMLDivElement ).focus();
		await nextTick();
		expect( wrapper.emitted( 'update:input-chips' ) ).toBeFalsy();
	} );

	it( 'emits the update:input-chips event when a chip is removed', async () => {
		const wrapper = mount( CdxChipInput, { props: {
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

	it( 'updates the status message when a chip is added via keydown "Enter"', async () => {
		const wrapper = mount( CdxChipInput, {
			props: {
				inputChips: []
			}
		} );
		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'chip 1' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );

		const statusMessage = wrapper.get( '.cdx-chip-input__aria-status' );
		expect( statusMessage.text() ).toBe( 'Chip chip 1 was added.' );
	} );

	describe( 'when a chip is clicked', () => {
		it( 'removes the chip and adds the value to the input', async () => {
			const wrapper = mount( CdxChipInput, { props: {
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

		it( 'updates the status message when a chip is removed via button click', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [
						{ value: 'chip 1' },
						{ value: 'chip 2' }
					]
				}
			} );

			const firstChip = wrapper.findComponent( CdxInputChip );
			await firstChip.find( 'button' ).trigger( 'click' );

			const statusMessage = wrapper.get( '.cdx-chip-input__aria-status' );
			expect( statusMessage.text() ).toBe( 'Chip chip 1 was removed.' );
		} );

		describe( 'and the input has a value', () => {
			it( 'adds a new chip with the value of the input', async () => {
				const wrapper = mount( CdxChipInput, { props: {
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
			inputChips: []
		} } );
		const inputElement = wrapper.find( 'input' );

		expect( wrapper.classes() ).not.toContain( 'cdx-chip-input--focused' );

		await inputElement.trigger( 'focus' );
		expect( wrapper.classes() ).toContain( 'cdx-chip-input--focused' );

	} );

	it( 'does not emit update:input-value events', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			inputChips: []
		} } );
		const inputElement = wrapper.find( 'input' );
		await inputElement.setValue( 'New Chip' );

		expect( wrapper.emitted( 'update:input-value' ) ).toBeFalsy();
	} );

	describe( 'when a duplicate chip is added', () => {
		it( 'does not emit the update:input-chips event', async () => {
			const wrapper = shallowMount( CdxChipInput, { props: {
				inputChips: [ { value: 'Do not duplicate chips' } ]
			} } );

			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Do not duplicate chips' );
			await inputElement.trigger( 'keydown', { key: 'Enter' } );

			expect( wrapper.emitted( 'update:input-chips' ) ).toBeFalsy();
		} );

		it( 'sets the outer div class to error', async () => {
			const wrapper = shallowMount( CdxChipInput, { props: {
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

		it( 'clears the error status when the input value is changed', async () => {
			const wrapper = mount( CdxChipInput, { props: {
				inputChips: [ { value: 'Do not duplicate chips' } ],
				'onUpdate:inputChips': ( e: ChipInputItem[] ) => wrapper.setProps( { inputChips: e } )
			} } );

			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Do not duplicate chips' );
			await inputElement.trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.classes() ).toContain( 'cdx-chip-input--status-error' );

			await inputElement.setValue( 'Do not duplicate chipss' );
			expect( wrapper.classes() ).not.toContain( 'cdx-chip-input--status-error' );
		} );
	} );
} );

describe( 'with inputValue', () => {
	describe( 'when text is added to the input', () => {
		it( 'emits an update:modelWrapper event', async () => {
			const wrapper = shallowMount( CdxChipInput, { props: {
				inputChips: [],
				inputValue: ''
			} } );
			await wrapper.get( 'input' ).setValue( 'New chip' );

			expect( wrapper.emitted( 'update:input-value' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-value' )?.[ 0 ] ).toEqual( [ 'New chip' ] );
		} );

		describe( 'and the chip is submitted', () => {
			it( 'adds the new chip', async () => {
				const wrapper = shallowMount( CdxChipInput, { props: {
					inputChips: [],
					inputValue: ''
				} } );
				const inputElement = wrapper.get( 'input' );
				await inputElement.setValue( 'New Chip' );
				// Simulate v-model.
				await wrapper.setProps( { inputValue: 'New Chip' } );

				await inputElement.trigger( 'keydown', { key: 'Enter' } );

				expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
			} );
		} );
	} );
} );

describe( 'with chip validator', () => {
	it( 'adds a chip when validator passes', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			inputChips: [],
			chipValidator: ( value: string ) => value.length < 10
		} } );

		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'New Chip' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );

		expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'New Chip' } ] ] );
		expect( wrapper.element.classList ).not.toContain( 'cdx-chip-input--status-error' );
	} );

	it( 'does not add a chip when validator fails', async () => {
		const wrapper = shallowMount( CdxChipInput, { props: {
			inputChips: [],
			chipValidator: ( value: string ) => value.length < 10
		} } );

		const inputElement = wrapper.get( 'input' );
		await inputElement.setValue( 'Longer chip text' );
		await inputElement.trigger( 'keydown', { key: 'Enter' } );

		expect( wrapper.emitted( 'update:input-chips' ) ).toBeFalsy();
		expect( wrapper.element.classList ).toContain( 'cdx-chip-input--status-error' );
	} );
} );

describe( 'keyboard interaction', () => {
	// Because of limitations in jsdom, computedStyle(...).direction doesn't
	// work unless we manually add CSS rules saying that dir="rtl" means
	// direction: rtl;
	const styleTag = document.createElement( 'style' );
	const ltrDiv = document.createElement( 'div' );
	ltrDiv.id = 'attach-ltr';
	ltrDiv.dir = 'ltr';
	const rtlDiv = document.createElement( 'div' );
	rtlDiv.id = 'attach-rtl';
	rtlDiv.dir = 'rtl';
	styleTag.innerHTML = '[dir="rtl"] * { direction: rtl; } [dir="ltr"] * { direction: ltr; }';
	document.head.appendChild( styleTag );
	document.body.appendChild( ltrDiv );
	document.body.appendChild( rtlDiv );

	// Enter is covered in basic usage above

	it( 'blurs the input when escape is pressed', async () => {
		const wrapper = mount( CdxChipInput, {
			props: {
				inputChips: []
			},
			attachTo: 'body'
		} );
		const inputElement = wrapper.get( 'input' );
		inputElement.element.focus();
		expect( document.activeElement ).toBe( inputElement.element );

		await inputElement.trigger( 'keydown', { key: 'Escape' } );
		expect( document.activeElement ).not.toBe( inputElement.element );
	} );

	describe( 'when backspace is pressed', () => {
		it( 'and the cursor is at the start of the input, moves the focus to the last chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: 'body'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 0;
			inputElement.element.selectionEnd = 0;

			await inputElement.trigger( 'keydown', { key: 'Backspace' } );
			expect( document.activeElement ).toBe( chips[ 1 ].element );
		} );

		it( 'and the cursor is not at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: 'body'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 3;
			inputElement.element.selectionEnd = 3;

			await inputElement.trigger( 'keydown', { key: 'Backspace' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and a chip is focused, deletes that chip and moves focus to the previous chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: 'body'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'Backspace' } );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'Foo' }, { value: 'Baz' } ] ] );
			expect( document.activeElement ).toBe( chips[ 0 ].element );
		} );

		it( 'and the first chip is focused, deletes that chip and moves focus to the now-first chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: 'body'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 0 ].element as HTMLDivElement ).focus();

			await chips[ 0 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'Backspace' } );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'Bar' }, { value: 'Baz' } ] ] );
			expect( document.activeElement ).toBe( chips[ 1 ].element );
		} );

		it( 'and the only chip is focused, deletes that chip and moves focus to the input', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' } ]
				},
				attachTo: 'body'
			} );
			const inputElement = wrapper.get( 'input' );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 0 ].element as HTMLDivElement ).focus();

			await chips[ 0 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'Backspace' } );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [] ] );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'updates the status message when a chip is removed via keydown "Backspace"', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [
						{ value: 'chip 1' },
						{ value: 'chip 2' }
					]
				}
			} );

			const firstChip = wrapper.findComponent( CdxInputChip );
			await firstChip.find( 'button' ).trigger( 'keydown', { key: 'Backspace' } );

			const statusMessage = wrapper.get( '.cdx-chip-input__aria-status' );
			expect( statusMessage.text() ).toBe( 'Chip chip 1 was removed.' );
		} );
	} );

	describe( 'when delete is pressed', () => {
		it( 'and a chip is focused, deletes that chip and moves focus to the next chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: 'body'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'Delete' } );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'Foo' }, { value: 'Baz' } ] ] );
			expect( document.activeElement ).toBe( chips[ 2 ].element );
		} );

		it( 'and the last chip is focused, deletes that chip and moves focus to the input', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: 'body'
			} );
			const inputElement = wrapper.get( 'input' );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 2 ].element as HTMLDivElement ).focus();

			await chips[ 2 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'Delete' } );
			expect( wrapper.emitted( 'update:input-chips' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'Foo' }, { value: 'Bar' } ] ] );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'updates the status message when a chip is removed via keydown "Delete"', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [
						{ value: 'chip 1' },
						{ value: 'chip 2' }
					]
				}
			} );

			const firstChip = wrapper.findComponent( CdxInputChip );
			await firstChip.find( 'button' ).trigger( 'keydown', { key: 'Delete' } );

			const statusMessage = wrapper.get( '.cdx-chip-input__aria-status' );
			expect( statusMessage.text() ).toBe( 'Chip chip 1 was removed.' );
		} );
	} );

	describe( 'when left arrow is pressed in LTR', () => {
		it( 'and the cursor is at the start of the input, moves the focus to the last chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 0;
			inputElement.element.selectionEnd = 0;

			await inputElement.trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( chips[ 1 ].element );
		} );

		it( 'and the cursor is not at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 3;
			inputElement.element.selectionEnd = 3;

			await inputElement.trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and a chip is focused, moves focus to the previous chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( chips[ 0 ].element );
		} );

		it( 'and the first chip is focused, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 0 ].element as HTMLDivElement ).focus();

			await chips[ 0 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( chips[ 0 ].element );
		} );
	} );

	describe( 'when left arrow is pressed in RTL', () => {
		it( 'and the cursor is at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 0;
			inputElement.element.selectionEnd = 0;

			await inputElement.trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and the cursor is not at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 3;
			inputElement.element.selectionEnd = 3;

			await inputElement.trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and a chip is focused, moves focus to the next chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( chips[ 2 ].element );
		} );

		it( 'and the last chip is focused, moves focus to the input', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const inputElement = wrapper.get( 'input' );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 2 ].element as HTMLDivElement ).focus();

			await chips[ 2 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );
	} );

	describe( 'when right arrow is pressed in LTR', () => {
		it( 'and the cursor is at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 0;
			inputElement.element.selectionEnd = 0;

			await inputElement.trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and the cursor is not at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 3;
			inputElement.element.selectionEnd = 3;

			await inputElement.trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and a chip is focused, moves focus to the next chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( chips[ 2 ].element );
		} );

		it( 'and the last chip is focused, moves focus to the input', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-ltr'
			} );
			const inputElement = wrapper.get( 'input' );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 2 ].element as HTMLDivElement ).focus();

			await chips[ 2 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );
	} );

	describe( 'when right arrow is pressed in RTL', () => {
		it( 'and the cursor is at the start of the input, moves focus to the last chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 0;
			inputElement.element.selectionEnd = 0;

			await inputElement.trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( chips[ 1 ].element );
		} );

		it( 'and the cursor is not at the start of the input, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const inputElement = wrapper.get( 'input' );
			await inputElement.setValue( 'Baz' );
			inputElement.element.focus();
			inputElement.element.selectionStart = 3;
			inputElement.element.selectionEnd = 3;

			await inputElement.trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( inputElement.element );
		} );

		it( 'and a chip is focused, moves focus to the previous chip', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 1 ].element as HTMLDivElement ).focus();

			await chips[ 1 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( chips[ 0 ].element );
		} );

		it( 'and the first chip is focused, does not move focus', async () => {
			const wrapper = mount( CdxChipInput, {
				props: {
					inputChips: [ { value: 'Foo' }, { value: 'Bar' }, { value: 'Baz' } ]
				},
				attachTo: '#attach-rtl'
			} );
			const chips = wrapper.findAllComponents( CdxInputChip );
			( chips[ 0 ].element as HTMLDivElement ).focus();

			await chips[ 0 ].get( '.cdx-input-chip' ).trigger( 'keydown', { key: 'ArrowRight' } );
			expect( document.activeElement ).toBe( chips[ 0 ].element );
		} );
	} );
} );
