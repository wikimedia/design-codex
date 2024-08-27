<script setup>
import LookupDefault from '@/../component-demos/lookup/examples/LookupDefault.vue';
import LookupWithCustomMenuItem from '@/../component-demos/lookup/examples/LookupWithCustomMenuItem.vue';
import LookupNoResults from '@/../component-demos/lookup/examples/LookupNoResults.vue';
import LookupWithSuggestions from '@/../component-demos/lookup/examples/LookupWithSuggestions.vue';
import LookupWithInitialSelection from '@/../component-demos/lookup/examples/LookupWithInitialSelection.vue';
import LookupWithFetch from '@/../component-demos/lookup/examples/LookupWithFetch.vue';
import LookupClearableStartIcon from '@/../component-demos/lookup/examples/LookupClearableStartIcon.vue';
import LookupWithPlaceholder from '@/../component-demos/lookup/examples/LookupWithPlaceholder.vue';
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

### Best practices

Consider the following recommendations when using Lookups.

<cdx-demo-rules>

<template #do-media>

![Lookup wrapped within a Field.](../../assets/components/lookup-best-practices-do.svg)

</template>

<template #do-text>

- Wrap the Lookup within the Field component to incorporate features such as labels, descriptions, help text, or validation messages.

</template>

<template #dont-media>

![A standalone Lookup.](../../assets/components/lookup-best-practices-dont.svg)

</template>

<template #dont-text>

- Use a standalone Lookup on a page.

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

### Default

The Lookup component will emit `input` events on input, which the parent component should
react to by computing or fetching menu items, then providing those items to the Lookup component for
display by updating the `menu-items` prop.

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text.

Note that in this example, menu items are Wikidata items with a human-readable label and a Wikidata
entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise
the Lookup component will stay in the pending state indefinitely. If there are no results for the
given input, set the `menu-items` prop to an empty array (`[]`).
:::

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<lookup-default />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupDefault.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom menu item display

The `menu-item` slot can be used to set up custom menu item content and formatting.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-with-custom-menu-item />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithCustomMenuItem.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithCustomMenuItem.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With "no results" content

A non-interactive "no results" message can be displayed via the `no-results` slot. If populated,
this slot will automatically display when there are zero menu items.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-no-results />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupNoResults.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupNoResults.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With initial suggestions

You can show an initial list of options as "suggestions" by passing in an array of menu items
initially. The parent component must handle resetting the menu items to this list of suggestions
when the input is cleared.

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

### With initial selection and input

To set an initial selection, do the following:
1. Set the `selected` prop to the value of the initially selected item.
2. Use the optional `v-model:input-value` prop to set the input value to the label of the selected
   item (or the value, if there is no label).
3. Optional: if you want the selected item to appear in the menu when it is opened, you must provide
   the selected item in the list of `menuItems`. Otherwise, you can initialize `menuItems` to an
   empty array or a list of initial suggestions.

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

### With fetched results and infinite scroll

Often, Lookup is used to fetch results from an API endpoint. Parent components should
react to the `input` event emitted by Lookup to search for results, then pass back to the
Lookup either an array of results to display as menu items or an empty array if there are no
results. Between those two events, a pending state animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled, when the user nears the end of the list of results, a `load-more` event is
emitted. The parent component can react to this by fetching more results and appending them to the
list of menu items provided to the Lookup. These new items will then be displayed within the menu.

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

### Clearable, with start icon

Props of the TextInput component can be bound to Lookup and will be passed down to the TextInput
component inside of it, so you can take advantage of features like the "clear" button and icons.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-clearable-start-icon />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupClearableStartIcon.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupClearableStartIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With placeholder

Attributes (except for `class`) will fall through to the input element, so you can set things like
`placeholder` on the Lookup component and they'll be applied to the input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-with-placeholder />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithPlaceholder.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithPlaceholder.vue [MediaWiki]

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

## Vue usage

Typical use of this component will involve listening for `input` events, fetching or otherwise
computing menu items, then passing those menu items back to the Lookup for display.

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
