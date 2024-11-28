<template>
	<section id="cdx-breadcrumb">
		<h2>Breadcrumb</h2>
		<h3>Breadcrumb with exact items</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				overflow-aria-label="More navigation options"
				:max-visible="4"
				:truncate-length="20"
			/>
		</div>
		<h3>Breadcrumb with overflow menu</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				overflow-aria-label="More navigation options"
				:max-visible="3"
				:truncate-length="20"
			/>
		</div>
		<h3>Breadcrumb with single visible item</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				overflow-aria-label="More navigation options"
				:max-visible="1"
				:truncate-length="15"
			/>
		</div>
		<h3>Breadcrumb with truncated item</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<cdx-breadcrumb
				:items="breadcrumbItems"
				overflow-aria-label="More navigation options"
				:max-visible="4"
				:truncate-length="15"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxBreadcrumb from '../components-wip/breadcrumb/Breadcrumb.vue';

const breadcrumbItems = [
	{ text: 'Main Page', href: 'https://en.wikipedia.org/wiki/Main_Page', showDivider: true },
	{ text: 'Contents', href: 'https://en.wikipedia.org/wiki/Wikipedia:Contents', showDivider: true },
	{ text: 'Featured content', href: 'https://en.wikipedia.org/wiki/Wikipedia:Featured_content', showDivider: true },
	{ text: 'Featured topics', href: 'https://en.wikipedia.org/wiki/Wikipedia:Featured_topics', active: true, showDivider: false }
];

</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-flex-container {
	display: flex;
	gap: @spacing-100;
}
</style>
