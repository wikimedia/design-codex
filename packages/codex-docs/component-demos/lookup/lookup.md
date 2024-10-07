<script setup>
import LookupBasic from '@/../component-demos/lookup/examples/LookupBasic.vue';
import LookupWithSuggestions from '@/../component-demos/lookup/examples/LookupWithSuggestions.vue';
import LookupWithInitialSelection from '@/../component-demos/lookup/examples/LookupWithInitialSelection.vue';
import LookupWithFetch from '@/../component-demos/lookup/examples/LookupWithFetch.vue';
import LookupField from '@/../component-demos/lookup/examples/LookupField.vue';
import LookupConfigurable from '@/../component-demos/lookup/examples/LookupConfigurable.vue';

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

A Lookup is a predictive text input that presents a dropdown menu with
suggestions based on the current input value.

## Guidelines

### When to use lookups
Use the Lookup component to let users search through a dataset to choose a
predefined value for a form field. This can be useful when there are many
options the user can choose from, so they need to filter the items via a text
query.

Avoid using Lookup to enable users to search for and navigate to content.
Instead, use [SearchInput](./search-input.md) or
[TypeaheadSearch](./typeahead-search.md).

### Specifications
![Specification of Lookup.](../../assets/components/lookup-specifications.svg)

Lookup includes the following elements:
1. **Input**<br>A TextInput where the user types to look for the suggested
	results. This can optionally include a start icon, clear button, and placeholder
	text.
2. **Dropdown menu**<br>Suggested results are displayed via the Menu component.

#### Component limitations

Since the Lookup component uses a [TextInput](./text-input.md), its base `min-width` is set to
`size-1600` token (equivalent to `256px` in the default Codex theme), but it can be customized to
a smaller width if needed. There is no maximum width set. If the text entered in the input exceeds
the available space, it will overflow horizontally.

Refer to the [Lookup component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=5034-54226&mode=design&t=2O0ceqiRfqCtnidq-11).

### Types
An input field featuring an optional placeholder will enable users to initiate
their search for suggested results. These suggestions will be displayed within a
dropdown menu, and if the menu cannot fully accommodate the results, a scrollbar
with the choice of infinite scroll can be included.

![Lookup with a custom placeholder.](../../assets/components/lookup-types-scroll.svg)

#### Clearable, with start icon
An optional start icon and clear button could appear within the input field.

![A clearable Lookup component with a custom start icon.](../../assets/components/lookup-types-start-icon.svg)

#### With custom menu item display
Custom content and formats can be applied to change the appearance of menu items
according to your needs.

![Lookup with custom menu items displayed.](../../assets/components/lookup-types-custom-menu.svg)

#### With initial suggestions
When the input field is focused, an initial list of suggestions may appear within the menu. When
typing within the input field, these suggestions disappear, and the menu showcases a list of items
matching the typed value. It is advisable to include a minimum of 2 suggested items and ideally
limit the maximum to 4 or 5 items.

![Lookup displaying a list of suggested results in the first image and a list of matched results in the second.](../../assets/components/lookup-types-suggestions.svg)

#### No results
If there are no results for the text typed by the user, a non-interactive "no
results" message will be displayed within the menu.

![Lookup with no results found.](../../assets/components/lookup-types-no-results.svg)

#### Lookup within a form field

A Lookup can be wrapped within a [Field](./field.md) to include features like
label, description, help text, or validation messages.

![Lookup within a Field.](../../assets/components/lookup-types-field.svg)

### Interaction states
Interaction can take place within both the input and the displayed menu:

![Interaction states of Lookup: default, hover, focus, active, filled, and filled active where a menu item selected is displayed.](../../assets/components/lookup-interaction-states.svg)

1. Default
2. Hover
3. Focus
4. Active
5. Filled
6. Filled active (with a menu item selected)
7. Error
8. Error hover
9. Disabled

The error state must always be accompanied by an inline error message to ensure users are informed about the error and provides guidance to fix it. This message will be displayed when the Lookup is included within a [Field](field.md).

### Best practices

Consider the following recommendations when using Lookups.

<cdx-demo-rules>

<template #do-media>

![Field with a Lookup displaying a warning Inline Message.](../../assets/components/lookup-best-practices-inline-message-do.svg)

</template>

<template #do-text>

- Wrap the Lookup within the Field component to incorporate features such as labels, descriptions, help text, or inline validation messages.
- Automatically display an inline warning message if the entered text doesn't match any item from the Lookup's menu, and show an error after form submission.

</template>

<template #dont-media>

![Field with a Lookup displaying a success Inline Message.](../../assets/components/lookup-best-practices-inline-message-dont.svg)

</template>

<template #dont-text>

- Use an inline success message to confirm a selection from the Lookup menu since it’s unnecessary.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Down arrow</kbd> | When the focus is placed on the Lookup, it opens the menu. When the menu is open, pressing it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| <kbd>Up arrow</kbd> | When the focus is placed on the Lookup, it opens the menu. When the menu is open, it navigates through menu options. |
| <kbd>Esc</kbd> | When the menu is open, it closes the menu. |
| <kbd>Enter</kbd> | It opens the menu when the focus is placed on the Lookup. If the menu is open, it closes the menu. If the focus is placed in any of the options within the menu, the focused option is selected. |

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<lookup-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic usage

The Lookup component emits an event on input. The parent component should react by computing or
fetching menu items, then providing those items to the Lookup component for display by updating the
`menu-items` prop. The user can then select an item from the menu.

There are 2 ways to listen for input changes:
1. Listen for `input` events, like in the example below. Do this if you only need to know about the
   input when it changes.
2. Use `v-model` to bind the `inputValue` prop and listen for either `input` or `update:input-value`
   events. Do this if you need to know the current input value at other times, or if you want to be
   able to set the input value. See the [Vue usage](#vue-usage) tables for more information.

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text. Note
that in this example, menu items are Wikidata items with a human-readable label and a Wikidata
entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise
the Lookup component will stay in the pending state indefinitely. If there are no results for the
given input, set the `menu-items` prop to an empty array (`[]`).
:::

<cdx-demo-wrapper :force-controls="true">
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

### With fetched results

Often, Lookup is used to fetch results from an API endpoint. Parent components should react to the
`input` or `update:input-value` event emitted by Lookup to search for results, then pass back to the
Lookup either an array of results to display as menu items or an empty array if there are no
results. Between those two events, a pending animation will display in the input.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user
nears the end of the list of results, a `load-more` event is emitted. The parent component can react
to this by fetching more results and appending them to the list of menu items provided to the
Lookup. These new items will then be displayed within the menu.

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

### With suggestions

You can show a list of suggestions by passing in an array of menu items initially. The parent
component must handle resetting the menu items to this list of suggestions when the input is
cleared.

<cdx-demo-wrapper :force-controls="true">
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

### With initial value

To set an initial selection and input value, do the following:
1. Set the `selected` prop to the value of the selected item.
2. Use the optional `v-model:input-value` prop to set the input value to the label of the selected
   item (or the value, if there is no label).

You can also use `v-model:input-value` to set an initial input value without an initial selection.

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

### Form field

A Lookup can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

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

The Lookup component has an internal Menu and TextInput. You can use the following features from
those components in the Lookup component:
- [Custom menu item display](./menu.html#with-custom-menu-item-display)
- [Start and end icons](./text-input.html#with-icons)
- [Clearable](./text-input.html#clearable)

## Vue usage

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## CSS-only version

### Markup structure

There is no true CSS-only version of the Lookup component. However, a
[CSS-only TextInput component](./text-input.md#css-only-version) can be used
instead, since it has visual parity with the Lookup component with its menu
collapsed. For example, you could display a CSS-only TextInput on page load
while a Vue app loads, then replace it with the Vue Lookup component once the
Vue app has mounted.

The example below is a simple text input with a placeholder, but icons and
different states are supported—see the [TextInput docs](./text-input.md#css-only-version)
for more information.


<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper div. -->
<div class="cdx-text-input">
	<!-- Input element with CSS class and attributes. -->
	<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
</div>
```

</template>
</cdx-demo-wrapper>
