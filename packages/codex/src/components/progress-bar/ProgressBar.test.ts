import { shallowMount } from '@vue/test-utils';
import CdxProgressBar from './ProgressBar.vue';

describe( 'ProgressBar', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				inline?: boolean
				disabled?: boolean
				value?: number,
				startLabel?: string,
				endLabel?: string
			},
			attrs?: {
				'aria-hidden'?: 'true',
				'aria-label'?: string
			}
		];

		const cases: Case[] = [
			[ 'Indeterminate', {}, { 'aria-label': 'Progress bar' } ],
			[ 'Indeterminate, inline', { inline: true } ],
			[ 'Indeterminate, disabled', { inline: true, disabled: true } ],
			[ 'Indeterminate, with aria-hidden', { inline: true }, { 'aria-hidden': 'true' } ],
			[ 'Indeterminate, with labels', { startLabel: 'Progress bar', endLabel: 'End' }, { 'aria-label': 'Progress bar' } ],
			[ 'Determinate', { value: 50 }, { 'aria-label': 'Progress bar' } ],
			[ 'Determinate, inline', { value: 50, inline: true } ],
			[ 'Determinate, disabled', { value: 50, inline: true, disabled: true } ],
			[ 'Determinate, with aria-hidden', { value: 50, inline: true }, { 'aria-hidden': 'true' } ],
			[ 'Determinate, with labels', { value: 50, startLabel: 'Progress bar', endLabel: 'End' }, { 'aria-label': 'Progress bar' } ],
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
			const wrapper = shallowMount( CdxProgressBar, { props, attrs } );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );
} );
