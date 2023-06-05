<script setup>
import SearchInputDefault from '@/../component-demos/search-input/examples/SearchInputDefault.vue';
import SearchInputWithButton from '@/../component-demos/search-input/examples/SearchInputWithButton.vue';
import SearchInputClearable from '@/../component-demos/search-input/examples/SearchInputClearable.vue';
import SearchInputField from '@/../component-demos/search-input/examples/SearchInputField.vue';
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

Open the console to see emitted events.

### Default, with placeholder

The `placeholder` attribute will be passed down to the `<input>` element.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
<SearchInputDefault />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputDefault.vue

</template>
</cdx-demo-wrapper>

### With button

This example provides a `buttonLabel` prop, which enables the submit button.

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputWithButton />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputWithButton.vue

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

<<< @/../component-demos/search-input/examples/SearchInputClearable.vue

</template>
</cdx-demo-wrapper>

### Form field

A SearchInput can be wrapped in the Field component to add features like a semantic label,
description and help text, validation messages, and more. See the [Field](./field.md) page for more
information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<search-input-field />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputField.vue

</template>
</cdx-demo-wrapper>

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
