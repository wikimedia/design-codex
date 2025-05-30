---
aside: false
outline: false
isHomepage: true
---
<script setup>
import { CdxIcon, CdxButton, CdxCard } from '@wikimedia/codex';
import { cdxIconLogoWikimedia, cdxIconPalette, cdxIconListBullet, cdxIconPuzzle, cdxIconHeart, cdxIconLayout } from '@wikimedia/codex-icons';
import { version } from '../../codex/package.json';
import CdxDocsVersionBanner from '../src/components/version-banner/VersionBanner.vue';
</script>

<div class="cdx-docs-home">

<div class="cdx-docs-home__hero">
	<div class="cdx-docs-home__hero__content">
		<div>
			<img src="/logo-Codex-inverted.svg">
			<h1 class="cdx-docs-home__hero__title">Codex</h1>
		</div>
		<p class="cdx-docs-home__hero__tagline">The design system for Wikimedia.</p>
	</div>
</div>

<cdx-docs-version-banner />

Current version: **{{ version }}**

Codex is designed and developed by contributors from the [Wikimedia Foundation](https://wikimediafoundation.org/),
[Wikimedia Deutschland](https://www.wikimedia.de/), and the [Wikimedia](https://www.wikimedia.org/)
volunteer community. [Get in touch](./using-codex/contact.md) with us.

<div class="cdx-docs-home__resources">
	<cdx-card url="./using-codex/accessing-codex.html">
		<template #title>Using Codex</template>
		<template #description>Learn how to use Codex to design and build user interfaces</template>
	</cdx-card>
	<cdx-card url="./contributing/overview.html">
		<template #title>Contributing</template>
		<template #description>Learn about how we work on Codex and how you can help</template>
	</cdx-card>
</div>

## Features

<div class="cdx-docs-home__features">
	<cdx-card url="./style-guide/overview.html" :icon="cdxIconPalette">
		<template #title>Style Guide</template>
		<template #description>Create harmonious designs across Wikimedia</template>
	</cdx-card>
	<cdx-card url="./design-tokens/overview.html" :icon="cdxIconListBullet">
		<template #title>Design tokens</template>
		<template #description>Write styles consistent with the Codex Style Guide</template>
	</cdx-card>
	<cdx-card url="./components/overview.html" :icon="cdxIconPuzzle">
		<template #title>Components</template>
		<template #description>Build usable, accessible, translatable applications</template>
	</cdx-card>
	<cdx-card url="./icons/overview.html" :icon="cdxIconHeart">
		<template #title>Icons</template>
		<template #description>Access a collection of icons with language and directionality variants</template>
	</cdx-card>
	<cdx-card url="./composables/overview.html" :icon="cdxIconLayout">
		<template #title>Composables</template>
		<template #description>Re-use logic and apply common patterns from the Codex codebase</template>
	</cdx-card>
</div>

## Resources

- [**Figma**](https://www.figma.com/community/file/1448742124788019850/codex): design with Codex components in Figma.
- [**MediaWiki**](https://www.mediawiki.org/wiki/Codex): learn about using Codex within MediaWiki.
- [**Gerrit**](https://gerrit.wikimedia.org/r/admin/repos/design/codex): visit the canonical Codex codebase.
- [**GitHub**](https://github.com/wikimedia/design-codex): visit a mirror of the Gerrit codebase on GitHub.

## Posts

<div class="cdx-docs-home__posts">
	<cdx-card
		class="cdx-docs-home__posts__post--set-background-position"
		url="https://diff.wikimedia.org/2024/12/18/codex-year-2024-in-reviewkey-milestones-and-innovations/"
		:thumbnail="{ url: 'https://diff.wikimedia.org/wp-content/uploads/2024/12/grid-template-2.jpg?fit=600%2C400' }">
		<template #title>Codex – Year 2024 in Review</template>
		<template #description> 18 December 2024 by Volker E. and Wikimedia Foundation Design System Team</template>
	</cdx-card>
	<cdx-card url="https://diff.wikimedia.org/2024/05/16/making-the-wikiverse-more-inclusive-our-journey-with-codex-and-beyond/" :thumbnail="{ url: 'https://diff.wikimedia.org/wp-content/uploads/2024/05/this-is-for-everyone.png?fit=600%2C213' }">
		<template #title>Making the Wikiverse More Inclusive: Our Journey with Codex and Beyond</template>
		<template #description>16 May 2024 by Volker E.</template>
	</cdx-card>
	<cdx-card url="https://diff.wikimedia.org/2022/12/22/creating-the-wikimedia-design-system/" :thumbnail="{ url: 'https://diff.wikimedia.org/wp-content/uploads/2022/12/CodexDiffPost-HeaderImage.png?fit=600%2C238' }">
		<template #title>Creating the Wikimedia Design System</template>
		<template #description>22 December 2022 by ATomasevich WMF, Lauren de Lench, Bárbara Martínezand Volker E.	</template>
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
		position: relative;
		left: @spacing-half;
		width: @size-viewport-width-full;
		margin-bottom: @spacing-200;
		margin-left: calc( @size-viewport-width-full / -2 );
		padding: @spacing-150;

		@media screen and ( min-width: @min-width-breakpoint-mobile ) {
			/* Accounts for .VPDoc having padding-top: 32px */
			margin-top: -@spacing-200;
		}

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			/* Accounts for .VPDoc having padding-top: 48px */
			margin-top: -@spacing-300;
			padding: @spacing-200;
		}

		&__content {
			--vp-width-tablet: 752px;
			--vp-width-desktop: 784px;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				/* borrowing width value of .VPDoc > .container > .content
					to ensure content stays aligned */
				max-width: var( --vp-width-tablet );
				margin: 0;
			}

			@media screen and ( min-width: @min-width-breakpoint-desktop ) {
				/* borrowing width value of .VPDoc > .container > .content
					to ensure content stays aligned */
				max-width: var( --vp-width-desktop );
				margin: 0 auto;
				padding: 0 @spacing-300;
			}

			@media screen and ( min-width: @min-width-breakpoint-desktop-wide ) {
				padding: 0 @spacing-200;
			}
		}

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

		&__content div {
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
			margin: 0;
			font-family: @font-family-base;
			font-size: @font-size-cdx-docs-tagline;
			font-weight: @font-weight-bold;
			line-height: initial;
		}
	}

	&__features,
	&__posts {
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

	&__posts {
		&__post--set-background-position {
			.cdx-thumbnail__image {
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				background-position: 0, 0;
			}
		}
	}
}
/* stylelint-enable selector-class-pattern */
</style>
