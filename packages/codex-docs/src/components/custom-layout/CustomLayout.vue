<template>
	<!--
		On non-component pages, add dir="ltr" to make bidirectional styles work.
		On component pages, we have to add dir="ltr" on the demo container instead, and separately
		on each container that contains other components, because our bidirectional styles don't
		support nesting multiple containers with dir attributes.
	-->
	<Layout :dir="isComponentPage ? undefined : 'ltr'">
		<template #doc-before>
			<cdx-docs-version-banner v-if="!frontmatter.isHomepage" />
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CdxDocsVersionBanner from '../version-banner/VersionBanner.vue';
import { useRoute, useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme;

const route = useRoute();
const isComponentPage = computed( () => route.path.includes( '/components/demos/' ) );

const { frontmatter } = useData();
</script>
