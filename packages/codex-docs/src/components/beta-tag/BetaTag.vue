<template>
	<div v-if="theme.isMainBranch" class="cdx-docs-beta-tag">
		Beta version
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useData } from 'vitepress';
import { CustomConfig } from '../../../docs/.vitepress/types';

export default defineComponent( {
	name: 'CdxDocsBetaTag',
	setup() {
		const { theme } = useData<CustomConfig>();
		return {
			theme
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-beta-tag {
	background-color: @background-color-warning-subtle;
	color: @color-base;
	margin-left: @spacing-50;
	border: @border-width-base @border-style-base @border-color-warning;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-50;
	font-size: @font-size-x-small;
	font-weight: @font-weight-bold;
	white-space: nowrap;
}
</style>
