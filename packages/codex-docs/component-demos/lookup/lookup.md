<script setup>
import LookupBasic from '@/../component-demos/lookup/examples/LookupBasic.vue';
import LookupWithSuggestions from '@/../component-demos/lookup/examples/LookupWithSuggestions.vue';
import LookupWithInitialSelection from '@/../component-demos/lookup/examples/LookupWithInitialSelection.vue';
import LookupWithFetch from '@/../component-demos/lookup/examples/LookupWithFetch.vue';
import LookupField from '@/../component-demos/lookup/examples/LookupField.vue';
import LookupConfigurable from '@/../component-demos/lookup/examples/LookupConfigurable.vue';
import { CdxAccordion } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
];
</script>

A Lookup is a predictive text input that presents a dropdown menu with suggestions based on the
current input value.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<lookup-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use Lookup

Use the Lookup component to let users search through a set of options to choose a predefined value
for a form field. This can be useful when there are many options the user can choose from, so they
need to filter the items via a text query.

Do not use Lookup to enable users to search for and navigate to content. Instead, use
[SearchInput](./search-input.md) or [TypeaheadSearch](./typeahead-search.md).

### About Lookup

Lookup includes the following elements.

#### Input

A TextInput where the user types to look for options. This can optionally include a start icon,
clear button, and placeholder text.

#### Dropdown menu

Suggested results are displayed via the Menu component.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Include an initial list of 2–5 suggestions if it's helpful to users.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include a "no results" message if there are no results found for the current input value.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Basic usage

The Lookup component emits an event when the user types in the input. The parent component can then
fetch items matching that input and pass them to the Lookup to display in the Menu.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupBasic.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The Lookup component emits an event on input. The parent component should react by computing or
fetching menu items, then providing those items to the Lookup component for display by updating the
`menu-items` prop. The user can then select an item from the menu.

There are 2 ways to listen for input changes:
1. Listen for `input` events, like in the example below. Do this if you only need to know about the
   input when it changes.
2. Use `v-model` to bind the `inputValue` prop and listen for either `input` or `update:input-value`
   events. Do this if you need to know the current input value at other times, or if you want to be
   able to set the input value. Refer to the [Vue usage](#vue-usage) tables for more information.

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text. Note
that in this example, menu items are Wikidata items with a human-readable label and a Wikidata
entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise
the Lookup component will stay in the pending state indefinitely. If there are no results for the
given input, set the `menu-items` prop to an empty array (`[]`).
:::

</cdx-accordion>

### With fetched results

Often, Lookup is used to fetch results from an API endpoint, and may display many results. You can
control how many items to show in the menu at once, and other items can be reached by scrolling. You
can also load more items when the user scrolls to the end of the menu.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-with-fetch />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithFetch.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithFetch.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Parent components should react to the
`input` or `update:input-value` event emitted by Lookup to search for results, then pass back to the
Lookup either an array of results to display as menu items or an empty array if there are no
results. Between those two events, a pending animation will display in the input.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user
nears the end of the list of results, a `load-more` event is emitted. The parent component can react
to this by fetching more results and appending them to the list of menu items provided to the
Lookup. These new items will then be displayed within the menu.

</cdx-accordion>

### With suggestions

You can show a list of 2–5 initial suggestions if it's helpful.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-with-suggestions />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithSuggestions.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithSuggestions.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To show a list of suggestions, pass in an array of menu items initially. The parent component must
handle resetting the menu items to this list of suggestions when the input is cleared.

</cdx-accordion>

### With initial value

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<lookup-with-initial-selection />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithInitialSelection.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithInitialSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To set an initial selection and input value, do the following:
1. Set the `selected` prop to the value of the selected item.
2. Use the optional `v-model:input-value` prop to set the input value to the label of the selected
   item (or the value, if there is no label).

You can also use `v-model:input-value` to set an initial input value without an initial selection.

</cdx-accordion>

### Form field

A Lookup can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more
information.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Automatically display an inline warning message if the entered text doesn't match any item from the Lookup's menu, and show an error after form submission.</cdx-demo-best-practice>
<cdx-demo-best-practice>Provide an error message that provides guidance on fixing the issue.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupField.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Other features

The Lookup component has an internal TextInput and Menu. You can use the following features from
those components in the Lookup component:
- [Start and end icons](./text-input.html#with-icons)
- [Clearable](./text-input.html#clearable)
- [Custom menu item display](./menu.html#menu-item-display)
- [Limited height with scrolling](./menu.html#with-scrolling-enabled)
- [Menu groups](./menu.html#menu-groups) (demonstrated above)
- [MenuItem features](./menu-item.html)

## Technical implementation

### Vue usage

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

There is no true CSS-only version of the Lookup component. However, a
[CSS-only TextInput component](./text-input.md#css-only-version) can be used
instead, since it has visual parity with the Lookup component with its menu
collapsed. For example, you could display a CSS-only TextInput on page load
while a Vue app loads, then replace it with the Vue Lookup component once the
Vue app has mounted.

The example below is a simple text input with a placeholder, but icons and
different states are supported—refer to the [TextInput docs](./text-input.md#css-only-version)
for more information.


<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-text-input">
	<!-- Input element with CSS class and attributes. -->
	<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
</div>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Down arrow</kbd> | When the focus is placed on the Lookup, it opens the menu. When the menu is open, pressing it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| <kbd>Up arrow</kbd> | When the focus is placed on the Lookup, it opens the menu. When the menu is open, it navigates through menu options. |
| <kbd>Esc</kbd> | When the menu is open, it closes the menu. |
| <kbd>Enter</kbd> | It opens the menu when the focus is placed on the Lookup. If the menu is open, it closes the menu. If the focus is placed in any of the options within the menu, the focused option is selected. |
