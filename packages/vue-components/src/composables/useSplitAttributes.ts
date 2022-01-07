import { SetupContext, ComputedRef, computed } from 'vue';

/**
 * Splits attributes so some can be applied to the root element and others to a child element.
 *
 * For some components, attributes that are bound to the component shouldn't be bound to the root
 * element of the component (the default behavior), but rather should be bound to a child element
 * within the component. For example, you might want to be able to add a `placeholder` attribute on
 * a component which is then applied to an <input> element within that component.
 *
 * However, there are some attributes that should always be placed on the root element, namely
 * class and style.
 *
 * For these components, this composable can be used to take provided attributes and split them into
 * CSS classes for the root element (including any classes provided within the component, e.g.
 * dynamic or conditional classes), a style attribute for the root element, and all other
 * attributes (which can then be bound to the child element).
 *
 * This composable should be used with the `inheritAttrs: false` component option.
 *
 * See TextInput for sample usage.
 *
 * @param attrs Attributes from context
 * @param internalClasses A computed ref returning an object that includes any class names that will
 *                        be added to the root element of the component. Formatted according to
 *                        Vue's class binding object syntax, e.g. { 'cdx-button--primary': true }
 * @return rootClasses: all CSS classes that should be placed on the root element,
 *         rootStyle: style attribute to be placed on the root element,
 *         otherAttrs: all other attributes, which will be bound to another element
 */
export default function useSplitAttributes(
	attrs: SetupContext[ 'attrs' ],
	internalClasses: ComputedRef<Record<string, boolean>> = computed( () => { return {}; } )
): {
	rootClasses: ComputedRef<Record<string, boolean>>,
	rootStyle: ComputedRef<Record<string, unknown>|undefined>,
	otherAttrs: ComputedRef<SetupContext[ 'attrs' ]>
} {
	// Build an object of root classes including those set in the component (internal classes) and
	// those set on the component in the parent (provided classes).
	const rootClasses = computed( () => {
		const { ...classRecord } = internalClasses.value;
		if ( attrs.class ) {
			const providedClasses = ( attrs.class as string ).split( ' ' );
			providedClasses.forEach( ( className ) => {
				classRecord[ className ] = true;
			} );
		}
		return classRecord;
	} );

	// Get the style attribute set on the component in the parent.
	const rootStyle = computed( () => {
		if ( 'style' in attrs ) {
			return attrs.style as Record<string, unknown>;
		}

		return undefined;
	} );

	// Copy attrs and remove class and style, so all other attrs can be bound to another element.
	const otherAttrs = computed( () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { class: _ignoredClass, style: _ignoredStyle, ...attrsCopy } = attrs;
		return attrsCopy;
	} );

	return {
		rootClasses,
		rootStyle,
		otherAttrs
	};
}
