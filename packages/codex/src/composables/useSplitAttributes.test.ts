import { computed } from 'vue';
import useSplitAttributes from './useSplitAttributes';

const attrs = { placeholder: 'Type something' };
const attrsWithClass = { ...attrs, class: 'class-1 class-2' };
const attrsWithStyle = { ...attrs, style: { 'font-weight': 'bold' } };
const internalClasses = computed( () => ( {
	'class--modifier-1': true,
	'class--modifier-2': false
} ) );

describe( 'useSplitAttributes', () => {
	describe( 'when called without class or style attributes', () => {
		it( 'returns empty object for rootClasses', () => {
			const { rootClasses } = useSplitAttributes( attrs );
			expect( rootClasses.value ).toEqual( {} );
		} );

		it( 'returns undefined for rootStyle', () => {
			const { rootStyle } = useSplitAttributes( attrs );
			expect( rootStyle.value ).toEqual( undefined );
		} );

		it( 'returns attrs as-is for otherAttrs', () => {
			const { otherAttrs } = useSplitAttributes( attrs );
			expect( otherAttrs.value ).toEqual( attrs );
		} );
	} );

	describe( 'when called with a class attribute', () => {
		it( 'properly adds provided classes to rootClasses', () => {
			const { rootClasses } = useSplitAttributes( attrsWithClass );
			const expected = {
				'class-1': true,
				'class-2': true
			};
			expect( rootClasses.value ).toEqual( expected );
		} );

		it( 'properly adds internal classes to rootClasses', () => {
			const { rootClasses } = useSplitAttributes( attrsWithClass, internalClasses );
			const expected = {
				'class--modifier-1': true,
				'class--modifier-2': false,
				'class-1': true,
				'class-2': true
			};
			expect( rootClasses.value ).toEqual( expected );
		} );

		it( 'returns otherAttrs with class removed', () => {
			const { otherAttrs } = useSplitAttributes( attrsWithClass );
			expect( otherAttrs.value ).toEqual( attrs );
		} );
	} );

	describe( 'when called with a style attribute', () => {
		it( 'returns rootStyle object', () => {
			const { rootStyle } = useSplitAttributes( attrsWithStyle );
			expect( rootStyle.value ).toEqual( { 'font-weight': 'bold' } );
		} );

		it( 'returns otherAttrs with class removed', () => {
			const { otherAttrs } = useSplitAttributes( attrsWithStyle );
			expect( otherAttrs.value ).toEqual( attrs );
		} );
	} );

} );
