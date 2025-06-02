import { mount } from '@vue/test-utils';
import CdxDemoSlotIcon from './SlotIcon.vue';

describe( 'SlotIcon', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			iconName: string
		];

		const cases: Case[] = [
			[ 'no icon name', '' ],
			[ 'invalid icon name', 'cdxIconMissing' ],
			[ 'valid icon name (cdxIconAlert)', 'cdxIconAlert' ]
		];
		test.each( cases )( 'Case %# %s => HTML', ( _, iconName ) => {
			const wrapper = mount( CdxDemoSlotIcon, { props: { icon: iconName } } );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );
} );
