import { mount } from '@vue/test-utils';
import CdxDocsConfigurableGeneric from './ConfigurableGeneric.vue';

// Trying to set this mock within the snapshot tests doesn't work, mock that the generic is being
// used for ToggleButton first, then ToggleSwitch, matching the order of the snapshot cases
jest.mock( 'vitepress', () => {
	const originalVitepress = jest.requireActual( 'vitepress' );
	const mockRoute = jest.fn();
	mockRoute.mockReturnValueOnce(
		{ data: { title: 'ToggleButton' } }
	);
	mockRoute.mockReturnValueOnce(
		{ data: { title: 'ToggleSwitch' } }
	);
	return {
		__esModule: true,
		...originalVitepress,
		useRoute: mockRoute
	};
} );

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: Record<keyof unknown, unknown>,
		slot: string
	];
	const cases: Case[] = [
		[ 'ToggleButton with slot content', { disabled: true }, 'Button text' ],
		[ 'ToggleSwitch without slot', {}, '' ]
	];
	test.each( cases )( 'Case %# %s => HTML', ( _, props, slot ) => {
		const options = { props: props, slots: {} };
		if ( slot.length > 0 ) {
			options.slots = { default: slot };
		}
		const wrapper = mount( CdxDocsConfigurableGeneric, options );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
