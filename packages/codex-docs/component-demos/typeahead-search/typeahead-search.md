<script setup>
import TypeaheadSearchWikipedia from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue';
import TypeaheadSearchWikidata from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue';
import TypeaheadSearchInitialValue from '@/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue';
import TypeaheadSearchPendingState from '@/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue';
import TypeaheadSearchNoResult from '@/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue';
</script>

TypeaheadSearch is a search input that provides a menu of options based on the
current search query. It is meant to help users search for and navigate to
content.

## Guidelines

### Using typeahead searches

TypeaheadSearch consists of a search input and a submit button. As users type, predictive search
results are displayed in a menu. Additionally, there's a final option at the end of the search
results list, enabling users to navigate to the search page.

Use the TypeaheadSearch component when you need a predictive list of options in a menu that updates
as users type within the input field. Avoid using TypeaheadSearch if your goal is to enable users to
perform text-based searches to find specific content, such as locating results on a page. In this
case use the [SearchInput](./search-input.md) component instead.

### Specifications

TypeaheadSearch may include the following elements:

![Specification of TypeaheadSearch.](../../assets/components/typeahead-search-specifications.svg)

1. **Input**<br>
A search input where users can type their searches. The input features the 'search' icon for clarity
and should also include a placeholder to clarify its purpose.
2. **Button** (optional)<br>
The input can be accompanied with a button,  in order to trigger the search action. It's crucial not
to customize the label of the search button: consistently employ the term "Search" or its
appropriate translation. Additionally, avoid using long text within this button.
3. **Menu**<br>
When the user types within the input, a [menu](./menu.md) component with results is
displayed. By default, menu items will feature a label and an optional description. Thumbnails can
also be included.
4. **Footer**<br>
The final menu item at the end of the search results menu list allows users to navigate to the
search page.

The menu displayed will show a maximum of 10 items, adjusting if there are fewer matching results.

Menu labels will expand to fit text length, possibly wrapping to multiple lines, while descriptions will use an ellipsis if exceeding one line.

The fixed menu footer may also wrap to multiple lines for lengthy text.

Refer to the [TypeaheadSearch component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=13076-168691&mode=design&t=G420ZgFymLfdkY6g-0).

### Types

As with [SearchInput](./search-input.md), TypeaheadSearch can be categorized
based on the visibility and type of button it contains:
1. **Without button**<br>
The TypeaheadSearch can consist of the input field alone or include the decorative icon. In this
scenario, using the icon is suggested to emphasize that the input serves as a search input,
distinguishing it from a simple text input.
2. **With text button**<br>
The TypeaheadSearch also has the option to feature a text button to initiate the search process.

![Types of TypeaheadSearch: without button and with button.](../../assets/components/typeahead-search-types.svg)

### Interaction states

TypeaheadSearch has the following visually separate states:

![Interaction states of the TypeaheadSearch: default, hover, focus, loading, active with results, and active with no results.](../../assets/components/typeahead-search-interaction-states.svg)

1. Default
2. Hover
3. Focus
4. Loading
5. Active with results
6. Active with no results

### Best practices

Consider the following recommendations when using the TypeaheadSearch.

<cdx-demo-rules>

<template #do-media>

![TypeaheadSearch featuring the 'search' icon and a text-only button.](../../assets/components/typeahead-search-best-practices-do.svg)

</template>

<template #do-text>

- Use the 'search' icon to emphasize search functionality.
- Customize the placeholder text as needed.
- Ensure the copy is concise and includes the term "Search" or an appropriate translation.

</template>

<template #dont-media>

![TypeaheadSearch featuring a non-'search' icon and a text-only button with long and customized text.](../../assets/components/typeahead-search-best-practices-dont.svg)

</template>

<template #dont-text>

- Customize or remove the 'search' icon.
- Customize the copy of the search button or make it lengthy.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Down arrow</kbd> / <kbd>Up arrow</kbd> | When the menu is displayed, it navigates through the menu items. |
| <kbd>Enter</kbd> | If the focus is placed in any of the options within the menu, the focused option is selected. |
| <kbd>Esc</kbd> | This key closes the menu when it is open. |

## Demos

### Search Wikipedia articles

This implementation of TypeaheadSearch fetches articles from English Wikipedia. Note that the input
expands on focus via the `autoExpandWidth` prop, thumbnails are enabled via the `showThumbnail`
prop, and the "search" button is added via the `buttonLabel` prop.  Open the console to see emitted
events.

<cdx-demo-wrapper :force-controls="true">
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

### Search Wikidata items

In this example, results are fetched from Wikidata. Thumbnails are disabled, and the input doesn't
expand on focus. There is no button, because the `buttonLabel` prop is not set. Open the console to
see emitted events.

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

### With initial input value

The `initialInputValue` prop can be used to pass in the initial value of the TextInput. This is
useful when replacing a server-rendered UI where the user may have started typing a search query, or
for pre-populating the search term when a user navigates back to a page where they had previously
entered one.

On mount, TypeaheadSearch will fetch search results for the initial input value if it's provided.
After that, the input value is tracked internally and will be emitted up to the parent component
when the value changes.

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

### Pending state

Pending state indicators, including an inline progress bar and a message stating that results are
pending, can be displayed to users with slower connections while search results are being fetched.
To enable this, provide content in the `search-results-pending` slot.

The pending state indicators will display when a search takes longer than half a second, so you may
need to throttle your connection to see them in the demo below.

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

### No results message

A message prompt that no search results were found. To enable this, provide content in the
`search-no-results-text` slot.

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

## Vue usage

TypeaheadSearch contains a form with a text input, a submit button, and a slot for hidden inputs.
The parent component must listen for changes in the search query (which are debounced by
default), fetch or calculate search results, then provide them as an array of search results for
display to the user in a dropdown menu.

At the end of the list of search results, a final option to go to the search page for the current
search query is provided.

Events are emitted to the parent when a search result is selected and when the form is submitted,
with data about the selected item (e.g. for analytics).

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#usage)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## CSS-only version

### Markup structure

The CSS-only version of TypeaheadSearch is simply a SearchInput component styled to look like
the Vue version of TypeaheadSearch. It will have no menu of results and is meant to be replaced
by the Vue component once JavaScript has loaded. If you just need a SearchInput, check out the
[CSS-only version of the SearchInput component](./search-input.md#css-only-version). Note that the
search icon is automatically added for you.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div. -->
	<div class="cdx-typeahead-search">
		<!-- Search input div with classes. -->
		<div class="cdx-search-input cdx-search-input--has-end-button">
			<!-- Search input wrapper div. -->
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

### With thumbnails

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows
thumbnails (see the ["With initial input value" demo](#with-initial-input-value) above), apply the
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

### With thumbnails and auto-expand width

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows thumbnails and expands when results are shown (see the ["Search Wikipedia articles" demo](#search-wikipedia-articles)
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
