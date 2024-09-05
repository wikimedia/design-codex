import { mount } from '@vue/test-utils';
import CdxDocsColorLists from './ColorLists.vue';

const tokens = {
	// Token category comment.
	comment: 'Color palette comment.',
	// Category with single color.
	white: {
		value: '#fff'
	},
	// Category with multiple colors.
	gray100: {
		value: '#f8f9fa'
	},
	gray200: {
		value: '#eaecf0'
	},
	// Not part of a category.
	'transparent-light': {
		value: 'rgba( 255, 255, 255, 0 )'
	}
};

const expectedSets = [
	{
		category: 'White',
		items: [
			{ name: 'white', value: '#fff' }
		]
	},
	{
		category: 'Gray',
		items: [
			{ name: 'gray100', value: '#f8f9fa' },
			{ name: 'gray200', value: '#eaecf0' }
		]
	}
];

describe( 'ColorLists', () => {
	it( 'includes the correct categories and items', () => {
		const wrapper = mount( CdxDocsColorLists );
		expect( wrapper.vm.getColorSets( tokens ) ).toStrictEqual( expectedSets );
	} );
} );
