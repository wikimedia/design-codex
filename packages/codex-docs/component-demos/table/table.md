<script setup>
import { CdxTable } from '@wikimedia/codex';
import TableColumnWidth from '@/../component-demos/table/examples/TableColumnWidth.vue';
import TableCustomCells from '@/../component-demos/table/examples/TableCustomCells.vue';
import TableWithSlots from '@/../component-demos/table/examples/TableWithSlots.vue';
import TableWithSort from '@/../component-demos/table/examples/TableWithSort.vue';
import TableWithSelection from '@/../component-demos/table/examples/TableWithSelection.vue';

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
	{ id: 'rank', label: 'Rank', textAlign: 'end' },
	{ id: 'time', label: 'Time', textAlign: 'end' }
];

const data = [
	{ athlete: 'Ken McArthur', nation: 'South Africa', rank: 1, time: '2:36:54.8' },
	{ athlete: 'Christian Gitsham', nation: 'South Africa', rank: 2, time: '2:37:52.0' },
	{ athlete: 'Gaston Strobino', nation: 'United States', rank: 3, time: '2:38:42.4' },
	{ athlete: 'Shizo Kanakuri', nation: 'Japan', rank: 36, time: '54:08:06:05:32:20.3' }
];
</script>

A Table is a structural component used to arrange data in rows and columns to facilitate the
comparison, analysis and management of information.

## Demos

### Configurable

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

### With custom-sized columns

The [TableColumn type](../types-and-constants.md#tablecolumn) has optional properties for `width`
and `minWidth` so you can customize each column's size. Include the units, e.g. `'120px'` or
`'100%'`.

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

### With custom cell content

By default, the data provided for a cell will be rendered within it as-is. You can customize the
contents of a cell by using the `item-[ columnId ]` slots. For example, for a column with the id
`time`, there is a slot called `item-time`. This slot comes with 2 bindings:

- `item`: the cell content
- `row`: data for the entire row

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

### With custom table elements

You can further customize the layout of your table by using the `thead`, `tbody`, and `tfoot`
slots. Using these slots will override the default implementation of that element within the Table
component so you can include your own markup. The example below uses the `thead` slot to add `th`
elements with custom `colspan` and `rowspan` attributes, and the `tfoot` slot to add a `<tfoot>`
with totals below the `<tbody>`.

You can use any combination of these slots. Note that in the example below, even though we are
including custom `thead` markup, we are still passing in the `columns` prop so that the Table
component can output the `data` in the `<tbody>`. Always pass in `columns`, unless you are using the
slots to override both the `<thead>` and `<tbody>`.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to
align cell data to the center or end:
- `cdx-table__cell--align-center`
- `cdx-table__cell--align-end` (recommended for columns containing numbers)

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

### With sorting

To enable sorting, pass in the `sort` prop via v-model, and make at least one table column sortable
by adding `allowSort: true` to its definition.

You can initialize the sort ref to an empty object if there is no initial sort order, or to an
initial sort order as in the table below, where the initial sort order is `{ user: 'asc' }`.

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

### With selection

To enable row selection, set the `useRowSelection` prop to `true`, and use v-model to bind the
`selectedRows` prop.

:::warning
For translatable interfaces, make sure you also use the `selectAllLabel` and `selectRowLabel`
props to provide translated strings for these visually-hidden accessibility helpers.
:::

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

## Vue usage

## CSS-only version

### Markup structure

The CSS-only Table consists of a `<table>` element and its child elements, plus some wrapper
elements and CSS classes needed to ensure proper styles and accessibility. See the code sample
below for details.

Cell content is aligned to the start of the cell by default. To change this, you can use these
classes:
- `cdx-table__cell--align-center` - align center
- `cdx-table__cell--align-end` - align to the end of the cell; recommended for columns containing
  numbers

Note that all cells in a column, including the `<th>` in the `<thead>`, should have the same
text alignment.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div. -->
	<div class="cdx-table">
		<!-- Header content. -->
		<div class="cdx-table__header">
			<!-- Visible table caption. -->
			<div class="cdx-table__header__caption">1912 Olympics — Men's marathon</div>
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
						<th scope="col" class="cdx-table__cell--align-end">
							Rank
						</th>
						<th scope="col" class="cdx-table__cell--align-end">
							Time
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ken McArthur</td>
						<td>South Africa</td>
						<!-- <td> with class to align cell content to the end. -->
						<td class="cdx-table__cell--align-end">1</td>
						<td class="cdx-table__cell--align-end">2:36:54.8</td>
					</tr>
					<tr>
						<td>Christian Gitsham</td>
						<td>South Africa</td>
						<td class="cdx-table__cell--align-end">2</td>
						<td class="cdx-table__cell--align-end">2:37:52.0</td>
					</tr>
					<tr>
						<td>Gaston Strobino</td>
						<td>United States</td>
						<td class="cdx-table__cell--align-end">3</td>
						<td class="cdx-table__cell--align-end">2:38:42.4</td>
					</tr>
					<tr>
						<td>Shizo Kanakuri</td>
						<td>Japan</td>
						<td class="cdx-table__cell--align-end">36</td>
						<td class="cdx-table__cell--align-end">54:08:06:05:32:20.3</td>
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
		<!-- Visible table caption. -->
		<div class="cdx-table__header__caption">1912 Olympics — Men's marathon</div>
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
					<th scope="col" class="cdx-table__cell--align-end">
						<span class="cdx-table__th-content">Rank</span>
					</th>
					<th scope="col" class="cdx-table__cell--align-end">
						<span class="cdx-table__th-content">Time</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Ken McArthur</td>
					<td>South Africa</td>
					<!-- <th> with class to align cell content to the end. -->
					<td class="cdx-table__cell--align-end">1</td>
					<td class="cdx-table__cell--align-end">2:36:54.8</td>
				</tr>
				<tr>
					<td>Christian Gitsham</td>
					<td>South Africa</td>
					<td class="cdx-table__cell--align-end">2</td>
					<td class="cdx-table__cell--align-end">2:37:52.0</td>
				</tr>
				<tr>
					<td>Gaston Strobino</td>
					<td>United States</td>
					<td class="cdx-table__cell--align-end">3</td>
					<td class="cdx-table__cell--align-end">2:38:42.4</td>
				</tr>
				<tr>
					<td>Shizo Kanakuri</td>
					<td>Japan</td>
					<td class="cdx-table__cell--align-end">36</td>
					<td class="cdx-table__cell--align-end">54:08:06:05:32:20.3</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Visually hidden caption

To visually hide the header's caption, simply do not add it to the header element (`<div class="cdx-table__header">`). If you have no other header content, the entire header element can be removed, as in the example below. Make sure to always include the `<caption>` element inside the `<table>`, which is visually hidden by default.

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
					<th scope="col" class="cdx-table__cell--align-end">No. of wikis</th>
					<th scope="col" class="cdx-table__cell--align-end">Active users</th>
					<th scope="col" class="cdx-table__cell--align-end">All users</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<td>wikipedias</td>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<td>wiktionaries</td>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<td>wikiquotes</td>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Total:</td>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
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
					<th scope="col" class="cdx-table__cell--align-end">No. of wikis</th>
					<th scope="col" class="cdx-table__cell--align-end">Active users</th>
					<th scope="col" class="cdx-table__cell--align-end">All users</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<td>wikipedias</td>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<td>wiktionaries</td>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<td>wikiquotes</td>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Total:</td>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>

### Vertical borders

To display vertical borders that separate the columns, apply the
`cdx-table__table--borders-vertical` class to table element. This class may not cover all use
cases, therefore apply additional border styles to the element as needed.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<!-- <table> with the class to add vertical borders/rulers to separate the columns. -->
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__cell--align-end">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__cell--align-end">Active</th>
					<th scope="col" class="cdx-table__cell--align-end">All</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<td>wikipedias</td>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<td>wiktionaries</td>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<td>wikiquotes</td>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
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
		<div class="cdx-table__header__caption">List of MediaWikis</div>
	</div>
	<div class="cdx-table__table-wrapper">
		<!-- <table> with the class to add vertical borders/rulers to separate the columns. -->
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__cell--align-end">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__cell--align-end">Active</th>
					<th scope="col" class="cdx-table__cell--align-end">All</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<td>wikipedias</td>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<td>wiktionaries</td>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<td>wikiquotes</td>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>

### Row headers

In some cases, header information can be found in the top row and first column. All header cells are
marked up as `th` elements with the appropriate `scope` attribute. The scope attribute helps to
describe the relationship between header and data cells. Refer to
[WAI](https://www.w3.org/WAI/tutorials/tables/two-headers/) to learn more about Table header row and
header column.

<cdx-demo-wrapper>
<template v-slot:demo>
<div class="cdx-table">
	<div class="cdx-table__header">
		<div class="cdx-table__header__caption">List of MediaWikis</div>
		<div class="cdx-table__header__header-content"></div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__cell--align-end">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__cell--align-end">Active</th>
					<th scope="col" class="cdx-table__cell--align-end">All</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikipedias</th>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wiktionaries</th>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikiquotes</th>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
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
		<div class="cdx-table__header__caption">List of MediaWikis</div>
		<div class="cdx-table__header__header-content"></div>
	</div>
	<div class="cdx-table__table-wrapper">
		<table class="cdx-table__table cdx-table__table--borders-vertical">
			<caption>List of MediaWikis</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="2">Project</th>
					<th scope="col" rowspan="2" class="cdx-table__cell--align-end">No. of wikis</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__cell--align-end">Active</th>
					<th scope="col" class="cdx-table__cell--align-end">All</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikipedias</th>
					<td class="cdx-table__cell--align-end">342</td>
					<td class="cdx-table__cell--align-end">292249</td>
					<td class="cdx-table__cell--align-end">113556337</td>
				</tr>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wiktionaries</th>
					<td class="cdx-table__cell--align-end">193</td>
					<td class="cdx-table__cell--align-end">5764</td>
					<td class="cdx-table__cell--align-end">7275027</td>
				</tr>
				<tr class="">
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">wikiquotes</th>
					<td class="cdx-table__cell--align-end">96</td>
					<td class="cdx-table__cell--align-end">2042</td>
					<td class="cdx-table__cell--align-end">4261041</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<!-- <th> as a row header cell with the scope attribute. -->
					<th scope="row">Total:</th>
					<td class="cdx-table__cell--align-end">631</td>
					<td class="cdx-table__cell--align-end">300055</td>
					<td class="cdx-table__cell--align-end">125092405</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
```
</template>
</cdx-demo-wrapper>
