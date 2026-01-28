/**
 * Jest setup file for suppressing expected warnings during tests.
 *
 * This file filters out specific console warnings that are expected test noise
 * rather than actual issues. Additional strings can be added to the array
 * as needed.
 */

/* eslint-disable implicit-arrow-linebreak */

const SUPPRESSED_WARNING_MESSAGES = [
	'Slot "default" invoked outside of the render function',
	'Icon-only buttons require one of the following attributes',
	'Message with type="error" cannot use auto-dismiss'
];

// stash the original `console.warn` function
const originalWarn = console.warn;

// Define an alternate version of this function that suppresses messages we
// don't care about.
console.warn = ( message, ...args ) => {
	if ( typeof message === 'string' ) {
		const shouldSuppress = SUPPRESSED_WARNING_MESSAGES.some( ( suppressedMessage ) =>
			message.includes( suppressedMessage )
		);

		if ( shouldSuppress ) {
			return;
		}
	}

	// For all other warnings, fall back to the original console.warn
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	originalWarn( message, ...args );
};
