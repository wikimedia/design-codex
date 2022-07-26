import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

// Access to icon objects by name
const iconsByName: Record<string, Icon> = {};
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	// Add to known map
	iconsByName[ iconName ] = icon;
}

/**
 * Get the Icon object (or undefined) with a given name
 *
 * @param {string} iconName
 * @return {Icon | undefined}
 */
function getIconByName( iconName: string ) : Icon | undefined {
	return iconsByName[ iconName ];
}

export default getIconByName;
