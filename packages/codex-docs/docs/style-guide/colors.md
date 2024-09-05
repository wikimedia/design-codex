---
outline: [2,3]
---

<script setup>
import CdxDocsColorLists from '../../src/components/color-lists/ColorLists.vue';
</script>

# Colors

::: warning NOTICE
Colors are currently being updated. This page is not a completely accurate depiction of new colors being added and existing colors being altered.
:::

The Codex color palette is used to bring visual meaning to interface elements and convey specific
messages in certain instances. The primary colors used are various shades of gray as textual and
foundational elements, blue as progressive elements, and red, yellow, and green to convey status.

<div class="cdx-docs-primary-colors">
	<div class="cdx-docs-primary-colors__subtle"></div>
	<div class="cdx-docs-primary-colors__neutral"></div>
	<div class="cdx-docs-primary-colors__neutral-subtle"></div>
	<div class="cdx-docs-primary-colors__base"></div>
	<div class="cdx-docs-primary-colors__progressive"></div>
	<div class="cdx-docs-primary-colors__red"></div>
	<div class="cdx-docs-primary-colors__yellow"></div>
	<div class="cdx-docs-primary-colors__green"></div>
</div>

For documentation on how all colors are applied, visit [Color tokens](../design-tokens/color.md).

To check the contrast ratio between two colors, visit the [WebAIM contrast checker](http://webaim.org/resources/contrastchecker/).

## Color options

<cdx-docs-color-lists />

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-primary-colors {
	display: grid;
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	grid-template-columns: repeat( 12, 1fr );
	grid-template-rows: repeat( 6, 1fr );

	// We want the grid to be 1/3rd as tall as it is wide. This hidden grid item will span 4
	// columns, or 1/3rd the width of the grid, then has a padding-bottom of 100% to make it the
	// height of 1/3rd of the grid. This will force the entire visible grid to be the right height.
	&::before {
		content: '';
		// Span 1/3rd the width of the grid.
		grid-column: 1 / span 4;
		// Span the full height of the grid.
		grid-row: 1 / span 6;
		width: 0;
		// Make the "height" of this item equal to 4 columns, the column-span of this item.
		padding-bottom: @size-full;
	}

	&__subtle {
		background-color: @color-subtle;
		grid-column: 1 / span 2;
		grid-row: 1 / span 3;
	}

	&__neutral {
		background-color: @background-color-neutral;
		grid-column: 3;
		grid-row: 1 / span 3;
	}

	&__neutral-subtle {
		background-color: @background-color-neutral-subtle;
		grid-column: 4;
		grid-row: 1 / span 3;
	}

	&__base {
		background-color: @color-base;
		grid-column: 1 / span 4;
		grid-row: 4 / span 3;
	}

	&__progressive {
		background-color: @background-color-progressive;
		grid-column: 5 / span 4;
		grid-row: 1 / span 6;
	}

	&__red {
		background-color: @color-error;
		grid-column: 9 / span 4;
		grid-row: 1 / span 2;
	}

	&__yellow {
		background-color: @color-warning;
		grid-column: 9 / span 4;
		grid-row: 3 / span 2;
	}

	&__green {
		background-color: @color-success;
		grid-column: 9 / span 4;
		grid-row: 5 / span 2;
	}
}
</style>
