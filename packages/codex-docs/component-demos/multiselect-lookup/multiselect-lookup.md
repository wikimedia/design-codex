<script setup>
import MultiselectLookupConfigurable from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupConfigurable.vue';
import MultiselectLookupBasic from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupBasic.vue';
import MultiselectLookupWithFetch from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithFetch.vue';
import MultiselectLookupWithSuggestions from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithSuggestions.vue';
import MultiselectLookupWithInitialSelection from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithInitialSelection.vue';
import MultiselectLookupField from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupField.vue';
import MultiselectLookupWithKeepInput from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithKeepInput.vue'

const controlsConfig = [
	{
		name: 'separateInput',
		type: 'boolean'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'readonly',
		type: 'boolean'
	},
	{
		name: 'highlightQuery',
		type: 'boolean'
	}
];
</script>

A MultiselectLookup is a predictive input that allows users to make multiple selections from a menu
of options.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<multiselect-lookup-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use MultiselectLookup

Use the MultiselectLookup component to let users search through a set of options to choose
predefined values for a form field or to filter information. A MultiselectLookup is useful when
there are many options the user can choose from, so they need to filter the items via a text query.

**When to use:**
- When users may only select values from a predefined list.
- When there are many predefined options to choose from.
- When users need to be able to select multiple items.

**When not to use:**
- When users need to create custom values that cannot be selected from a menu. Use [ChipInput](./chip-input.md) instead.
- When users need to select a single option from the menu. Instead, use [Lookup](./lookup.md) or [Select](./select.md).
- When the filtering process is simple and involves a short list of options. For static options in a small list, consider using a [Checkbox](./checkbox.md) group instead.

### About MultiselectLookup

MultiselectLookup includes the following elements.

#### Input

A predictive text input where the user types to look for the suggested results.

#### Dropdown menu

Results matching the input text are displayed within the Menu, allowing users to select one or more
options to include as chips.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Include an initial list of 2–5 suggestions if it's helpful to users.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include a "no results" message if there are no results found for the current input value.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Chips

Selected results from the menu are included as chips in the input. Individual chips can be removed
to de-select their values. Chips can be placed within the input or in a separate section above the
input.

::: tip Use the Field component
Wrap the MultiselectLookup within the [Field component](./field.md) to incorporate features such as
a label, description, help text, and inline validation messages.
:::

## Examples

### Basic usage

The MultiselectLookup component emits an event when the user types in the input. The parent
component can then fetch items matching that input and pass them to the MultiselectLookup to display
in the Menu.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<multiselect-lookup-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupBasic.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The MultiselectLookup component emits an event on input. The parent component should react by
computing or fetching menu items, then providing those items to the MultiselectLookup component for
display by updating the `menu-items` prop. The user can then select an item from the menu.

The MultiselectLookup component is similar to the [Lookup](./lookup.md) component, but there are
some key differences to enable the selection of multiple items:

1. The `selected` prop, which is bound with `v-model`, is an array of selected values (or an empty
   array if there are no selections).
2. The `inputChips` prop must be bound via `v-model` and is an array of chips representing each
   selected item (or an empty array if there are no selections).

There are 2 ways to listen for input changes:
1. Listen for `input` events, like in the example below. Do this if you only need to know about the
   input when it changes.
2. Use `v-model` to bind the `inputValue` prop and listen for either `input` or `update:input-value`
   events. Do this if you need to know the current input value at other times, or if you want to be
   able to set the input value. Refer to the [Vue usage](#vue-usage) tables for more information.

Items are displayed via the MenuItem component—refer to the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the MultiselectLookup to bold the label
text. Note that in this example, menu items are Wikidata items with a human-readable label and a
Wikidata entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise the
MultiselectLookup component will stay in the pending state indefinitely. If there are no results for
the given input, set the `menu-items` prop to an empty array (`[]`).
:::

Open the console, where the current selection is output each time an item is selected or
de-selected.

</cdx-accordion>

### With keep input on selection

By default, when the user makes a selection, the input will be cleared and the menu will be closed. Sometimes, it might be more helpful to enable users to select multiple items based on the same search term. In these cases, use the `keepInputOnSelection` prop, which will keep the same input and make the menu stay open on selection.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<multiselect-lookup-with-keep-input />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupWithKeepInput.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupWithKeepInput.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With fetched results

Often, MultiselectLookup is used to fetch results from an API endpoint, and may display many
results. You can control how many items to show in the menu at once, and other items can be reached
by scrolling. You can also load more items when the user scrolls to the end of the menu.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<multiselect-lookup-with-fetch />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupWithFetch.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupWithFetch.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Parent components should react to the `input` or `update:input-value` event emitted by
MultiselectLookup to search for results, then pass back to the MultiselectLookup either an array of
results to display as menu items or an empty array if there are no results. After the input changes
and until the menuItems are updated, a pending animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user
nears the end of the list of results, a `load-more` event is emitted. The parent component can react
to this by fetching more results and appending them to the list of menu items provided to the
MultiselectLookup. These new items will then be displayed within the menu.

</cdx-accordion>

### With suggestions

You can show a list of 2–5 initial suggestions if it's helpful.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<multiselect-lookup-with-suggestions />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupWithSuggestions.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupWithSuggestions.vue [MediaWiki]

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
	<multiselect-lookup-with-initial-selection />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupWithInitialSelection.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupWithInitialSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To set an initial selection, do the following:
1. Set the `selected` prop to an array of selected values.
2. Set the `inputChips` prop to a set of chips matching the selected values.

</cdx-accordion>

### Form field

A MultiselectLookup can be wrapped in the Field component to add features like a semantic label,
description and help text, validation messages, and more. Refer to the [Field](./field.md) page for
more information.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Automatically display an inline warning message if the entered text doesn't match any item from the MultiselectLookup's menu, and show an error after form submission.</cdx-demo-best-practice>
<cdx-demo-best-practice>Provide an error message that provides guidance on fixing the issue.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<multiselect-lookup-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/multiselect-lookup/examples/MultiselectLookupField.vue [NPM]

<<< @/../component-demos/multiselect-lookup/examples-mw/MultiselectLookupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Other features

The MultiselectLookup component has an internal Menu and ChipInput. You can use the following
features from those components in the MultiselectLookup component:
- [Custom menu item display](./menu.html#menu-item-display)
- [Limited height with scrolling](./menu.html#with-scrolling-enabled)
- [Menu groups](./menu.html#menu-groups)
- [MenuItem features](./menu-item.html)

## Technical implementation

### Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus between the chips within the input. When the focus is placed on the last chip, it places the focus to the input. When an item from the menu is hovered, pressing Tab selects or deselects it. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous chip within the input or to the previous interactive element in the page. |
| <kbd>Left arrow</kbd> + <kbd>Right arrow</kbd> | Arrow keys navigate between the chips within the input when they are focused. |
| <kbd>Up arrow</kbd> + <kbd>Down arrow</kbd> | When the focus is placed on the input, it opens the menu. When the menu is open, pressing it navigates through menu options. |
| <kbd>Enter</kbd> | When a chip is focused, it removes the chip. When an item from the menu is hovered, pressing Enter selects it. |
| <kbd>Esc</kbd> | When any of the chips or input is focused, pressing Esc removes the focus from the focused element. When the menu is open, it closes the menu. |
| <kbd>Backspace</kbd> | If the focus is placed on a chip, this key removes the chip and moves the focus to the previous chip. When the last chip is removed, it places the focus to the input. |
