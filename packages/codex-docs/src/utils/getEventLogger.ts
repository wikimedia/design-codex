/**
 * Get a function that will log to the console details about a specific event, noting both the
 * name of the event and the value. This is a generic to allow the caller to note the type of the
 * value.
 *
 * @param {string} eventName
 * @return function
 */
function getEventLogger<T>( eventName: string ) {
	const logger = ( val: T ) => {
		console.log( `"${eventName}" event emitted with the value:`, val );
	};
	return logger;
}

/**
 * Get a function that will log to the console details about one or more events, where the
 * name of the event is also provided. This is a generic to allow the caller to note the type
 * of the value.
 *
 * @return function
 */
export function getMultiEventLogger<T>() {
	const logger = ( eventName: string, val: T ) => {
		console.log( `"${eventName}" event emitted with the value:`, val );
	};
	return logger;
}

export default getEventLogger;
