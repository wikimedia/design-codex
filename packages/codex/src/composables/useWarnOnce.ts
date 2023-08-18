import { warn, watch } from 'vue';

/**
 * Throw a warning when a condition becomes true, but only once.
 *
 * This watches the condition function, and throws a warning when it returns true for the first
 * time. After that, it stops watching the condition, so that the warning is only thrown once.
 *
 * @param shouldWarn Condition to watch. When this returns true, the warning is thrown.
 * @param message Warning message
 */
export default function useWarnOnce( shouldWarn: () => boolean, message: string ): void {
	if ( shouldWarn() ) {
		warn( message );
		return;
	}

	const stop = watch( shouldWarn, ( newValue ) => {
		if ( newValue ) {
			warn( message );
			stop();
		}
	} );
}
