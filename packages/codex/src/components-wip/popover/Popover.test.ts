import { mount, config } from '@vue/test-utils';
import CdxPopover from './Popover.vue';

describe( 'Popover', () => {
	// Ignore all "teleport" behavior for the purpose of testing Popover.
	// Refer to https://test-utils.vuejs.org/guide/advanced/teleport.html
	config.global.stubs = {
		teleport: true
	};

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				open?: boolean,
				target?: string,
				renderInPlace?: boolean,
				useCloseButton?: boolean
			},
			slots: {
				default: string,
			}
		];
		const cases: Case[] = [
			[ 'Basic usage', { open: true }, { default: 'Popover body content.' } ]
		];

		test.each( cases )( 'Case %# %s', ( _, props, slots ) => {
			const popover = mount( CdxPopover, {
				props: { renderInPlace: true, ...props },
				slots: { default: slots.default }
			} );

			expect( popover.element ).toMatchSnapshot();
		} );
	} );
} );
