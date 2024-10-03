<script setup>
import LookupMultiselectConfigurable from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectConfigurable.vue';
import LookupMultiselectBasic from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectBasic.vue';
import LookupMultiselectWithFetch from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectWithFetch.vue';
import LookupMultiselectWithSuggestions from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectWithSuggestions.vue';
import LookupMultiselectWithInitialSelection from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectWithInitialSelection.vue';
import LookupMultiselectField from '@/../component-demos/lookup-multiselect/examples/LookupMultiselectField.vue';

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
	}
];
</script>

A LookupMultiselect is a predictive input that presents a dropdown menu with suggestions based on
the current input value. Multiple items can be selected, and selections are represented as chips.

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<lookup-multiselect-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic usage

The LookupMultiselect component emits an event on input. The parent component should react by
computing or fetching menu items, then providing those items to the LookupMultiselect component for
display by updating the `menu-items` prop. The user can then select an item from the menu.

The LookupMultiselect component is similar to the [Lookup](./lookup.md) component, but there are
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
	<lookup-multiselect-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup-multiselect/examples/LookupMultiselectBasic.vue [NPM]

<<< @/../component-demos/lookup-multiselect/examples-mw/LookupMultiselectBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With fetched results

Often, LookupMultiselect is used to fetch results from an API endpoint. Parent components should
react to the `input` or `update:input-value` event emitted by LookupMultiselect to search for
results, then pass back to the LookupMultiselect either an array of results to display as menu items
or an empty array if there are no results. After the input changes and until the menuItems are
updated, a pending animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user
nears the end of the list of results, a `load-more` event is emitted. The parent component can react
to this by fetching more results and appending them to the list of menu items provided to the
Lookup. These new items will then be displayed within the menu.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<lookup-multiselect-with-fetch />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup-multiselect/examples/LookupMultiselectWithFetch.vue [NPM]

<<< @/../component-demos/lookup-multiselect/examples-mw/LookupMultiselectWithFetch.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With suggestions

You can show a list of suggestions by passing in an array of menu items initially. The parent
component must handle resetting the menu items to this list of suggestions when the input is
cleared.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<lookup-multiselect-with-suggestions />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup-multiselect/examples/LookupMultiselectWithSuggestions.vue [NPM]

<<< @/../component-demos/lookup-multiselect/examples-mw/LookupMultiselectWithSuggestions.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With initial value

To set an initial selection, do the following:
1. Set the `selected` prop to an array of selected values.
2. Set the `inputChips` prop to a set of chips matching the selected values.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<lookup-multiselect-with-initial-selection />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup-multiselect/examples/LookupMultiselectWithInitialSelection.vue [NPM]

<<< @/../component-demos/lookup-multiselect/examples-mw/LookupMultiselectWithInitialSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A LookupMultiselect can be wrapped in the Field component to add features like a semantic label,
description and help text, validation messages, and more. See the [Field](./field.md) page for more
information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-multiselect-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup-multiselect/examples/LookupMultiselectField.vue [NPM]

<<< @/../component-demos/lookup-multiselect/examples-mw/LookupMultiselectField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Other features

The LookupMultiselect component has an internal Menu and ChipInput. You can use the following
features from those components in the LookupMultiselect component:
- [Custom menu item display](./menu.html#with-custom-menu-item-display)

## Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::
