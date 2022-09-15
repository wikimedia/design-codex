<script setup>
import { CdxIcon, CdxButton, CdxCard } from '@wikimedia/codex';
import { cdxIconLogoWikimedia, cdxIconKey, cdxIconPuzzle, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import { version } from '../../codex/package.json';
</script>

<div class="cdx-docs-home">

<div class="cdx-docs-home__hero-background">
	<div class="cdx-docs-home__hero">
		<cdx-icon class="cdx-docs-home__hero__icon" :icon="cdxIconLogoWikimedia" />
		<p class="cdx-docs-home__hero__title">Codex</p>
		<p class="cdx-docs-home__hero__version">Current version: {{ version }}</p>
	</div>
</div>

# Codex

Codex is a toolkit for building user interfaces within the Wikimedia Design System.

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
	<cdx-card url="./design-tokens/overview.html" :icon="cdxIconKey">
		<template #title>Design tokens</template>
		<template #description>Write styles consistent with the Wikimedia Design System</template>
	</cdx-card>
	<cdx-card url="./components/overview.html" :icon="cdxIconPuzzle">
		<template #title>Components</template>
		<template #description>Build usable, accessible, translatable applications</template>
	</cdx-card>
	<cdx-card url="./icons/overview.html" :icon="cdxIconInfoFilled">
		<template #title>Icons</template>
		<template #description>Access a collection of icons with language and directionality variants</template>
	</cdx-card>
</div>

## Resources

<div class="cdx-docs-home__resources">
	<cdx-card url="https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?node-id=1891%3A4420">
		<template #title>Figma kit</template>
		<template #description>View the Figma design specifications</template>
	</cdx-card>
	<cdx-card url="https://www.mediawiki.org/wiki/Codex">
		<template #title>Using Codex in MediaWiki</template>
		<template #description>Learn about using Codex within the MediaWiki platform</template>
	</cdx-card>
	<cdx-card url="https://gerrit.wikimedia.org/r/admin/repos/design/codex">
		<template #title>View code on Gerrit</template>
		<template #description>The canonical Codex codebase</template>
	</cdx-card>
	<cdx-card url="https://github.com/wikimedia/design-codex">
		<template #title>View code on GitHub</template>
		<template #description>A mirror of the Gerrit codebase on GitHub</template>
	</cdx-card>
</div>

</div>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

@cdx-docs-spacing-layout: 32px;

.cdx-docs-home {
	.cdx-card {
		color: @color-base;

		&:hover {
			color: @color-base;
			text-decoration: none;
		}
	}
	&__hero-background {
		background-color: @background-color-progressive;
		margin-right: -( @cdx-docs-spacing-layout );
		margin-left: -( @cdx-docs-spacing-layout );
		margin-bottom: @cdx-docs-spacing-layout;
		width: calc( 100% + ( @cdx-docs-spacing-layout * 2 ) );
	}

	&__hero {
		color: @color-inverted;
		padding: @cdx-docs-spacing-layout;

		p {
			margin: 0;
		}

		&__icon {
			color: @color-inverted;
			margin-bottom: @cdx-docs-spacing-layout * 2;
			
			svg {
				// 5em, to match the title.
				height: 80px;
				width: 80px;
			}
		}

		&__title {
			font-size: 5em;
			font-weight: @font-weight-bold;
		}

		&__version {
			font-size: 1.5em; 
			font-family: @font-family-serif;
		}
	}

	&__features {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}

	&__resources {
		display: flex;
		flex-wrap: wrap;
		column-gap: 8px;
		row-gap: 8px;

		.cdx-card {
			width: calc( 50% - 8px );

			&:hover {
				text-decoration: none;
			}
		}
	}
}
</style>