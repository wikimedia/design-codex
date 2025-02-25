/* eslint-disable no-bitwise */
import { LibraryPrefix } from '../constants';

/**
 * Simple hashing function to generate a deterministic, 32-bit ID
 *
 * @param content The string to hash
 * @param prefix Prefix for the ID
 * @return A hash-based ID
 */
export function generateHashId(
	content: string,
	prefix = LibraryPrefix
): string {
	// This hexadecimal number corresponds to 4,294,967,295 in decimal notation
	// and thirty-two 1s in binary notation; this is the largest possible 32-bit
	// unsigned integer; this is a computationally-efficient performance boundary
	const mask = 0xffffffff;

	/**
	 * Hashing function.
	 *
	 * This approach is based on the String.hashCode function from Java, which
	 * has been widely used in many other contexts since then.
	 *
	 * - First, the content string is broken down into an array of characters,
	 *   and run through a reduce function where each item in the array is
	 *   converted to an (increasingly large) integer.
	 * - Next, we apply a "mask" to that large integer value, because we only
	 *   care about so much precision here and we want things to stay
	 *   performant. We use a bitwise "AND" operator here; `N & mask` means:
	 *   preserve the lowest 32 bits (the value of the mask) of N and discard
	 *   any higher bits. In practical terms this means that there is a very
	 *   low probability of "collisions" when we are using small numbers of
	 *   random strings, but the chance of repeated hashes will increase if
	 *   large numbers of strings are being used.
	 * - Finally, the hexadecimal value produced from this masking operation
	 *   is converted to a base-36 representation. So "hello" becomes "1n1e4y".
	 *   A prefix (defaulting to "cdx") is applied to help namespace the output
	 *   and further reduce the possibility of collisions.
	 * - For most practical web applications, this 32-bit hash is sufficient for
	 *   non-cryptographic purposes like caching, quick comparisons, or
	 *   generating short identifiers. It is not cryptographically secure.
	 */
	let numericHash = Array.from( content )
		.reduce( ( acc, char ) => ( acc * 31 + char.charCodeAt( 0 ) ) & mask, 0 );

	// Prevent JS from interpreting any hash we generate as a negative number
	// (which results in an "extra hyphen" in the final output basically) by
	// using the "unsigned right shift" operator.
	numericHash = numericHash >>> 0;

	// Convert our hash to a base-36 string representation.
	const hash = numericHash.toString( 36 );

	return `${ prefix }-${ hash }`;
}
