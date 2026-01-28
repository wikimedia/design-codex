import { mount } from '@vue/test-utils';
import CdxTab from './Tab.vue';
import suppressSlotRenderWarning from '../../testutils/suppressSlotRenderWarning';

let restoreWarnHandler: () => void;

beforeAll( () => {
	restoreWarnHandler = suppressSlotRenderWarning();
} );

afterAll( () => {
	restoreWarnHandler();
} );

describe( 'Tab', () => {
	// It's easier to test this component along with its parent;
	// See Tabs.test.ts
	describe( 'When used outside of a parent Tabs component', () => {
		it( 'throws an error during setup', () => {
			expect( () => {
				mount( CdxTab, {
					props: { name: 'foo', label: 'Foo' },
					slots: { default: '' }
				} );
			} ).toThrow();
		} );
	} );
} );
