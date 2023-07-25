import { mount, config } from '@vue/test-utils';
import CdxTabs from './Tabs.vue';
import CdxTab from '../tab/Tab.vue';

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
			`<cdx-tab name="${current.name}" label="${current.label || ''}" :disabled="${current.disabled || false}">
				Content for tab ${index}
			</cdx-tab>`;
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

describe( 'When used along with child Tab components', () => {
	it( 'matches the snapshot', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { CdxTab } },
			slots: { default: slotMarkup }
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'displays the tab with a name matching the "active" prop', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'banana' },
			global: { components: { CdxTab } },
			slots: { default: slotMarkup }
		} );
		expect( wrapper.findAllComponents( CdxTab )[ 0 ].isVisible() ).toBe( false );
		expect( wrapper.findAllComponents( CdxTab )[ 1 ].isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxTab )[ 2 ].isVisible() ).toBe( false );
	} );

	it( 'generates a header row based on the Label prop of the child Tab components', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { CdxTab } },
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
			global: { components: { CdxTab } },
			slots: { default: '<cdx-tab name="eggplant">Content for tab</cdx-tab>' }
		} );
		const label = wrapper.find( '.cdx-tabs__list__item' );
		expect( label.text() ).toBe( 'eggplant' );
	} );

	it( 'emits an "update:active" event whenever the active tab is changed', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { CdxTab } },
			slots: { default: slotMarkup }
		} );
		wrapper.vm.select( 'banana' );
		expect( wrapper.emitted()[ 'update:active' ] ).toBeTruthy();
	} );

	it( 'updates the visible tab when the active prop is changed', async () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { CdxTab } },
			slots: { default: slotMarkup }
		} );
		await wrapper.setProps( { active: 'banana' } );
		expect( wrapper.findAllComponents( CdxTab )[ 0 ].isVisible() ).toBe( false );
		expect( wrapper.findAllComponents( CdxTab )[ 1 ].isVisible() ).toBe( true );
	} );

	it( 'scrolls when the active prop is changed', async () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			global: { components: { CdxTab } },
			slots: { default: slotMarkup },
			attachTo: 'body'
		} );
		const listElement = wrapper.find( '.cdx-tabs__list' );
		// Note: jsdom does not provide scrollBy, so jest.spyOn() doesn't work
		const spy = jest.fn();
		listElement.element.scrollBy = spy;
		await wrapper.setProps( { active: 'banana' } );
		// TODO this doesn't work for some reason, maybe because document.getElementById is used
		expect( spy ).toHaveBeenCalled();
	} );

	describe( 'when the user interacts with the mouse', () => {
		it( 'Clicking the label for a tab emits an "update:active" event with the target tab name as payload', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			const targetIndex = 1;
			const label = wrapper.findAll( '.cdx-tabs__list__item' )[ targetIndex ];
			await label.trigger( 'click' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ targetIndex ].name ] );
		} );

		it( 'Clicking a disabled tab does not emit an "update:active" event for the target tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			// The tab at index 2 ("cantaloupe") is disabled
			const targetIndex = 2;
			const label = wrapper.findAll( '.cdx-tabs__list__item' )[ targetIndex ];
			await label.trigger( 'click' );
			expect( wrapper.emitted()[ 'update:active' ] ).toBeFalsy();
		} );
	} );

	describe( 'when the user navigates with the keyboard', () => {
		it( 'Right arrow keypress calls the "next" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			const spy = jest.spyOn( wrapper.vm, 'next' );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.right' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Right arrow keypress emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.right' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Left arrow keypress calls the "prev" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			const spy = jest.spyOn( wrapper.vm, 'prev' );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.left' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Left arrow keypress emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.left' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Calling the "next" method emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Calling "next" method will skip a disabled tab if a non-disabled tab exists after it', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 3 ].name ] );
		} );

		it( 'Calling the "prev" method emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Calling "prev" method will skip a disabled tab if a non-disabled tab exists before it', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'durian' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );

		it( 'Attempting to "select" a non-existing tab does nothing', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.select( 'foo' );
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );

		it( 'Calling "prev" does nothing when the first item is selected', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.prev();
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );

		it( 'Calling "next" does nothing when the last item is selected', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'durian' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup }
			} );
			await wrapper.vm.next();
			const emitted = wrapper.emitted()[ 'update:active' ];
			expect( emitted ).toBeUndefined();
		} );

		it( 'Down arrow keypress focuses the contents of the current tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup },
				attachTo: 'body'
			} );
			const appleTab = wrapper.findAll( '.cdx-tab' )[ 0 ];
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( document.activeElement ).toBe( appleTab.element );
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
				global: { components: { CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const spy = jest.spyOn( wrapper.vm, 'prev' );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.right' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Right arrow keypress emits an "update:active" event with the name of the previous tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.right' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 0 ].name ] );
		} );

		it( 'Left arrow keypress calls the "next" method', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'banana' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const spy = jest.spyOn( wrapper.vm, 'next' );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.left' );
			expect( spy ).toHaveBeenCalled();
		} );

		it( 'Left arrow keypress emits an "update:active" event with the name of the next tab', async () => {
			const wrapper = mount( CdxTabs, {
				props: { active: 'apple' },
				global: { components: { CdxTab } },
				slots: { default: slotMarkup },
				attachTo: '#attach'
			} );
			const tab = wrapper.get( '.cdx-tabs__list__item' );
			await tab.trigger( 'keydown.left' );
			const emitted = wrapper.emitted()[ 'update:active' ][ 0 ];
			expect( emitted ).toEqual( [ tabData[ 1 ].name ] );
		} );
	} );

	// @TODO Not sure how to test these yet
	test.todo( 'provides "tabsData" for later injection' );
	test.todo( 'provides "tabsData" that matches the props of the Tab children' );
} );

describe( 'When Tab children have comments in between', () => {
	it( 'matches the snapshot', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'a' },
			global: { components: { CdxTab } },
			slots: { default: `
				<!-- Comment 1 -->
				<cdx-tab name="a">Content for tab A</cdx-tab>
				<!-- Comment 2 -->
				<cdx-tab name="b">Content for tab B</cdx-tab>
				<!-- Comment 3 -->
				<cdx-tab name="c">Content for tab C</cdx-tab>
				<!-- Comment 4 -->
				<cdx-tab name="d">Content for tab D</cdx-tab>
				<!-- Comment 5 -->
				`
			}
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'When Tab children are provided using v-for', () => {
	it( 'matches the snapshot', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'a' },
			global: { components: { CdxTab } },
			slots: { default: `
				<cdx-tab
					v-for="name in ['a', 'b', 'c', 'd']"
					:key="name"
					:name="name"
				>
					Content for tab {{ name }}
				</cdx-tab>
				`
			}
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'When default slot is empty', () => {
	it( 'throws an error', () => {
		expect( () => {
			mount( CdxTabs, {
				props: { active: 'apple' },
				slots: { default: '' }
			} );
		} ).toThrow( 'Slot content cannot be empty' );

		expect( () => {
			mount( CdxTabs, {
				props: { active: 'apple' }
			} );
		} ).toThrow( 'Slot content cannot be empty' );
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
				global: { components: { CdxTab } }
			} );
		} ).toThrow();
	} );
} );

describe( 'When rendering outside of the browser', () => {
	it( 'the scroll buttons will be present', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			slots: { default: slotMarkup },
			global: { components: { CdxTab } }
		} );

		expect( wrapper.find( '.cdx-tabs__prev-scroller' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.cdx-tabs__next-scroller' ).exists() ).toBeTruthy();
	} );

	it( 'clicking the scroll buttons', async () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			slots: { default: slotMarkup },
			global: { components: { CdxTab } }
		} );

		const listElement = wrapper.find( '.cdx-tabs__list' );
		// Note: jsdom does not provide scrollBy, so jest.spyOn() doesn't work
		const spy = jest.fn();
		listElement.element.scrollBy = spy;

		const nextScroller = wrapper.find( '.cdx-tabs__next-scroller .cdx-tabs__scroll-button' );
		await nextScroller.trigger( 'click' );
		expect( spy ).toHaveBeenCalled();
	} );
} );

describe( 'Tab component inside a Tabs component', () => {
	it( 'Gets its own data from the "tabsData" object provided by the parent', () => {
		const wrapper = mount( CdxTabs, {
			props: { active: 'apple' },
			slots: { default: slotMarkup },
			global: { components: { CdxTab } }
		} );

		const firstTab = wrapper.findComponent( CdxTab );
		expect( firstTab.vm.tab ).toMatchObject( tabData[ 0 ] );
	} );
} );
