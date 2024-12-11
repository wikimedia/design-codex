<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import ComboboxBasic from '@/../component-demos/combobox/examples/ComboboxBasic.vue';
import ComboboxWithFiltering from '@/../component-demos/combobox/examples/ComboboxWithFiltering.vue';
import ComboboxWithScroll from '@/../component-demos/combobox/examples/ComboboxWithScroll.vue';
import ComboboxField from '@/../component-demos/combobox/examples/ComboboxField.vue';
import ComboboxConfigurable from '@/../component-demos/combobox/examples/ComboboxConfigurable.vue';

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

 A Combobox is a text input with a dropdown menu of selectable options.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true"cp>
<template v-slot:demo="{ propValues }">
	<combobox-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use Combobox

Use the Combobox component when it's difficult to predict the user's response to a prompt. It
provides predefined input values as options, for example common responses, to make it easier to
complete the field.

If users can only select a predefined option, use [Select](./select.md) (for a short list of options) or [Lookup](./lookup.md) (for a longer, searchable list).

### About Combobox

Combobox allows users to either input text or select a value from a menu of options to complete a
form field. Combobox includes the following elements.

#### Start icon (optional)

A start icon can be included to visually enhance the Combobox's purpose.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a simple icon that is easily understandable to users.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Input

The user can type text into the [TextInput](./text-input.md). If they select an item from the menu,
it will appear in the TextInput.

##### Placeholder text (optional)

Placeholder text provides an example of what type of information is being requested in the input.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Placeholder text should further illustrate and support the Combobox's label.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should never replace the label nor be the input's only description.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Menu

When the Combobox is expanded, a [Menu](./menu.md) of options is displayed. These options can use
all the features of the [MenuItem](./menu-item.md) component.

<cdx-demo-best-practices>
<cdx-demo-best-practice>2–5 menu items are recommended for optimal usability.</cdx-demo-best-practice>
<cdx-demo-best-practice>When there are more items, consider setting a visible item limit to enable scrolling.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Basic Usage

The Combobox component combines a menu of selectable items with a text box
that can accept arbitrary input from the user.

<cdx-demo-wrapper>
<template v-slot:demo>
	<combobox-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxBasic.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The component should receive a `v-model:selected` binding from its parent as well as an array of
`menuItems` (which can be empty).

</cdx-accordion>

### With configurable scroll

By default, all menu items are displayed when the menu is expanded. You can configure a
`visibleItemLimit` to limit the height of the menu and enable scrolling.

<cdx-demo-wrapper>
<template v-slot:demo>
	<combobox-with-scroll />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxWithScroll.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxWithScroll.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To limit the height of the menu and enable scrolling, use the `visibleItemLimit` property of the
`menuConfig` prop.

</cdx-accordion>

### With filtering

When there are many options, you can filter items depending on the current input.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Include a "no results" message when no matching items are found.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<combobox-with-filtering />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxWithFiltering.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxWithFiltering.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Add a "no results" message via the `no-results` slot. If populated, this slot will automatically
display when there are zero menu items.

</cdx-accordion>

### Form field

A Combobox can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more
information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<combobox-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxField.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Other features

The Combobox component has an internal TextInput and Menu. You can use the following features from
those components in the Combobox component:
- [Start and end icons](./text-input.html#with-icons)
- [Clearable](./text-input.html#clearable)
- [Custom menu item display](./menu.html#with-custom-menu-item-display)
- [Menu groups](./menu.html#with-menu-groups)

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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It places the focus within the input of the Combobox and opens its menu. It also moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | When the focus is placed within the Combobox input, it moves the focus to the previous interactive element. |
| <kbd>Down arrow</kbd> | When the Combobox is focused, it opens the menu. When the menu is open, it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| <kbd>Up arrow</kbd> | When the Combobox is focused, it opens the menu. When the menu is open, it navigates through menu options. |
| <kbd>Enter</kbd> | It opens the menu when the focus is placed on the Combobox. If the menu is open, it closes the menu. If the focus is placed in any of the options within the menu, the focused option is selected. |
| <kbd>Esc</kbd> | When the menu it’s open, it closes the menu. |
| <kbd>Home</kbd> | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| <kbd>End</kbd> | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
