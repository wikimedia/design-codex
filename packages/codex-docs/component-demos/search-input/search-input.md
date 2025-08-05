<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import SearchInputConfigurable from '@/../component-demos/search-input/examples/SearchInputConfigurable.vue';
import SearchInputDefault from '@/../component-demos/search-input/examples/SearchInputDefault.vue';
import SearchInputWithButton from '@/../component-demos/search-input/examples/SearchInputWithButton.vue';

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
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ]
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
];
</script>

A SearchInput allows users to enter and submit a search query.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="inputValue">
<template v-slot:demo="{ propValues }">
	<search-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use SearchInput

Use the SearchInput component to enable users to perform text-based searches
for specific content, like finding results on a page.

To include a predictive list of options in a menu while users type within the input field, use
[TypeaheadSearch](./typeahead-search.md) instead.

Avoid using SearchInput to enable users to search a dataset of options for a
form field. Instead, use [Lookup](./lookup.md).

### About SearchInput

SearchInput includes the following elements.

#### Input

A TextInput where users can type their search queries. The input features the 'search' icon for clarity and can also include a placeholder to clarify its purpose.

##### Placeholder text (optional)

Placeholder text provides an example of what the user might type in the SearchInput.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Placeholder text should further explain what is being searched or sample search queries.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should never replace the label nor be the input's only description.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should not duplicate the search button label.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Button (optional)

The input can be accompanied with a text button in order to trigger the search action.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use the term "Search" or its appropriate translation.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use long button text or duplicate the placeholder text.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

Open the console to review emitted events.

### Basic usage

This SearchInput features a placeholder and does not include the search button.

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputDefault />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/search-input/examples/SearchInputDefault.vue [NPM]

<<< @/../component-demos/search-input/examples-mw/SearchInputDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The `placeholder` attribute will be passed down to the `<input>` element. Open up the console to
view `update:modelValue` events.

</cdx-accordion>

### With button

The SearchInput has the option to feature a text button to initiate the search process. Use the
default button label, "Search" (or its translation).

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputWithButton />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/search-input/examples/SearchInputWithButton.vue [NPM]

<<< @/../component-demos/search-input/examples-mw/SearchInputWithButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Use the `useButton` prop to enable the submit button. The default button label is "Search" (or its translation if an internationalization system is being used).

You can customize the button label via the `buttonLabel` prop. This is only recommended if you're
using the SearchInput somewhere that does not have an internationalization system (e.g. outside of
MediaWiki) and you want to provide a translation for a single language.

</cdx-accordion>

### Other features

The SearchInput component has an internal TextInput. You can use the following features from
TextInput in the SearchInput component:
- [Clearable](./text-input.html#clearable)

A SearchInput can be wrapped in a Field component, but this is not recommended. Although
SearchInput uses a TextInput, it's not a form item intended to collect user input; instead,
it triggers an action. Refer to the [Field](./field.md) guidelines for more information.

## Technical implementation

### Vue usage

This component contains a [TextInput](./text-input.md) with a preset start icon and input type. A
button can be added by providing the `useButton` prop.

The default slot allows you to pass in an options menu that can be absolutely positioned to line
up with the text input, e.g. a list of autocomplete options. This is used by [TypeaheadSearch](./typeahead-search.md), which you should use if you need a search input with a menu of options.

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

The basic CSS-only SearchInput component is a CSS-only TextInput with `type="search"` and a start
icon, wrapped in a `<div>` with the CSS class `.cdx-search-input`. The CSS-only search icon is set
up for you, so you do not need to include it in your Less code.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-search-input">
		<div class="cdx-text-input cdx-text-input--has-start-icon">
			<input class="cdx-text-input__input" type="search" placeholder="Search">
			<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-search-input">
	<!-- CSS-only TextInput with start icon. -->
	<div class="cdx-text-input cdx-text-input--has-start-icon">
		<!-- Input with type="search". -->
		<input class="cdx-text-input__input" type="search" placeholder="Search">
		<!-- Start icon span. -->
		<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With button

To add a button to the CSS-only SearchInput, do the following:
- Add the `.cdx-search-input--has-end-button` class to the root element
- Wrap the CSS-only TextInput component in a div with the class `.cdx-search-input__input-wrapper`
- Add a CSS-only button with the classes `.cdx-button` and `.cdx-search-input__end-button`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-search-input cdx-search-input--has-end-button">
		<div class="cdx-search-input__input-wrapper">
			<div class="cdx-text-input cdx-text-input--has-start-icon">
				<input class="cdx-text-input__input" type="search" placeholder="Search">
				<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
			</div>
		</div>
		<button class="cdx-button cdx-search-input__end-button">Search</button>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-search-input cdx-search-input--has-end-button">
	<div class="cdx-search-input__input-wrapper">
		<div class="cdx-text-input cdx-text-input--has-start-icon">
			<input class="cdx-text-input__input" type="search" placeholder="Search">
			<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
		</div>
	</div>
	<button class="cdx-button cdx-search-input__end-button">Search</button>
</div>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | It submits the search query or performs the search action when the focus is placed on the search button. |
| <kbd>Esc</kbd> | It clears the input when there is typed text there. |
