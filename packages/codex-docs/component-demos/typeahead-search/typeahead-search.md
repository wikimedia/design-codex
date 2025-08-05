<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import TypeaheadSearchConfigurable from '@/../component-demos/typeahead-search/examples/TypeaheadSearchConfigurable.vue';
import TypeaheadSearchWikipedia from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue';
import TypeaheadSearchWikidata from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue';
import TypeaheadSearchInitialValue from '@/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue';
import TypeaheadSearchPendingState from '@/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue';
import TypeaheadSearchNoResult from '@/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue';

const controlsConfig = [
	{
		name: 'useButton',
		type: 'boolean'
	},
	{
		name: 'buttonLabel',
		type: 'text',
		// DEPRECATED: set default to 'Search' (T368444).
		default: ''
	},
	{
		name: 'highlightQuery',
		type: 'boolean'
	},
	{
		name: 'showThumbnail',
		type: 'boolean'
	},
	{
		name: 'autoExpandWidth',
		type: 'boolean'
	}
];
</script>

TypeaheadSearch is a search input that provides a menu of options based on the
current search query. It is meant to help users search for and navigate to
content.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<typeahead-search-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use TypeaheadSearch

Use the TypeaheadSearch component to enable users to navigate to a new page and when you need a predictive list of options in a menu that updates as users type within the input field. To enable users to perform text-based searches to find specific content, such as locating results on a page, use [SearchInput](./search-input.md) instead.

TypeaheadSearch is not a form input. Avoid using TypeaheadSearch to enable users to search a dataset
of options for a form field. Instead, use [Lookup](./lookup.md).

### About TypeaheadSearch

TypeaheadSearch includes the following elements.

#### Input

A SearchInput where users can type their search queries. The input features the 'search' icon for
clarity and can also include a placeholder to clarify its purpose.

#### Placeholder text (optional)

Placeholder text provides an example of what the user might type in the input.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Placeholder text should further explain what is being searched or sample search queries.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should never replace the label nor be the input's only description.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should not duplicate the button label.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Button (optional)

The input can be accompanied by a button, in order to trigger the search action.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use the term "Search" or its appropriate translation.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use long button text or duplicate the placeholder text.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Menu

When the user types within the input, a [Menu](./menu.md) component with results is displayed. By
default, menu items will feature a label and an optional description. Thumbnails can also be
included to show a preview of each result.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Limit visible menu items to a maximum of 10.</cdx-demo-best-practice>
<cdx-demo-best-practice>Enable scrolling if users need access to more than 10 results.</cdx-demo-best-practice>
</cdx-demo-best-practices>

##### Menu footer

The final menu item at the end of the search results menu allows users to navigate to the search
page.

## Examples

### Search Wikipedia articles

This implementation of TypeaheadSearch fetches articles from English Wikipedia. Like the search bar
on English Wikipedia, thumbnails are included in search results, the input expands on focus to
accommodate the width of the thumbnails, and the "Search" button is added. Results are limited to
10 items.

<cdx-demo-wrapper>
<template v-slot:demo>
	<typeahead-search-wikipedia />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue [NPM]

<<< @/../component-demos/typeahead-search/examples-mw/TypeaheadSearchWikipedia.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The `showThumbnails` prop is set to true, along with the `autoExpandWidth` prop to expand the input
on focus. The `useButton` prop enables the search button.

Open up the console to review emitted events.

</cdx-accordion>

### Search Wikidata items

In this example, results are fetched from Wikidata. To support Wikidata items as results, Thumbnails
are not shown and the input does not expand on focus. This example also includes a
`visibleItemLimit` of 5 items—further items can be access by scrolling.

<cdx-demo-wrapper>
<template v-slot:demo>
	<typeahead-search-wikidata />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue [NPM]

<<< @/../component-demos/typeahead-search/examples-mw/TypeaheadSearchWikidata.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Open up the console to review emitted events.

</cdx-accordion>

### With initial input value

An `initialInputValue` can be included. This is useful when replacing a server-rendered interface
where the user may have started typing a search query, or for pre-populating the search term when a
user navigates back to a page where they had previously entered one.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<typeahead-search-initial-value initial-input-value="Color" />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue [NPM]

<<< @/../component-demos/typeahead-search/examples-mw/TypeaheadSearchInitialValue.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

On mount, TypeaheadSearch will fetch search results for the `initialInputValue` if it's provided.
After that, the input value is tracked internally and will be emitted up to the parent component
when the value changes.

</cdx-accordion>

### Pending state

Pending state indicators, including an inline ProgressBar and a message stating that results are
pending, can be displayed to users with slower connections while search results are being fetched.

The pending state indicators will display when a search takes longer than half a second, so you may
need to throttle your connection to review them in the demo below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<typeahead-search-pending-state />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue [NPM]

<<< @/../component-demos/typeahead-search/examples-mw/TypeaheadSearchPendingState.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable pending state indicators, provide content in the `search-results-pending` slot.

</cdx-accordion>

### No results message

You can show a message when no search results were found.

<cdx-demo-wrapper>
<template v-slot:demo>
	<typeahead-search-no-result />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue [NPM]

<<< @/../component-demos/typeahead-search/examples-mw/TypeaheadSearchNoResult.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable the no results message, provide content in the `search-no-results-text` slot.

</cdx-accordion>

## Technical implementation

### Vue usage

TypeaheadSearch contains a form with a text input, a submit button, and a slot for hidden inputs.
The parent component must listen for changes in the search query (which are debounced by
default), fetch or calculate search results, then provide them as an array of search results for
display to the user in a dropdown menu.

At the end of the list of search results, a final option to go to the search page for the current
search query is provided.

Events are emitted to the parent when a search result is selected and when the form is submitted,
with data about the selected item (e.g. for analytics).

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

### CSS-only version

#### Markup structure

The CSS-only version of TypeaheadSearch is simply a SearchInput component styled to look like
the Vue version of TypeaheadSearch. It will have no menu of results and is meant to be replaced
by the Vue component once JavaScript has loaded. If you only need a SearchInput, check out the
[CSS-only version of the SearchInput component](./search-input.md#css-only-version). Note that the
search icon is automatically added for you.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper `<div>` element. -->
	<div class="cdx-typeahead-search">
		<!-- Search input div with classes. -->
		<div class="cdx-search-input cdx-search-input--has-end-button">
			<!-- Search input wrapper `<div>`. -->
			<div class="cdx-search-input__input-wrapper">
				<!-- CSS-only TextInput with start icon. -->
				<div class="cdx-text-input cdx-text-input--has-start-icon">
					<!-- Input with type="search". -->
					<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
					<!-- Start icon span. -->
					<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
				</div>
			</div>
			<!-- Search button. -->
			<button class="cdx-button cdx-search-input__end-button">Search</button>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-typeahead-search">
	<div class="cdx-search-input cdx-search-input--has-end-button">
		<div class="cdx-search-input__input-wrapper">
			<div class="cdx-text-input cdx-text-input--has-start-icon">
				<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
				<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
			</div>
		</div>
		<button class="cdx-button cdx-search-input__end-button">Search</button>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With thumbnails

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows
thumbnails (refer to the ["With initial input value" demo](#with-initial-input-value) above), apply
the
`.cdx-typeahead-search--show-thumbnail` class to the wrapper `<div>` to expand the start icon width.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail">
		<div class="cdx-search-input cdx-search-input--has-end-button">
			<div class="cdx-search-input__input-wrapper">
				<div class="cdx-text-input cdx-text-input--has-start-icon">
					<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
					<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
				</div>
			</div>
			<button class="cdx-button cdx-search-input__end-button">Search</button>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail">
	<div class="cdx-search-input cdx-search-input--has-end-button">
		<div class="cdx-search-input__input-wrapper">
			<div class="cdx-text-input cdx-text-input--has-start-icon">
				<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
				<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
			</div>
		</div>
		<button class="cdx-button cdx-search-input__end-button">Search</button>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With thumbnails and auto-expand width

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows thumbnails and expands when results are shown (refer to the ["Search Wikipedia articles" demo](#search-wikipedia-articles)
above), apply the `.cdx-typeahead-search--show-thumbnail` and `.cdx-typeahead-search--auto-expand-width` classes to the wrapper `<div>` to reduce the starting size
of the input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width">
		<div class="cdx-search-input cdx-search-input--has-end-button">
			<div class="cdx-search-input__input-wrapper">
				<div class="cdx-text-input cdx-text-input--has-start-icon">
					<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
					<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
				</div>
			</div>
			<button class="cdx-button cdx-search-input__end-button">Search</button>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width">
	<div class="cdx-search-input cdx-search-input--has-end-button">
		<div class="cdx-search-input__input-wrapper">
			<div class="cdx-text-input cdx-text-input--has-start-icon">
				<input class="cdx-text-input__input" type="search" placeholder="Search Wikipedia">
				<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
			</div>
		</div>
		<button class="cdx-button cdx-search-input__end-button">Search</button>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Down arrow</kbd> / <kbd>Up arrow</kbd> | When the menu is displayed, it navigates through the menu items. |
| <kbd>Enter</kbd> | If the focus is placed in any of the options within the menu, the focused option is selected. |
| <kbd>Esc</kbd> | This key closes the menu when it is open. |
