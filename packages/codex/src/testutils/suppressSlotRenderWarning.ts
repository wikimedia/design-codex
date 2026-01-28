import { config } from '@vue/test-utils';

const slotWarning = 'Slot "default" invoked outside of the render function';

/**
 * Suppress Vue's slot-tracking warning for tests that intentionally inspect
 * slot VNodes outside the template render path.
 *
 * @return Restore function to reset the previous warn handler.
 */
export default function suppressSlotRenderWarning() : () => void {
	const originalWarnHandler = config.global.config.warnHandler;

	config.global.config.warnHandler = ( message, instance, trace ) => {
		if ( message.includes( slotWarning ) ) {
			return;
		}

		if ( originalWarnHandler ) {
			originalWarnHandler( message, instance, trace );
		}
	};

	return () => {
		config.global.config.warnHandler = originalWarnHandler;
	};
}
