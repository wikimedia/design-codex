import { mount } from '@vue/test-utils';
import Wrapper from './Wrapper.vue';

it( 'includes code sample when code is provided', () => {
	const wrapper = mount( Wrapper, {
		slots: {
			code: '<p>Hello world</p>'
		}
	} );
	expect( wrapper.vm.hasCodeSample ).toBeTruthy();
} );

it( 'omits code sample when code is not provided', () => {
	const wrapper = mount( Wrapper );
	expect( wrapper.vm.hasCodeSample ).toBeFalsy();
} );

it( 'shows and hides code on button click', () => {
	const wrapper = mount( Wrapper, {
		slots: {
			code: '<p>Hello world</p>'
		}
	} );

	wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.vm.showCode ).toBeTruthy();
	expect( wrapper.vm.buttonLabel ).toBe( 'Hide code' );

	wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.vm.showCode ).toBeFalsy();
	expect( wrapper.vm.buttonLabel ).toBe( 'Show code' );
} );
