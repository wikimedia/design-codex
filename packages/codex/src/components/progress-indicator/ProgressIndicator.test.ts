import { shallowMount } from '@vue/test-utils';
import CdxProgressIndicator from './ProgressIndicator.vue';

describe( 'ProgressIndicator', () => {
	describe( 'matches the snapshot', () => {
		// No need for fancier logic with cases just yet
		it( 'indeterminate progress indicator => HTML', () => {
			const wrapper = shallowMount( CdxProgressIndicator, {
				slots: {
					// The component expects label text so let's provide some
					default: 'Label text'
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );
} );
