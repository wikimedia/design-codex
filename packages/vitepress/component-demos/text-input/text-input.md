<script setup>
import { cdxIconSearch, cdxIconInfoFilled } from 'icons';
import TextInputDemo from './../../component-demos/text-input/examples/TextInputDemo.vue';
import TextInputDefault from './../../component-demos/text-input/examples/TextInputDefault.vue';
import TextInputInitialValue from './../../component-demos/text-input/examples/TextInputInitialValue.vue';
import TextInputStartIcon from './../../component-demos/text-input/examples/TextInputStartIcon.vue';
import TextInputEndIcon from './../../component-demos/text-input/examples/TextInputEndIcon.vue';
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

Open up the browser console to see events emitted on input, change, focus, and blur.

### Default

This simple example demonstrates how to bind a reactive reference to the input's value via
`v-model`. The reactive reference will automatically update when the input value changes.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :showValue="true" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputDefault.vue

</template>
</Wrapper>

In this example, the parent component sets an initial value and has a reset button that will restore
that initial value on click.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :showValue="true" initialValue="Initial value" :allowReset="true" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputInitialValue.vue

</template>
</Wrapper>

### Clearable

Including the `clearable` prop will add a clear button to the end of the icon when the input is not
empty. On click, the clear button will set the input value to an empty string.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :showValue="true" :input-props="{ clearable: true }" />
</template>

<template v-slot:code>

```vue
<CdxTextInput :clearable="true" />
```

</template>
</Wrapper>

### With start icon

Any Codex icon can be set to the start icon.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :input-props="{ type: 'search', startIcon: cdxIconSearch }" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputStartIcon.vue

</template>
</Wrapper>

### With end icon

Any Codex icon can be set to the start icon. Note that if you include both an end icon and the
`clearable` prop, the latter will override the end icon with the clear button.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :input-props="{ disabled: true, endIcon: cdxIconInfoFilled }" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputEndIcon.vue

</template>
</Wrapper>

### With placeholder

To add placeholder text, add a `placeholder` attribute.

<Wrapper>
<template v-slot:demo>
<TextInputDemo placeholder="Start typing..." />
</template>

<template v-slot:code>

```vue
<CdxTextInput placeholder="Start typing..." />
```

</template>
</Wrapper>

### Disabled

To disable the input, add the `disabled` attribute.

<Wrapper>
<template v-slot:demo>
<TextInputDemo :input-props="{ disabled: true }" />
</template>

<template v-slot:code>

```vue
<cdx-text-input :disabled="true" />
```

</template>
</Wrapper>

<style>
.vp-wrapper .cdx-text-input {
	max-width: 400px;
	margin-bottom: 16px;
}

.vp-wrapper p {
	margin: 0 0 16px 0;
	font-weight: bold;
}
</style>