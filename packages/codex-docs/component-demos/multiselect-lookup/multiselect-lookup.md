<script setup>
import MultiselectLookupConfigurable from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupConfigurable.vue';
import MultiselectLookupBasic from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupBasic.vue';
import MultiselectLookupWithFetch from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithFetch.vue';
import MultiselectLookupWithSuggestions from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithSuggestions.vue';
import MultiselectLookupWithInitialSelection from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupWithInitialSelection.vue';
import MultiselectLookupField from '@/../component-demos/multiselect-lookup/examples/MultiselectLookupField.vue';

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
	}
];
</script>

A MultiselectLookup is a predictive input that allows users to make multiple selections from a menu of options.

## Guidelines

### When to use MultiselectLookups

The MultiselectLookup allows users to filter information or fill out form data by selecting multiple items from a menu of options.
Create chips by entering letters or words within the input field and selecting one or more options from the menu options that match the entered text.
Remove chips by unselecting them from the open menu, clicking the added chip, or using its remove button.

**When to use:**
- When users need to simplify a complex filtering process by creating chips from a predefined list of options in a menu.
- When users need to enter text to get autocomplete suggestions and select more than one option from a menu.

**When not to use:**
- When users need to create custom chips that cannot be selected from a menu. Use [ChipInput](./chip-input.md) instead.
- When users need to select one single option from the menu. Instead, use [Lookup](./lookup.md) or [Select](./select.md).
- When the filtering process is simple and involves a short list of options. For static options in a small list, consider using a [Checkbox](./checkbox.md) group instead.

### Specifications

![Specification of MultiselectLookup.](../../assets/components/multiselect-lookup-specifications.svg)

MultiselectLookups include the following items:
1. **Input**<br>A predictive text input where the user types to look for the suggested results.
2. **Dropdown menu**<br>Results matching the input text are displayed within the Menu, allowing users to select one or more options to include as chips.
3. **Chips**<br>Selected results from the menu are included as chips in the input, and they are stacked next to each other. A chip can be removed by clicking within it or on its remove button.

#### Component limitations

The base min-width for the MultiselectLookup component is set at `@size-1600` (equivalent to `256px` in the default Codex theme), but it can be customized to a smaller width if needed. There is no maximum width set.
Chips can vary in length as needed and will expand in width based on text length, with ellipsis applied if text exceeds the available width. Chips may stack into multiple lines within the input when needed.

Refer to the [MultiselectLookup component in Codex Figma](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=21135-5912&node-type=frame&t=U82bkipAK1klYoL2-11).

### Types

#### Placement of chips

Depending on the placement of the chips, there are two types of MultiselectLookup:

1. **Chips within the input field**<br>In this case, selected options from the menu are added to the input field as chips, placed side by side.
2. **Chips separated from the input field**<br>In this case, the chips are placed in a light gray box above the input field once they are included.

![MultiselectLookup types based on chip placement: chips within the input or chips separated from the input.](../../assets/components/multiselect-lookup-types.svg)

#### No results

If there are no results for the text typed by the user, a non-interactive "no results" message will be displayed within the menu.

![MultiselectLookup with no matching results from the text typed.](../../assets/components/multiselect-lookup-types-no-results.svg)

### Interaction states

MultiselectLookup has the following visually separate states:

![Interaction states of MultiselectLookup: default, hover on input, focus-active,focused with one selected item, filled, hover on chip’s remove button, hover on chip, focused chip, disabled, error default, error hover, and error filled.](../../assets/components/multiselect-lookup-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover on input
3. Focus or active
4. Focused with one selected item
5. Filled
6. Hover on chip’s remove button
7. Hover on chip
8. Focused chip
9. Disabled
10. Error default
11. Error hover
12. Error filled

</div>

The error state must always be accompanied by an inline error message to ensure users are informed about the error and provides guidance to fix it. This message will be displayed when the MultiselectLookup is included within a [Field](./field.md).

### Best practices

Consider the following recommendations when using MultiselectLookups.

<cdx-demo-rules>

<template #do-media>

![“Invite users” Field with a MultiselectLookup showing two users included as chips.](../../assets/components/multiselect-lookup-best-practices-do.svg)

</template>

<template #do-text>

- Use MultiselectLookup to enable users to select multiple items from a menu with predefined options.

</template>

<template #dont-media>

![“Select a language” Field expecting one single chip selection from a MultiselectLookup.](../../assets/components/multiselect-lookup-best-practices-dont.svg)

</template>

<template #dont-text>

- Use MultiselectLookup if only a single item input is anticipated. In this case, consider using alternative components like Lookup or Select instead.

</template>

</cdx-demo-rules>

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

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<multiselect-lookup-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic usage

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
options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text. Note
that in this example, menu items are Wikidata items with a human-readable label and a Wikidata
entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise
the Lookup component will stay in the pending state indefinitely. If there are no results for the
given input, set the `menu-items` prop to an empty array (`[]`).
:::

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

### With fetched results

Often, MultiselectLookup is used to fetch results from an API endpoint. Parent components should
react to the `input` or `update:input-value` event emitted by MultiselectLookup to search for
results, then pass back to the MultiselectLookup either an array of results to display as menu items
or an empty array if there are no results. After the input changes and until the menuItems are
updated, a pending animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user
nears the end of the list of results, a `load-more` event is emitted. The parent component can react
to this by fetching more results and appending them to the list of menu items provided to the
Lookup. These new items will then be displayed within the menu.

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

### With suggestions

You can show a list of suggestions by passing in a group of menu items initially. The parent
component must handle resetting the menu items to this list of suggestions when the input is
cleared.

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

### With initial value

To set an initial selection, do the following:
1. Set the `selected` prop to an array of selected values.
2. Set the `inputChips` prop to a set of chips matching the selected values.

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

### Form field

A MultiselectLookup can be wrapped in the Field component to add features like a semantic label,
description and help text, validation messages, and more. Refer to the [Field](./field.md) page for
more information.

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
- [Custom menu item display](./menu.html#with-custom-menu-item-display)
- [Menu groups](./menu.html#with-menu-groups)

## Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::
