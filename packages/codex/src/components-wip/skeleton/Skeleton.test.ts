import { mount } from '@vue/test-utils';
import CdxSkeleton from './Skeleton.vue';

describe( 'Skeleton', () => {
	describe( 'announce prop', () => {
		it( 'renders a status announcement when announce is true', () => {
			const wrapper = mount( CdxSkeleton, { props: { announce: true } } );
			const status = wrapper.find( '[role="status"]' );
			expect( status.exists() ).toBe( true );
			expect( status.text() ).toBe( 'Loading' );
		} );

		it( 'does not render a status announcement when announce is false', () => {
			const wrapper = mount( CdxSkeleton, { props: { announce: false } } );
			expect( wrapper.find( '[role="status"]' ).exists() ).toBe( false );
		} );
	} );

	describe( 'shape prop', () => {
		it( 'applies the line class by default', () => {
			const wrapper = mount( CdxSkeleton );
			expect( wrapper.classes() ).toContain( 'cdx-skeleton--line' );
		} );

		it( 'applies the rectangle class when shape is rectangle', () => {
			const wrapper = mount( CdxSkeleton, { props: { shape: 'rectangle' } } );
			expect( wrapper.classes() ).toContain( 'cdx-skeleton--rectangle' );
		} );

		it( 'warns when shape is not a valid value', () => {
			const warnSpy = vi.spyOn( console, 'warn' ).mockImplementation( () => undefined );
			// @ts-expect-error Test an invalid value on purpose.
			mount( CdxSkeleton, { props: { shape: 'invalid' } } );
			expect( warnSpy.mock.calls[ 0 ][ 0 ] ).toContain(
				'Invalid prop: custom validator check failed for prop "shape"'
			);
			warnSpy.mockRestore();
		} );
	} );
} );
