<script setup>
import CdxDocsColorList from '../../src/components/color-lists/ColorList.vue';
import optionTokens from '../../../codex-design-tokens/src/themes/wikimedia-ui.json';
const colorTokens = optionTokens.color;

const colors = {
	categorical: [ 'blue600', 'yellow300', 'red400', 'green300', 'lime500', 'blue300', 'purple500', 'pink300', 'yellow500', 'gray400' ],
	sequential1: [ 'blue600' ],
	sequential2 : [ 'blue600', 'blue400' ],
	sequential3: [ 'blue600', 'blue400', 'blue200' ],
	sequential4: [ 'blue800', 'blue600', 'blue400', 'blue200' ],
	sequential5: [ 'blue800', 'blue600', 'blue500', 'blue400', 'blue200' ],
	sequential6: [ 'blue800', 'blue700', 'blue600', 'blue500', 'blue400', 'blue200' ],
	sequential7: [ 'blue800', 'blue700', 'blue600', 'blue500', 'blue400', 'blue300', 'blue200' ],
	sequential8: [ 'blue900', 'blue800', 'blue700', 'blue600', 'blue500', 'blue400', 'blue300', 'blue200' ],
	sequential9: [ 'blue900', 'blue800', 'blue700', 'blue600', 'blue500', 'blue400', 'blue300', 'blue200', 'blue100' ],
	sequential10: [ 'blue1000', 'blue900', 'blue800', 'blue700', 'blue600', 'blue500', 'blue400', 'blue300', 'blue200', 'blue100' ],
	blueRed: [ 'blue600', 'blue500', 'blue400', 'green300', 'lime200', 'yellow200', 'orange300', 'red400', 'red500', 'red600' ]
}

const colorItems = {};
for ( var category in colors ) {
	const items = colors[ category ].map( ( color ) => {
		return {
			name: color,
			value: colorTokens[ color ].value
		}
	} );
	colorItems[ category ] = items;
}
</script>

# Data visualization

Data visualization is the representation of data using charts, graphs, maps, or infographics. It helps make complicated data easier to understand and more visually engaging to the reader. Good data visualizations tell a story, highlight patterns, and make it simple to compare different pieces of information.

The following guidelines reference [color design tokens](../design-tokens/color.md) are applied in the [MediaWiki Chart extension](https://mediawiki.org/wiki/Extension:Chart#Types_of_chart).

## About data visualization

Charts are powerful tools for visualizing data, making it easier to interpret trends, compare values, and communicate insights. Effective chart design involves understanding the key components of a chart, choosing the right type for the data, and following best practices for clarity and usability.

### Anatomy

A well-structured chart consists of the following key elements.

#### Title & Context

A clear, descriptive title and any necessary subtitles or contextual information help define what the chart is showing.
- `@color-emphasized` should be used in chart titles.
- `@color-subtle` should be used for any necesary chart descriptions.

#### Plot Area

The space where data points, gridlines, and other graphical elements are displayed.
- `@background-color-base` should be used for the background area of charts.
- `@border-color-subtle` can be used to frame the entire chart, separating it from other elements on the page.

#### Data Points

The individual elements that represent data within the chart.
- Read more about [using color for data](#using-color-for-data).

#### Axes, Labels, Grid Lines & Ticks

These elements provide scale, proportion, and reference points to make the data easier to interpret. Axes should be labeled clearly, and grid lines should be used sparingly to avoid visual clutter.
- `@border-color-emphasized` should be used for axis baselines and ticks.
- `@border-color-muted` should be used for grid lines.
- Ticks should be aligned to the center of the data point or label.

#### Baseline

Often representing zero, the baseline provides a key reference point. Bar charts should always start at zero, while line charts may not, as long as this is clearly indicated.

#### Legends

Used to identify different data series, legends should be placed close to the chart for easy reference and limited to a maximum of five colors for clarity.
- Legends should be oriented horizontally, inline, and wrap to the next line as needed on most charts.
- For charts which take up less space, such as pie or donut, legends can be oriented vertically.

#### Interactive Annotations & Reference Lines

Annotations (e.g., tooltips or popups on hover) provide additional information, while reference lines highlight specific values or targets.
- If available, tooltips and popups in charts should align to the styles of [Tooltip](../components/directives/tooltip.md) and [Popover](../components/demos/popover.md), using the same colors and styles.

## Choosing a chart

Different types of charts are best suited for different kinds of data and insights. The main chart types can be grouped by the following functions.

- **Comparison Charts** – Show differences between categories (e.g., bar charts, grouped bars, multi-line charts).
- **Trend Charts** – Illustrate changes over time (e.g., line charts, area charts, histograms, sparklines).
- **Part-to-Whole Charts** – Display how values contribute to a total (e.g., pie charts, stacked bars, treemaps).
- **Correlation Charts** – Highlight relationships between variables (e.g., scatterplots, heatmaps).
- **Ranking Charts** – Order data by value (e.g., ordered bar charts, parallel coordinates).

### Chart Design Guidelines

- [**Bar Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Bar) – Simple bar charts are ideal for comparing individual values. Grouped and stacked bars allow for more detailed comparisons but should be used carefully to avoid complexity.
- [**Line Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Line) – Best for showing trends over time, with multiple lines to compare different data sets.
- [**Pie**](https://www.mediawiki.org/wiki/Extension:Chart#Pie) **& Donut Charts** – Used for part-to-whole comparisons but should be used sparingly, as bar charts often communicate the same data more effectively.
- [**Area Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Area) – Combine elements of line and bar charts to show total values with breakdowns. Stacked area charts emphasize part-to-whole relationships.
- **Sparklines** – Compact, label-free charts useful for showing trends in small spaces, such as inline text or tables.
- **Display Statistics** – Highlight a single, key data point for emphasis.

By selecting the appropriate chart type and following best practices, data can be presented in a clear, engaging, and insightful manner.

## Using color for data

Color plays an important role in data visualization by helping to differentiate categories, highlight key insights, and guide interpretation. However, it should be used strategically. The goal is to enhance readability and comprehension without overwhelming the viewer.

Different types of data require different approaches to color selection. By choosing the right color strategy, charts can effectively communicate data in a way that is both visually appealing and easy to understand.

:::info
The following color palettes are designed to be used in both light and dark modes.
:::

### Categorical

Use for distinct, unrelated categories, such a countries or days of the week. Each category has a unique, distinguishable color.

With a categorical palette, the colors are meant to be used in order. For example, if only three data points need to be represented, the first three colors should be used.

<cdx-docs-color-list :items="colorItems.categorical" />

### Sequential

Use for data that follows a natural order, such as ranking. These palettes use a single hue that increases in intensity to represent higher values.

With a sequential palette, the colors used changes depending on how many data points need to be represented in a given chart.

:::info
The following example is blue, but any color from the [color palette](colors.md) can be used in the same pattern.
:::

#### 1 color

<cdx-docs-color-list :items="colorItems.sequential1" />

#### 2 colors

<cdx-docs-color-list :items="colorItems.sequential2" />

#### 3 colors

<cdx-docs-color-list :items="colorItems.sequential3" />

#### 4 colors

<cdx-docs-color-list :items="colorItems.sequential4" />

#### 5 colors

<cdx-docs-color-list :items="colorItems.sequential5" />

#### 6 colors

<cdx-docs-color-list :items="colorItems.sequential6" />

#### 7 colors

<cdx-docs-color-list :items="colorItems.sequential7" />

#### 8 colors

<cdx-docs-color-list :items="colorItems.sequential8" />

#### 9 colors

<cdx-docs-color-list :items="colorItems.sequential9" />

#### 10 colors

<cdx-docs-color-list :items="colorItems.sequential10" />

### Divergent

Use for data with a meaningful midpoint, such as temperature. These palettes use two contrasting colors that meet at a neutral middle shade.

With a divergent palette, colors are used from the entire spectrum of the palette as needed to represent specific data points, in whatever order is needed.

#### Blue Red

<cdx-docs-color-list :items="colorItems.blueRed" />

## Accessibility

By nature, charts which rely solely on colors to distinguish between values fall short of visible accessibility and inclusion, particularly when it comes to various types of color vision deficiencies. To increase accessibility compliance and inclusion, symbols can be used either as nodes (e.g. line, plot, etc.) or as patterns (e.g. bar, pie, etc.).

### Symbols

The following symbols were created to be used in the order provided, to ensure as much contrast in shape when viewed at small sizes.

[Download collection](../assets/visual-styles/data-visualization/codex-dataviz-symbols.zip)

<div class="cdx-docs-symbols">
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"/></svg>
		<small>circle</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7575 6.04807C18.0808 5.72472 18.0808 5.20048 17.7575 4.87713L15.1229 2.24251C14.7995 1.91916 14.2753 1.91916 13.9519 2.24251L10.5855 5.60897C10.2621 5.93231 9.73788 5.93231 9.41453 5.60897L6.04807 2.24251C5.72472 1.91916 5.20048 1.91916 4.87713 2.24251L2.24251 4.87713C1.91916 5.20048 1.91916 5.72472 2.24251 6.04807L5.60897 9.41453C5.93231 9.73788 5.93231 10.2621 5.60897 10.5855L2.24251 13.9519C1.91916 14.2753 1.91916 14.7995 2.24251 15.1229L4.87713 17.7575C5.20048 18.0808 5.72472 18.0808 6.04807 17.7575L9.41453 14.391C9.73788 14.0677 10.2621 14.0677 10.5855 14.391L13.9519 17.7575C14.2753 18.0808 14.7995 18.0808 15.1229 17.7575L17.7575 15.1229C18.0808 14.7995 18.0808 14.2753 17.7575 13.9519L14.391 10.5855C14.0677 10.2621 14.0677 9.73788 14.391 9.41453L17.7575 6.04807Z"/></svg>
		<small>cross</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.36744 3.32698C9.65183 2.89101 10.3482 2.89101 10.6326 3.32698L18.8967 15.9958C19.1861 16.4395 18.833 17 18.2641 17H1.73587C1.16695 17 0.813879 16.4395 1.1033 15.9958L9.36744 3.32698Z"/></svg>
		<small>triangle</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.77778C3 3.34822 3.34822 3 3.77778 3H16.2222C16.6518 3 17 3.34822 17 3.77778V16.2222C17 16.6518 16.6518 17 16.2222 17H3.77778C3.34822 17 3 16.6518 3 16.2222V3.77778Z"/></svg>
		<small>square</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.61616 14.4735C9.85368 14.3414 10.1463 14.3414 10.3838 14.4735L16.5454 17.9008C16.9125 18.105 17.382 17.9838 17.594 17.6301L19.897 13.7871C20.109 13.4334 19.9832 12.9811 19.616 12.7769L13.4545 9.34958C13.217 9.21746 13.0707 8.97331 13.0707 8.70909V2.73957C13.0707 2.33112 12.727 2 12.303 2L7.697 2C7.27303 2 6.92933 2.33112 6.92933 2.73957L6.92933 8.70909C6.92933 8.97331 6.78302 9.21746 6.54551 9.34957L0.383952 12.7769C0.0167899 12.9811 -0.109007 13.4334 0.102975 13.7871L2.40598 17.6301C2.61796 17.9838 3.08747 18.105 3.45464 17.9008L9.61616 14.4735Z"/></svg>
		<small>wishbone</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33173 0.349214C9.64445 -0.116404 10.3555 -0.116405 10.6683 0.349214L16.8738 9.5888C17.0421 9.83929 17.0421 10.1607 16.8738 10.4112L10.6683 19.6508C10.3555 20.1164 9.64445 20.1164 9.33173 19.6508L3.12617 10.4112C2.95794 10.1607 2.95794 9.83929 3.12617 9.5888L9.33173 0.349214Z"/></svg>
		<small>diamond</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.35721 0.520811C9.55122 -0.173605 10.4488 -0.173603 10.6428 0.520812L11.9678 5.26315C12.071 5.63277 12.4177 5.85199 12.7616 5.76513L17.1739 4.65071C17.82 4.48752 18.2688 5.33887 17.8167 5.8701L14.7294 9.49802C14.4887 9.78078 14.4887 10.2192 14.7294 10.502L17.8167 14.1299C18.2688 14.6611 17.82 15.5125 17.1739 15.3493L12.7616 14.2349C12.4177 14.148 12.071 14.3672 11.9678 14.7369L10.6428 19.4792C10.4488 20.1736 9.55122 20.1736 9.35721 19.4792L8.03224 14.7369C7.92897 14.3672 7.5823 14.148 7.2384 14.2349L2.82611 15.3493C2.18002 15.5125 1.73124 14.6611 2.18332 14.1299L5.27065 10.502C5.51128 10.2192 5.51128 9.78078 5.27064 9.49802L2.18331 5.8701C1.73124 5.33887 2.18002 4.48752 2.82611 4.65071L7.2384 5.76513C7.5823 5.85199 7.92897 5.63277 8.03224 5.26315L9.35721 0.520811Z"/></svg>
		<small>asterisk</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.992 2.10636C6.53409 1.76366 7.11755 2.30557 7.00247 2.92837C6.50433 5.62412 7.30167 8.51683 9.39242 10.6076C11.4832 12.6983 14.3759 13.4957 17.0716 12.9975C17.6944 12.8825 18.2363 13.4659 17.8936 14.008C17.5607 14.5346 17.1648 15.0328 16.7059 15.4917C13.3516 18.846 7.90189 18.8346 4.53363 15.4664C1.16536 12.0981 1.15404 6.64839 4.50833 3.2941C4.96723 2.8352 5.46535 2.43929 5.992 2.10636Z"/></svg>
		<small>moon</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9386 3.08126C19.6476 2.72103 20.323 3.63676 19.8329 4.29383L10.5776 16.7023C10.2815 17.0992 9.71852 17.0992 9.42241 16.7023L0.167144 4.29383C-0.322956 3.63676 0.352385 2.72103 1.0614 3.08126L7.46671 6.33566C9.07016 7.15034 10.9298 7.15034 12.5333 6.33566L18.9386 3.08126Z"/></svg>
		<small>caret</small>
	</div>
	<div>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.23232 1.52724C9.5027 0.824254 10.4973 0.824253 10.7677 1.52724L11.3333 2.99774C12.3358 5.60434 14.3957 7.66421 17.0023 8.66674L18.4728 9.23232C19.1757 9.5027 19.1757 10.4973 18.4728 10.7677L17.0023 11.3333C14.3957 12.3358 12.3358 14.3957 11.3333 17.0023L10.7677 18.4728C10.4973 19.1757 9.5027 19.1757 9.23232 18.4728L8.66674 17.0023C7.66421 14.3957 5.60434 12.3358 2.99774 11.3333L1.52724 10.7677C0.824254 10.4973 0.824253 9.5027 1.52724 9.23232L2.99774 8.66674C5.60434 7.66421 7.66421 5.60434 8.66674 2.99774L9.23232 1.52724Z"/></svg>
		<small>twinkle</small>
	</div>
</div>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

h4 {
	margin-bottom: @spacing-75;
}

.cdx-docs-symbols {
	display: grid;
	grid-auto-flow: row;
	gap: @spacing-75;
	margin-top: @spacing-200;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		grid-auto-flow: column;
	}

	div {
		display: flex;
		align-items: center;
		gap: @spacing-35;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			display: grid;
			justify-items: center;
			grid-auto-flow: row;
			gap: 0;
		}

		svg {
			fill: @color-base;
		}
	}
}

.cdx-docs-color-band {
	display: grid;
	grid-auto-flow: row;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: @size-275;
		padding: 0 @spacing-50;

		&:first-of-type {
			border-top-left-radius: @border-radius-base;
			border-top-right-radius: @border-radius-base;
		}

		&:last-of-type {
			border-bottom-left-radius: @border-radius-base;
			border-bottom-right-radius: @border-radius-base;
		}

		code {
			background-color: @background-color-neutral;
			padding: @spacing-12 @spacing-25;
		}
	}

	/* TODO: update colors */
	&__categorical-0 {
		background-color: @color-progressive;
	}

	&__categorical-1 {
		background-color: @color-progressive;
	}

	&__categorical-2 {
		background-color: @color-progressive;
	}

	&__categorical-3 {
		background-color: @color-progressive;
	}

	&__categorical-4 {
		background-color: @color-progressive;
	}

	&__categorical-5 {
		background-color: @color-progressive;
	}

	&__categorical-6 {
		background-color: @color-progressive;
	}

	&__categorical-7 {
		background-color: @color-progressive;
	}

	&__categorical-8 {
		background-color: @color-progressive;
	}

	&__categorical-9 {
		background-color: @color-progressive;
	}

	&__sequential-0 {
		background-color: @color-progressive;
		color: @color-base;
	}

	&__sequential-1 {
		background-color: @color-progressive;
	}

	&__sequential-2 {
		background-color: @color-progressive;
	}

	&__sequential-3 {
		background-color: @color-progressive;
	}

	&__sequential-4 {
		background-color: @color-progressive;
	}

	&__sequential-5 {
		background-color: @color-progressive;
	}

	&__sequential-6 {
		background-color: @color-progressive;
	}

	&__sequential-7 {
		background-color: @color-progressive;
	}

	&__sequential-8 {
		background-color: @color-progressive;
	}

	&__sequential-9 {
		background-color: @color-progressive;
	}

	&__divergent-0 {
		background-color: @color-progressive;
		color: @color-base;
	}

	&__divergent-1 {
		background-color: @color-progressive;
	}

	&__divergent-2 {
		background-color: @color-progressive;
	}

	&__divergent-3 {
		background-color: @color-progressive;
	}

	&__divergent-4 {
		background-color: @color-progressive;
	}

	&__divergent-5 {
		background-color: @color-progressive;
	}

	&__divergent-6 {
		background-color: @color-progressive;
	}

	&__divergent-7 {
		background-color: @color-progressive;
	}

	&__divergent-8 {
		background-color: @color-progressive;
	}

	&__divergent-9 {
		background-color: @color-progressive;
	}
}
</style>