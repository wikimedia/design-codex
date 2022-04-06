import escapeHtml from 'escape-html';
import { PropValues, SlotValues } from '../types';

export function generateProps( propValues: Record<string, unknown> ) : string {
	return Object.keys( propValues )
		.map( ( propName ) => {
			const propVal = propValues[ propName ];
			if ( propVal === undefined ) {
				return '';
			}
			if ( typeof propVal === 'boolean' ) {
				// Boolean prop: generate just the name (like in <button disabled>) for true,
				// nothing for false (assuming that false is the default value)
				return propVal ? propName : '';
			}
			if ( typeof propVal === 'string' ) {
				return `${propName}="${escapeHtml( propVal )}"`;
			}
			// For any other type, use a v-bind expression
			return `:${propName}="${escapeHtml( JSON.stringify( propVal ) )}"`;
		} )
		.filter( Boolean )
		.join( ' ' );
}

export function generateSlots( slotValues: Record<string, string> ) : string {
	return Object.keys( slotValues )
		.map( ( slotName ) =>
			`<template #${slotName}>${escapeHtml( slotValues[ slotName ] )}</template>` )
		.join( '\n' );
}

export function generateVueTag( tagName: string, propValues: PropValues, slotValues: SlotValues )
: string {
	const propString = generateProps( propValues );
	const hasNonDefaultSlot = Object.keys( slotValues )
		.filter( ( slotName ) => slotName !== 'default' )
		.length > 0;

	let tagContents = '';
	if ( hasNonDefaultSlot ) {
		tagContents = generateSlots( slotValues );
	} else if ( slotValues.default ) {
		tagContents = escapeHtml( slotValues.default );
	}

	const openingTag = propString ? `<${tagName} ${propString}` : `<${tagName}`;
	return tagContents ? `${openingTag}>${tagContents}</${tagName}>` : `${openingTag} />`;
}
