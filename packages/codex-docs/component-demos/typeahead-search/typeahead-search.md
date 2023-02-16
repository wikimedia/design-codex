<script setup>
import TypeaheadSearchWikipedia from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue';
import TypeaheadSearchWikidata from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue';
import TypeaheadSearchInitialValue from '@/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue';
import TypeaheadSearchPendingState from '@/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue';
import TypeaheadSearchNoResult from '@/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue';
</script>

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#usage)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

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

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue

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

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue

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

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue

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

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue

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

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue

</template>
</cdx-demo-wrapper>

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
