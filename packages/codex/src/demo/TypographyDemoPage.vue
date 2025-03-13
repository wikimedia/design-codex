<!-- eslint-disable vue/singleline-html-element-content-newline max-len -->
<template>
	<demo-base-layout class="cdx-demo-layout">
		<template #header>
			Codex Typography Scale Example
		</template>
		<template #content>
			<cdx-container
				id="layout"
				class="cdx-demo-layout-container"
				size="large"
			>
				<h1>Baltimore</h1>
				<small>From Wikipedia, the free encyclopedia</small>
				<p>
					This <strong>Codex Typography Scale</strong> demo features standard text layout
					elements for testing typographic styles. With only spacing and typographic
					design tokens in use on pure HTML.
				</p>
				<p>
					Baltimore is the most populous city in the U.S. state of Maryland. With a total
					population of 585,708 at the 2020 census, it is the 30th-most populous US city.
					Baltimore was designated as an independent city by the Constitution of Maryland
					in 1851. Baltimore is the most populous independent city in the United States.
					As of 2020, the population of the Baltimore metropolitan area was 2,838,327, the
					20th-largest metropolitan area in the country. The city is also part of the
					Washington–Baltimore combined statistical area (CSA), which had a 2020
					population of 9,973,383, the third-largest in the country. Though Baltimore is
					not located within or under the administrative jurisdiction of any county in
					the state, it forms part of the central Maryland region, together with the
					surrounding county that shares its name.
				</p>
				<blockquote>
					<p>
						Baltimore City's population declined from 620,961 in 2010 to 585,708 in
						2020, representing a 5.7% drop. In 2020, Baltimore lost more population than
						any other major city in the United States.
					</p>
					<cite>- The United States Census</cite>
				</blockquote>
				<h2>Geography</h2>
				<p>
					Baltimore is in north-central Maryland on the Patapsco River, close to where it
					empties into the Chesapeake Bay. Baltimore is located on the fall line between
					the Piedmont Plateau and the Atlantic coastal plain, which divides Baltimore
					into "lower city" and "upper city". Baltimore's elevation ranges from sea level
					at the harbor to 480 feet (150 m) in the northwest corner near Pimlico.
				</p>
				<h3>Cityscape</h3>
				<h4>Architecture</h4>
				<p>
					Baltimore exhibits examples from each period of architecture over more than two
					centuries, and work from architects such as Benjamin Latrobe, George A.
					Frederick, John Russell Pope, Mies van der Rohe, and I. M. Pei.
				</p>
				<p>
					Baltimore is rich in architecturally significant buildings in a variety of
					styles. The Baltimore Basilica (1806–1821) is a neoclassical design by Benjamin
					Latrobe, and one of the oldest Catholic cathedrals in the United States. In
					1813, Robert Cary Long Sr. built for Rembrandt Peale the first substantial
					structure in the United States designed expressly as a museum. Restored, it is
					now the Municipal Museum of Baltimore, or popularly the Peale Museum.
				</p>
				<h4>Neighborhoods</h4>
				<p>Baltimore is officially divided into nine geographical regions:</p>
				<ul>
					<li>Central</li>
					<li>North</li>
					<li>South</li>
					<li>Northeast</li>
					<li>East</li>
					<li>Southeast</li>
					<li>Northwest</li>
					<li>West</li>
					<li>Southwest</li>
				</ul>
				<h3>Climate</h3>
				<p>
					Baltimore has a humid subtropical climate in the Köppen climate
					classification (Cfa) or oceanic climate in the Trewartha climate
					classification (Doak), with hot summers, cool winters, and a summer peak to
					annual precipitation. Baltimore is part of USDA plant hardiness zones 7b and 8a.
					Summers are normally warm, with occasional late day thunderstorms. July, the
					warmest month, has a mean temperature of 80.3 °F (26.8 °C). Winters range from
					chilly to mild but vary, with sporadic snowfall: January has a daily average of
					35.8 °F (2.1 °C), though temperatures reach 50 °F (10 °C) quite often, and can
					occasionally drop below 20 °F (−7 °C) when Arctic air masses affect the area.
					According to Vox, winters are warming faster than summers.
				</p>
				<small>
					* This is an abbreviated and adjusted version of the Wikipedia article for the
					city of Baltimore, for purposes of testing typographic hierarchy.
				</small>
			</cdx-container>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxContainer from '../components-wip/container/Container.vue';
import DemoBaseLayout from './DemoBaseLayout.vue';
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

// Note, that there are also a few spacing styles included for a better presentation of the
// type scale.

h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin-bottom: 0;
}

h1 {
	font-family: @font-family-heading-main;
	font-size: @font-size-xxx-large;
	font-weight: @font-weight-normal;
	line-height: @line-height-xxx-small;
}

h2 {
	margin-top: @spacing-150;
	font-family: @font-family-serif;
	font-size: @font-size-xx-large;
	font-weight: @font-weight-normal;
	line-height: @line-height-xxx-small;
}

h3 {
	margin-top: @spacing-150;
	font-size: @font-size-x-large;
	line-height: @line-height-xxx-small;
}

h4 {
	margin-top: @spacing-150;
	font-size: @font-size-large;
	line-height: @line-height-xxx-small;
}

h5 {
	margin-top: @spacing-125;
	font-size: @font-size-medium;
	line-height: @line-height-xxx-small;
}

h6 {
	font-size: @font-size-medium;
	line-height: @line-height-medium;
}

p,
li {
	clear: both;
	line-height: @line-height-medium;
}

p {
	margin-top: @spacing-100;

	h1 + & {
		margin-top: @spacing-125;
	}

	h2 + &,
	h3 + &,
	h4 + & {
		margin-top: @spacing-50;
	}
}

blockquote {
	// Blockquote box styling.
	border-left: @border-width-base * 4 @border-style-base @border-color-muted;
	padding-left: @spacing-100;

	p {
		font-family: @font-family-serif;
		font-size: @font-size-x-large;
		// FIXME: Add token.
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		font-style: italic;
	}

	cite {
		font-family: @font-family-base;
		font-size: @font-size-small;
		// FIXME: Add token.
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		font-style: normal;
	}
}

figcaption {
	font-size: @font-size-x-small;
}

ol,
ul {
	margin-top: @spacing-100;

	p + & {
		margin-top: @spacing-50;
	}
}

small {
	display: inline-block;
	font-size: @font-size-x-small;

	h1 + & {
		margin-top: @spacing-50;
	}
}
</style>
