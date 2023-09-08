import { mount, shallowMount } from '@vue/test-utils';
import CdxInputChip from './InputChip.vue';
import CdxButton from '../../components/button/Button.vue';
import { Icon, cdxIconArticle } from '@wikimedia/codex-icons';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			icon?: Icon,
			disabled?: boolean
		},
		slot: string
	];

	const cases: Case[] = [
		[ 'Default props', {}, '<p>Chip content</p>' ],
		[ 'Disabled', { disabled: true }, '<p>Chip content</p>' ],
		[ 'Icon', { icon: cdxIconArticle }, '<p>Chip content</p>' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = shallowMount( CdxInputChip,
			{
				props: {
					chipAriaDescription: 'Press Enter to edit or Delete to remove',
					...props
				},
				slots: { default: slot }
			} );
		expect( wrapper.element ).toMatchSnapshot();
	} );

} );

describe( 'Basic usage', () => {
	it( 'emits only the "remove-chip" event when button is clicked', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.findComponent( CdxButton ).trigger( 'click' );
		expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'click-chip' ] ).toBeFalsy();
	} );

	it( 'emits the "click-chip" event when the chip is clicked', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'click' );
		expect( wrapper.emitted()[ 'click-chip' ] ).toBeTruthy();
	} );

	it( 'emits the "remove-chip" event when backspace is pressed', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'keydown', { key: 'Backspace' } );
		expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
	} );

	it( 'emits the "remove-chip" event when delete is pressed', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'keydown', { key: 'Delete' } );
		expect( wrapper.emitted()[ 'remove-chip' ] ).toBeTruthy();
	} );

	it( 'emits the "click-chip" event when enter is pressed', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted()[ 'click-chip' ] ).toBeTruthy();
	} );

	it( 'emits the "arrow-left" event when left arrow is pressed', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'keydown', { key: 'ArrowLeft' } );
		expect( wrapper.emitted()[ 'arrow-left' ] ).toBeTruthy();
	} );

	it( 'emits the "arrow-right" event when left arrow is pressed', async () => {
		const wrapper = shallowMount( CdxInputChip, { props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' } } );
		await wrapper.trigger( 'keydown', { key: 'ArrowRight' } );
		expect( wrapper.emitted()[ 'arrow-right' ] ).toBeTruthy();
	} );

	it( 'focuses when the focus method is called', () => {
		const wrapper = mount( CdxInputChip, {
			props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' },
			attachTo: 'body'
		} );
		wrapper.vm.focus();
		expect( document.activeElement ).toBe( wrapper.element );
	} );

	it( 'blurs when the escape key is pressed', async () => {
		const wrapper = mount( CdxInputChip, {
			props: { chipAriaDescription: 'Press Enter to edit or Delete to remove' },
			attachTo: 'body'
		} );
		( wrapper.element as HTMLDivElement ).focus();
		expect( document.activeElement ).toBe( wrapper.element );
		await wrapper.trigger( 'keydown', { key: 'Escape' } );
		expect( document.activeElement ).not.toBe( wrapper.element );
	} );
} );
