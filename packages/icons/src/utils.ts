import { Icon, SimpleIcon } from './types';

/**
 * @param {Icon} icon The icon string or object.
 * @param {string} langCode The HTMLElement.lang code.
 * @param {string} dir The HTMLElement.dir (ltr, rtl, or auto).
 * @return {SimpleIcon}
 */
export function resolveIcon( icon: Icon, langCode: string, dir: string ): SimpleIcon {
	// SvgIcon or PathIcon
	if ( typeof icon === 'string' || 'path' in icon ) {
		return icon;
	}

	// IconFlipForRtl. Just return the LTR icon; the caller should consult shouldIconFlip()
	// to find out if it needs to automatically flip the icon.
	if ( 'shouldFlip' in icon ) {
		return icon.ltr;
	}

	// IconVariedByDir
	if ( 'rtl' in icon ) {
		return dir === 'rtl' ? icon.rtl : icon.ltr;
	}

	// IconVariedByLang
	const langCodeIcon = langCode in icon.langCodeMap ?
		icon.langCodeMap[ langCode ] :
		icon.default;
	return typeof langCodeIcon === 'string' || 'path' in langCodeIcon ? langCodeIcon : langCodeIcon.ltr;
}

/**
 * @param {Icon} icon The icon string or object.
 * @param {string} langCode The HTMLElement.lang code.
 * @return {boolean} Whether the icon should be flipped horizontally in RTL mode.
 */
export function shouldIconFlip( icon: Icon, langCode: string ): boolean {
	if ( typeof icon === 'string' ) {
		return false;
	}

	// IconVariedByLang
	if ( 'langCodeMap' in icon ) {
		const langCodeIcon = langCode in icon.langCodeMap ?
			icon.langCodeMap[ langCode ] :
			icon.default;
		if ( typeof langCodeIcon === 'string' ) {
			return false;
		}
		icon = langCodeIcon;
	}

	if ( 'shouldFlipExceptions' in icon && Array.isArray( icon.shouldFlipExceptions ) ) {
		// Don't flip if the current language is listed as an exception.
		const exception = icon.shouldFlipExceptions.indexOf( langCode );
		return exception === undefined || exception === -1;
	}

	if ( 'shouldFlip' in icon ) {
		return icon.shouldFlip;
	}

	return false;
}
