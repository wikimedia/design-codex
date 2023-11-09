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

## Guidelines

### Using tab items
Two or more tab items are grouped to create a [Tabs](./tabs.md) component. Tab items cannot
be used individually. For example, different tab items can represent the different sections of an
article. A tab includes a label, which displays in the tabs list, and its associated content.

![Example of different Codex Tab items creating a Tabs component.](../../assets/components/tab-using.svg)

### Specifications

![Specification of Tab item.](../../assets/components/tab-specifications.svg)

Each tab item may include the following elements:
1. **Text**<br>Currently, tab items solely consist of text elements within the tab, without the inclusion of icons or visual indicators.
2. **Selected indicator**<br>Both quiet and framed tabs feature a visual indicator when selected. In the case of quiet tabs, this indicator is a blue line positioned below the tab text, which is also colored blue. In contrast, framed tabs use a white background behind the tab text to indicate their selected state.

A Tab will also contain the content that should display when that tab is active.

### Types
As documented in [Tabs](./tabs.md), there are two different type of tab items depending on the tabs' style and where they are employed:

<div class="cdx-docs-col cdx-docs-col-start cdx-docs-col-m">

![Example of quiet tabs.](../../assets/components/tabs-types-quiet.svg)

**Quiet tabs**: They are used on white non-boxed backgrounds.
</div>
<div class="cdx-docs-col cdx-docs-col-end cdx-docs-col-m">

![Example of framed tabs.](../../assets/components/tabs-types-framed.svg)

**Framed tabs**: They are used within boxes or modules.
</div>
<br>&nbsp;<br>

### Interaction states
Both quiet and framed tab items have the following visually separate states:

**Quiet tab item.**

![Interaction states of the quiet tab item: default, hover, active, selected, focus, and disabled.](../../assets/components/tab-quiet-interaction-states.svg)

**Framed tab item.**

![Interaction states of the framed tab item: default, hover, active, selected, focus, and disabled.](../../assets/components/tab-framed-interaction-states.svg)

1. Default (unselected)
2. Hover
3. Active
4. Selected
5. Focus
6. Disabled

### Content

Tabs allow a reader to access contained, structured content blocks that make pages easier to read. To make the UI effective and consistent, keep tab names short and descriptive.

<cdx-demo-rules>
<template #do-media>

![A screenshot of interface tabs conveying an example of short, concise titles for sections.](../../assets/components/tab-content-do.svg)

</template>
<template #do-text>

- Limit tab names to one or two words. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
<template #dont-media>

![A screenshot of interface tabs conveying an example of mixing verbs and nouns.](../../assets/components/tab-content-dont.svg)

</template>
<template #dont-text>

- Mix verbs and nouns for the labels. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
</cdx-demo-rules>

## Demos

### Configurable example

The demo below allows for configuration of `name`, `label`, and `disabled`
props, as well as slot content.

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

## Vue usage

This component can display arbitrary content, including markup, via its default slot. The provided
content is wrapped in a `<section>` tag and given an HTML ID.

::: tip Must be used with Tabs component
This component is only meant to be used inside the default `<slot>` of the `<Tabs>` component.
It cannot be used as a standalone component. See the [Tabs documentation](./tabs) for more
information.
:::

## CSS-only version

See the [Tabs page](./tabs.md#css-only-version) to learn how to build a CSS-only tabbed layout.
