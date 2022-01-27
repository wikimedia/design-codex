import { Plugin, Rule } from 'postcss';

export type RemoveBidiOptions = {
	removeSelectorPrefixes: string[],
	trimSelectorPrefixes: string[],
	removeKeyFramesSuffixes: string[]
};

/**
 * Transform bidirectional CSS to CSS for only one direction, by removing some rules and trimming
 * the selectors on other rules. If trimming a selector results in two adjacent rules having the
 * same selector, the two rules are merged into one.
 *
 * For example, to transform bidirectional CSS to CSS for right-to-left (RTL), we need to remove
 * rules starting with `[dir=ltr]` entirely; keep rules starting with `[dir=rtl]` or `[dir]` but
 * remove the `[dir=rtl]` or `[dir]` prefix; and remove `@keyframes` definitions ending in `-ltr`.
 * This is achieved with the following options:
 *
 * ```
 * {
 *     removeSelectorPrefixes: [ '[dir=ltr]' ],
 *     trimSelectorPrefixes: [ '[dir=rtl]', '[dir]' ],
 *     removeKeyFrameSuffixes: [ '-ltr' ]
 * }
 * ```
 *
 * With these options, this plugin would transform this:
 * `.foo { position: absolute; } [dir=ltr] .foo { left: 0; } [dir=rtl] .foo { right: 0; }`
 * into: `.foo { position: absolute; right: 0; }`
 *
 * @param options
 * @param options.removeSelectorPrefixes Remove selectors beginning with these prefixes entirely
 * @param options.trimSelectorPrefixes Remove these prefixes from the start of selectors
 * @param options.removeKeyFramesSuffixes Remove @keyframes rules whose names end with these strings
 * @return PostCSS plugin
 */
export default (
	{ removeSelectorPrefixes, trimSelectorPrefixes, removeKeyFramesSuffixes } : RemoveBidiOptions
) : Plugin => {
	let previousRule : Rule|null = null;
	return {
		postcssPlugin: 'remove-rules-with-prefix',
		Root() {
			previousRule = null;
		},
		Rule( rule ) {
			let changed = false;
			const newSelectors = rule.selectors
				.map( ( selector ) => {
					for ( const rp of removeSelectorPrefixes ) {
						if ( selector.startsWith( rp ) ) {
							changed = true;
							return null;
						}
					}
					for ( const tp of trimSelectorPrefixes ) {
						if ( selector.startsWith( tp ) ) {
							changed = true;
							return selector.slice( tp.length ).replace( /^\s+/, '' );
						}
					}
					return selector;
				} )
				.filter( ( selector ) : selector is string => selector !== null );

			if ( newSelectors.length === 0 ) {
				rule.remove();
			} else if ( changed ) {
				rule.selectors = newSelectors;
				if ( previousRule && previousRule.selector === rule.selector ) {
					// Merge rule into previousRule.
					previousRule.append( rule.nodes );
					rule.remove();
				} else {
					previousRule = rule;
				}
			} else {
				previousRule = rule;
			}
		},
		AtRule( atRule ) {
			if ( atRule.name !== 'keyframes' && !atRule.name.endsWith( '-keyframes' ) ) {
				return;
			}
			if ( removeKeyFramesSuffixes.some( ( s ) => atRule.params.endsWith( s ) ) ) {
				atRule.remove();
			}
		}
	};
};
