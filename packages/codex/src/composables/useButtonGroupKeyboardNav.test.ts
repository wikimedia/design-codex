import { mount } from '@vue/test-utils';
import CdxButtonGroup from '../components/button-group/ButtonGroup.vue';
import CdxButton from '../components/button/Button.vue';
import { ButtonGroupItem } from '../types';

const buttons: ButtonGroupItem[] = [
	{ value: 1, label: 'One' },
	{ value: 2, label: 'Two' },
	{ value: 3, label: 'Three' },
	{ value: 4, label: 'Four', disabled: true },
	{ value: 5, label: 'Five' }
];

describe( 'useButtonGroupKeyboardNav', () => {
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

	it( 'skips a disabled button', async () => {
		const wrapper = mount( CdxButtonGroup, {
			props: { buttons },
			attachTo: '#attach-ltr'
		} );
		const buttonComponents = wrapper.findAllComponents( CdxButton );
		await buttonComponents[ 2 ].element.focus();
		await buttonComponents[ 2 ].trigger( 'keydown', { key: 'ArrowRight' } );
		expect( document.activeElement ).toBe( buttonComponents[ 4 ].element );
	} );

	describe( 'when the right arrow is pressed', () => {
		describe( 'in an LTR context', () => {
			it( 'focuses the next button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-ltr'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowRight' } );
				expect( document.activeElement ).toBe( buttonComponents[ 2 ].element );
			} );
		} );

		describe( 'in an RTL context', () => {
			it( 'focuses the previous button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-rtl'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowRight' } );
				expect( document.activeElement ).toBe( buttonComponents[ 0 ].element );
			} );
		} );
	} );

	describe( 'when the left arrow is pressed', () => {
		describe( 'in an LTR context', () => {
			it( 'focuses the previous button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-ltr'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowLeft' } );
				expect( document.activeElement ).toBe( buttonComponents[ 0 ].element );
			} );
		} );

		describe( 'in an RTL context', () => {
			it( 'focuses the next button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-rtl'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowLeft' } );
				expect( document.activeElement ).toBe( buttonComponents[ 2 ].element );
			} );
		} );
	} );

	describe( 'when the down arrow is pressed', () => {
		describe( 'in an LTR context', () => {
			it( 'focuses the next button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-ltr'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowDown' } );
				expect( document.activeElement ).toBe( buttonComponents[ 2 ].element );
			} );
		} );

		describe( 'in an RTL context', () => {
			it( 'focuses the next button', async () => {
				const wrapper = mount( CdxButtonGroup, {
					props: { buttons },
					attachTo: '#attach-rtl'
				} );
				const buttonComponents = wrapper.findAllComponents( CdxButton );
				await buttonComponents[ 1 ].element.focus();
				await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowDown' } );
				expect( document.activeElement ).toBe( buttonComponents[ 2 ].element );
			} );
		} );

		describe( 'when the up arrow is pressed', () => {
			describe( 'in an LTR context', () => {
				it( 'focuses the previous button', async () => {
					const wrapper = mount( CdxButtonGroup, {
						props: { buttons },
						attachTo: '#attach-ltr'
					} );
					const buttonComponents = wrapper.findAllComponents( CdxButton );
					await buttonComponents[ 1 ].element.focus();
					await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowUp' } );
					expect( document.activeElement ).toBe( buttonComponents[ 0 ].element );
				} );
			} );

			describe( 'in an RTL context', () => {
				it( 'focuses the previous button', async () => {
					const wrapper = mount( CdxButtonGroup, {
						props: { buttons },
						attachTo: '#attach-rtl'
					} );
					const buttonComponents = wrapper.findAllComponents( CdxButton );
					await buttonComponents[ 1 ].element.focus();
					await buttonComponents[ 1 ].trigger( 'keydown', { key: 'ArrowUp' } );
					expect( document.activeElement ).toBe( buttonComponents[ 0 ].element );
				} );
			} );
		} );
	} );
} );
