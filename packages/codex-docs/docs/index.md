---
aside: false
outline: false
isHomepage: true
---
<script setup>
import { CdxIcon, CdxButton, CdxCard } from '@wikimedia/codex';
import { cdxIconLogoWikimedia, cdxIconPalette, cdxIconPuzzle, cdxIconHeart, cdxIconFunction } from '@wikimedia/codex-icons';
import { version } from '../../codex/package.json';
import CdxDocsVersionBanner from '../src/components/version-banner/VersionBanner.vue';
</script>

<div class="cdx-docs-home">

<div class="cdx-docs-home__hero">
	<div>
		<img src="/logo-Codex-inverted.svg">
		<h1 class="cdx-docs-home__hero__title">Codex</h1>
	</div>
	<p class="cdx-docs-home__hero__tagline">The design system for Wikimedia.</p>
</div>

<cdx-docs-version-banner />

Current version: **{{ version }}**

Codex is maintained by the [Design System Team](https://www.mediawiki.org/wiki/Design_System_Team)
of the [Wikimedia Foundation](https://wikimediafoundation.org/).

<div class="cdx-docs-home__resources">
	<cdx-card url="./using-codex/about.html">
		<template #title>Using Codex</template>
		<template #description>Learn how to use Codex to design and build user interfaces</template>
	</cdx-card>
	<cdx-card url="./contributing/overview.html">
		<template #title>Contributing guidelines</template>
		<template #description>Learn about how we work on Codex and how you can help</template>
	</cdx-card>
</div>

## Features

<div class="cdx-docs-home__features">
	<cdx-card url="./design-tokens/overview.html" :icon="cdxIconPalette">
		<template #title>Design tokens</template>
		<template #description>Write styles consistent with the Codex Design Style Guide for Wikimedia</template>
	</cdx-card>
	<cdx-card url="./components/overview.html" :icon="cdxIconPuzzle">
		<template #title>Components</template>
		<template #description>Build usable, accessible, translatable applications</template>
	</cdx-card>
	<cdx-card url="./icons/overview.html" :icon="cdxIconHeart">
		<template #title>Icons</template>
		<template #description>Access a collection of icons with language and directionality variants</template>
	</cdx-card>
	<cdx-card url="./composables/overview.html" :icon="cdxIconFunction">
		<template #title>Composables</template>
		<template #description>Re-use logic and apply common patterns from the Codex codebase</template>
	</cdx-card>
</div>

## Resources

<div class="cdx-docs-home__resources">
	<cdx-card url="https://www.figma.com/community/file/1448742124788019850/codex">
		<template #title>Codex Figma</template>
		<template #description>Design with Codex components in Figma</template>
	</cdx-card>
	<cdx-card url="https://www.mediawiki.org/wiki/Codex">
		<template #title>MediaWiki</template>
		<template #description>Learn about using Codex within MediaWiki</template>
	</cdx-card>
	<cdx-card url="https://gerrit.wikimedia.org/r/admin/repos/design/codex">
		<template #title>Gerrit</template>
		<template #description>Visit the canonical Codex codebase</template>
	</cdx-card>
	<cdx-card url="https://github.com/wikimedia/design-codex">
		<template #title>GitHub</template>
		<template #description>Visit a mirror of the Gerrit codebase on GitHub</template>
	</cdx-card>
</div>

</div>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

@font-size-cdx-docs-title: 5em;
@font-size-cdx-docs-tagline: 2em;

/* stylelint-disable selector-class-pattern */
.cdx-docs-home {
	.cdx-card {
		color: @color-base;

		&:hover {
			color: @color-base;
			text-decoration: @text-decoration-none;
		}
	}

	&__hero {
		// TODO: This is semantically incorrect, there needs to be a static token.
		background-color: @background-color-progressive;
		color: @color-inverted-fixed;
		// Equals 100% + ( 2 * negative margin per side ).
		display: grid;
		width: calc( @size-full + ( @spacing-200 * 2 ) );
		margin-right: -@spacing-200;
		margin-bottom: @spacing-200;
		margin-left: -@spacing-200;
		padding: @spacing-200;

		/* @media screen and ( min-width: @min-width-breakpoint-tablet ) {
			display: flex;
		} */

		img {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			width: 6em;
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			height: 6em;
			margin-top: 0;
			margin-right: @spacing-100;
		}

		div {
			display: block;
			margin-bottom: 0;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				display: flex;
				align-items: flex-end;
				margin-bottom: @spacing-400;
			}
		}

		// Need to put `.vp-doc` here to override the default VitePress heading styles.
		.vp-doc &__title {
			color: @color-inverted-fixed;
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			max-width: 400px;
			font-family: @font-family-base;
			font-size: @font-size-cdx-docs-title;
			font-weight: @font-weight-bold;
			line-height: initial;
		}

		.vp-doc &__tagline {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			max-width: 330px;
			margin: 0 0 0 @spacing-50;
			font-family: @font-family-base;
			font-size: @font-size-cdx-docs-tagline;
			font-weight: @font-weight-bold;
			line-height: initial;
		}
	}

	&__features {
		display: flex;
		flex-direction: column;
		row-gap: @spacing-50;
	}

	&__resources {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-50;
		margin-top: @spacing-200;

		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-card {
			width: calc( @size-half - @spacing-25 );

			&:hover {
				text-decoration: @text-decoration-none;
			}
		}
	}
}
/* stylelint-enable selector-class-pattern */
</style>
