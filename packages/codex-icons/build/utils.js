/** @typedef {import('../src/types').Icon} Icon */

/**
 * Transform an icon's name into a Less variable name.
 *
 * E.g. cdxIconInfoFilled -> @cdx-icon-info-filled
 *
 * @param {string} iconName
 * @return {string}
 */
export function getLessVariableName( iconName ) {
	return '@' + iconName.split( '' ).map( ( letter, index ) => {
		// If the letter is uppercase, add a dash before it (unless it's the first letter), then
		// transform the letter to lowercase. Otherwise, just add the letter as-is.
		return letter.toUpperCase() === letter ?
			`${ index !== 0 ? '-' : '' }${ letter.toLowerCase() }` :
			letter;
	} ).join( '' );
}

/**
 * Encode an SVG string for safe use in a data URI.
 *
 * This just URL-encodes # characters, as those are the only special characters that are not
 * allowed in the data portion of a data URI.
 *
 * @param {string} svg
 * @return {string}
 */
export function encodeSvg( svg ) {
	return svg.replace( /#/g, ( char ) => encodeURIComponent( char ) );
}

/**
 * Build a comma-separated list of icon data to be used as the value of a Less variable.
 *
 * The list is structured as follows:
 * 1. The default icon path (a string)
 * 2. Whether the icon should flip in RTL ('true' or 'false')
 * 3. Exceptions to the flip rule ('false' or a selector string that will rule out languages)
 * 4. RTL-specific icon path ('false' or the path string)
 * 5. Whether the icon has language-specific variants ('true' or 'false')
 * 6+ If there are language-specific variants, they will be included as string pairs after the other
 *   icon data. The first item in the pair is a lang code and the second is the icon path for that
 *   language.
 *
 * @param {string} lessVariableName
 * @param {Icon} icon
 * @return {string}
 */
export function getIconOutput( lessVariableName, icon ) {
	let defaultIcon = '';
	let shouldFlip = 'false';
	let flipExceptions = 'false';
	let rtlIcon = 'false';
	let hasLangVariants = 'false';
	let langCodeMap = '';

	// If this icon is just a string, add that and go to the next icon, so we can assume that
	// anything past this point is an object.
	if ( typeof icon === 'string' ) {
		defaultIcon = icon;
		return `${ lessVariableName }: '${ encodeSvg( defaultIcon ) }', '${ shouldFlip }', '${ flipExceptions }', '${ rtlIcon }', '${ hasLangVariants }';\n`;
	}

	if ( 'ltr' in icon ) {
		defaultIcon = typeof icon.ltr === 'string' ? icon.ltr : icon.ltr.path;
	}

	if ( 'shouldFlip' in icon ) {
		shouldFlip = 'true';
	}

	if ( 'shouldFlipExceptions' in icon && icon.shouldFlipExceptions ) {
		flipExceptions = icon.shouldFlipExceptions.join( ' ' );
	}

	if ( 'rtl' in icon ) {
		rtlIcon = typeof icon.rtl === 'string' ? icon.rtl : icon.rtl.path;
	}

	if ( 'langCodeMap' in icon ) {
		hasLangVariants = 'true';

		// First set the default icon.
		if ( typeof icon.default === 'string' ) {
			defaultIcon = icon.default;
		}

		if ( typeof icon.default !== 'string' && 'ltr' in icon.default ) {
			defaultIcon = typeof icon.default.ltr === 'string' ? icon.default.ltr : icon.default.ltr.path;
		}

		// Then add the language-specific icons. These will be pairs added as list items after the
		// rest of the icon data. The first item is the lang code, the second is the icon path.
		// Note that language-specific icons can be of type IconFlipForRtl, but there aren't any of
		// that type yet. If we add any, we should account for that here.
		langCodeMap = Object.entries( icon.langCodeMap )
			.map( ( [ langCode, langCodeIcon ] ) =>
				typeof langCodeIcon === 'string' ? `${ langCode } '${ encodeSvg( langCodeIcon ) }'` : '' )
			// Filter out any empty strings. These would only exist if we introduced an icon with
			// a language variant that was also of type IconFlipForRtl
			.filter( ( s ) => s !== '' )
			.join( ', ' );
	}

	let iconOutput = `${ lessVariableName }: '${ encodeSvg( defaultIcon ) }', '${ shouldFlip }', '${ flipExceptions }', '${ encodeSvg( rtlIcon ) }', '${ hasLangVariants }'`;
	iconOutput += langCodeMap.length > 0 ? `, ${ langCodeMap }` : '';
	iconOutput += ';\n';

	return iconOutput;
}
