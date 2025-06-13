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
		<div class="cdx-docs-home__hero__title">
			<img class="cdx-docs-home__hero__title-image" src="/logo-Codex-inverted.svg">
			<h1 class="cdx-docs-home__hero__title-text">Codex</h1>
		</div>
		<p class="cdx-docs-home__hero__tagline">The design system<br>for Wikimedia.</p>
	</div>
</div>

<cdx-docs-version-banner />

Current version: **{{ version }}**

Codex is designed and developed by contributors from the [Wikimedia Foundation](https://wikimediafoundation.org/),
[Wikimedia Deutschland](https://www.wikimedia.de/), and the [Wikimedia](https://www.wikimedia.org/)
volunteer community. [Get in touch](./using-codex/contact.md) with us.

<div class="cdx-docs-home__intros">
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
		:thumbnail="{ url: '/homepage-images/year-2024-in-review.jpg' }"
    >
		<template #title>Codex – Year 2024 in Review</template>
		<template #description> 18 December 2024 by Volker E. and Wikimedia Foundation Design System Team</template>
	</cdx-card>
	<cdx-card
        url="https://diff.wikimedia.org/2024/05/16/making-the-wikiverse-more-inclusive-our-journey-with-codex-and-beyond/"
        :thumbnail="{ url: '/homepage-images/wikiverse-inclusive.jpg' }"
    >
		<template #title>Making the Wikiverse More Inclusive: Our Journey with Codex and Beyond</template>
		<template #description>16 May 2024 by Volker E.</template>
	</cdx-card>
	<cdx-card
        url="https://diff.wikimedia.org/2022/12/22/creating-the-wikimedia-design-system/"
        :thumbnail="{ url: '/homepage-images/creating-the-wikimedia-design-system.jpg' }"
    >
		<template #title>Creating the Wikimedia Design System</template>
		<template #description>22 December 2022 by ATomasevich WMF, Lauren de Lench, Bárbara Martínezand Volker E.	</template>
	</cdx-card>
</div>

</div>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

@font-size-cdx-docs-title--mobile: 4em;
@font-size-cdx-docs-title: 8em;
@size-cdx-docs-title-icon--mobile: 3em;
@size-cdx-docs-title-icon: 6em;
@font-size-cdx-docs-tagline--mobile: 1.5em;
@font-size-cdx-docs-tagline: 2em;
@line-height-cdx-docs-tagline: 2.625rem;
@border-width-cdx-docs-intro-cards: 6px;

/* stylelint-disable selector-class-pattern */
.cdx-docs-home {
	&__hero {
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
			padding: calc( @spacing-300 * 2 ) @spacing-200;
		}

		&__content {
			--vp-width-desktop: 784px;
			display: flex;
			align-items: center;
			flex-direction: column;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
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

		&__title {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: @spacing-100;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				margin-bottom: @spacing-200;
			}
		}

		// Need to put `.vp-doc` here to override default VitePress styles for images and headings.

		.vp-doc &__title-image {
			width: @size-cdx-docs-title-icon--mobile;
			height: @size-cdx-docs-title-icon--mobile;
			margin-top: 0;
			margin-right: @spacing-100;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				width: @size-cdx-docs-title-icon;
				height: @size-cdx-docs-title-icon;
			}
		}

		.vp-doc &__title-text {
			color: @color-inverted-fixed;
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			max-width: 400px;
			font-family: @font-family-serif;
			font-size: @font-size-cdx-docs-title--mobile;
			line-height: initial;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				font-size: @font-size-cdx-docs-title;
			}
		}

		.vp-doc &__tagline {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			max-width: 330px;
			margin: 0;
			font-family: @font-family-base;
			font-size: @font-size-cdx-docs-tagline--mobile;
			line-height: initial;
			text-align: center;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				font-size: @font-size-cdx-docs-tagline;
				line-height: @line-height-cdx-docs-tagline;
			}
		}
	}

	&__intros,
	&__features {
		.cdx-card__text__title {
			color: @color-progressive;
			font-size: @font-size-large;
		}
	}

	&__intros {
		display: flex;
		gap: @spacing-100;
		margin-top: @spacing-200;

		.cdx-card {
			border: 0;
			border-top: @border-style-base @border-width-cdx-docs-intro-cards @border-color-interactive--active;
			border-radius: 0;
			padding: @spacing-100 0 0;
		}
	}

	&__features {
		display: grid;
		grid-gap: @spacing-125;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			grid-template-columns: repeat( 2, 1fr );
			grid-template-rows: repeat( 3, 1fr );
		}

		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			grid-template-columns: repeat( 3, 1fr );
			grid-template-rows: repeat( 2, 1fr );
		}

		.cdx-card {
			flex-direction: column;
			gap: @spacing-35;
			border: 0;
			padding: 0;
		}
	}

	&__resources {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-50;
		margin-top: @spacing-200;

		.cdx-card {
			width: calc( @size-half - @spacing-25 );

			&:hover {
				text-decoration: @text-decoration-none;
			}
		}
	}

	&__posts {
		display: flex;
		flex-direction: column;
		row-gap: @spacing-75;

		&__post--set-background-position {
			.cdx-thumbnail__image {
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				background-position: 0, 0;
			}
		}
	}

	h2 {
		margin-bottom: @spacing-150;
	}

	.cdx-card {
		&:hover {
			text-decoration: @text-decoration-none;
		}
	}
}
/* stylelint-enable selector-class-pattern */
</style>
