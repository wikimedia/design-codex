import postcss from 'postcss';
import postcssPluginRemoveBidi, { RemoveBidiOptions } from './postcss-plugin-remove-bidi';

describe( 'transform tests', () => {
	type Case = [
		msg: string,
		input: string,
		expectedLtr: string,
		expectedRtl: string
	];
	const ltrOptions : RemoveBidiOptions = {
		removeSelectorPrefixes: [ '[dir=rtl]' ],
		trimSelectorPrefixes: [ '[dir=ltr]', '[dir]' ],
		removeKeyFramesSuffixes: [ '-rtl' ]
	};
	const rtlOptions : RemoveBidiOptions = {
		removeSelectorPrefixes: [ '[dir=ltr]' ],
		trimSelectorPrefixes: [ '[dir=rtl]', '[dir]' ],
		removeKeyFramesSuffixes: [ '-ltr' ]
	};

	const cases : Case[] = [
		[
			'Removes and trims simple rule',
			'[dir=ltr] .foo { padding-left: 0; } [dir=rtl] .foo { padding-right: 0; }',
			'.foo { padding-left: 0; }',
			'.foo { padding-right: 0; }'
		],
		[
			'Does not affect rules without direction',
			'.foo { position: absolute; } [dir=ltr] .bar { left: 0; }',
			'.foo { position: absolute; } .bar { left: 0; }',
			'.foo { position: absolute; }'
		],
		[
			'Merges trimmed rule into preceding rule',
			'.foo { position: absolute; } [dir=ltr] .foo { left: 0; } [dir=rtl] .foo { right: 0; }',
			'.foo { position: absolute; left: 0; }',
			'.foo { position: absolute; right: 0; }'
		],
		[
			'Does not merge trimmed rule into following rule',
			'[dir=ltr] .foo { left: 0; } [dir=rtl] .foo { right: 0; } .foo { position: absolute; }',
			'.foo { left: 0; } .foo { position: absolute; }',
			'.foo { right: 0; } .foo { position: absolute; }'
		],
		[
			'Merges two trimmed rules into preceding rule',
			'.foo { position: absolute; } [dir] .foo { padding: 0; } [dir=ltr] .foo { left: 0; } [dir=rtl] .foo { right: 0; }',
			'.foo { position: absolute; padding: 0; left: 0; }',
			'.foo { position: absolute; padding: 0; right: 0; }'
		],
		[
			'Merges multiple rules',
			'.foo { clear: both; } [dir=ltr] .foo { float: left; } [dir=rtl] .foo { float: right; } ' +
				'.bar { display: inline-block; } [dir=ltr] .bar { text-align: right; } [dir=rtl] .bar { text-align: left; }',
			'.foo { clear: both; float: left; } .bar { display: inline-block; text-align: right; }',
			'.foo { clear: both; float: right; } .bar { display: inline-block; text-align: left; }'
		],
		[
			'Removes matching keyframe rules, leaves non-matching ones alone',
			'@keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } } @keyframes foo-rtl { 0% { right: 0; } 100% { right: 42px; } }',
			'@keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } }',
			'@keyframes foo-rtl { 0% { right: 0; } 100% { right: 42px; } }'
		],
		[
			'Removes prefixed keyframe rules',
			'@-webkit-keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } } @keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } }',
			'@-webkit-keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } } @keyframes foo-ltr { 0% { left: 0; } 100% { left: 42px; } }',
			''
		],
		[
			'Does not remove other at rules, even if their suffix matches',
			'@media foo-ltr { .foo { direction: ltr; } } @media foo-rtl { .foo { direction: rtl; } }',
			'@media foo-ltr { .foo { direction: ltr; } } @media foo-rtl { .foo { direction: rtl; } }',
			'@media foo-ltr { .foo { direction: ltr; } } @media foo-rtl { .foo { direction: rtl; } }'
		]
	];

	test.each( cases )( 'Case %#: %s', async ( _, input, expectedLtr, expectedRtl ) => {
		const actualLtr = ( await postcss( postcssPluginRemoveBidi( ltrOptions ) )
			.process( input, { from: 'foo.css' } ) ).css;
		const actualRtl = ( await postcss( postcssPluginRemoveBidi( rtlOptions ) )
			.process( input, { from: 'foo.css' } ) ).css;
		expect( actualLtr ).toEqual( expectedLtr );
		expect( actualRtl ).toEqual( expectedRtl );
	} );

} );
