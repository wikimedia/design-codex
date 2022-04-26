<script setup>
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import TextInputConfigurable from '@/../component-demos/text-input/examples/TextInputConfigurable.vue';
import TextInputDemo from '@/../component-demos/text-input/examples/TextInputDemo.vue';

const controlsConfig = [
	{
		name: 'startIcon',
		type: 'boolean'
	},
	{
		name: 'endIcon',
		type: 'boolean'
	},
	{
		name: 'clearable',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	}
];
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<text-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Default

This simple example demonstrates how to bind a reactive reference to the input's value via
`v-model`. The reactive reference will automatically update when the input value changes.

Open up the browser console to see events emitted on input, change, focus, and blur.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :showValue="true" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputDefault.vue

</template>
</cdx-demo-wrapper>

In this example, the parent component sets an initial value and has a reset button that will restore
that initial value on click.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :showValue="true" initialValue="Initial value" :allowReset="true" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputInitialValue.vue

</template>
</cdx-demo-wrapper>

### Clearable

Including the `clearable` prop will add a clear button to the end of the icon when the input is not
empty. On click, the clear button will set the input value to an empty string.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :showValue="true" :input-props="{ clearable: true }" />
</template>

<template v-slot:code>

```vue
<cdx-text-input :clearable="true" />
```

</template>
</cdx-demo-wrapper>

### With start icon

Any Codex icon can be set to the start icon.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :input-props="{ inputType: 'search', startIcon: cdxIconSearch }" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputStartIcon.vue

</template>
</cdx-demo-wrapper>

### With end icon

Any Codex icon can be set to the end icon. Note that if you include both an end icon and the
`clearable` prop, the latter will override the end icon with the clear button.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :input-props="{ endIcon: cdxIconInfoFilled }" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputEndIcon.vue

</template>
</cdx-demo-wrapper>

### With placeholder

To add placeholder text, add a `placeholder` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo placeholder="Start typing..." />
</template>

<template v-slot:code>

```vue
<cdx-text-input placeholder="Start typing..." />
```

</template>
</cdx-demo-wrapper>

### Disabled

To disable the input, add the `disabled` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :input-props="{ startIcon: cdxIconSearch, disabled: true }" />
</template>

<template v-slot:code>

```vue
<cdx-text-input :start-icon="cdxIconSearch" :disabled="true" />
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
.cdx-demo-wrapper :deep( .cdx-text-input ) {
	max-width: 400px;
	margin-bottom: 16px;
}
</style>
