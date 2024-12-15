<script setup>
import { CdxTable, CdxAccordion } from '@wikimedia/codex';
import TableColumnWidth from '@/../component-demos/table/examples/TableColumnWidth.vue';
import TableCustomCells from '@/../component-demos/table/examples/TableCustomCells.vue';
import TableWithSlots from '@/../component-demos/table/examples/TableWithSlots.vue';
import TableWithSort from '@/../component-demos/table/examples/TableWithSort.vue';
import TableWithSelection from '@/../component-demos/table/examples/TableWithSelection.vue';
import TableWithSelectionAndSort from '@/../component-demos/table/examples/TableWithSelectionAndSort.vue';
import TableWithPagination from '@/../component-demos/table/examples/TableWithPagination.vue';
import { ref, onMounted } from 'vue';

const controlsConfig = [
	{
		name: 'caption',
		type: 'text',
		initial: '1912 Olympics — Men\'s marathon'
	},
	{
		name: 'hideCaption',
		type: 'boolean'
	},
	{
		name: 'useRowHeaders',
		type: 'boolean'
	},
	{
		name: 'showVerticalBorders',
		type: 'boolean'
	},
	{
		name: 'header',
		type: 'slot'
	},
	{
		name: 'footer',
		type: 'slot'
	}
];

const columns = [
	{ id: 'athlete', label: 'Athlete' },
	{ id: 'nation', label: 'Nation' },
	{ id: 'rank', label: 'Rank', textAlign: 'number' },
	{ id: 'time', label: 'Time', textAlign: 'number' }
];

const data = [
	{ athlete: 'Ken McArthur', nation: 'South Africa', rank: 1, time: '2:36:54.8' },
	{ athlete: 'Christian Gitsham', nation: 'South Africa', rank: 2, time: '2:37:52.0' },
	{ athlete: 'Gaston Strobino', nation: 'United States', rank: 3, time: '2:38:42.4' },
	{ athlete: 'Shizo Kanakuri', nation: 'Japan', rank: 36, time: '54:08:06:05:32:20.3' }
];

const url = ref(null);
const rowsPerPage = ref(10);

onMounted(() => {
	url.value = new URL(window.location.href);
	url.value.hash = 'css-only-version';
	const searchParams = new URLSearchParams(window.location.search);
	rowsPerPage.value = parseInt(searchParams.get('rows') || '10', 10);
 });

const handleRowsChange = (event) => {
	rowsPerPage.value = event.target.value;
	url.value.searchParams.set('rows', rowsPerPage.value);
	window.location.href = url.value.href; // Redirect to the updated URL
};

</script>

A Table is a structural component used to arrange data in rows and columns to facilitate the
comparison, analysis and management of information.

<cdx-demo-wrapper :controls-config="controlsConfig" :force-reset="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-table v-bind="propValues" :data="data" :columns="columns">
		<template v-if="slotValues.header" #header>
			{{ slotValues.header }}
		</template>
		<template v-if="slotValues.footer" #footer>
			{{ slotValues.footer }}
		</template>
	</cdx-table>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Table

The content within a Table needs to be well-structured and optimized for readability and scanning. Tables should be avoided if there is limited space, if the information is too complex, or if the data cannot be easily categorized. Also, consider different presentations for standalone information, or when detailed analysis isn't the primary goal.

**Use the Table component when:**
- Users need a systematic representation of information that allows them to compare and analyze
  multiple data points across different categories.
- Users need to perform specific actions to modify items within a dataset, such as editing,
  deleting, or organizing.
- Users need to sort or filter data.

**Use lists, Cards, or text when or other simple layouts when:**
- There aren't multiple data points to compare.
- The information doesn't require sorting or filtering.

**Use charts or other data visualization methods when:**
- The primary goal is to provide a high-level overview rather than detailed analysis of the data.
- The data can't easily be laid out in a Table (e.g. when there are interdependencies between data points).

### About Table

Table includes the following elements.

#### Header (optional)

Tables can feature a header section with elements such as a visible caption or actions that can be applied to Table rows in bulk.

#### Caption

A caption provides a clear and concise description of the contents and the purpose of the Table. It
is important for accessibility, and must always be provided for users of assistive technology. The
caption can be visually hidden if a visible caption is not needed (e.g. if there is a heading above
the Table that serves as a title).

<cdx-demo-best-practices>
<cdx-demo-best-practice>A Table's caption should identify its content and context in a concise manner.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Actions (optional)

Actions that can be applied to all the items within a Table should be made available from the
header.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use normal or quiet Buttons to represent Table actions.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use MenuButton to group and display table actions when space in the header is limited.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use primary Buttons to represent Table actions, since they could compete with main page actions.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid using Table actions in the header for Tables with 5 rows or fewer. Instead, use [inline
actions](#custom-cell-content).

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Row selection (optional)

Row selection allows users to target the items that will be affected by Table actions. A custom
indicator of the number of selected rows can be included in the Table’s header for visibility (Refer
to the [row selection demo](#with-selection)).

#### Headings

Tables can feature column headings, row headings, or both. Headings are used to describe the type of
information or the category of the data contained by the list of elements they label. Column
headings are required.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Always include column headings.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use icons as column headings.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Sorting (optional)

Sorting allows users to organize data according to specific criteria (e.g. alphabetically). It
facilitates the analysis of data, identification of patterns, and comparison of values within
Tables.

#### Table data

Table cells are individual units of information, organized at the intersection of rows and columns.
They can contain any sort of content, from simple text to iconography, images and components in any
necessary order or combination.

Tables can also features a `<tfoot>` at the end of the data for things like totals.

<cdx-demo-best-practices>
<cdx-demo-best-practice>By default, align cell content to the start of the cell. For cells containing numbers that need to be compared, like currencies, align the text to the right of the cell in both reading directionalities.</cdx-demo-best-practice>
<cdx-demo-best-practice>Match the alignment of column headings with their data.</cdx-demo-best-practice>
<cdx-demo-best-practice>Add vertical borders to Table data if needed for better readability.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Pagination (optional)

Pagination controls can be included to allow users to page through long datasets. Pagination can be
placed above the Table data, below it, or both.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">Don't use pagination if all rows can easily be displayed on one page.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Footer (optional)

Tables can feature fully customizable footer content.


:::tip Learn more about tables
1. [Web Typography: Designing Tables to be Read, Not Looked At](https://alistapart.com/article/web-typography-tables/) by Richard Rutter
2.  [Inclusive Components: Data Tables](https://inclusive-components.design/data-tables/), by Heydon Pickering
:::

## Examples

### Column sizing

By default, the width of each Table column will be determined by its content and the available space. If needed, you can set specific widths on some or all columns.

<cdx-demo-wrapper>
<template v-slot:demo>
	<table-column-width />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableColumnWidth.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableColumnWidth.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The [TableColumn type](../types-and-constants.md#tablecolumn) has optional properties for `width`
and `minWidth` so you can customize each column's size. Include the units, e.g. `'120px'` or
`'100%'`.

</cdx-accordion>

### Custom cell content

By default, the data provided for a cell will be rendered within it as-is. If needed, you can customize the contents of a whole column or individual cells. For example, you can include a
MenuButton of actions to take on that row.

<cdx-demo-wrapper>
<template v-slot:demo>
	<table-custom-cells />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableCustomCells.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableCustomCells.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

You can customize the contents of a cell by using the `item-[ columnId ]` slots. For example, for a
column with the id `time`, there is a slot called `item-time`. This slot comes with 2 bindings:

- `item`: the cell content
- `row`: data for the entire row

</cdx-accordion>

### Custom table elements

The Table component outputs each section of the `<table>` element automatically. You can override
the output of these elements to customize them. In this example, there is special formatting for
the "users" column headings, plus a "total" section that displays sums at the bottom.

<cdx-demo-wrapper>
<template v-slot:demo>
	<table-with-slots />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableWithSlots.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableWithSlots.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

You can further customize the layout of your Table by using the `thead`, `tbody`, and `tfoot`
slots. Using these slots will override the default implementation of that element within the Table
component so you can include your own markup. This example uses the `thead` slot to add `th`
elements with custom `colspan` and `rowspan` attributes, and the `tfoot` slot to add a `<tfoot>`
with totals below the `<tbody>`.

You can use any combination of these slots. Note that in the example below, even though we are
including custom `thead` markup, we are still passing in the `columns` prop so that the Table
component can output the `data` in the `<tbody>`. Always pass in `columns`, unless you are using the
slots to override both the `<thead>` and `<tbody>`.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to
change the alignment of cell data:
- `cdx-table__table__cell--align-center`: Align content to the center of the cell.
- `cdx-table__table__cell--align-end`: Align content to the end of the cell (to the right in LTR and to the left in RTL).
- `cdx-table__table__cell--align-number`: Align content to the right of the cell in both reading
directionalities. This is recommended for columns that contain numerical values.

</cdx-accordion>

### Sorting

Any number of columns can be made sortable.

<cdx-demo-wrapper>
<template v-slot:demo>
	<table-with-sort />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableWithSort.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableWithSort.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable sorting, pass in the `sort` prop via `v-model`, and make at least one Table column
sortable by adding `allowSort: true` to its definition.

You can initialize the `sort` ref to an empty object if there is no initial sort order, or to an
initial sort order as in the Table below, where the initial sort order is `{ user: 'asc' }`.

</cdx-accordion>

### Row selection

Rows can be made selectable. This is useful for selecting rows then choosing a Table action.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<table-with-selection />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableWithSelection.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableWithSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable row selection, set the `useRowSelection` prop to `true`, and use `v-model` to bind the
`selectedRows` prop.

</cdx-accordion>

#### Row selection and sort

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<table-with-selection-and-sort />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableWithSelectionAndSort.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableWithSelectionAndSort.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To use both row selection and sorting, you must add a unique identifier to each row:
- Import the `TableRowIdentifier` constant from Codex
- Add a property to each row object keyed on `TableRowIdentifier` with a unique ID, e.g.
  `[ TableRowIdentifier ]: 'Q123'`

</cdx-accordion>

### Pagination

When pagination is enabled, the pager elements will display below the `<table>` by default, but can
also be displayed above it or in both locations.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<table-with-pagination />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/table/examples/TableWithPagination.vue [NPM]

<<< @/../component-demos/table/examples-mw/TableWithPagination.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable pagination, set the `paginate` prop to true. The pagination interface will display below
the `<table>` by default, but the controls can also be moved to the top (or shown in both places at
once) via the `paginationPosition` prop.

Additional configuration is also possible. A `paginationSizeOptions` prop can be used to provide
different options for the number of rows to display per page, and `paginationSizeDefault` can set
the default number of rows that are displayed prior to the user making a selection. By default, a
paginated Table will show 10 results per page and will allow the user to choose between page sizes
of 10, 20, and 50.

</cdx-accordion>


### Empty state

An empty state message can be displayed via the `empty-state` slot.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-table caption="Table Caption">
		<template #empty-state>
			There is no data available
		</template>
	</cdx-table>
</template>
<template v-slot:code>

```vue
<template v-slot:demo>
	<cdx-table caption="Table Caption">
		<template #empty-state>
			There is no data available
		</template>
	</cdx-table>
</template>
```

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

If the `empty-state` slot is populated, this slot will automatically display the slot content
when there are no items in the `data` array and the `tbody` slot is not overridden.

</cdx-accordion>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

The CSS-only Table consists of a `<table>` element and its child elements, plus some wrapper
elements and CSS classes needed to ensure proper styles and accessibility. Refer to the code sample
below for details.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to
change the alignment of cell data:
- `cdx-table__table__cell--align-center`: Align content to the center of the cell
- `cdx-table__table__cell--align-end`: Align content to the end of the cell (to the right in LTR and to the left in RTL)
- `cdx-table__table__cell--align-number`: Align content to the right of the cell in both reading
directionalities. This is recommended for columns that contain numerical values.

Note that all cells in a column, including the `<th>` in the `<thead>`, should have the same
text alignment.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div. -->
	<div class="cdx-table">
		<!-- Header content. -->
		<div class="cdx-table__header">
			<!-- Visible table caption. It is hidden from assistive technology since
			there is an accessible <caption> in the <table> element. If you add
			content to the header content div below, remove `aria-hidden` here to
			ensure the caption is announced first. -->
			<div class="cdx-table__header__caption" aria-hidden="true">1912 Olympics — Men's marathon</div>
			<!-- Additional header content goes here if needed. -->
			<div class="cdx-table__header__header-content"></div>
		</div>
		<!-- Wrapper around the table element. Needed for horizontal scroll. -->
		<div class="cdx-table__table-wrapper">
			<!-- Table element. -->
			<table class="cdx-table__table">
				<!-- Visually-hidden caption element, for assistive technology.
				Do not omit this! -->
				<caption>1912 Olympics — Men's marathon</caption>
				<thead>
					<tr>
						<th scope="col">Athlete</th>
						<th scope="col">Nation</th>
						<!-- <th> with class to align cell content to the end. -->
						<th scope="col" class="cdx-table__table__cell--align-number">
							Rank
						</th>
						<th scope="col" class="cdx-table__table__cell--align-number">
							Time
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ken McArthur</td>
						<td>South Africa</td>
						<!-- <td> with class to align cell content to the end. -->
						<td class="cdx-table__table__cell--align-number">1</td>
						<td class="cdx-table__table__cell--align-number">2:36:54.8</td>
					</tr>
					<tr>
						<td>Christian Gitsham</td>
						<td>South Africa</td>
						<td class="cdx-table__table__cell--align-number">2</td>
						<td class="cdx-table__table__cell--align-number">2:37:52.0</td>
					</tr>
					<tr>
						<td>Gaston Strobino</td>
						<td>United States</td>
						<td class="cdx-table__table__cell--align-number">3</td>
						<td class="cdx-table__table__cell--align-number">2:38:42.4</td>
					</tr>
					<tr>
						<td>Shizo Kanakuri</td>
						<td>Japan</td>
						<td class="cdx-table__table__cell--align-number">36</td>
						<td class="cdx-table__table__cell--align-number">54:08:06:05:32:20.3</td>
					</tr>
				</tbody>
				<!-- <tfoot> goes here if needed. -->
			</table>
		</div>
		<!-- Footer content (optional). -->
		<div class="cdx-table__footer">
			<span>Read more on <a href="https://en.wikipedia.org/wiki/Athletics_at_the_1912_Summer_Olympics_%E2%80%93_Men%27s_marathon">Wikipedia</a>.</span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper div. -->
<div class="cdx-table">
	<!-- Header content. -->
	<div class="cdx-table__header">
		<!-- Visible table caption. It is hidden from assistive technology since
		there is an accessible <caption> in the <table> element. If you add
		content to the header content div below, remove `aria-hidden` here to
		ensure the caption is announced first. -->
		<div class="cdx-table__header__caption" aria-hidden="true">1912 Olympics — Men's marathon</div>
		<!-- Additional header content goes here if needed. -->
		<div class="cdx-table__header__header-content"></div>
	</div>
	<!-- Wrapper around the table element. Needed for horizontal scroll. -->
	<div class="cdx-table__table-wrapper">
		<!-- Table element. -->
		<table class="cdx-table__table">
			<!-- Visually-hidden caption element, for assistive technology.
				Do not omit this! -->
			<caption>1912 Olympics — Men's marathon</caption>
			<thead>
				<tr>
					<th scope="col">
						<span class="cdx-table__th-content">Athlete</span>
					</th>
					<th scope="col">
						<span class="cdx-table__th-content">Nation</span>
					</th>
					<!-- <th> with class to align cell content to the end. -->
					<th scope="col" class="cdx-table__table__cell--align-number">
						<span class="cdx-table__th-content">Rank</span>
					</th>
					<th scope="col" class="cdx-table__table__cell--align-number">
						<span class="cdx-table__th-content">Time</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Ken McArthur</td>
					<td>South Africa</td>
					<!-- <th> with class to align cell content to the end. -->
					<td class="cdx-table__table__cell--align-number">1</td>
					<td class="cdx-table__table__cell--align-number">2:36:54.8</td>
				</tr>
				<tr>
					<td>Christian Gitsham</td>
					<td>South Africa</td>
					<td class="cdx-table__table__cell--align-number">2</td>
					<td class="cdx-table__table__cell--align-number">2:37:52.0</td>
				</tr>
				<tr>
					<td>Gaston Strobino</td>
					<td>United States</td>
					<td class="cdx-table__table__cell--align-number">3</td>
					<td class="cdx-table__table__cell--align-number">2:38:42.4</td>
				</tr>
				<tr>
					<td>Shizo Kanakuri</td>
					<td>Japan</td>
					<td class="cdx-table__table__cell--align-number">36</td>
					<td class="cdx-table__table__cell--align-number">54:08:06:05:32:20.3</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### Visually hidden caption

To visually hide the header's caption, simply do not add it to the header element
(`<div class="cdx-table__header">`). If you have no other header content, the entire header element
can be removed, as in the example below. Make sure to always include the `<caption>` element inside
the `<table>`, which is visually hidden by default.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<!-- Header has been omitted since there is no header content. -->
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col">Project</th>
					<th scope="col" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th scope="col" class="cdx-table__table__cell--align-number">Active users</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All users</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>wikipedias</td>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<td>wiktionaries</td>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<td>wikiquotes</td>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Total:</td>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
</template>
<template v-slot:code>

```html
<div class="cdx-table">
		<!-- Header has been omitted since there is no header content. -->
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col">Project</th>
					<th scope="col" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th scope="col" class="cdx-table__table__cell--align-number">Active users</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All users</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>wikipedias</td>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<td>wiktionaries</td>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<td>wikiquotes</td>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Total:</td>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>

#### Vertical borders

To display vertical borders that separate the columns, apply the
`cdx-table__table--borders-vertical` class to table element. This class may not cover all use
cases, therefore apply additional border styles to the element as needed.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<!-- <table> with the class to add vertical borders/rulers to separate the columns. -->
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">Active</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>wikipedias</td>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<td>wiktionaries</td>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<td>wikiquotes</td>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
</template>
<template v-slot:code>

```html
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<!-- <table> with the class to add vertical borders/rulers to separate the columns. -->
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">Active</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>wikipedias</td>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<td>wiktionaries</td>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<td>wikiquotes</td>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>

#### Row headers

In some cases, header information can be found in the top row and first column. All header cells are
marked up as `th` elements with the appropriate `scope` attribute. The scope attribute helps to
describe the relationship between header and data cells. Refer to
[WAI](https://www.w3.org/WAI/tutorials/tables/two-headers/) to learn more about Table header row and
header column.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">Active</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikipedias</th>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wiktionaries</th>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikiquotes</th>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
</template>
<template v-slot:code>

```html
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__table__cell--align-number">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">Active</th>
					<th scope="col" class="cdx-table__table__cell--align-number">All</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikipedias</th>
					<td class="cdx-table__table__cell--align-number">342</td>
					<td class="cdx-table__table__cell--align-number">292249</td>
					<td class="cdx-table__table__cell--align-number">113556337</td>
				</tr>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wiktionaries</th>
					<td class="cdx-table__table__cell--align-number">193</td>
					<td class="cdx-table__table__cell--align-number">5764</td>
					<td class="cdx-table__table__cell--align-number">7275027</td>
				</tr>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikiquotes</th>
					<td class="cdx-table__table__cell--align-number">96</td>
					<td class="cdx-table__table__cell--align-number">2042</td>
					<td class="cdx-table__table__cell--align-number">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__table__cell--align-number">631</td>
					<td class="cdx-table__table__cell--align-number">300055</td>
					<td class="cdx-table__table__cell--align-number">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With row selection

Row selection can be done without JavaScript by following these steps:

- Use a `<form>` element as the outermost element with the class `cdx-table`
- Add a submit button to the header to handle the row selection data
- Omit the "select all" checkbox in the `<thead>`
- Give each row's checkbox the same `name` and a unique `value`

Note that the Table below doesn't actually do anything when you click "Sign up"
besides submit the form and reload the page.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Use a <form> element instead of a <div>. -->
	<form class="cdx-table" action="">
		<div class="cdx-table__header">
			<!-- When there is header content (e.g. this "Sign up" button), do
			not use `aria-hidden` on the visible caption. This way, the caption
			will be announced before the header content. -->
			<div class="cdx-table__header__caption">Sessions</div>
			<div class="cdx-table__header__header-content">
				<!-- Include a submit button. -->
				<button class="cdx-button" type="submit">Sign up</button>
			</div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table">
				<caption>Tests</caption>
				<thead>
					<tr>
						<!-- Empty <th> since we are omitting the "select all" option. -->
						<th></th>
						<th scope="col">Name</th>
						<th scope="col">Time</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="cdx-checkbox">
								<div class="cdx-checkbox__wrapper">
									<!-- Include the proper attributes on each checkbox input. -->
									<input id="session-1" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-1">
									<span class="cdx-checkbox__icon"></span>
									<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
										<label class="cdx-label__label" for="session-1">
											<span class="cdx-label__label__text">Select row 1 of 3</span>
										</label>
									</div>
								</div>
							</div>
						</td>
						<td>Introduction to Semantic MediaWiki</td>
						<td>11:00 EEST</td>
					</tr>
					<tr>
						<td>
							<div class="cdx-checkbox">
								<div class="cdx-checkbox__wrapper">
									<input id="session-2" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-2">
									<span class="cdx-checkbox__icon"></span>
									<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
										<label class="cdx-label__label" for="session-2">
											<span class="cdx-label__label__text">Select row 2 of 3</span>
										</label>
									</div>
								</div>
							</div>
						</td>
						<td>Wikisource intro session</td>
						<td>11:30 EEST</td>
					</tr>
					<tr>
						<td>
							<div class="cdx-checkbox">
								<div class="cdx-checkbox__wrapper">
									<input id="session-3" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-3">
									<span class="cdx-checkbox__icon"></span>
									<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
										<label class="cdx-label__label" for="session-3">
											<span class="cdx-label__label__text">Select row 3 of 3</span>
										</label>
									</div>
								</div>
							</div>
						</td>
						<td>Introduction to Wikibase Suite</td>
						<td>12:00 EEST</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>
</template>
<template v-slot:code>

```html
<!-- Use a <form> element instead of a <div>. -->
<form class="cdx-table" action="">
	<div class="cdx-table__header">
		<!-- When there is header content (e.g. this "Sign up" button), do
		not use `aria-hidden` on the visible caption. This way, the caption
		will be announced before the header content. -->
		<div class="cdx-table__header__caption">Sessions</div>
		<div class="cdx-table__header__header-content">
			<!-- Include a submit button. -->
			<button class="cdx-button" type="submit">Sign up</button>
		</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table">
			<caption>Tests</caption>
			<thead>
				<tr>
					<!-- Empty <th> since we are omitting the "select all" option. -->
					<th></th>
					<th scope="col">Name</th>
					<th scope="col">Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div class="cdx-checkbox">
							<div class="cdx-checkbox__wrapper">
								<!-- Include the proper attributes on each checkbox input. -->
								<input id="session-1" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-1">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-1">
										<span class="cdx-label__label__text">Select row 1 of 3</span>
									</label>
								</div>
							</div>
						</div>
					</td>
					<td>Introduction to Semantic MediaWiki</td>
					<td>11:00 EEST</td>
				</tr>
				<tr>
					<td>
						<div class="cdx-checkbox">
							<div class="cdx-checkbox__wrapper">
								<input id="session-2" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-2">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-2">
										<span class="cdx-label__label__text">Select row 2 of 3</span>
									</label>
								</div>
							</div>
						</div>
					</td>
					<td>Wikisource intro session</td>
					<td>11:30 EEST</td>
				</tr>
				<tr>
					<td>
						<div class="cdx-checkbox">
							<div class="cdx-checkbox__wrapper">
								<input id="session-3" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-3">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-3">
										<span class="cdx-label__label__text">Select row 3 of 3</span>
									</label>
								</div>
							</div>
						</div>
					</td>
					<td>Introduction to Wikibase Suite</td>
					<td>12:00 EEST</td>
				</tr>
			</tbody>
		</table>
	</div>
</form>
```

</template>
</cdx-demo-wrapper>

#### Empty state

You can use the CSS classes, `cdx-table__table__empty-state` and
`cdx-table__table__empty-state-content`, to style the empty state message
that indicates that there's no data available. The `<td>` element here
should also have a `colspan` attribute with a value equal to the number
of columns in the table, but this can be omitted if the table only has
a single column.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table">
			<caption>List of MediaWikis</caption>
			<!-- <tbody> with the class for an empty table that has no data available. -->
			<tbody>
				<tr class="cdx-table__table__empty-state">
					<td class="cdx-table__table__empty-state-content">
						There is no data available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
<template v-slot:code>

```html
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption" aria-hidden="true">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table">
			<caption>List of MediaWikis</caption>
			<!-- <tbody> with the class for an empty table that has no data available. -->
			<tbody>
				<tr class="cdx-table__table__empty-state">
					<td class="cdx-table__table__empty-state-content">
						There is no data available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>

#### Pagination

This example demonstrates the markup structure that should be used for visual parity with
the Vue.js version of the paginated Table component. In a real-world scenario, the `<form>`
`action` and `<button>` values will need to be set in a way that corresponds with whatever
back-end is being used. Typical usage will involve a GET request to the URL specified in
the form `action`, with the select and button values mapped to specific URL parameters.

Buttons for first, next, previous, and last pages use the `cdx-button--icon-only` class.
The icon images are added automatically.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-table">
		<div class="cdx-table__header">
			<div class="cdx-table__header__caption" aria-hidden="true">
				F1 Racing Teams
			</div>
			<div class="cdx-table__header__header-content"></div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table">
				<caption>
					F1 Racing Teams
				</caption>
				<thead>
					<tr>
						<th scope="col">
							<span class="cdx-table__th-content">Team</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver One</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver Two</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Constructors' Points</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Mercedes</td>
						<td>Lewis Hamilton</td>
						<td>George Russell</td>
						<td>213</td>
					</tr>
					<tr>
						<td>Red Bull</td>
						<td>Max Verstappen</td>
						<td>Sergio Perez</td>
						<td>234</td>
					</tr>
					<tr>
						<td>McLaren</td>
						<td>Lando Norris</td>
						<td>Oscar Piastri</td>
						<td>123</td>
					</tr>
					<tr>
						<td>Ferrari</td>
						<td>Carlos Sainz</td>
						<td>Charles Leclerc</td>
						<td>100</td>
					</tr>
					<tr>
						<td>Alpine</td>
						<td>Esteban Ocon</td>
						<td>Pierre Gasly</td>
						<td>85</td>
					</tr>
					<tr>
						<td>Alfa Romeo</td>
						<td>Valtteri Bottas</td>
						<td>Guanyu Zhou</td>
						<td>60</td>
					</tr>
					<tr>
						<td>Aston Martin</td>
						<td>Fernando Alonso</td>
						<td>Lance Stroll</td>
						<td>95</td>
					</tr>
					<tr>
						<td>Haas</td>
						<td>Kevin Magnussen</td>
						<td>Mick Schumacher</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Williams</td>
						<td>Alexander Albon</td>
						<td>Logan Sargeant</td>
						<td>30</td>
					</tr>
					<tr>
						<td>AlphaTauri</td>
						<td>Yuki Tsunoda</td>
						<td>Nyck de Vries</td>
						<td>40</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- Table pager form. -->
		<form method="get" :action="url">
			<div class="cdx-table-pager cdx-table__pagination--bottom">
				<div class="cdx-table-pager__start">
				<!-- Rows per page select. -->
		 			<select class="cdx-select" name="rows" :value="rowsPerPage"  @change="handleRowsChange">
						<option value="10">10 rows</option>
						<option value="25">25 rows</option>
						<option value="50">50 rows</option>
					</select>
				</div>
				<!-- Pagination status. -->
				<div class="cdx-table-pager__center">
					<div class="cdx-table__pagination-status--long">
						Showing results 1 - 10 of 52
					</div>
				</div>
				<!-- Pagination buttons. -->
				<div class="cdx-table-pager__end">
					<!-- Button with ARIA label. -->
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="First Page">
						<!-- Empty span with icon classes and `aria-hidden`. -->
						<span class="cdx-table-pager__icon--first cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Previous Page">
						<span class="cdx-table-pager__icon--previous cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Next Page">
						<span class="cdx-table-pager__icon--next cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Last Page">
						<span class="cdx-table-pager__icon--last cdx-button__icon" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>
<template v-slot:code>

```html-vue
	<div class="cdx-table">
		<div class="cdx-table__header">
			<div class="cdx-table__header__caption" aria-hidden="true">
				F1 Racing Teams
			</div>
			<div class="cdx-table__header__header-content"></div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table">
				<caption>
					F1 Racing Teams
				</caption>
				<thead>
					<tr>
						<th scope="col">
							<span class="cdx-table__th-content">Team</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver One</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver Two</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Constructors' Points</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Mercedes</td>
						<td>Lewis Hamilton</td>
						<td>George Russell</td>
						<td>213</td>
					</tr>
					<tr>
						<td>Red Bull</td>
						<td>Max Verstappen</td>
						<td>Sergio Perez</td>
						<td>234</td>
					</tr>
					<tr>
						<td>McLaren</td>
						<td>Lando Norris</td>
						<td>Oscar Piastri</td>
						<td>123</td>
					</tr>
					<tr>
						<td>Ferrari</td>
						<td>Carlos Sainz</td>
						<td>Charles Leclerc</td>
						<td>100</td>
					</tr>
					<tr>
						<td>Alpine</td>
						<td>Esteban Ocon</td>
						<td>Pierre Gasly</td>
						<td>85</td>
					</tr>
					<tr>
						<td>Alfa Romeo</td>
						<td>Valtteri Bottas</td>
						<td>Guanyu Zhou</td>
						<td>60</td>
					</tr>
					<tr>
						<td>Aston Martin</td>
						<td>Fernando Alonso</td>
						<td>Lance Stroll</td>
						<td>95</td>
					</tr>
					<tr>
						<td>Haas</td>
						<td>Kevin Magnussen</td>
						<td>Mick Schumacher</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Williams</td>
						<td>Alexander Albon</td>
						<td>Logan Sargeant</td>
						<td>30</td>
					</tr>
					<tr>
						<td>AlphaTauri</td>
						<td>Yuki Tsunoda</td>
						<td>Nyck de Vries</td>
						<td>40</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- Table pager form. -->
		<form method="get" :action="url">
			<div class="cdx-table-pager cdx-table__pagination--bottom">
				<div class="cdx-table-pager__start">
				<!-- Rows per page select. -->
		 			<select class="cdx-select" name="rows">
						<option value="10">10 rows</option>
						<option value="25">25 rows</option>
						<option value="50">50 rows</option>
					</select>
				</div>
				<!-- Pagination status. -->
				<div class="cdx-table-pager__center">
					<div class="cdx-table__pagination-status--long">
						Showing results 1 - 10 of 52
					</div>
				</div>
				<!-- Pagination buttons. -->
				<div class="cdx-table-pager__end">
					<!-- Button with ARIA label. -->
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="First Page">
						<!-- Empty span with icon classes and `aria-hidden`. -->
						<span class="cdx-table-pager__icon--first cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Previous Page">
						<span class="cdx-table-pager__icon--previous cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Next Page">
						<span class="cdx-table-pager__icon--next cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Last Page">
						<span class="cdx-table-pager__icon--last cdx-button__icon" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		</form>
	</div>
```
</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element within the Table. |
| <kbd>Shift</kbd>+<kbd>Tab</kbd> | It moves the focus to the previous interactive element within the Table. |
| <kbd>Up arrow</kbd>, <kbd>Down arrow</kbd> | For assistive technology users, these keys move between the column cells. |
| <kbd>Left arrow</kbd>, <kbd>Right arrow</kbd> | For assistive technology users, these keys move between the row cells. |
