import { mount } from '@vue/test-utils';
import CdxTextArea from './TextArea.vue';
import { Icon, cdxIconNotBright, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import { ValidationStatusType } from '../../types';

describe( 'TextArea', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue?: string,
				status?: ValidationStatusType,
				autosize?: boolean,
				startIcon?: Icon,
				endIcon?: Icon
			},
			attrs?: Record<string, string|number|boolean>
		];

		const cases: Case[] = [
			[ 'with a truthy modelValue prop which dynamically adds a class to <textarea>', { modelValue: 'Earth Day' } ],
			[ 'with attributes', { }, { placeholder: 'Start typing...' } ],
			[ 'with disabled as true', { modelValue: 'Earth Day' }, { placeholder: 'Start typing...', disabled: true } ],
			[ 'with readonly as true', { modelValue: 'Earth Day' }, { placeholder: 'Start typing...', readonly: true } ],
			[ 'with error status', { status: 'error' }, { placeholder: 'Start typing...' } ],
			[ 'with autosize as true', { autosize: true }, { placeholder: 'Start typing...' } ],
			[ 'with start icon', { startIcon: cdxIconNotBright }, { placeholder: 'Start typing...' } ],
			[ 'with end icon', { endIcon: cdxIconInfoFilled }, { placeholder: 'Start typing...' } ],
			[ 'with start and end icons', { startIcon: cdxIconNotBright, endIcon: cdxIconInfoFilled }, { placeholder: 'Start typing...' } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
			const wrapper = mount( CdxTextArea, { props, attrs } );

			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when user types in the textarea field', () => {
		it( 'should emit an event that updates the value of modelValue', async () => {
			const wrapper = mount( CdxTextArea );
			const textarea = wrapper.find( 'textarea' ).element as HTMLTextAreaElement;
			expect( textarea.value ).toEqual( '' );

			await wrapper.get( 'textarea' ).setValue( 'New value' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( textarea.value ).toEqual( 'New value' );
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'New value' ] );
		} );
	} );

	describe( 'when rendered to the UI', () => {
		it( 'should have an empty string value inside the textarea element', () => {
			const wrapper = mount( CdxTextArea );

			expect( wrapper.get( 'textarea' ).text() ).toBe( '' );
		} );

		it( 'should split the attributes between top-level elements and inner elements', () => {
			const wrapper = mount( CdxTextArea, {
				attrs: {
					placeholder: 'Start typing...',
					class: 'awesome-textarea'
				}
			} );

			expect( wrapper.attributes() ).toEqual( {
				class: 'cdx-text-area cdx-text-area--status-default awesome-textarea'
			} );
			expect( wrapper.get( 'textarea' ).attributes() ).toEqual( {
				placeholder: 'Start typing...',
				class: 'cdx-text-area__textarea'
			} );
		} );
	} );

	describe( 'with native validation', () => {
		describe( 'when the checkValidity method is used', () => {
			it( 'keeps shouldPreventDefault false', () => {
				const wrapper = mount( CdxTextArea, {
					props: { modelValue: '' }, // invalid input
					attrs: { required: true }
				} );
				const onInvalid = jest.spyOn( wrapper.vm, 'onInvalid' );
				wrapper.vm.checkValidity();
				expect( onInvalid ).toHaveBeenCalledWith( expect.objectContaining( {} ), true );
			} );
		} );

		describe( 'when the reportValidity method is used', () => {
			it( 'sets shouldPreventDefault to true', () => {
				const wrapper = mount( CdxTextArea, {
					props: { modelValue: '' },
					attrs: { required: true }
				} );
				const onInvalid = jest.spyOn( wrapper.vm, 'onInvalid' );
				wrapper.vm.reportValidity();
				// Mocked `onInvalid` method runs...
				expect( onInvalid ).toHaveBeenCalledWith( expect.objectContaining( {} ), false );
			} );

			it( 'sets shouldPreventDefault to back to true in the invalid handler', () => {
				const wrapper = mount( CdxTextArea, {
					props: { modelValue: '' },
					attrs: { required: true }
				} );
				wrapper.vm.reportValidity();
				// Actual `onInvalid` method runs...
				expect( wrapper.vm.shouldPreventDefault ).toBeTruthy();
			} );
		} );
	} );

	describe( 'Public methods', () => {
		// Testing DOM element behavior is not really appropriate here
		// so these tests just serve as a reminder to not break the public
		// interface that this component exposes
		it( 'exposes a public focus() method', () => {
			const wrapper = mount( CdxTextArea, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.focus ).toBe( 'function' );
		} );

		it( 'exposes a public blur() method', () => {
			const wrapper = mount( CdxTextArea, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.blur ).toBe( 'function' );
		} );

		it( 'exposes a public checkValidity() method', () => {
			const wrapper = mount( CdxTextArea, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.checkValidity ).toBe( 'function' );
		} );

		it( 'exposes a public reportValidity() method', () => {
			const wrapper = mount( CdxTextArea, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.reportValidity ).toBe( 'function' );
		} );

		it( 'exposes a public setCustomValidity() method', () => {
			const wrapper = mount( CdxTextArea, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.setCustomValidity ).toBe( 'function' );
		} );
	} );
} );
