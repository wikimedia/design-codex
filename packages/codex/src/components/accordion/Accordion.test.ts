import { DOMWrapper, mount } from '@vue/test-utils';
import { cdxIconEdit, Icon } from '@wikimedia/codex-icons';
import CdxAccordion from './Accordion.vue';

/**
 * Toggle the visibility of a `<details>` element.
 *
 * This works around limitations in @vue/test-utils and jsdom in their handling of `<details>`.
 *
 * @param wrapper DOM wrapper for a `<details>` element (e.g. from `wrapper.find( 'details' )`)
 */
async function toggleDetails( wrapper: DOMWrapper<HTMLDetailsElement> ) {
	const wasOpen = wrapper.element.open;
	// Toggle the value of the `open` attribute. This performs most of the native actions we need:
	// - It toggles the visiblity of the content outside the `<summary>` element
	// - It emits a `toggle` event
	wrapper.element.open = !wasOpen;
	// However, the emitted `toggle` event does not have the `oldState` and `newState` properties
	// set. To address this, emit another artificial `toggle` event that does have these properties
	// set to the correct values.
	await wrapper.trigger( 'toggle', {
		oldState: wasOpen ? 'open' : 'closed',
		newState: wasOpen ? 'closed' : 'open'
	} );
}

describe( 'Accordion', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				actionAlwaysVisible?: boolean
				actionIcon?: Icon,
				actionButtonLabel?: string
			},
			slotTitle: string,
			slotContent: string,
		];

		const cases: Case[] = [
			[ 'Renders with basic basic title and text content', {}, 'Title', 'Content' ],
			[ 'Action button is not visible when collapsed', { actionIcon: cdxIconEdit, actionButtonLabel: 'Edit' }, 'Title', 'Content' ],
			[ 'actionAlwaysVisible makes action button visible even when collapsed', { actionIcon: cdxIconEdit, actionButtonLabel: 'Edit', actionAlwaysVisible: true }, 'Title', 'Content' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slotTitle, slotContent ) => {
			const wrapper = mount( CdxAccordion, {
				props,
				slots: {
					title: slotTitle,
					content: slotContent
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the header is closed and is clicked', () => {
		it( 'should expand the accordion', async () => {
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );
			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( true );
		} );

		it( 'should show the action button', async () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					actionIcon: cdxIconEdit,
					actionButtonLabel: 'Edit'
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBeFalsy();
			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBeTruthy();
		} );
	} );

	describe( 'When the "open" boolean attribute is provided', () => {
		it( 'should render in the expanded state', () => {
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				},
				attrs: {
					open: 'open'
				}
			} );
			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( true );
		} );

		it( 'should show the action button', () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					actionIcon: cdxIconEdit,
					actionButtonLabel: 'Edit'
				},
				slots: {
					title: 'Title',
					default: 'Content'
				},
				attrs: {
					open: 'open'
				}
			} );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBe( true );
		} );

		it( 'should hide the action button after being toggled unless "actionAlwaysVisible" has been set', async () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					actionIcon: cdxIconEdit,
					actionButtonLabel: 'Edit'
				},
				slots: {
					title: 'Title',
					default: 'Content'
				},
				attrs: {
					open: 'open'
				}
			} );

			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBe( true );
			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBe( false );
		} );
	} );

	describe( 'When the "open" boolean attribute is not provided', () => {
		it( 'should render in the collapsed state', () => {
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );
			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'When the optional modelValue prop is provided', () => {
		it( 'should render in the expanded state when this value is true', () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					modelValue: true
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( true );
		} );

		it( 'should render in the collapsed state when this value is false', () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					modelValue: false
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( false );
		} );

		it( 'should update programmatically when v-model changes', async () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					modelValue: false
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			// Initially closed
			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( false );

			// Update modelValue
			await wrapper.setProps( { modelValue: true } );

			// Should now be open
			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( true );
		} );
	} );

	describe( 'Events emitted by the Accordion', () => {
		it( 'should emit toggle event when the accordion is toggled', async () => {
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.emitted( 'toggle' ) ).toBeTruthy();
			expect( wrapper.emitted( 'toggle' )?.[ 0 ] ).toEqual( [ true ] );

			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.emitted( 'toggle' )?.[ 1 ] ).toEqual( [ false ] );
		} );

		it( 'should emit update:modelValue event only when modelValue is provided', async () => {
			// Without modelValue provided
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			await toggleDetails( wrapper.find( 'details' ) );
			expect( wrapper.emitted( 'update:modelValue' ) ).toBeFalsy();

			// With modelValue provided
			const wrapperWithModel = mount( CdxAccordion, {
				props: {
					modelValue: false
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			await toggleDetails( wrapperWithModel.find( 'details' ) );
			expect( wrapperWithModel.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( wrapperWithModel.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
		} );
	} );

	describe( 'v-model and open attribute interaction', () => {
		it( 'should prioritize open attribute for initial state when both are provided', () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					modelValue: false
				},
				attrs: {
					open: 'open'
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );

			expect( wrapper.get( '.cdx-accordion__content' ).isVisible() ).toBe( true );
		} );
	} );
} );
