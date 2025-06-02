import { mount, shallowMount } from '@vue/test-utils';
import CdxInputChip from './InputChip.vue';
import CdxButton from '../../components/button/Button.vue';
import { Icon, cdxIconArticle } from '@wikimedia/codex-icons';

describe( 'InputChip', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				icon?: Icon,
				disabled?: boolean,
				className?: string
			},
			slot: string
		];

		const cases: Case[] = [
			[ 'Default props', {}, '<p>Chip content</p>' ],
			[ 'Disabled', { disabled: true }, '<p>Chip content</p>' ],
			[ 'Icon', { icon: cdxIconArticle }, '<p>Chip content</p>' ],
			[ 'CSS class', { className: 'my-css-class' }, '<p>Chip content</p>' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
			const wrapper = shallowMount( CdxInputChip,
				{
					props,
					slots: { default: slot }
				} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the button is clicked', () => {
		it( 'emits only the "remove-chip" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.findComponent( CdxButton ).trigger( 'click' );
			expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
			expect( wrapper.emitted()[ 'click-chip' ] ).toBeFalsy();
		} );
	} );

	describe( 'when the chip is clicked', () => {
		it( 'emits the "click-chip" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.trigger( 'click' );
			expect( wrapper.emitted()[ 'click-chip' ] ).toBeTruthy();
		} );
	} );

	describe( 'when backspace is pressed', () => {
		it( 'emits the "remove-chip" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.trigger( 'keydown', { key: 'Backspace' } );
			expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
		} );
	} );

	describe( 'when delete is pressed', () => {
		it( 'emits the "remove-chip" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.trigger( 'keydown', { key: 'Delete' } );
			expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
		} );
	} );

	describe( 'when the left arrow is pressed', () => {
		it( 'emits the "arrow-left" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.trigger( 'keydown', { key: 'ArrowLeft' } );
			expect( wrapper.emitted()[ 'arrow-left' ] ).toBeTruthy();
		} );
	} );

	describe( 'when the right arrow is pressed', () => {
		it( 'emits the "arrow-right" event', async () => {
			const wrapper = shallowMount( CdxInputChip );
			await wrapper.trigger( 'keydown', { key: 'ArrowRight' } );
			expect( wrapper.emitted()[ 'arrow-right' ] ).toBeTruthy();
		} );
	} );

	describe( 'when the focus method is called', () => {
		it( 'focuses the chip', () => {
			const wrapper = mount( CdxInputChip, {
				attachTo: 'body'
			} );
			wrapper.vm.focus();
			expect( document.activeElement ).toBe( wrapper.element );
		} );
	} );

	describe( 'when the escape key is pressed', () => {
		it( 'removes focus from the chip', async () => {
			const wrapper = mount( CdxInputChip, {
				attachTo: 'body'
			} );
			( wrapper.element as HTMLDivElement ).focus();
			expect( document.activeElement ).toBe( wrapper.element );
			await wrapper.trigger( 'keydown', { key: 'Escape' } );
			expect( document.activeElement ).not.toBe( wrapper.element );
		} );
	} );
} );
