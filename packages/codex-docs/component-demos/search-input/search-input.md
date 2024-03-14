<script setup>
import SearchInputDefault from '@/../component-demos/search-input/examples/SearchInputDefault.vue';
import SearchInputWithButton from '@/../component-demos/search-input/examples/SearchInputWithButton.vue';
import SearchInputClearable from '@/../component-demos/search-input/examples/SearchInputClearable.vue';
</script>

A SearchInput allows users to enter and submit a search query.

## Guidelines

### Using search inputs
Use the SearchInput component when you need users to perform text-based searches
for specific content, like finding results on a page.

Avoid using SearchInput if you require a predictive list of options in a menu
while users type within the input field. In such cases, use
[TypeaheadSearch](./typeahead-search.md) instead.

Avoid using SearchInput to enable users to search a dataset of options for a
form field. Instead, use [Lookup](./lookup.md).

### Specifications

![Specification of SearchInput.](../../assets/components/search-input-specifications.svg)

Search inputs may include the following elements:
1. **Input**<br>A text input where users can type their search queries. The input features the 'search' icon for clarity and should also include a placeholder to clarify its purpose.
2. **Button** (optional)<br>The input can be accompanied with a button, either a text button or an icon-only one, in order to trigger the search action. It's crucial not to customize the label of the search button and consistently employ the term "Search" or its appropriate translation. Additionally, avoid using long text within this button.

Since the SearchInput component uses a [TextInput](./text-input.md)), the input's minimum width defaults to `@size-1600` (equivalent to `256px` in the default Codex theme). However, it can be adjusted to a narrower width if necessary. The SearchInput button, if visible, does not contribute to this minimum width.

There's no maximum width constraint. If the input text exceeds the available space, it will overflow horizontally.

Refer to the [SearchInput component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=4918-30728&mode=design&t=UwSiKFRRQPBEJVaC-0).

### Types
The SearchInput component can be categorized based on the visibility and type of
button it contains:

#### Without button
The SearchInput can consist of the input field alone or include the decorative
icon. In this scenario, using the icon is suggested to emphasize that the input
serves as a search input, distinguishing it from a simple text input.

![Example of SearchInput without button.](../../assets/components/search-input-types-no-button.svg)

#### With text button
The SearchInput also has the option to feature a text button to initiate the
search process.

![Example of SearchInput with text button.](../../assets/components/search-input-types-text-button.svg)

#### With icon-only button
The SearchInput can also include an icon-only button, particularly useful when
space needs to be conserved by omitting the button text, such as on mobile
devices. In such instances, since the 'search' icon will already be present on
the button, there's no need to replicate it within the input. In this case,
refrain from using an icon within the input field to avoid duplication with the
icon in the button.

![Example of SearchInput with icon-only button.](../../assets/components/search-input-types-icon-only-button.svg)

### Interaction states
Search inputs have the following visually separate states:

![Interaction states of SearchInput: default, hover, active-focus, and filled.](../../assets/components/search-input-interaction-states.svg)

1. Default
2. Hover
3. Active - Focus
4. Filled

### Best practices

Consider the following recommendations when using SearchInput.

#### Icon

<cdx-demo-rules>

<template #do-media>

![A screenshot of a SearchInput using the ‘search’ icon.](../../assets/components/search-input-best-practices-icon-do.svg)

</template>

<template #do-text>

- Use the ‘search’ icon in the SearchInput.

</template>

<template #dont-media>

![A screenshot of a SearchInput using the ‘userActive’ icon.](../../assets/components/search-input-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Replace the ‘search’ icon with any other icon.

</template>

</cdx-demo-rules>

#### Search button

<cdx-demo-rules>

<template #do-media>

![A screenshot of two SearchInputs: one with an icon-only search button and the other with a text-only search button.](../../assets/components/search-input-best-practices-button-do.svg)

</template>

<template #do-text>

- Use the icon-only button when necessary, especially on small screens like mobile devices.
- Ensure the copy is concise and includes the term "Search" or an appropriate translation when using the text button.

</template>

<template #dont-media>

![A screenshot of a SearchInput with a lengthy search button and a ‘search’ icon in both the input field and the button.](../../assets/components/search-input-best-practices-button-dont.svg)

</template>

<template #dont-text>

- Duplicate the term "Search" in both the search button and the placeholder text. In such cases, consider hiding the placeholder.
- Use the ‘search’ icon simultaneously in both the input field and the button.
- Customize the copy of the search button or make it lengthy.

</template>

</cdx-demo-rules>

## Demos

Open the console to see emitted events.

### Default, with placeholder

The `placeholder` attribute will be passed down to the `<input>` element.

<cdx-demo-wrapper :force-controls="true">
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

### With button

This example provides a `buttonLabel` prop, which enables the submit button.

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

### Clearable

The `clearable` prop from the [TextInput](./text-input.md) component adds a "clear" button when
input is present.

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputClearable />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/search-input/examples/SearchInputClearable.vue [NPM]

<<< @/../component-demos/search-input/examples-mw/SearchInputClearable.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A SearchInput can be wrapped in a Field component, but this is not recommended. Although
SearchInput uses a TextInput, it's not a form item intended to collect user input; instead,
it triggers an action. Refer to the [Field](./field.md) guidelines for more information.

## Vue usage

This component contains a [TextInput](./text-input.md) with a preset start icon and input type. A
button can be added by providing the `buttonLabel` prop.

The default slot allows you to pass in an options menu that can be absolutely positioned to line
up with the text input, e.g. a list of autocomplete options.
Refer to [TypeaheadSearch](./typeahead-search.md) for an example.

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
<!-- Wrapper div. -->
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

### With button

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
