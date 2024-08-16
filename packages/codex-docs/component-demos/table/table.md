<script setup>
import { CdxTable } from '@wikimedia/codex';
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

## Guidelines

### When to use tables

In order to support the scanning and interpretation of information, the content within Tables needs
to be well-structured and optimized for readability. For that reason, Tables should be avoided if
the space is limited, if the interaction with their information is too complex, or if the data
cannot be easily categorized. Additionally, consider alternative presentations for standalone
information, or when detailed analysis isn't the primary objective.

**When to use:**
- When users need a systematic representation of information that allows them to compare and analyze
  multiple data points across different categories.
- When users need to perform specific actions to manipulate items within a dataset, such as editing,
  deleting, or organizing.
- When users can benefit from the ability to sort or filter data dynamically in order to extract
  conclusions.

**When not to use:**
- When the interaction with the data is too complex (e.g. there are interdependencies between data
  points).
- When space is constrained. Please find alternative methods to display the information in case the
  readability of the Table content is compromised.
- When the goal is to create simple, non-data-centric layouts. Opt for lists or other components in
  case there aren’t multiple data points to compare, and the information doesn’t require
  manipulation (sorting, filtering).
- When the user's primary goal is to obtain a high-level overview rather than detailed, more
  granular, analysis of the information. Alternative visualization methods such as summaries,
  charts, or lists may be more suitable for providing an overview.
- When information is standalone and doesn't require side-by-side comparison, consider using text,
  lists, or Cards instead.

### Specifications

![Specifications of Table component.](../../assets/components/table-specifications.svg)

1. **Header** (optional)<br>
Tables can feature a header section with elements such as a visible caption or actions that can be applied to Table rows in bulk.
2. **Caption**<br>
A caption provides a clear and concise description of the contents and the purpose of the Table. It
is key for accessibility, and must always be provided for users of assistive technology. The caption
can be visually hidden if a visible caption is not needed (e.g. if there is a heading above the
Table that serves as a title).
3. **Actions** (optional)<br>
Actions that can be applied to all the items within a Table should be made available from the
header.
4. **Selection** (optional)<br>
Row selection can be enabled to allow targeting the items that will be affected by Table actions.
The checkbox available at the heading row level allows selecting all Table items at once, while
individual checkboxes allow the selection of independent rows. A custom indicator of the number of
selected rows can be included in the Table’s header for visibility (See custom header text).
5. **Headings**<br>
Tables can feature column headings (most commonly), row headings, or both. Headings are used to
describe the type of information or the category of the data contained by the list of elements they
label. Column headings are required.
6. **Sorting** (optional)<br>
Sorting allows users to organize data in an ascending or descending order according to specific
criteria (e.g. alphabetically). It facilitates the analysis of data, identification of patterns, and
comparison of values within Tables.
7. **Cell**<br>
Table cells are individual units of information, organized at the intersection of rows and columns.
They can contain any sort of content, from simple text to iconography, images and components in any
necessary order or combination.
8. **Pagination** (optional)<br>
Optional pagination controls can be included to provide an additional navigation for the Table.
The user can specify for the pagination to appear above the Table's footer, below the Table's header, or both.
9. **Footer** (optional)<br>
Tables can feature an optional footer to organize adjacent Table information or actions (e.g.
pagination). The configuration and contents of the Table footer are fully customizable.

#### Table and column width

Tables will occupy the full width of the area assigned to them in a layout. The available space will
be distributed across Table columns evenly, depending on the data they contain.

Tables are optimized for readability by default, but there might be special cases where adjustments
might be needed. If so, it is possible to adjust the width of individual columns to distribute space
more intentionally:

![Table featuring columns with custom widths.](../../assets/components/table-specifications-column-width.svg)

#### Column and row headings

Tables can display column headings, row headings, or both.

- **Column headings** represent the category or type of information contained in each Table column. They
are essential for the quick identification of the Table’s content.
- **Row headings** are useful when there’s a need to further categorize or label the data presented in
individual or sets of rows. In Tables with many items, row headings can serve as navigation aids,
allowing users to quickly jump to specific sections or categories within the data structure. Please
note that you might or might not include a column heading to give a title to the row headings
column.

![Table featuring column and row headings.](../../assets/components/table-specifications-column-and-row-headings.svg)

#### Cell customization

Table cells can include combinations of any type of content: from text with end or start icons, to
images or even components. This level of cell customization allows covering a wide range of
presentational and interactive use cases like, for example, the introduction of inline, row actions:

![Table featuring cells with custom content.](../../assets/components/table-specifications-cell-customization.svg)

Refer to the [Table component in Codex Figma](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/❖-Codex-components?node-id=17413-13608&t=worf819uF8gGRU5J-11).

### Types

#### Table with vertical borders

By default, the Table component will only display horizontal borders to separate rows and rely on
spacing to create columns. Vertical borders can be added in data-heavy Tables, where the cell
content is too clumped and mistakes might be made when interpreting the data.[[1]](#ref1)

Common scenarios where the use of vertical borders is recommended include: when presenting data with
lengthy textual descriptions or explanations alongside numerical values, in Tables with a long list
of narrow columns, or when combining data with different horizontal alignment (see example below).

![Table featuring vertical borders.](../../assets/components/table-types-vertical-borders.svg)

#### Table with sorting

Sorting allows reordering all the items included in a Table based on the values of one of its
columns. Any number of columns can be sortable, but data can only be sorted by one column at a time.

![Table featuring sortable columns.](../../assets/components/table-types-sorting.svg)

#### Table with row selection

Enable row selection when the same action(s) can be applied to all of the items in a Table. We
recommend including an indicator of the amount of selected items within the Table’s header.

When selection is enabled, users can pick out rows individually, or use the checkbox included at the
heading level to select or deselect all Table items at once:

![Table featuring row selection.](../../assets/components/table-types-row-selection.svg)

#### Table with pagination

Use pagination to distribute the Table’s content across different pages when
dealing with large Table data with many rows. There is no minimum number of rows
required to use pagination, but it is recommended for tables with a substantial
number of rows. When using pagination, a Select component allows choosing the
number of rows displayed per page. The default options are 10, 20, and 50 rows
per page.

![Table with pagination featuring a selection option for displaying 10, 20, or 50 items per page.](../../assets/components/table-types-pagination.svg)

#### Empty table

Tables can dynamically feature an empty state message in case there is no information available to
be displayed:

![Table showcasing its empty state.](../../assets/components/table-types-empty.svg)

### Interaction states

#### Heading sorting states

Heading cells that include sorting functionality display a hovered state, an active state when
clicked or tapped, and a focused style after having been activated and until any other interaction
takes place.

![Interactive states of the headings of sortable columns.](../../assets/components/table-sorting-interaction-states.svg)

1. Default
2. Hover
3. Active
4. Focused

#### Row selection states

In Tables where selection is available, rows present the following styles:

![Interactive states of selectable rows.](../../assets/components/table-states-row-selection.svg)

1. Default
2. Selected

The heading-level checkbox, which facilitates the simultaneous selection and deselection of all
Table items, will present an indeterminate state in case some items remain unselected. Please note
that, while Table rows display a selected state, only the checkboxes are interactive (See 2).

#### Pagination states

In tables where pagination is displayed, there are the following states:

![Interactive states of Table's pagination.](../../assets/components/table-interaction-states-pagination.svg)

1. Default
2. Loading

When loading a new page from the pagination, an Inline ProgressBar will appear below the Headings and above the current content of the Table.

### Best practices

#### Table actions

It is possible to use the header to provide actions that can be applied to all Table items. Enabling
selection will allow users to target the Table items to be manipulated.

<cdx-demo-rules>

<template #do-media>

![Table with header actions represented by normal neutral and destructive buttons.](../../assets/components/table-best-practices-actions-do.svg)

</template>

<template #do-text>

- Use normal or quiet Buttons to represent Table actions.
- Use any of the Button actions (neutral, progressive, and destructive)
- Use labelled buttons, preferably with text, or icons and text, to ensure clarity.
- Use MenuButton to group and display table actions when space in the header is limited (e.g. in smaller viewports).

</template>

<template #dont-media>

![Table with header actions represented by an icon-only and a primary destructive button.](../../assets/components/table-best-practices-actions-dont.svg)

</template>

<template #dont-text>

- Use primary Buttons to represent Table actions, since they could compete with main page actions.
  (Exceptions might apply).
- Use icon-only buttons to represent header actions, since they might complicate understanding.
- Use several individual buttons when the Table’s width is limited. Instead, use a MenuButton to group all related actions.

</template>

</cdx-demo-rules>

Make sure to follow the [button and groups of buttons usage recommendations](../../style-guide/using-links-and-buttons.md)
when defining the best way to represent actions, keeping the Table’s external context in mind too.

#### Inline actions

It is possible to customize Table cells, and include inline actions in them that allow manipulating
the data of individual rows. Although exceptions might apply, we only recommend using inline actions
in Tables that will display fewer rows (less than 5) by default.

<cdx-demo-rules>

<template #do-media>

![Table with fewer items featuring actions within rows.](../../assets/components/table-best-practices-inline-actions-do.svg)

</template>

<template #do-text>

- Use the cell slot to provide inline actions in Tables with fewer items.

</template>

<template #dont-media>

![Table with many items incorrectly featuring actions within rows.](../../assets/components/table-best-practices-inline-actions-dont.svg)

</template>

<template #dont-text>

- Use inline actions in Tables with more than 5 rows. Instead, use the header slot to provide bulk
  actions and enable selection.

</template>

</cdx-demo-rules>

#### Table width

Achieving the optimal readability of Table content should be the guiding factor when defining the
width of a Table within a composition. Strive to balance information density with legibility,
ensuring that Tables occupy just the appropriate amount of space.

Avoid using Tables in narrow spaces. This can cause their content to wrap too tightly, or
unnecessarily trigger the Table’s default horizontal scroll. At the same time, refrain from
overstretching Tables to make them fit wider layouts: embedding too much white space within cells
will make their information harder to parse and compare.

<cdx-demo-rules>

<template #do-media>

![Table showcasing an appropriate width.](../../assets/components/table-best-practices-width-do.svg)

</template>

<template #do-text>

- Use Tables in layouts where they’ll have enough space to display all relevant information clearly
  and comprehensively.

</template>

<template #dont-media>

![Table used in a narrow space.](../../assets/components/table-best-practices-width-dont.svg)

</template>

<template #dont-text>

- Use Tables within limited spaces, where their content might have to adjust to the point of
  compromising readability.
- Use Tables in wide areas, where they’ll overstretch, complicating the parsing and comparison of
  information.

</template>

</cdx-demo-rules>

#### Pagination

It is possible to use pagination to distribute the Table’s content across different pages.
However, pagination is only recommended for tables containing a significant number of rows.

<cdx-demo-rules>

<template #do-media>

![Table with 48 rows using pagination.](../../assets/components/table-best-practices-pagination-do.svg)

</template>

<template #do-text>

- Use pagination to allow users to navigate long Tables with a less number of rows per page.

</template>

<template #dont-media>

![Table with 11 rows incorrectly using pagination.](../../assets/components/table-best-practices-pagination-dont.svg)

</template>

<template #dont-text>

- Use pagination if the Table’s rows can be easily displayed on a single page.

</template>

</cdx-demo-rules>

### Content

#### Table caption

The caption provides a clear and succinct description of the content and purpose of a Table. It can
be visually hidden, or replaced by an external title if a design either requires or allows it.
Regardless of its visibility, a caption should always be defined in the Table’s code in order to
provide context for users of assistive technology.[[2]](#ref2)

Visible or not, make sure the caption conveys the Table's content and context in a concise and
accurate way.

To keep captions readable, don’t exceed a line length of 75 characters. You can apply a maximum width to the caption if necessary in order to follow this recommendation.

![Table displaying a long caption that respects the 75 character per line limit.](../../assets/components/table-content-caption.svg)

#### Heading content

Do not rely on iconography alone to represent categorical information in headings, as it might be
hard to understand based on the content of the surrounding cells alone:

![Table where headings incorrectly use only icons to describe the data within columns.](../../assets/components/table-content-heading.svg)

#### Cell content alignment

Except for numbers, text within cells should be aligned left or right, according to the
directionality of the user’s interface language.

Numbers that express quantities should always be aligned right, regardless of the directionality of
the user’s interface language. This helps readers make easier comparisons of values when scanning
down columns. For consistency and ease of understanding, the alignment of headings should always
match the alignment of the data.[[1]](#ref1)

![Image’s alt text: Table that features a column with quantitative data.](../../assets/components/table-content-alignment.svg)

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element within the Table. |
| <kbd>Shift</kbd>+<kbd>Tab</kbd> | It moves the focus to the previous interactive element within the Table. |
| <kbd>Up arrow</kbd>, <kbd>Down arrow</kbd> | For assistive technology users, these keys move between the column cells. |
| <kbd>Left arrow</kbd>, <kbd>Right arrow</kbd> | For assistive technology users, these keys move between the row cells. |

### References

1. <span id="ref1">[Web Typography: Designing Tables to be Read, Not Looked At](https://alistapart.com/article/web-typography-tables/) by Richard Rutter</span>
2. <span id="ref2">[Inclusive Components: Data Tables](https://inclusive-components.design/data-tables/), by Heydon Pickering</span>


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

You can further customize the layout of your Table by using the `thead`, `tbody`, and `tfoot`
slots. Using these slots will override the default implementation of that element within the Table
component so you can include your own markup. The example below uses the `thead` slot to add `th`
elements with custom `colspan` and `rowspan` attributes, and the `tfoot` slot to add a `<tfoot>`
with totals below the `<tbody>`.

You can use any combination of these slots. Note that in the example below, even though we are
including custom `thead` markup, we are still passing in the `columns` prop so that the Table
component can output the `data` in the `<tbody>`. Always pass in `columns`, unless you are using the
slots to override both the `<thead>` and `<tbody>`.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to
change the alignment of cell data:
- `cdx-table__table__cell--align-center`: Align content to the center of the cell
- `cdx-table__table__cell--align-end`: Align content to the end of the cell (to the right in LTR and to the left in RTL)
- `cdx-table__table__cell--align-number`: Align content to the right of the cell in both reading
directionalities. This is recommended for columns that contain numerical values.

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

To enable sorting, pass in the `sort` prop via v-model, and make at least one Table column sortable
by adding `allowSort: true` to its definition.

You can initialize the sort ref to an empty object if there is no initial sort order, or to an
initial sort order as in the Table below, where the initial sort order is `{ user: 'asc' }`.

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

### With selection and sort

To use both row selection and sorting, you must add a unique identifier to each row:
- Import the `TableRowIdentifier` constant from Codex
- Add a property to each row object keyed on `TableRowIdentifier` with a unique ID, e.g.
  `[ TableRowIdentifier ]: 'Q123'`

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

### Empty state

An empty state message can be displayed via the `empty-state` slot.
If the `empty-state` slot is populated, this slot will automatically display the slot content
when there are no items in the `data` array and the `tbody` slot is not overridden.

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

### With pagination

#### Basic Pagination

To enable basic pagination, set the `paginate` prop to true. The pagination UI
will display below the Table by default, but the controls can also be moved to
the top of the table (or shown in both places at once) via the `paginationPosition`
prop.

Additional configuration is also possible. A `paginationSizeOptions` prop can be
used to provide different options for the number of rows to display per page, and
`paginationSizeDefault` can set the default number of rows that are displayed prior
to the user making a selection. By default, a paginated table will show 10 results
per page and will allow the user to choose between page sizes of 10, 20, and 50.

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

## Vue usage

## CSS-only version

### Markup structure

The CSS-only Table consists of a `<table>` element and its child elements, plus some wrapper
elements and CSS classes needed to ensure proper styles and accessibility. See the code sample
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

### Visually hidden caption

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

### Vertical borders

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

### With row selection

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
								<!-- Include the proper attributes on each checkbox input. -->
								<input id="session-1" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-1">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-1">
										<span class="cdx-label__label__text">Select row 1 of 3</span>
									</label>
								</div>
							</div>
						</td>
						<td>Introduction to Semantic MediaWiki</td>
						<td>11:00 EEST</td>
					</tr>
					<tr>
						<td>
							<div class="cdx-checkbox">
								<input id="session-2" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-2">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-2">
										<span class="cdx-label__label__text">Select row 2 of 3</span>
									</label>
								</div>
							</div>
						</td>
						<td>Wikisource intro session</td>
						<td>11:30 EEST</td>
					</tr>
					<tr>
						<td>
							<div class="cdx-checkbox">
								<input id="session-3" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-3">
								<span class="cdx-checkbox__icon"></span>
								<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
									<label class="cdx-label__label" for="session-3">
										<span class="cdx-label__label__text">Select row 3 of 3</span>
									</label>
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
							<!-- Include the proper attributes on each checkbox input. -->
							<input id="session-1" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-1">
							<span class="cdx-checkbox__icon"></span>
							<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
								<label class="cdx-label__label" for="session-1">
									<span class="cdx-label__label__text">Select row 1 of 3</span>
								</label>
							</div>
						</div>
					</td>
					<td>Introduction to Semantic MediaWiki</td>
					<td>11:00 EEST</td>
				</tr>
				<tr>
					<td>
						<div class="cdx-checkbox">
							<input id="session-2" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-2">
							<span class="cdx-checkbox__icon"></span>
							<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
								<label class="cdx-label__label" for="session-2">
									<span class="cdx-label__label__text">Select row 2 of 3</span>
								</label>
							</div>
						</div>
					</td>
					<td>Wikisource intro session</td>
					<td>11:30 EEST</td>
				</tr>
				<tr>
					<td>
						<div class="cdx-checkbox">
							<input id="session-3" class="cdx-checkbox__input" type="checkbox" name="sessions" value="session-3">
							<span class="cdx-checkbox__icon"></span>
							<div class="cdx-label cdx-label--visually-hidden cdx-checkbox__label">
								<label class="cdx-label__label" for="session-3">
									<span class="cdx-label__label__text">Select row 3 of 3</span>
								</label>
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

### Empty state

You can use the CSS classes, `cdx-table__table__empty-state` and
`cdx-table__table__empty-state-content`, to style the empty state message
that indicates that there's no data available.

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


### Table Pagination

This example demonstrates the markup structure that should be used for visual parity with
the Vue.js version of the paginated Table component. In a real-world scenario, the `<form>`
`action` and `<button>` values will need to be set in a way that corresponds with whatever
back-end is being used. Typical usage will involve a GET request to the URL specified in
the form `action`, with the select and button values mapped to specific URL parameters.

Buttons for first, next, previous, and last pages use the `cdx-button--icon-only` class.
Additional imports are needed, and more information on how to use them can be found
[here](https://doc.wikimedia.org/codex/main/components/demos/button.html#icon-only-button-1).

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
			<div class="cdx-table__header__caption" aria-hidden="true">
				F1 Racing Teams
			</div>
			<!-- Additional header content goes here if needed. -->
			<div class="cdx-table__header__header-content"></div>
		</div>
		<!-- Wrapper around the table element. Needed for horizontal scroll. -->
		<div class="cdx-table__table-wrapper">
			<!-- Table element. -->
			<table class="cdx-table__table">
				<!-- Visually-hidden caption element, for assistive technology.
					Do not omit this! -->
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
		<form method="get" :action="url">
			<div class="cdx-table-pager cdx-table__pagination--bottom">
				<div class="cdx-table-pager__start">
		 			<select class="cdx-select" name="rows" :value="rowsPerPage"  @change="handleRowsChange">
						<option value="10">10 rows</option>
						<option value="25">25 rows</option>
						<option value="50">50 rows</option>
					</select>
				</div>
				<div class="cdx-table-pager__center">
					<div class="cdx-table__pagination-status--long">
						Showing results 1 - 10 of 52
					</div>
				</div>
				<div class="cdx-table-pager__end">
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="First Page">
						<span class="cdx-button__icon cdx-demo-css-icon--move-first"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Previous Page">
						<span class="cdx-button__icon cdx-demo-css-icon--previous"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Next Page">
						<span class="cdx-button__icon cdx-demo-css-icon--next"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Last Page">
						<span class="cdx-button__icon cdx-demo-css-icon--move-last"></span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>
<template v-slot:code>

```html-vue
	<!-- Wrapper div. -->
	<div class="cdx-table">
		<!-- Header content. -->
		<div class="cdx-table__header">
			<!-- Visible table caption. It is hidden from assistive technology since
				there is an accessible <caption> in the <table> element. If you add
				content to the header content div below, remove `aria-hidden` here to
				ensure the caption is announced first. -->
			<div class="cdx-table__header__caption" aria-hidden="true">
				F1 Racing Teams
			</div>
			<!-- Additional header content goes here if needed. -->
			<div class="cdx-table__header__header-content"></div>
		</div>
		<!-- Wrapper around the table element. Needed for horizontal scroll. -->
		<div class="cdx-table__table-wrapper">
			<!-- Table element. -->
			<table class="cdx-table__table">
				<!-- Visually-hidden caption element, for assistive technology.
					Do not omit this! -->
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
		<form method="get" :action="url">
			<div class="cdx-table-pager cdx-table__pagination--bottom">
				<div class="cdx-table-pager__start">
		 			<select class="cdx-select" name="rows">
						<option value="10">10 rows</option>
						<option value="25">25 rows</option>
						<option value="50">50 rows</option>
					</select>
				</div>
				<div class="cdx-table-pager__center">
					<div class="cdx-table__pagination-status--long">
						Showing results 1 - 10 of 52
					</div>
				</div>
				<div class="cdx-table-pager__end">
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="First Page">
						<span class="cdx-button__icon cdx-demo-css-icon--move-first"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Previous Page">
						<span class="cdx-button__icon cdx-demo-css-icon--previous"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Next Page">
						<span class="cdx-button__icon cdx-demo-css-icon--next"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Last Page">
						<span class="cdx-button__icon cdx-demo-css-icon--move-last"></span>
					</button>
				</div>
			</div>
		</form>
	</div>
```
</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--move-first {
	.cdx-mixin-css-icon( @cdx-icon-move-first, @param-is-button-icon: true );
}

.cdx-demo-css-icon--previous {
	.cdx-mixin-css-icon( @cdx-icon-previous, @param-is-button-icon: true );
}

.cdx-demo-css-icon--next {
	.cdx-mixin-css-icon( @cdx-icon-next, @param-is-button-icon: true );
}

.cdx-demo-css-icon--move-last {
	.cdx-mixin-css-icon( @cdx-icon-move-last, @param-is-button-icon: true );
}
</style>
