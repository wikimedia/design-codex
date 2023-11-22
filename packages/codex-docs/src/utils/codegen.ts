import escapeHtml from 'escape-html';
import { ControlConfigWithValue } from '../types';
import toKebabCase from './toKebabCase';

// For Icon properties, the value for code generation is going to be a string, but it should be
// output using a v-bind expression because it is not a literal string, but rather the name
// of an object that will have been made available in the relevant context. Such props can
// be wrapped in a `BoundProp` object so that generateProps() knows to use the v-bind
// form
export class BoundProp {
	readonly value: string;

	constructor( value: string ) {
		this.value = value;
	}
}

// Unlike the PropValuesWithIcons from ../types, here icon properties are represented by their
// names, instead of Icon objects. Those names are wrapped in BoundProp, see explanation above
export type PropValues = Record<string, string | number | boolean | BoundProp | null | undefined>;

// For Icons being used in slots, we don't want the <cdx-icon> part to be escaped by the code
// that generates example snippets for the configurable demos, but the actual slot text that
// the user sets should be escaped. In Wrapper.vue the text is escaped before the <cdx-icon>
// is added, and then it gets wrapped in a EscapedSlotContent to avoid being escaped again
export class EscapedSlotContent {
	readonly value: string;

	constructor( value: string ) {
		this.value = value;
	}
}

// Unlike the SlotValues from ../types, here icon usage needs to be distinct from plain-text,
// by using EscapedSlotContent to wrap <cdx-icon>, see explanation above.
export type SlotValuesWithIcons = Record<string, string | EscapedSlotContent>;

/**
 * Given an object with all of the non-default properties, convert to a string that would be
 * used on the component instance.
 *
 * Technically this should only accept the `PropValues` type but we already have support for
 * more complicated properties like objects or arrays here.
 *
 * @param {PropValues} propValues
 * @return {string}
 */
export function generateProps( propValues: Record<string, unknown> ) : string {
	return Object.keys( propValues )
		.map( ( propName ) => {
			const propVal = propValues[ propName ];
			if ( propVal === undefined || propVal === null ) {
				return '';
			}
			// Convert prop name to kebab case for use in example code
			const kebabPropName = toKebabCase( propName );
			if ( typeof propVal === 'boolean' ) {
				// Boolean prop: generate just the name (like in <button disabled>) for true,
				// nothing for false (assuming that false is the default value)
				return propVal ? kebabPropName : '';
			}
			// Allow wrapping string values in BoundProp class to ensure they are
			// displayed using v-bind syntax, but not with JSON.stringify
			if ( propVal instanceof BoundProp ) {
				return `:${ kebabPropName }="${ escapeHtml( propVal.value ) }"`;
			}
			if ( typeof propVal === 'string' ) {
				return `${ kebabPropName }="${ escapeHtml( propVal ) }"`;
			}
			// For any other type, use a v-bind expression
			return `:${ kebabPropName }="${ escapeHtml( JSON.stringify( propVal ) ) }"`;
		} )
		.filter( Boolean )
		.join( ' ' );
}

/**
 * For slots with icons, only the configured text should be escaped. Wrapper.vue takes care of
 * that and then wraps it in a EscapedSlotContent so that we don't try to escape the <cdx-icon>
 * bit and don't double-escape the text
 *
 * @param {string|EscapedSlotContent} slotContent
 * @return {string} escaped content
 */
function escapeSlotContent( slotContent: string | EscapedSlotContent ) : string {
	if ( slotContent instanceof EscapedSlotContent ) {
		return slotContent.value;
	}
	return escapeHtml( slotContent );
}

/**
 * Given the configured slot values, convert to a string that would be used as the content between
 * the component's opening and closing tags.
 *
 * @param {SlotValuesWithIcons} slotValues
 * @return {string}
 */
export function generateSlots( slotValues: SlotValuesWithIcons ) : string {
	// Default slot does not need <template> wrapper
	return Object.keys( slotValues )
		.map( ( slotName ) => {
			const escapedContent = escapeSlotContent( slotValues[ slotName ] );
			if ( slotName === 'default' ) {
				return escapedContent;
			}
			return `<template #${ slotName }>${ escapedContent }</template>`;
		} )
		.join( '\n' );
}

/**
 * Given the default values and the current values, extract the non-default property values, and
 * the slot values, to use for generating the sample code. Icon values (for both properties and
 * slots) are given here as icon names, and converted to either BoundProp (for properties) or
 * EscapedSlotContent (for slots).
 *
 * @param {Record<string, string|boolean|number>} defaultControlValues
 * @param {ControlConfigWithValue[]} currentControlValues
 * @return {Object} with keys 'propValues' and 'slotValues'
 */
function extractDemoValues(
	defaultControlValues: Record<string, string|boolean|number>,
	currentControlValues: ControlConfigWithValue[]
) : { propValues: PropValues, slotValues: SlotValuesWithIcons } {
	const constructedPropValues: PropValues = {};
	const constructedSlotValues: SlotValuesWithIcons = {};
	for ( const control of currentControlValues ) {
		const controlName = control.name;
		const controlValue = control.value;
		if ( control.type === 'slot' ) {
			// Easy case: slot text
			constructedSlotValues[ controlName ] = controlValue as string;
			continue;
		} else if ( control.type === 'slot-icon' ) {
			// Slot icons are added after all of the slot text, to ensure text does not
			// override them
			continue;
		}
		// Must be a property
		const defaultValue = defaultControlValues[ controlName ];
		// Should always exist, but satisfy typescript; also skip when the value matches
		// the default
		if ( defaultValue === undefined || defaultValue === controlValue ) {
			continue;
		}
		// For icon properties, wrap the value in a BoundProp, so that the code generation
		// does not try to use it as a literal string value with v-bind syntax, but only
		// when the value is set (not null or undefined), otherwise we want the
		// generateProps() to exclude the value
		if ( control.type === 'icon' && typeof controlValue === 'string' ) {
			constructedPropValues[ controlName ] = new BoundProp( controlValue );
		} else {
			constructedPropValues[ controlName ] = controlValue;
		}
	}
	// Add slot icons
	for ( const control of currentControlValues ) {
		// Only slot icons, and only when an icon is chosen
		if ( control.type !== 'slot-icon' || !control.value ) {
			continue;
		}
		// remove the -icon at the end, '-icon' is 5 characters, avoid needing to
		// calculate the length each time
		const targetSlotName = control.name.slice( 0, control.name.length - 5 );
		if ( constructedSlotValues[ targetSlotName ] === undefined ) {
			continue;
		}
		// If there is already text for the slot, we need to escape it here, don't add an
		// extra space if there is no text
		let slotDisplayText = `<cdx-icon :icon="${ control.value }" />`;
		if ( constructedSlotValues[ targetSlotName ] ) {
			slotDisplayText += ' ' + escapeHtml(
				constructedSlotValues[ targetSlotName ] as string
			);
		}
		constructedSlotValues[ targetSlotName ] = new EscapedSlotContent(
			slotDisplayText
		);
	}
	return {
		propValues: constructedPropValues,
		slotValues: constructedSlotValues
	};
}

/**
 * Given the name of a component being demonstrated in kebab case, like 'cdx-toggle-button',
 * the default settings for it, the configured settings for it, and optionally a name for a v-model
 * attribute, generate valid Vue code that would result in the component being shown with the
 * configured properties and slots.
 *
 * @param {string} componentName
 * @param {Record<string, string|boolean|number>} defaultControlValues
 * @param {ControlConfigWithValue[]} currentControlValues
 * @param {string} vModelName
 * @return {string}
 */
export function generateVueTag(
	componentName: string,
	defaultControlValues: Record<string, string|boolean|number>,
	currentControlValues: ControlConfigWithValue[],
	vModelName: string
) : string {
	const { propValues, slotValues } = extractDemoValues(
		defaultControlValues,
		currentControlValues
	);
	const propString = generateProps( propValues );
	const tagContents = generateSlots( slotValues );

	let demoCode = `<${ componentName }`;
	if ( vModelName ) {
		demoCode += ` v-model="${ vModelName }"`;
	}
	if ( propString ) {
		demoCode += ` ${ propString }`;
	}
	return tagContents ? `${ demoCode }>${ tagContents }</${ componentName }>` : `${ demoCode } />`;
}
