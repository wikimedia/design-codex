<script setup>
import ComboboxBasic from '@/../component-demos/combobox/examples/ComboboxBasic.vue';
import ComboboxClearableStartIcon from '@/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue';
import ComboboxComplexMenuItem from '@/../component-demos/combobox/examples/ComboboxComplexMenuItem.vue';
import ComboboxCustomMenuItem from '@/../component-demos/combobox/examples/ComboboxCustomMenuItem.vue';
import ComboboxNoResults from '@/../component-demos/combobox/examples/ComboboxNoResults.vue';
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

### Basic Usage

The Combobox component combines a menu of selectable items with a text box
that can accept arbitrary input from the user. The component should receive a
`v-model` binding from its parent as well as an array of menu items (which can be
empty).

<cdx-demo-wrapper>

<template v-slot:demo>
<combobox-basic />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxBasic.vue

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

<<< @/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue

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

<<< @/../component-demos/combobox/examples/ComboboxComplexMenuItem.vue

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

<<< @/../component-demos/combobox/examples/ComboboxCustomMenuItem.vue

</template>

</cdx-demo-wrapper>

### With footer content

A non-clickable footer can be added to the end of the menu via the `#footer` slot.

<cdx-demo-wrapper>

<template v-slot:demo>
<combobox-no-results />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxNoResults.vue

</template>

</cdx-demo-wrapper>
