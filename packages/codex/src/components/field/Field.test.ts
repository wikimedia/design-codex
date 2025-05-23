import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { Icon, cdxIconMapPin } from '@wikimedia/codex-icons';
import { ValidationStatusType, ValidationMessages } from '../../types';
import CdxField from './Field.vue';
import CdxCheckbox from '../../components/checkbox/Checkbox.vue';
import CdxSelect from '../../components/select/Select.vue';
import CdxTextArea from '../../components/text-area/TextArea.vue';
import CdxTextInput from '../../components/text-input/TextInput.vue';
import CdxMessage from '../../components/message/Message.vue';

type Case = [
	msg: string,
	props: {
		labelIcon?: Icon,
		optionalFlag?: string,
		optional?: boolean,
		hideLabel?: boolean,
		isFieldset?: boolean,
		disabled?: boolean,
		status?: ValidationStatusType,
		messages?: ValidationMessages
	},
	label: string,
	description?: string,
	helpText?: string
];

describe( 'Field', () => {
	describe( 'matches the snapshot', () => {
		describe( 'with a TextInput control', () => {
			const cases: Case[] = [
				[ 'Basic field', {}, 'Label text' ],
				[ 'With label icon', { labelIcon: cdxIconMapPin }, 'Label text' ],
				[ 'With optional flag using deprecated API', { optionalFlag: '(optional)' }, 'Label text' ],
				[ 'With optional flag', { optional: true }, 'Label text' ],
				[ 'With visually hidden label', { hideLabel: true }, 'Label text' ],
				[ 'Disabled', { disabled: true }, 'Label text' ],
				[ 'Error status with message', { status: 'error', messages: { error: 'Error' } }, 'Label text' ],
				[ 'With description', { }, 'Label text', 'Field description' ],
				[ 'With help text', {}, 'Label text', undefined, 'Help text' ]
			];

			test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, label, description = undefined, helpText = undefined ) => {
				const wrapper = mount( CdxField, { props, slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					...( label === undefined ? {} : { label } ),
					...( description === undefined ? {} : { description } ),
					...( helpText === undefined ? {} : { helpText } )
				} } );
				expect( wrapper.element ).toMatchSnapshot();
			} );
		} );

		describe( 'with a Select control', () => {
			const cases: Case[] = [
				[ 'Basic field', {}, 'Label text' ],
				[ 'Disabled', { disabled: true }, 'Label text' ],
				[ 'Error status with message', { status: 'error', messages: { error: 'Error' } }, 'Label text' ],
				[ 'With description', {}, 'Label text', 'Field description' ]
			];

			test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, label, description = undefined ) => {
				const wrapper = mount( CdxField, { props, slots: {
					default: h( CdxSelect, { selected: null, menuItems: [ { value: '1' } ] } ),
					...( label === undefined ? {} : { label } ),
					...( description === undefined ? {} : { description } )
				} } );
				expect( wrapper.element ).toMatchSnapshot();
			} );
		} );

		describe( 'with a Textarea control', () => {
			const cases: Case[] = [
				[ 'Basic field', {}, 'Label text' ],
				[ 'Disabled', { disabled: true }, 'Label text' ],
				[ 'Error status with message', { status: 'error', messages: { error: 'Error' } }, 'Label text' ],
				[ 'With description', {}, 'Label text', 'Field description' ]
			];

			test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, label, description = undefined ) => {
				const wrapper = mount( CdxField, { props, slots: {
					default: h( CdxTextArea, { modelValue: '' } ),
					...( label === undefined ? {} : { label } ),
					...( description === undefined ? {} : { description } )
				} } );
				expect( wrapper.element ).toMatchSnapshot();
			} );
		} );

		describe( 'as a fieldset with a Checkbox control', () => {
			const cases: Case[] = [
				[ 'Basic field', { isFieldset: true }, 'Label text' ],
				[ 'Disabled', { isFieldset: true, disabled: true }, 'Label text' ]
			];

			test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, label ) => {
				const wrapper = mount( CdxField, { props, slots: {
					default: h(
						CdxCheckbox,
						{ modelValue: false },
						{ default: () => 'Checkbox label' }
					),
					...( label === undefined ? {} : { label } )
				} } );
				expect( wrapper.element ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the Field is enabled', () => {
		describe( 'and the single input is disabled', () => {
			it( 'disables that input', () => {
				const wrapper = mount( CdxField, {
					slots: {
						default: h( CdxTextInput, { modelValue: '', disabled: true } ),
						label: 'Label text'
					}
				} );
				expect( wrapper.find( 'input' ).element.disabled ).toBeTruthy();
			} );
		} );

		describe( 'and an input in a fieldset is disabled', () => {
			it( 'disables that input', () => {
				const wrapper = mount( CdxField, {
					props: { isFieldset: true },
					slots: {
						default: h(
							CdxCheckbox,
							{ modelValue: false, disabled: true },
							{ default: () => 'Checkbox label' }
						),
						label: 'Label text'
					}
				} );
				expect( wrapper.find( 'input' ).element.disabled ).toBeTruthy();
			} );
		} );
	} );

	describe( 'when the Field status is default', () => {
		describe( 'and the single input has status error', () => {
			it( 'sets the error class for that input', () => {
				const wrapper = mount( CdxField, {
					slots: {
						default: h( CdxTextInput, { modelValue: '', status: 'error' } ),
						label: 'Label text'
					}
				} );
				expect( wrapper.findComponent( CdxTextInput ).element.classList ).toContain( 'cdx-text-input--status-error' );
			} );
		} );

		describe( 'and an input in a fieldset has status error', () => {
			it( 'sets the error class for that input', () => {
				const wrapper = mount( CdxField, {
					props: { isFieldset: true },
					slots: {
						default: [
							h( CdxTextInput, { modelValue: '' } ),
							h( CdxSelect, { selected: null, menuItems: [ { value: '1' } ], status: 'error' } )
						],
						label: 'Label text'
					}
				} );
				expect( wrapper.findComponent( CdxTextInput ).element.classList ).not.toContain( 'cdx-text-input--status-error' );
				expect( wrapper.findComponent( CdxSelect ).element.classList ).toContain( 'cdx-select-vue--status-error' );
			} );
		} );
	} );

	describe( 'when the Field status is error', () => {
		describe( 'and the single input sets no status', () => {
			it( 'sets the error class for that input', () => {
				const wrapper = mount( CdxField, {
					props: { status: 'error' },
					slots: {
						default: h( CdxTextInput, { modelValue: '' } ),
						label: 'Label text'
					}
				} );
				expect( wrapper.findComponent( CdxTextInput ).element.classList ).toContain( 'cdx-text-input--status-error' );
			} );
		} );

		describe( 'and the inputs in a fieldset set no status', () => {
			it( 'sets the error class for those inputs', () => {
				const wrapper = mount( CdxField, {
					props: { isFieldset: true, status: 'error' },
					slots: {
						default: [
							h( CdxTextInput, { modelValue: '' } ),
							h( CdxSelect, { selected: null, menuItems: [ { value: '1' } ] } )
						],
						label: 'Label text'
					}
				} );
				expect( wrapper.findComponent( CdxTextInput ).element.classList ).toContain( 'cdx-text-input--status-error' );
				expect( wrapper.findComponent( CdxSelect ).element.classList ).toContain( 'cdx-select-vue--status-error' );
			} );
		} );
	} );

	describe( 'when the Field provides an input ID', () => {
		describe( 'and the single input also sets an ID', () => {
			it( 'uses the provided ID', () => {
				const wrapper = mount( CdxField, {
					slots: {
						default: h( CdxTextInput, { modelValue: '', disabled: true, id: 'my-id-123' } ),
						label: 'Label text'
					}
				} );
				expect( wrapper.find( 'input' ).element.id ).not.toBe( 'my-id-123' );
				expect( wrapper.find( 'input' ).element.id.startsWith( 'v-' ) ).toBeTruthy();
			} );
		} );
	} );

	describe( 'Field component status messages', () => {
		// Warning status message.
		it( 'renders warning slot content when provided', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'warning' },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					warning: 'Custom warning message from slot - press <kbd>Enter</kbd>'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Custom warning message from slot - press <kbd>Enter</kbd>' );
		} );

		it( 'renders slot content when both slot and message prop are provided for warning', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'warning', messages: { warning: 'Warning from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					warning: 'Warning message from slot'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Warning message from slot' );
		} );

		it( 'renders message prop when slot is not provided for warning', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'warning', messages: { warning: 'Warning from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } )
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Warning from prop' );
		} );

		// Error status message.
		it( 'renders error slot content when provided', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'error' },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					error: 'Custom error message from slot - press <kbd>Enter</kbd>'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Custom error message from slot - press <kbd>Enter</kbd>' );
		} );

		it( 'renders slot content when both slot and message prop are provided for error', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'error', messages: { error: 'Error from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					error: 'Error message from slot'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Error message from slot' );
		} );

		it( 'renders message prop when slot is not provided for error', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'error', messages: { error: 'Error from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } )
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Error from prop' );
		} );

		// Success status message.
		it( 'renders success slot content when provided', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'success' },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					success: 'Custom success message from slot - press <kbd>Enter</kbd>'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Custom success message from slot - press <kbd>Enter</kbd>' );
		} );

		it( 'renders slot content when both slot and message prop are provided for success', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'success', messages: { success: 'Success from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } ),
					success: 'Success message from slot'
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Success message from slot' );
		} );

		it( 'renders message prop when slot is not provided for success', () => {
			const wrapper = mount( CdxField, {
				props: { status: 'success', messages: { success: 'Success from prop' } },
				slots: {
					default: h( CdxTextInput, { modelValue: '' } )
				}
			} );
			const message = wrapper.findComponent( CdxMessage );
			expect( message.exists() ).toBe( true );
			expect( message.html() ).toContain( 'Success from prop' );
		} );
	} );
} );
