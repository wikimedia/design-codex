<template>
	<!--
		On non-component pages, add dir="ltr" to make bidirectional styles work.
		On component pages, we have to add dir="ltr" on the demo container instead, and separately
		on each container that contains other components, because our bidirectional styles don't
		support nesting multiple containers with dir attributes.
	-->
	<layout :dir="isComponentPage ? undefined : 'ltr'" :class="layoutClasses">
		<template #nav-bar-title-after>
			<cdx-docs-beta-tag />
		</template>
		<template #nav-bar-content-after>
			<cdx-docs-appearance-menu
				v-model:color-mode="colorMode"
				v-model:font-mode="fontMode"
				:dir="isComponentPage ? 'ltr' : undefined"
			/>
			<a
				href="https://github.com/wikimedia/design-codex"
				class="cdx-docs-github-link"
				aria-label="Codex on GitHub"
			>
				<span class="cdx-docs-github-link__icon vpi-social-github" />
			</a>
		</template>
		<template #doc-before>
			<cdx-docs-version-banner v-if="!frontmatter.isHomepage" />
		</template>
		<template v-if="showReturnToTopButton && !isTopOfPage" #doc-bottom>
			<cdx-docs-return-to-top />
		</template>
	</layout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CdxDocsBetaTag from '../beta-tag/BetaTag.vue';
import CdxDocsAppearanceMenu from '../appearance-menu/AppearanceMenu.vue';
import CdxDocsVersionBanner from '../version-banner/VersionBanner.vue';
import CdxDocsReturnToTop from '../return-to-top/ReturnToTop.vue';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter, isDark } = useData();

// Set up return-to-top button.
const isComponentPage = computed( () => route.path.includes( '/components/demos/' ) );
const isLinkPage = computed( () => route.path.includes( '/components/mixins/link' ) );
const isTooltipPage = computed( () => route.path.includes( '/components/directives/tooltip' ) );
const showReturnToTopButton = computed(
	() => isComponentPage.value || isLinkPage.value || isTooltipPage.value
);
// Initially hide the "return to top" button when at the top of the page.
const isTopOfPage = ref( true );
function handleScroll() {
	isTopOfPage.value = window.scrollY === 0;
}

// Color and font modes.
const colorMode = ref( 'system' );
const colorModeIsDark = computed( () => colorMode.value === 'dark' ||
	( colorMode.value === 'system' && window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches ) );
const fontMode = ref( 'medium' );

const layoutClasses = computed( () => ( {
	[ `cdx-docs-font-mode--${ fontMode.value }` ]: fontMode.value !== ''
} ) );

/**
 * Update classes on the root element for dark mode.
 *
 * The `cdx-docs-color-mode--dark` class is used in this file to add dark mode tokens. The `dark`
 * class is used by VitePress to apply their dark mode tokens.
 */
function updateDocumentClass() {
	// Update VitePress's ref that tracks whether we're in dark mode. This can be used throughout
	// the site, e.g. on the Colors design tokens page.
	isDark.value = colorModeIsDark.value;
	if ( colorModeIsDark.value ) {
		document.documentElement.classList.add( 'cdx-docs-color-mode--dark', 'dark' );
	} else {
		document.documentElement.classList.remove( 'cdx-docs-color-mode--dark', 'dark' );
	}
}

onMounted( () => {
	colorMode.value = localStorage.getItem( 'cdxColorMode' ) ?? 'system';
	fontMode.value = localStorage.getItem( 'cdxFontMode' ) ?? 'medium';

	window.addEventListener( 'scroll', handleScroll );
	updateDocumentClass();
} );

onUnmounted( () => {
	window.removeEventListener( 'scroll', handleScroll );
} );

watch( colorMode, updateDocumentClass );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-dark.less';
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-small.less';
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-large.less';
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-x-large.less';

html.cdx-docs-color-mode {
	&--dark {
		.cdx-mode-dark();
	}
}

// Use the font mode mixins to apply the appropriate font mode when one is selected.
.cdx-docs-font-mode {
	&--small {
		.cdx-mode-small();
	}

	&--large {
		.cdx-mode-large();
	}

	&--x-large {
		.cdx-mode-x-large();
	}
}

.cdx-docs-github-link {
	margin-left: @spacing-75;

	// Use the VitePress GitHub link on small screens since it's placed within the menu there.
	@media ( max-width: 767px ) {
		display: none;
	}

	&__icon {
		display: block;
		width: @size-125;
		height: @size-125;
	}
}
</style>
