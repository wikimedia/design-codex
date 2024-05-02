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
