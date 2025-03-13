<!-- eslint-disable vue/singleline-html-element-content-newline max-len -->
<template>
	<demo-base-layout class="cdx-demo-layout">
		<template #header>
			Codex Layout
		</template>
		<template #content>
			<section id="layout" class="cdx-demo-layout__container">
				<h2>Layouts</h2>
				<h3 id="container-ordered">Container</h3>
				<p>
					This demo uses the Container layout component to list containers from medium to
					full size top to bottom.
				</p>
				<cdx-container
					class="cdx-demo-layout__container--ordered"
					size="medium"
				>
					<div class="cdx-demo-layout__container__content">
						Medium (<code>medium</code>) container.
					</div>
				</cdx-container>
				<cdx-container
					class="cdx-demo-layout__container--ordered"
					size="large"
				>
					<div class="cdx-demo-layout__container__content">
						Large (<code>large</code>) container.
					</div>
				</cdx-container>
				<cdx-container
					class="cdx-demo-layout__container--ordered"
					size="x-large"
				>
					<div class="cdx-demo-layout__container__content">
						Extra large (<code>x-large</code>) container.
					</div>
				</cdx-container>
				<cdx-container
					class="cdx-demo-layout__container--ordered"
					size="full"
				>
					<div class="cdx-demo-layout__container__content">
						Full (<code>full</code>) no <code>max-width</code> container.
					</div>
				</cdx-container>
			</section>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxContainer from '../components-wip/container/Container.vue';
import DemoBaseLayout from './DemoBaseLayout.vue';
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-container.cdx-demo-layout__container--ordered {
	background-color: @background-color-neutral;
	min-height: @size-400;
	margin-bottom: @spacing-100;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-100;
}

.cdx-demo-layout__container__content {
	background-color: @background-color-neutral-subtle;
	display: flex;
	// Put text nodes at bottom of Container.
	align-items: flex-end;
	box-sizing: @box-sizing-base;
	min-width: @size-full;
	min-height: inherit;
	border: @border-width-base @border-style-dashed @border-color-base;
	padding: @spacing-25 @spacing-50;
	font-size: @font-size-small;
}
</style>
