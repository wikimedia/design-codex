import { shallowMount } from '@vue/test-utils';
import CdxProgressBar from './ProgressBar.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			inline?: boolean
		}
	];

	const cases: Case[] = [
		[ 'Indeterminate', {} ],
		[ 'Indeterminate, inline', { inline: true } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount( CdxProgressBar, { props: props } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
