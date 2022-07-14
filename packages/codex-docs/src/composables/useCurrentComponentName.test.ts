import { shallowMount } from '@vue/test-utils';
import useCurrentComponentName from './useCurrentComponentName';

// Mock as if we are on the ToggleButton component page
jest.mock( 'vitepress', () => {
	const originalModule = jest.requireActual( 'vitepress' );
	return {
		__esModule: true,
		...originalModule,
		useRoute: jest.fn( () => {
			return {
				data: {
					title: 'ToggleButton'
				}
			};
		} )
	};
} );

describe( 'useCurrentComponentName', () => {
	const Component = {
		template: '<p>{{ name }}</p>',
		setup() {
			const name = useCurrentComponentName();
			return { name };
		}
	};
	it( 'determines component name', () => {
		const wrapper = shallowMount( Component );
		expect( wrapper.find( 'p' ).text() ).toBe( 'cdx-toggle-button' );
	} );
} );
