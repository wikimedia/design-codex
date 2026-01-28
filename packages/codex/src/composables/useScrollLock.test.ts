import { defineComponent, ref } from 'vue';

import { mount } from '@vue/test-utils';
import useScrollLock from './useScrollLock';

describe( 'useScrollLock', () => {
	function createTestComponent( initialActive = false ) {
		return defineComponent( {
			template: '<div></div>',
			setup() {
				const isActive = ref( initialActive );
				useScrollLock( isActive );
				return { isActive };
			}
		} );
	}

	function setDocumentDimensions( scrollHeight: number, clientHeight: number ) {
		Object.defineProperty( document.documentElement, 'scrollHeight', {
			writable: true,
			configurable: true,
			value: scrollHeight
		} );
		Object.defineProperty( document.documentElement, 'clientHeight', {
			writable: true,
			configurable: true,
			value: clientHeight
		} );
	}

	function mockScrollbarWidth( width: number ) {
		const originalCreateElement = document.createElement.bind( document );
		return jest.spyOn( document, 'createElement' ).mockImplementation( ( tagName: string ) => {
			const element = originalCreateElement( tagName );
			if ( tagName === 'div' ) {
				Object.defineProperty( element, 'offsetWidth', {
					writable: true,
					configurable: true,
					value: 100 + width
				} );
				Object.defineProperty( element, 'clientWidth', {
					writable: true,
					configurable: true,
					value: 100
				} );
			}
			return element;
		} );
	}

	let originalBodyStyle: {
		overflow: string;
		paddingRight: string;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let createElementSpy: jest.SpyInstance<any, any> | null = null;

	beforeEach( () => {
		originalBodyStyle = {
			overflow: document.body.style.overflow,
			paddingRight: document.body.style.paddingRight
		};

		document.body.style.overflow = '';
		document.body.style.paddingRight = '';

		if ( createElementSpy ) {
			createElementSpy.mockRestore();
			createElementSpy = null;
		}
	} );

	afterEach( () => {
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';

		if ( createElementSpy ) {
			createElementSpy.mockRestore();
			createElementSpy = null;
		}

		Object.defineProperty( document.documentElement, 'scrollHeight', {
			writable: true,
			configurable: true,
			value: document.documentElement.scrollHeight
		} );
		Object.defineProperty( document.documentElement, 'clientHeight', {
			writable: true,
			configurable: true,
			value: document.documentElement.clientHeight
		} );

		document.body.style.overflow = originalBodyStyle.overflow;
		document.body.style.paddingRight = originalBodyStyle.paddingRight;
	} );

	describe( 'iOS scroll restoration', () => {
		const nonIosUa = navigator.userAgent;

		afterEach( () => {
			Object.defineProperty( navigator, 'userAgent', {
				configurable: true,
				value: nonIosUa
			} );
		} );

		it( 'uses position fixed on body and restores scrollTop on unlock', async () => {
			Object.defineProperty( navigator, 'userAgent', {
				configurable: true,
				value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
			} );

			let scrollTopValue = 240;
			Object.defineProperty( document.documentElement, 'scrollTop', {
				configurable: true,
				get: () => scrollTopValue,
				set: ( v: number ) => {
					scrollTopValue = v;
				}
			} );

			const rafSpy = jest.spyOn( window, 'requestAnimationFrame' ).mockImplementation(
				( fn: FrameRequestCallback ) => {
					fn( 0 );
					return 0;
				}
			);

			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();

			expect( document.body.style.position ).toBe( 'fixed' );
			expect( document.body.style.top ).toBe( '-240px' );

			wrapper.vm.isActive = false;
			await wrapper.vm.$nextTick();

			expect( document.body.style.position ).toBe( '' );
			expect( scrollTopValue ).toBe( 240 );

			rafSpy.mockRestore();
		} );
	} );

	describe( 'locking scroll', () => {
		it( 'locks scroll when isActive becomes true', async () => {
			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();

			expect( document.body.style.overflow ).toBe( 'hidden' );
		} );

		it( 'adds padding-right for scrollbar compensation', async () => {
			setDocumentDimensions( 2000, 1000 );
			createElementSpy = mockScrollbarWidth( 20 );

			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();

			expect( document.body.style.paddingRight ).toBe( '20px' );

			if ( createElementSpy ) {
				createElementSpy.mockRestore();
				createElementSpy = null;
			}
		} );

		it( 'does not add padding-right when no scrollbar', () => {
			if ( createElementSpy ) {
				createElementSpy.mockRestore();
				createElementSpy = null;
			}
			setDocumentDimensions( 1000, 1000 );
			document.body.style.paddingRight = '';

			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;

			expect( document.body.style.paddingRight ).toBe( '' );
		} );
	} );

	describe( 'unlocking scroll', () => {
		it( 'unlocks scroll when isActive becomes false', async () => {
			const wrapper = mount( createTestComponent( true ) );

			expect( document.body.style.overflow ).toBe( 'hidden' );

			wrapper.vm.isActive = false;
			await wrapper.vm.$nextTick();

			expect( document.body.style.overflow ).toBe( '' );
			expect( document.body.style.paddingRight ).toBe( '' );
		} );

		it( 'removes padding-right when unlocking', async () => {
			setDocumentDimensions( 2000, 1000 );
			createElementSpy = mockScrollbarWidth( 20 );

			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();

			expect( document.body.style.paddingRight ).toBe( '20px' );

			wrapper.vm.isActive = false;
			await wrapper.vm.$nextTick();

			expect( document.body.style.paddingRight ).toBe( '' );
		} );
	} );

	describe( 'cleanup on unmount', () => {
		it( 'unlocks scroll on unmount if still active', () => {
			const wrapper = mount( createTestComponent( true ) );

			expect( document.body.style.overflow ).toBe( 'hidden' );

			wrapper.unmount();

			expect( document.body.style.overflow ).toBe( '' );
			expect( document.body.style.paddingRight ).toBe( '' );
		} );

		it( 'removes padding-right on unmount if still active', async () => {
			setDocumentDimensions( 2000, 1000 );
			createElementSpy = mockScrollbarWidth( 20 );

			const wrapper = mount( createTestComponent( false ) );
			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();

			expect( document.body.style.paddingRight ).toBe( '20px' );

			wrapper.unmount();

			expect( document.body.style.paddingRight ).toBe( '' );
		} );

		it( 'does not unlock on unmount if already inactive', () => {
			const wrapper = mount( createTestComponent( false ) );
			wrapper.unmount();

			expect( document.body.style.overflow ).toBe( originalBodyStyle.overflow );
		} );
	} );

	describe( 'multiple lock/unlock cycles', () => {
		it( 'handles multiple lock/unlock cycles correctly', async () => {
			const wrapper = mount( createTestComponent( false ) );

			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();
			expect( document.body.style.overflow ).toBe( 'hidden' );

			wrapper.vm.isActive = false;
			await wrapper.vm.$nextTick();
			expect( document.body.style.overflow ).toBe( '' );
			expect( document.body.style.paddingRight ).toBe( '' );

			wrapper.vm.isActive = true;
			await wrapper.vm.$nextTick();
			expect( document.body.style.overflow ).toBe( 'hidden' );

			wrapper.vm.isActive = false;
			await wrapper.vm.$nextTick();
			expect( document.body.style.overflow ).toBe( '' );
			expect( document.body.style.paddingRight ).toBe( '' );
		} );
	} );
} );
