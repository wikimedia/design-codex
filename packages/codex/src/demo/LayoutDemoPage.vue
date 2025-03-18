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

				<h3 id="grid">CSS Grid Layout</h3>
				<p>
					Examples of the CSS Grid layout system using the
					<code>cdx-mixin-grid-container</code>, <code>cdx-mixin-grid-item</code>,
					and <code>cdx-mixin-grid-position</code> mixins.
				</p>

				<h4>Basic Grid</h4>
				<p>
					A basic responsive grid layout with equal-width columns that adjusts based on
					screen size.
					Resize your browser to see the responsive behavior.
				</p>
				<div class="cdx-demo-grid cdx-demo-grid--basic">
					<div class="cdx-demo-grid__item">1</div>
					<div class="cdx-demo-grid__item">2</div>
					<div class="cdx-demo-grid__item">3</div>
					<div class="cdx-demo-grid__item">4</div>
					<div class="cdx-demo-grid__item">5</div>
					<div class="cdx-demo-grid__item">6</div>
					<div class="cdx-demo-grid__item">7</div>
					<div class="cdx-demo-grid__item">8</div>
				</div>

				<h4>Column Spanning</h4>
				<p>
					Items that span different number of columns across breakpoints using
					<code>cdx-mixin-grid-item</code>.
				</p>
				<div class="cdx-demo-grid cdx-demo-grid--spanning">
					<div class="cdx-demo-grid__item cdx-demo-grid__item--half">
						Spans half on desktop, full on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--half">
						Spans half on desktop, full on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--third">
						Third on desktop, half on tablet, full on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--third">
						Third on desktop, half on tablet, full on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--third">
						Third on desktop, full on tablet and mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--quarter">
						Quarter on desktop, quarter on tablet, half on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--quarter">
						Quarter on desktop, quarter on tablet, half on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--quarter">
						Quarter on desktop, quarter on tablet, half on mobile
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--quarter">
						Quarter on desktop, quarter on tablet, half on mobile
					</div>
				</div>

				<h4>Precise Positioning</h4>
				<p>
					Items positioned at specific Grid coordinates using
					<code>cdx-mixin-grid-position</code>.
				</p>
				<div class="cdx-demo-grid cdx-demo-grid--positioned">
					<cdx-container
						class="cdx-demo-grid__item cdx-demo-grid__item--header"
						size="x-large"
					>
						Header (full width) in Container component.
					</cdx-container>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--sidebar">
						Sidebar (left on desktop, top on mobile)
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--main">
						Main Content (right on desktop, bottom on mobile)
					</div>
					<div class="cdx-demo-grid__item cdx-demo-grid__item--footer">
						Footer (full width)
					</div>
				</div>
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
@import ( reference ) '../themes/mixins/wip/grid.less';

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

// Grid demos.
.cdx-demo-grid {
	// Stylelint false positive: Thinks it's a Container query.
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	.cdx-mixin-grid-container();
	margin-bottom: @spacing-200;
}

.cdx-demo-grid__item {
	background-color: @background-color-progressive-subtle;
	border: @border-progressive;
	border-radius: @border-radius-base;
	padding: @spacing-100;
	text-align: center;
}

// Basic Grid.
.cdx-demo-grid--basic {
	.cdx-demo-grid__item {
		// Desktop: 3 columns per row (8 items total = 3 rows)
		// Tablet: 2 columns per row (8 items total = 4 rows)
		// Mobile: 1 column per row (8 items total = 8 rows)
		.cdx-mixin-grid-item( 6, 4, 4 );
	}
}

// Column spanning.
.cdx-demo-grid--spanning {
	.cdx-demo-grid__item--half {
		.cdx-mixin-grid-item( 12, 8, 4 );
	}

	.cdx-demo-grid__item--third {
		.cdx-mixin-grid-item( 8, 4, 4 );
	}

	.cdx-demo-grid__item--quarter {
		.cdx-mixin-grid-item( 6, 2, 2 );
	}
}

// Precise positioning.
.cdx-demo-grid--positioned {
	// TODO: Don't use `size` token.
	min-height: @size-1600;

	.cdx-demo-grid__item--header {
		background-color: @background-color-progressive;
		color: @color-inverted;
		.cdx-mixin-grid-position( 1, 25, 1, 9, 1, 5 );
	}

	.cdx-demo-grid__item--sidebar {
		background-color: @background-color-neutral;
		// Stretch the Grid item to the bottom of the Grid aka the full height.
		align-self: stretch;
		.cdx-mixin-grid-position( 1, 7, 1, 3, 1, 5 );
	}

	.cdx-demo-grid__item--main {
		background-color: @background-color-neutral-subtle;
		// Stretch the Grid item to the bottom of the Grid aka the full height.
		align-self: stretch;
		.cdx-mixin-grid-position( 7, 25, 3, 9, 1, 5 );
	}

	.cdx-demo-grid__item--footer {
		background-color: @background-color-destructive-subtle;
		color: @color-base;
		.cdx-mixin-grid-position( 1, 25, 1, 9, 1, 5 );
	}
}
</style>
