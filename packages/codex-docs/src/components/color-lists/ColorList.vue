<template>
	<ol class="cdx-docs-color-list">
		<li
			v-for="item in props.items"
			:key="item.name"
			class="cdx-docs-color-list__item"
			:style="{ backgroundColor: item.value }"
		>
			<code class="cdx-docs-color-list__item__color-name">
				{{ item.name }}
			</code>
			<code class="cdx-docs-color-list__item__color-code">
				{{ item.value }}
			</code>
		</li>
	</ol>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { ColorItem } from '../../types';

/**
 * A visual list of colors to showcase and compare.
 */

const props = defineProps<{
  items: ColorItem[]
}>();
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-color-list {
	ol& {
		padding: 0;
	}

	&__item {
		display: flex;
		justify-content: space-between;
		padding: @spacing-50;
	}

	// Give the white item a border.
	&:first-child {
		.cdx-docs-color-lists__list__item {
			border: @border-width-base @border-style-base @border-color-muted;
		}
	}
}
</style>
