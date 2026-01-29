import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import useBreakpoint from './useBreakpoint';

function setWindowWidth( width: number ): void {
	Object.defineProperty( window, 'innerWidth', {
		value: width,
		configurable: true,
		writable: true
	} );
}

const TestComponent = defineComponent( {
	template: '<div></div>',
	setup() {
		const breakpoint = useBreakpoint();
		return { breakpoint };
	}
} );

describe( 'useBreakpoint', () => {
	const originalInnerWidth = window.innerWidth;

	afterEach( () => {
		setWindowWidth( originalInnerWidth );
	} );

	it( 'returns an object with mobile, tablet, desktop, and desktop-wide booleans', () => {
		setWindowWidth( 800 );
		const wrapper = mount( TestComponent );
		const bp = wrapper.vm.breakpoint;
		expect( bp ).toHaveProperty( 'mobile' );
		expect( bp ).toHaveProperty( 'tablet' );
		expect( bp ).toHaveProperty( 'desktop' );
		expect( bp ).toHaveProperty( 'desktop-wide' );
		expect( typeof bp.mobile ).toBe( 'boolean' );
		expect( typeof bp.tablet ).toBe( 'boolean' );
		expect( typeof bp.desktop ).toBe( 'boolean' );
		expect( typeof bp[ 'desktop-wide' ] ).toBe( 'boolean' );
		wrapper.unmount();
	} );

	describe( 'when viewport is at or below mobile max (639px)', () => {
		it( 'sets mobile to true and others to false', () => {
			setWindowWidth( 500 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( true );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );
			expect( wrapper.vm.breakpoint.desktop ).toBe( false );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( false );
			wrapper.unmount();
		} );

		it( 'sets mobile to true at exactly 639px', () => {
			setWindowWidth( 639 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( true );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );
			wrapper.unmount();
		} );
	} );

	describe( 'when viewport is in tablet range (640px–1119px)', () => {
		it( 'sets tablet to true and others to false', () => {
			setWindowWidth( 800 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( false );
			expect( wrapper.vm.breakpoint.tablet ).toBe( true );
			expect( wrapper.vm.breakpoint.desktop ).toBe( false );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( false );
			wrapper.unmount();
		} );

		it( 'sets tablet to true at 640px', () => {
			setWindowWidth( 640 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( false );
			expect( wrapper.vm.breakpoint.tablet ).toBe( true );
			wrapper.unmount();
		} );

		it( 'sets tablet to true at 1119px', () => {
			setWindowWidth( 1119 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.tablet ).toBe( true );
			expect( wrapper.vm.breakpoint.desktop ).toBe( false );
			wrapper.unmount();
		} );
	} );

	describe( 'when viewport is in desktop range (1120px–1679px)', () => {
		it( 'sets desktop to true and others to false', () => {
			setWindowWidth( 1400 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( false );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );
			expect( wrapper.vm.breakpoint.desktop ).toBe( true );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( false );
			wrapper.unmount();
		} );

		it( 'sets desktop to true at 1120px', () => {
			setWindowWidth( 1120 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );
			expect( wrapper.vm.breakpoint.desktop ).toBe( true );
			wrapper.unmount();
		} );

		it( 'sets desktop to true at 1679px', () => {
			setWindowWidth( 1679 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.desktop ).toBe( true );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( false );
			wrapper.unmount();
		} );
	} );

	describe( 'when viewport is at or above desktop-wide min (1680px)', () => {
		it( 'sets desktop-wide to true and others to false', () => {
			setWindowWidth( 2000 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( false );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );
			expect( wrapper.vm.breakpoint.desktop ).toBe( false );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( true );
			wrapper.unmount();
		} );

		it( 'sets desktop-wide to true at exactly 1680px', () => {
			setWindowWidth( 1680 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.desktop ).toBe( false );
			expect( wrapper.vm.breakpoint[ 'desktop-wide' ] ).toBe( true );
			wrapper.unmount();
		} );
	} );

	describe( 'on resize', () => {
		it( 'updates breakpoint flags when window is resized', async () => {
			setWindowWidth( 500 );
			const wrapper = mount( TestComponent );
			expect( wrapper.vm.breakpoint.mobile ).toBe( true );
			expect( wrapper.vm.breakpoint.tablet ).toBe( false );

			setWindowWidth( 800 );
			window.dispatchEvent( new Event( 'resize' ) );
			await wrapper.vm.$nextTick();

			expect( wrapper.vm.breakpoint.mobile ).toBe( false );
			expect( wrapper.vm.breakpoint.tablet ).toBe( true );
			wrapper.unmount();
		} );
	} );
} );
