<script setup>
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextInputDemo from '@/../component-demos/text-input/examples/TextInputDemo.vue';

const controlsConfig = [
	{
		name: 'startIcon',
		type: 'icon'
	},
	{
		name: 'endIcon',
		type: 'icon'
	},
	{
		name: 'clearable',
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
	},
	{
		name: 'placeholder',
		type: 'text'
	}
];
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="inputValue">
<template v-slot:demo="{ propValues }">
<cdx-docs-configurable-generic v-bind="propValues" />
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

```vue-html
<cdx-text-input :clearable="true" />
```

</template>
</cdx-demo-wrapper>

### With icons

A TextInput can have a `startIcon`, an `endIcon`, or both. Any Codex icon can be used.

Note that a clearable TextInput with an `endIcon` will display both the clear button and the
`endIcon` when the input is not empty. To see this behavior, type in the input below.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo :input-props="{ inputType: 'search', startIcon: cdxIconSearch, endIcon: cdxIconInfoFilled, clearable: true }" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputWithIcons.vue

</template>
</cdx-demo-wrapper>


### With placeholder

To add placeholder text, add a `placeholder` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-input-demo placeholder="Start typing..." />
</template>

<template v-slot:code>

```vue-html
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

```vue-html
<cdx-text-input :start-icon="cdxIconSearch" :disabled="true" />
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

/* stylelint-disable-next-line selector-class-pattern */
:deep( .cdx-demo-wrapper__demo-pane .cdx-text-input ) {
	max-width: @size-2800;
	margin-bottom: @spacing-100;
}
</style>
