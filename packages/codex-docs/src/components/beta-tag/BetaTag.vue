<template>
	<div v-if="theme.isMainBranch" class="cdx-docs-beta-tag">
		<span>Beta</span><span class="cdx-docs-beta-tag__sr-text"> version</span>
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
@import ( reference ) '../../../../codex/src/themes/mixins/common.less';

.cdx-docs-beta-tag {
	background-color: @background-color-warning-subtle;
	color: @color-base;
	display: flex;
	align-items: center;
	min-height: @min-size-interactive-pointer;
	margin-left: @spacing-50;
	border: @border-width-base @border-style-base @border-color-warning;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-75;
	font-size: @font-size-x-small;
	white-space: nowrap;

	&__sr-text {
		.screen-reader-text();
	}
}
</style>
