import { mount } from '@vue/test-utils';
import CdxTooltip from './Tooltip';
import { Placement } from '@floating-ui/vue';

describe( 'Tooltip', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			textContent: string,
			placement?: Placement
		];

		const cases: Case[] = [
			[ 'Default placement', 'Default tooltip on bottom' ],
			[ 'Top placement', 'Tooltip on top', 'top' ],
			[ 'Left placement', 'Tooltip on left', 'left' ],
			[ 'Right placement', 'Tooltip on right', 'right' ],
			[ 'Top-start placement', 'Tooltip on top-start', 'top-start' ],
			[ 'Top-end placement', 'Tooltip on top-end', 'top-end' ],
			[ 'Right-start placement', 'Tooltip on right-start', 'right-start' ],
			[ 'Right-end placement', 'Tooltip on right-end', 'right-end' ],
			[ 'Bottom-start placement', 'Tooltip on bottom-start', 'bottom-start' ],
			[ 'Bottom-end placement', 'Tooltip on bottom-end', 'bottom-end' ],
			[ 'Left-start placement', 'Tooltip on left-start', 'left-start' ],
			[ 'Left-end placement', 'Tooltip on left-end', 'left-end' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, textContent, placement = 'bottom' ) => {
			const wrapper = mount( {
				template: `<div><button v-tooltip:${ placement }="'${ textContent }'">Button with tooltip</button></div>`,
				directives: { tooltip: CdxTooltip }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when a button element uses a Tooltip', () => {
		const textContent = 'Tooltip text';

		it( 'displays a Tooltip when hovering over an element', async () => {
			const wrapper = mount( {
				template: `<div><button v-tooltip:top="'${ textContent }'">Button with tooltip</button></div>`,
				directives: { tooltip: CdxTooltip },
				attachTo: 'body'
			} );

			// Find the button element and tooltip directive.
			const button = wrapper.find( 'button' );
			const tooltip = wrapper.find( '.cdx-tooltip' );

			// Simulate hovering over a button element.
			await button.trigger( 'mouseenter' );

			// Check if the tooltip is visible.
			expect( tooltip.exists() ).toBe( true );
			expect( tooltip.text() ).toEqual( textContent );
			expect( tooltip.attributes().style ).toContain( 'display: block' );
			expect( tooltip.isVisible() ).toBeTruthy();
		} );
	} );
} );
