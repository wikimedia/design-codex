import { shallowMount } from '@vue/test-utils';
import CdxProgressBar from './ProgressBar.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			inline?: boolean
		},
		attrs?: {
			'aria-hidden'?: 'true',
			'aria-label'?: string
		}
	];

	const cases: Case[] = [
		[ 'Indeterminate', {}, { 'aria-label': 'Progress bar' } ],
		[ 'Indeterminate, inline', { inline: true } ],
		[ 'Indeterminate, with aria-hidden', { inline: true }, { 'aria-hidden': 'true' } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
		const wrapper = shallowMount( CdxProgressBar, { props, attrs } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
