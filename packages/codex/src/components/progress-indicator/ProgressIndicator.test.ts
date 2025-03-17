import { shallowMount } from '@vue/test-utils';
import CdxProgressIndicator from './ProgressIndicator.vue';

describe( 'matches the snapshot', () => {
	// No need for fancier logic with cases just yet
	it( 'indeterminate progress indicator => HTML', () => {
		const wrapper = shallowMount( CdxProgressIndicator );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
