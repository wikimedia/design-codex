import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxTextInput, MenuItemData } from '@wikimedia/codex';
import {
	cdxIconAdd,
	cdxIconArrowNext,
	cdxIconArrowPrevious,
	cdxIconArticleAdd,
	cdxIconTag
} from '@wikimedia/codex-icons';
import CdxDocsIconLookup from './IconLookup.vue';

describe( 'matches the snapshot', () => {
	// No need for fancier logic with cases just yet
	it( 'icon lookup (no default icon) => HTML', () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
	it( 'icon lookup (with default icon) => HTML', async () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: 'cdxIconTag' } } );
		// Give time for events
		await nextTick();
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'IconLookup', () => {
	it( 'starts with no icons by default', () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		expect( wrapper.vm.menuItems ).toEqual( [] );
	} );

	it( 'can start with an initial icon', () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: 'cdxIconTag' } } );
		// Should only have the single icon
		expect( wrapper.vm.menuItems.length ).toBe( 1 );
		expect( wrapper.vm.menuItems[ 0 ] ).toEqual(
			{ value: 'cdxIconTag', icon: cdxIconTag }
		);
	} );

	it( 'supplies icon names upon typing', async () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'cdx' );
		await nextTick();
		// There are more than 200 icons, but they are filtered to just the first 10,
		// check that there are indeed 10 icons and that the first and 10th icons
		// alphabetically are the first and last elements in the array
		expect( wrapper.vm.menuItems.length ).toBe( 10 );
		// First icon: cdxIconAdd
		// Tenth icon: cdxIconArticleAdd
		expect( wrapper.vm.menuItems[ 0 ] ).toEqual(
			{ value: 'cdxIconAdd', icon: cdxIconAdd }
		);
		// TODO this test breaks when adding a new icon that comes before ArticleAdd in the alphabet
		expect( wrapper.vm.menuItems[ 9 ] ).toEqual(
			{ value: 'cdxIconArticleAdd', icon: cdxIconArticleAdd }
		);
	} );

	it( 'filters options during typing', async () => {
		// Filter for the two arrow icons
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'Arrow' );
		await nextTick();
		const arrowIcons: MenuItemData[] = [
			{ value: 'cdxIconArrowNext', icon: cdxIconArrowNext },
			{ value: 'cdxIconArrowPrevious', icon: cdxIconArrowPrevious }
		];
		expect( wrapper.vm.menuItems ).toEqual( arrowIcons );
	} );

	it( 'clears options when input value is empty string', async () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		// First filter to 'cdx' so that we know the menu items are not empty
		textInputWrapper.vm.$emit( 'update:modelValue', 'cdx' );
		await nextTick();
		expect( wrapper.vm.menuItems.length ).toBe( 10 );
		// Now clear the input, should lead to 0 options
		textInputWrapper.vm.$emit( 'update:modelValue', '' );
		await nextTick();
		expect( wrapper.vm.menuItems ).toEqual( [] );
	} );

	it( 'reacts to changing the modelValue prop', async () => {
		// When modelValue changes to an icon name, as if being reset, it should be used
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		expect( wrapper.vm.menuItems ).toEqual( [] );

		// From no model value, as if the input had been cleared, set to cdxIconTag
		await wrapper.setProps( { modelValue: 'cdxIconTag' } );

		// Should only have that single icon set
		expect( wrapper.vm.menuItems.length ).toBe( 1 );
		expect( wrapper.vm.menuItems[ 0 ] ).toEqual(
			{ value: 'cdxIconTag', icon: cdxIconTag }
		);
		// Should also be the <input> value.
		const input = wrapper.find( 'input' ).element as HTMLInputElement;
		expect( input.value ).toEqual( 'cdxIconTag' );
	} );
} );
