<script setup>
import SearchInputDefault from '@/../component-demos/search-input/examples/SearchInputDefault.vue';
import SearchInputWithButton from '@/../component-demos/search-input/examples/SearchInputWithButton.vue';
import SearchInputClearable from '@/../component-demos/search-input/examples/SearchInputClearable.vue';
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

Open the console to see emitted events.

### Default

This example has placeholder text.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
<SearchInputDefault />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputDefault.vue

</template>
</cdx-demo-wrapper>

### With button

This example provides a `buttonLabel` prop, which enables the submit button.

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputWithButton />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputWithButton.vue

</template>
</cdx-demo-wrapper>

### Clearable

The `clearable` prop from the [TextInput](./text-input.md) component adds a "clear" button when
input is present.

<cdx-demo-wrapper>
<template v-slot:demo>
<SearchInputClearable />
</template>

<template v-slot:code>

<<< @/../component-demos/search-input/examples/SearchInputClearable.vue

</template>
</cdx-demo-wrapper>
