import { mount, config } from '@vue/test-utils';
import { CdxTabs, CdxTab } from '../../lib';

/**
 * Utility function to construct realistic slot markup content
 *
 * @param slotContents Data for slot contents
 * @return string of markup for the slot
 */
function generateSlotMarkup(
	slotContents: Record<string, string | boolean | undefined>[]
) : string {
	return slotContents.reduce( ( markup, current, index ) => {
		markup = markup +
			`<Tab name="${current.name}" label="${current.label || ''}" :disabled="${current.disabled || false}">
				Content for tab ${index}
			</Tab>`;
		return markup;
	}, '' );
}

const tabData = [
	{ name: 'apple', label: 'Apple' },
	{ name: 'banana', label: 'Banana' },
	{ name: 'cantaloupe', label: 'Cantaloupe', disabled: true },
	{ name: 'durian', label: 'Durian' }
];

const slotMarkup = generateSlotMarkup( tabData );

beforeAll( () => {
	config.global.config.warnHandler = () => {
		// silence warnings for this component to avoid test pollution
	};
} );

describe( 'When used along with a child Tabs component', () => {
	it( 'matches the snapshot', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { Tab: CdxTab } },
			slots: { default: slotMarkup }
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'displays the tab with a name matching the "active" prop', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'banana' },
			global: { components: { Tab: CdxTab } },
			slots: { default: slotMarkup }
		} );
		expect( wrapper.findAllComponents( CdxTab )[ 0 ].isVisible() ).toBe( false );
		expect( wrapper.findAllComponents( CdxTab )[ 1 ].isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxTab )[ 2 ].isVisible() ).toBe( false );
	} );

	it( 'generates a header row based on the Label prop of the child Tab components', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { Tab: CdxTab } },
			slots: { default: slotMarkup }
		} );
		tabData.forEach( ( tab, index ) => {
			const label = wrapper.findAll( '.cdx-tabs__list__item' )[ index ];
			expect( label.text() ).toBe( tab.label );
		} );
	} );

	it( 'uses the "name" prop as a fallback if "label" is not provided', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { Tab: CdxTab } },
			slots: { default: '<Tab name="eggplant">Content for tab</Tab>' }
		} );
		const label = wrapper.find( '.cdx-tabs__list__item' );
		expect( label.text() ).toBe( 'eggplant' );
	} );

	it( 'emits an "update:active" event whenever the active tab is changed', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { Tab: CdxTab } },
			slots: { default: slotMarkup }
		} );
		wrapper.vm.select( 'banana' );
		expect( wrapper.emitted()[ 'update:active' ] ).toBeTruthy();
	} );

	describe( 'when the user interacts with the mouse', () => {
		it( 'Clicking the label for a tab emits an "update:active" event with the target tab name as payload', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			const targetIndex = 1;
			const label = wrapper.findAll( '.cdx-tabs__list__item a' )[ targetIndex ];
			await label.trigger( 'click' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ targetIndex ].name ] );
		} );

		it( 'Clicking a disabled tab does not emit an "update:active" event for the target tab', async () => {
			const tabChildrenWithDisabled = [
				{ name: 'apple', label: 'Apple' },
				{ name: 'banana', label: 'Banana' },
				{ name: 'canteloupe', label: 'Canteloupe', disabled: true }
			];
			const slotMarkupWithDisabled = generateSlotMarkup( tabChildrenWithDisabled );
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkupWithDisabled }
			} );
			const targetIndex = 2;
			const label = wrapper.findAll( '.cdx-tabs__list__item a' )[ targetIndex ];
			await label.trigger( 'click' );
			expect( wrapper.emitted()[ 'update:active' ] ).toBeFalsy();
		} );
	} );

	describe( 'when the user navigates with the keyboard', () => {
		it( 'Right arrow keypress calls the "next" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			const spy = jest.spyOn( wrapper.vm, 'next' );
			const header = wrapper.get( '.cdx-tabs__header' );
			await header.trigger( 'keydown.right' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Right arrow keypress emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			const header = wrapper.get( '.cdx-tabs__header' );
			await header.trigger( 'keydown.right' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Left arrow keypress calls the "prev" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			const spy = jest.spyOn( wrapper.vm, 'prev' );
			const header = wrapper.get( '.cdx-tabs__header' );
			await header.trigger( 'keydown.left' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Left arrow keypress emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			const header = wrapper.get( '.cdx-tabs__header' );
			await header.trigger( 'keydown.left' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Calling the "next" method emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Calling "next" method will skip a disabled tab if a non-disabled tab exists after it', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 3 ].name ] );
		} );

		it( 'Calling the "prev" method emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Calling "prev" method will skip a disabled tab if a non-disabled tab exists before it', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'durian' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Attempting to "select" a non-existing tab does nothing', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.select( 'foo' );
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );

		it( 'Calling "prev" does nothing when the first item is selected', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );

		it( 'Calling "next" does nothing when the last item is selected', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'durian' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );
	} );

	describe( 'When component is used inside an element with dir="rtl"', () => {
		// Because of limitations in jsdom, computedStyle(...).direction doesn't
		// work unless we manually add CSS rules saying that dir="rtl" means
		// direction: rtl;
		const styleTag = document.createElement( 'style' );
		const div = document.createElement( 'div' );
		div.id = 'attach';
		div.dir = 'rtl';
		styleTag.innerHTML = '[dir="rtl"] * { direction: rtl; } [dir="ltr"] * { direction: ltr; }';
		document.head.appendChild( styleTag );
		document.body.appendChild( div );
		it( 'Right arrow keypress calls the "prev" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const spy = jest.spyOn( wrapper.vm, 'prev' );
			const header = wrapper.get( '.cdx-tabs__list' );
			await header.trigger( 'keydown.right' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Right arrow keypress emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const header = wrapper.get( '.cdx-tabs__list' );
			await header.trigger( 'keydown.right' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Left arrow keypress calls the "next" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const spy = jest.spyOn( wrapper.vm, 'next' );
			const header = wrapper.get( '.cdx-tabs__list' );
			await header.trigger( 'keydown.left' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Left arrow keypress emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { Tab: CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const header = wrapper.get( '.cdx-tabs__list' );
			await header.trigger( 'keydown.left' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );
	} );

	// @TODO Not sure how to test these yet
	test.todo( 'provides "tabsData" for later injection' );
	test.todo( 'provides "tabsData" that matches the props of the Tab children' );
} );

describe( 'When default slot is empty', () => {
	it( 'throws an error', () => {
		expect( () => {
			mount( CdxTabs, {
				props: { active: 'apple' },
				slots: { default: '' }
			} );
		} ).toThrow();
		expect( () => {
			mount( CdxTabs, {
				props: { active: 'apple' }
			} );
		} ).toThrow();
	} );
} );

describe( 'When multiple tabs have the same "name" property', () => {
	const duplicateTabMarkup = `
		<Tab name="foo">Content for Tab One</Tab>
		<Tab name="foo">Content for Tab Two</Tab>
	`;

	it( 'throws an error', () => {
		expect( () => {
			mount( CdxTabs, {
				props: { active: 'foo' },
				slots: { default: duplicateTabMarkup },
				global: { components: { Tab: CdxTab } }
			} );
		} ).toThrow();
	} );
} );

describe( 'When rendering outside of the browser', () => {
	it( 'the header gradient classes will not be present', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			slots: { default: slotMarkup },
			global: { components: { Tab: CdxTab } }
		} );

		expect( wrapper.find( '.cdx-tabs__header' ).classes() ).not.toContain( 'cdx-tabs__header--has-start-gradient' );
		expect( wrapper.find( '.cdx-tabs__header' ).classes() ).not.toContain( 'cdx-tabs__header--has-end-gradient' );
	} );
} );

describe( 'Tab component inside a Tabs component', () => {
	it( 'Gets its own data from the "tabsData" object provided by the parent', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			slots: { default: slotMarkup },
			global: { components: { Tab: CdxTab } }
		} );

		const firstTab = wrapper.findComponent( CdxTab );
		expect( firstTab.vm.tab ).toMatchObject( tabData[ 0 ] );
	} );
} );
