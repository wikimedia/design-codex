import { shallowMount } from '@vue/test-utils';
import CdxToggleButton from './ToggleButton.vue';
import CdxIcon from '../icon/Icon.vue';

describe( 'ToggleButton', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				disabled: boolean;
				quiet: boolean;
				modelValue: boolean;
			},
			slot: string,
			attrs?: Record<string, unknown>
		];
		const cases: Case[] = [
			[ 'Default', { disabled: false, quiet: false, modelValue: false }, 'Button text' ],
			[ 'Active', { disabled: false, quiet: false, modelValue: true }, 'Button text' ],
			[ 'Disabled, inactive', { disabled: true, quiet: false, modelValue: false }, 'Button text' ],
			[ 'Disabled, active', { disabled: true, quiet: false, modelValue: true }, 'Button text' ],
			[ 'Quiet', { disabled: false, quiet: true, modelValue: false }, 'Button text' ],
			[ 'Quiet, active', { disabled: false, quiet: true, modelValue: true }, 'Button text' ],
			[ 'Quiet, disabled, inactive', { disabled: true, quiet: true, modelValue: false }, 'Button text' ],
			[ 'Quiet, disabled, active', { disabled: true, quiet: true, modelValue: true }, 'Button text' ],
			[ 'Icon-only (SVG)', { disabled: false, quiet: false, modelValue: false }, '<svg></svg>', { 'aria-label': 'Icon-only example' } ],
			[ 'Icon-only (CdxIcon)', { disabled: false, quiet: false, modelValue: false }, '<cdx-icon icon=\'<path d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z"/>\' />', { 'aria-hidden': true } ]
		];
		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot, attrs = {} ) => {
			const wrapper = shallowMount(
				CdxToggleButton,
				{
					props,
					slots: { default: slot },
					attrs,
					global: {
						components: { CdxIcon }
					}
				}
			);
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when clicked', () => {
		it( 'emits update:modelValue event with value', async () => {
			const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: false } } );

			await wrapper.find( 'button' ).trigger( 'click' );

			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
		} );
	} );

	describe( 'when disabled', () => {
		it( 'cannot be toggled', async () => {
			const wrapper = shallowMount(
				CdxToggleButton,
				{ props: { modelValue: false, disabled: true } }
			);

			await wrapper.find( 'button' ).trigger( 'click' );

			expect( wrapper.emitted( 'update:modelValue' ) ).toBeFalsy();
		} );
	} );

	describe( 'when pressed via keyboard', () => {
		it( 'looks active on space keydown, then not on keyup', async () => {
			const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: true } } );
			await wrapper.get( 'button' ).trigger( 'keydown', { key: ' ' } );
			expect( wrapper.element.classList ).toContain( 'cdx-toggle-button--is-active' );
			await wrapper.get( 'button' ).trigger( 'keyup', { key: ' ' } );
			expect( wrapper.element.classList ).not.toContain( 'cdx-toggle-button--is-active' );
		} );

		it( 'looks active on enter keydown, then not on keyup', async () => {
			const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: true } } );
			await wrapper.get( 'button' ).trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.element.classList ).toContain( 'cdx-toggle-button--is-active' );
			await wrapper.get( 'button' ).trigger( 'keyup', { key: 'Enter' } );
			expect( wrapper.element.classList ).not.toContain( 'cdx-toggle-button--is-active' );
		} );
	} );
} );
