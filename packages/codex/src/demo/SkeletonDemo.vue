<template>
	<section id="cdx-skeleton">
		<h2>Skeleton</h2>

		<h3>Line</h3>
		<cdx-skeleton :announce="true" />
		<br>
		<cdx-skeleton />

		<h3>Rectangle</h3>
		<cdx-skeleton shape="rectangle" :announce="true" />

		<h3>Card skeleton</h3>
		<div class="cdx-skeleton-demo__card cdx-card" aria-busy="true">
			<cdx-skeleton
				shape="rectangle"
				class="cdx-skeleton-demo__thumbnail"
				:announce="true"
			/>
			<span class="cdx-skeleton-demo__text cdx-card__text">
				<cdx-skeleton />
				<cdx-skeleton class="cdx-skeleton-demo__text__short" />
			</span>
		</div>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxSkeleton from '../components-wip/skeleton/Skeleton.vue';
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-skeleton-demo {
	&__card {
		pointer-events: none;
		align-items: flex-start;
	}

	&__thumbnail {
		flex-shrink: 0;
		width: @size-300;
		height: @size-300;
		margin-right: @spacing-75;
	}

	&__text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: @spacing-25;

		&__short {
			// TODO: We could consider a golden ratio or two thirds token here.
			width: @size-half;
		}
	}
}
</style>
