import { mount, shallowMount } from '@vue/test-utils';
import useGeneratedId from './useGeneratedId';

describe( 'When called without an identifier argument', () => {
	describe( 'When parent component has no "id" specified', () => {
		const Component = {
			template: '<div :id="id">Test</div>',
			setup() {
				const id = useGeneratedId();
				return { id };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component );
			expect( typeof wrapper.vm.id ).toBe( 'string' );
		} );
		it( 'prefixes the generated id with "cdx-"', () => {
			const wrapper = shallowMount( Component );
			expect( wrapper.vm.id ).toMatch( /^cdx-/ );
		} );
		it( 'ensures multiple usages do not cause collisions', () => {
			const wrapper1 = shallowMount( Component );
			const wrapper2 = shallowMount( Component );
			expect( wrapper1.vm.id ).not.toEqual( wrapper2.vm.id );
		} );
		it( 'increments the counter each time it is called and appends that value as a suffix', () => {
			const wrapper1 = shallowMount( Component );
			const wrapper2 = shallowMount( Component );
			function getSuffix( id: string ) {
				return Number( id.split( '-' ).slice( -1 ) );
			}
			expect( getSuffix( wrapper2.vm.id ) ).toBeGreaterThan( getSuffix( wrapper1.vm.id ) );
		} );
	} );
	describe( 'When parent component has an ID specified as an attribute', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId();
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, { attrs: { id: 'foo' } } );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'includes the existing ID', () => {
			const wrapper = mount( Component, { attrs: { id: 'foo' } } );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-foo/ );
		} );
	} );
	describe( 'When parent component has an ID specified as a prop', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId();
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, { props: { id: 'bar' } } );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'includes the existing ID', () => {
			const wrapper = mount( Component, { props: { id: 'bar' } } );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-bar/ );
		} );
	} );
	describe( 'When parent component has "id" as both a prop and an attribute', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId();
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, {
				attrs: { id: 'foo' },
				props: { id: 'bar' }
			} );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'prefers the prop over the attribute', () => {
			const wrapper = mount( Component, {
				attrs: { id: 'foo' },
				props: { id: 'bar' }
			} );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-bar/ );
		} );
	} );
} );
describe( 'When called with an identifer argument', () => {
	const identifier = 'baz';
	describe( 'When parent component has no "id" specified', () => {
		const Component = {
			template: '<div :id="id">Test</div>',
			setup() {
				const id = useGeneratedId( identifier );
				return { id };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component );
			expect( typeof wrapper.vm.id ).toBe( 'string' );
		} );
		it( 'returns a string which includes the provided identifier', () => {
			const wrapper = shallowMount( Component );
			expect( wrapper.vm.id ).toMatch( /^cdx-baz/ );
		} );
		it( 'ensures multiple usages do not cause collisions', () => {
			const wrapper1 = shallowMount( Component );
			const wrapper2 = shallowMount( Component );
			expect( wrapper1.vm.id ).not.toEqual( wrapper2.vm.id );
		} );
		it( 'increments the counter each time it is called and appends that value as a suffix', () => {
			const wrapper1 = shallowMount( Component );
			const wrapper2 = shallowMount( Component );
			function getSuffix( id: string ) {
				return Number( id.split( '-' ).slice( -1 ) );
			}
			expect( getSuffix( wrapper2.vm.id ) ).toBeGreaterThan( getSuffix( wrapper1.vm.id ) );
		} );
	} );
	describe( 'When parent component has an ID specified as an attribute', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId( identifier );
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, { attrs: { id: 'foo' } } );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'prefers the identifier argument over the attribute', () => {
			const wrapper = mount( Component, { attrs: { id: 'foo' } } );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-baz/ );
		} );
	} );
	describe( 'When parent component has an ID specified as a prop', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId( identifier );
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, { props: { id: 'bar' } } );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'prefers the identifier argument over the prop', () => {
			const wrapper = mount( Component, { props: { id: 'bar' } } );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-baz/ );
		} );
	} );
	describe( 'When parent component has "id" as both a prop and an attribute', () => {
		const Component = {
			template: '<div :id="generatedId">Test</div>',
			setup() {
				const generatedId = useGeneratedId( identifier );
				return { generatedId };
			}
		};
		it( 'returns a string', () => {
			const wrapper = shallowMount( Component, {
				attrs: { id: 'foo' },
				props: { id: 'bar' }
			} );
			expect( typeof wrapper.vm.generatedId ).toBe( 'string' );
		} );
		it( 'prefers the identifier to both prop and attribute', () => {
			const wrapper = mount( Component, {
				attrs: { id: 'foo' },
				props: { id: 'bar' }
			} );
			expect( wrapper.vm.generatedId ).toMatch( /^cdx-baz/ );
		} );
	} );
} );
