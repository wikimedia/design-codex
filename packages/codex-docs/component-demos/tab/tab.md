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

A Tab is one of the selectable items included within [Tabs](./tabs.md).

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
    <configurable-tab-demo v-bind="propValues">{{ slotValues.default }}</configurable-tab-demo>
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tab/examples/ConfigurableTabDemo.vue [NPM]

<<< @/../component-demos/tab/examples-mw/ConfigurableTabDemo.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Overview

### When to use Tab

Two or more Tab items are grouped to create a [Tabs](./tabs.md) component. Tab items cannot
be used individually. For example, different Tab items can represent the different sections of an
article.

### About Tab

Tab includes the following elements.

#### Label

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Limit Tab names to one or two words. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) 
& [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid mixing verbs and nouns for the labels. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) 
& [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Content

Tab content appears underneath the Tab when selected, and can include any type of content or components.

## Technical implementations

### Vue usage

This component can display arbitrary content, including markup, via its default slot. The provided
content is wrapped in a `<section>` tag and given an HTML ID.

::: tip Must be used with Tabs component
This component is only meant to be used inside the default `<slot>` of the `<Tabs>` component.
It cannot be used as a standalone component. See the [Tabs documentation](./tabs) for more
information.
:::

### CSS-only version

See the [Tabs page](./tabs.md#css-only-version) to learn how to build a CSS-only tabbed layout.
