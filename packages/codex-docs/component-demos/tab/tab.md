<script setup>
import ConfigurableTabDemo from '@/../component-demos/tab/examples/ConfigurableTabDemo.vue';
const controlsConfig = [
    {
        name: 'disabled',
        type: 'boolean'
    },
    {
        name: 'tabName',
        type: 'text',
        default: 'tab1'
    },
    {
        name: 'label',
        type: 'text',
        default: 'First Tab'
    },
    {
        name: 'default',
        type: 'slot',
        default: 'Content for first tab'
    }
];
</script>

::: tip Must be used with Tabs component
This component is only meant to be used inside the default `<slot>` of the `<Tabs>` component.
It cannot be used as a stand-alone component. See the [Tabs documentation](./tabs) for more
information.
:::

## Demos

### Configurable example

The demo below allows for configuration of `name`, `label`, and `disabled`
props, as well as slot content.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
<configurable-tab-demo v-bind="propValues">{{ slotValues.default }}</configurable-tab-demo>
</template>

<template v-slot:code>

<<< @/../component-demos/tab/examples/ConfigurableTabDemo.vue

</template>
</cdx-demo-wrapper>

## CSS-only version
See the [Tabs page](./tabs.md#css-only-version) to learn how to build a CSS-only tabbed layout.

<style lang="less" scoped>
// Override VitePress styles.
// TODO: remove this once T296106 is complete.
.cdx-demo-wrapper {
	:deep( ul ) {
		list-style: none;
	}

	:deep( li + li ) {
		margin-top: 0;
	}
}
</style>
