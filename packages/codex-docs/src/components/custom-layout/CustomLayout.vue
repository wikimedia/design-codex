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
	</layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CdxDocsBetaTag from '../beta-tag/BetaTag.vue';
import CdxDocsVersionBanner from '../version-banner/VersionBanner.vue';

const { Layout } = DefaultTheme;
const route = useRoute();
const isComponentPage = computed( () => route.path.includes( '/components/demos/' ) );
const { frontmatter } = useData();
</script>
