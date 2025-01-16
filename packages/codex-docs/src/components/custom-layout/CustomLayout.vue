<template>
	<!--
		On non-component pages, add dir="ltr" to make bidirectional styles work.
		On component pages, we have to add dir="ltr" on the demo container instead, and separately
		on each container that contains other components, because our bidirectional styles don't
		support nesting multiple containers with dir attributes.
	-->
	<layout :dir="isComponentPage ? undefined : 'ltr'">
		<template #nav-bar-title-after>
			<cdx-docs-beta-tag />
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
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CdxDocsBetaTag from '../beta-tag/BetaTag.vue';
import CdxDocsVersionBanner from '../version-banner/VersionBanner.vue';
import CdxDocsReturnToTop from '../return-to-top/ReturnToTop.vue';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter } = useData();
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

onMounted( () => {
	window.addEventListener( 'scroll', handleScroll );
} );

onUnmounted( () => {
	window.removeEventListener( 'scroll', handleScroll );
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-dark.less';

// Use the dark mode mixin to set up dark mode CSS properties when the html element has the `dark`
// class (which gets added by VitePress when dark mode is on).
/* stylelint-disable-next-line selector-class-pattern */
html.dark {
	.cdx-mode-dark();
}
</style>
