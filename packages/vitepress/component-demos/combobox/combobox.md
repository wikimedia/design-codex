<script setup>
import ComboboxBasic from '@/../component-demos/combobox/examples/ComboboxBasic.vue';
import ComboboxClearableStartIcon from '@/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue';
import ComboboxCustomOption from '@/../component-demos/combobox/examples/ComboboxCustomOption.vue';
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

The Combobox component combines a menu of selectable options with a text box
that can accept arbitrary input from the user. The component should receive a
`v-model` binding from its parent as well as an array of options (which can be
empty).

<Wrapper>

<template v-slot:demo>
<ComboboxBasic />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxBasic.vue

</template>

</Wrapper>

### Clearable, with start icon

Valid TextInput props like `startIcon`, `endIcon`, and `clearable` will be
passed on to the embedded `TextInput`.

<Wrapper>

<template v-slot:demo>
<ComboboxClearableStartIcon />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxClearableStartIcon.vue

</template>

</Wrapper>

### With custom option format

Like other menu-style components (`Select`, `Lookup`, etc.), a custom option
template can be provided via the `#menu-option` slot.

<Wrapper>

<template v-slot:demo>
<ComboboxCustomOption />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxCustomOption.vue

</template>

</Wrapper>

### With footer content

A non-clickable footer can be added to the end of the options menu via the `#footer` slot.

<Wrapper>

<template v-slot:demo>
<ComboboxNoResults />
</template>

<template v-slot:code>

<<< @/../component-demos/combobox/examples/ComboboxNoResults.vue

</template>

</Wrapper>
