<script setup>
import ComboboxBasic from '@/../component-demos/combobox/examples/ComboboxBasic.vue';
import ComboboxClearableStartIcon from '@/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue';
import ComboboxComplexMenuItem from '@/../component-demos/combobox/examples/ComboboxComplexMenuItem.vue';
import ComboboxCustomMenuItem from '@/../component-demos/combobox/examples/ComboboxCustomMenuItem.vue';
import ComboboxNoResults from '@/../component-demos/combobox/examples/ComboboxNoResults.vue';
import ComboboxWithScroll from '@/../component-demos/combobox/examples/ComboboxWithScroll.vue';
import ComboboxDisabled from '@/../component-demos/combobox/examples/ComboboxDisabled.vue';
import ComboboxField from '@/../component-demos/combobox/examples/ComboboxField.vue';
</script>

 A Combobox combines a [text input](./text-input.md)
 with an [icon-only chevron button](./button.md#icon-only-button).
 When activated, a dropdown menu of selectable options displays.

## Guidelines

### Using comboboxes
Through comboboxes, users can input text, numbers, symbols or mixed-format strings (unless
specifically restricted) while being offered autocomplete options in a dropdown menu.

Use the Combobox component when it's difficult to predict the user's response to a prompt. It
provides predefined input values as options, for example common responses, to ease filling out the
input with relevant values.

### Specifications

![Specification of Combobox.](../../assets/components/combobox-specifications.svg)

1. **Icon** (optional)<br>
Icons may be added to simplify the identification of specific combobox inputs.
2. **Placeholder text** (optional)<br>
The placeholder text provides an example of what type of information is being requested in the
input. The placeholder text should further illustrate and support the combobox input label. However,
it should never be the only input description.
3. **Chevron button**<br>
An [icon-only chevron button](./button.md#icon-only-button)
opens the menu.
4. **Menu**<br>
When the combobox is active, a [menu with options](./menu.md) is displayed.

The base min-width for the Combobox component is set at `@size-1600` (equivalent to `256px` in the default Codex theme), but it can be customized to a smaller width if needed. There is no maximum width limit. 

If the text in the Combobox component exceeds the available space, it will overflow horizontally.

By default, when the menu is expanded, all menu items are displayed. However, if the menu height is limited, the remaining menu items will be accessible via scrolling.

Refer to the
[Combobox component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2606-51961&mode=design&t=g6roQDZkPxHE5omu-11).

### Interaction states

Comboboxes have the following visually separate states:

![States of the Combobox component: default, hover on input, hover on button, disabled, active, filled, and no results.](../../assets/components/combobox-interaction-states.svg)

1. Default
2. Hover on input
3. Hover on button
4. Disabled
5. Active and hover on one of the menu items
6. Typing in the input and having a menu item selected based on the matching text
7. Combobox filled with one selected menu option
8. Active with no results

### Best practices

Consider the following recommendations when using comboboxes.

#### Icon

<cdx-demo-rules>

<template #do-media>

![An example of a Combobox with a complex icon.](../../assets/components/combobox-best-practices-icon-do.svg)

</template>

<template #do-text>

- Use a start icon that complements the placeholder text.

</template>

<template #dont-media>

![An example of a Combobox with a search icon.](../../assets/components/combobox-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.

</template>

</cdx-demo-rules>

## Demos

### Basic Usage

The Combobox component combines a menu of selectable items with a text box
that can accept arbitrary input from the user. The component should receive a
`v-model:selected` binding from its parent as well as an array of menu items (which can be
empty).

<cdx-demo-wrapper :force-controls="true">

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

### Clearable, with start icon

Valid TextInput props like `startIcon`, `endIcon`, and `clearable` will be
passed on to the embedded `TextInput`.

<cdx-demo-wrapper>

<template v-slot:demo>
	<combobox-clearable-start-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxClearableStartIcon.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

### With menu item icons and descriptions

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Combobox to bold the label text and
hide the text overflow of the descriptions.

<cdx-demo-wrapper>

<template v-slot:demo>
	<combobox-complex-menu-item />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxComplexMenuItem.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxComplexMenuItem.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

### With custom menu item display

Like other menu-style components (`Select`, `Lookup`, etc.), a custom template can be provided via
the `#menu-item` slot. In this example, only the menu item's icon is displayed in the menu.

<cdx-demo-wrapper>

<template v-slot:demo>
	<combobox-custom-menu-item />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxCustomMenuItem.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxCustomMenuItem.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

### With "no results" content

A non-interactive "no results" message can be displayed via the `no-results` slot. If populated,
this slot will automatically display when there are zero menu items.

<cdx-demo-wrapper>

<template v-slot:demo>
	<combobox-no-results />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxNoResults.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxNoResults.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

### With configurable scroll

By default, all menu items are displayed when the menu is expanded. To limit the height of the menu
and enable scrolling, use the `visibleItemLimit` property of the `menuConfig` prop.

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

### Disabled

<cdx-demo-wrapper>

<template v-slot:demo>
	<combobox-disabled />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/combobox/examples/ComboboxDisabled.vue [NPM]

<<< @/../component-demos/combobox/examples-mw/ComboboxDisabled.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

### Form field

A Combobox can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

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

## Vue usage

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#usage)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::
