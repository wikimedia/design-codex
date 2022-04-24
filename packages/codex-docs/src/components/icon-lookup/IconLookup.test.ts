import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxTextInput, MenuItemData } from '@wikimedia/codex';
import {
	cdxIconAdd,
	cdxIconArrowNext,
	cdxIconArrowPrevious,
	cdxIconArticleCheck
} from '@wikimedia/codex-icons';
import CdxDocsIconLookup from './IconLookup.vue';

describe( 'matches the snapshot', () => {
	// No need for fancier logic with cases just yet
	it( 'icon lookup => HTML', () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'IconLookup', () => {
	it( 'starts with no icons', () => {
		const wrapper = mount( CdxDocsIconLookup, { props: { modelValue: '' } } );
		expect( wrapper.vm.menuItems ).toEqual( [] );
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
		// Tenth icon: cdxIconArticleCheck
		expect( wrapper.vm.menuItems[ 0 ] ).toEqual(
			{ value: 'cdxIconAdd', icon: cdxIconAdd }
		);
		expect( wrapper.vm.menuItems[ 9 ] ).toEqual(
			{ value: 'cdxIconArticleCheck', icon: cdxIconArticleCheck }
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
} );
