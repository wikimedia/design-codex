import { ButtonGroupItem } from '../types';

/**
 * Get the label for a button described by a ButtonGroupItem object.
 *
 * Normally, this is the `label` property. But if the `label` property is missing, we fall back to
 * the `value` property, and if the `label` property is null we return an empty string.
 *
 * @param button Button description
 * @return Button label
 */
export function getButtonLabel( button: ButtonGroupItem ) {
	if ( button.label === undefined ) {
		return button.value;
	}
	if ( button.label === null ) {
		return '';
	}
	return button.label;
}
