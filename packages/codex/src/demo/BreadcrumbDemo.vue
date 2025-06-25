<template>
	<section id="cdx-breadcrumb">
		<h2>Breadcrumb</h2>
		<h3>Breadcrumb with exact items</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				:max-visible="4"
				:truncate-length="20"
			/>
		</div>
		<h3>Breadcrumb with overflow menu</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				:max-visible="3"
				:truncate-length="20"
			/>
		</div>
		<h3>Breadcrumb with single visible item</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				:max-visible="1"
				:truncate-length="15"
			/>
		</div>
		<h3>Breadcrumb with truncated item</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				:max-visible="4"
				:truncate-length="15"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxBreadcrumb from '../components-wip/breadcrumb/Breadcrumb.vue';
import { BreadcrumbItem } from '../types';

const breadcrumbItems: BreadcrumbItem[] = [
	{ label: 'Main Page', url: 'https://en.wikipedia.org/wiki/Main_Page' },
	{ label: 'Contents', url: 'https://en.wikipedia.org/wiki/Wikipedia:Contents' },
	{ label: 'Featured content', url: 'https://en.wikipedia.org/wiki/Wikipedia:Featured_content' },
	{ label: 'Featured topics', url: 'https://en.wikipedia.org/wiki/Wikipedia:Featured_topics' }
];

</script>
