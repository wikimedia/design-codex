import { shallowMount } from '@vue/test-utils';
import CdxProgressBar from './ProgressBar.vue';

describe( 'matches the snapshot', () => {
	// No need for fancier logic with cases just yet
	it( 'indeterminate progress bar => HTML', () => {
		const wrapper = shallowMount( CdxProgressBar );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
