import { mount, config } from '@vue/test-utils';
import CdxTab from './Tab.vue';

beforeAll( () => {
	config.global.config.warnHandler = () => {
		// silence warnings for this component to avoid test pollution
	};
} );

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
