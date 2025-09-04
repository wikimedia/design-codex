<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import SingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/SingleValueToggleButtonGroup.vue';
import InitiallySelectedSingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/InitiallySelectedSingleValueToggleButtonGroup.vue';
import MultiValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/MultiValueToggleButtonGroup.vue';
import DisabledToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/DisabledToggleButtonGroup.vue';
import MaximumToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/MaximumToggleButtonGroup.vue';
import ToggleButtonGroupWithSlot from '@/../component-demos/toggle-button-group/examples/ToggleButtonGroupWithSlot.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	}
];
</script>

A ToggleButtonGroup is a group of [ToggleButtons](./toggle-button.md) that allows users to select one
or multiple buttons from the group.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
    <single-value-toggle-button-group v-bind="propValues" :is-config-demo="true" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use ToggleButtonGroup

Use the ToggleButtonGroup component when you require users to select either one or multiple options from a
group. If you want users to choose from a set of actions, with the restriction that only one can be
active at a time, use the [ButtonGroup](./button-group.md) instead.

Use the ToggleButtonGroup to filter information on the screen or switch between views. To navigate between different sections of content on the page, use [Tabs](./tabs.md) instead.

### About ToggleButtonGroup

ToggleButtonGroup consists of a minimum of two ToggleButtons, which include the following elements.

#### Label

Each button within the ToggleButtonGroup must have a label. Button labels should be as short as possible, with text that clearly states what option will be selected when the button is toggled on.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Customize the content of each button, allowing for superscript, subscript, or special characters.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use numbers instead of text if needed.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Icon (optional)

Icons simplify user recognition and provide the ability to shorten button labels to a minimum. In the case of icon-only buttons, the label will be available only to screen reader users.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Mix text-only and icon-only buttons exclusively when using the ‘ellipsis‘ icon to indicate additional actions.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">In order to ensure consistency, avoid mixing different types of button contents within the same ButtonGroup.</cdx-demo-best-practice>
<cdx-demo-best-practice>

Icon-only buttons may be used to form a ToggleButtonGroup but only if the icons used are [universally understood](../../style-guide/icons.md#universal-rather-than-culturally-specific) and do not require accompanying text.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Single value

In this example, one button can be selected at a time.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
    <single-value-toggle-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/SingleValueToggleButtonGroup.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/SingleValueToggleButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

To allow only a single value to be selected, initialize `v-model` to `null`. Open up the console to
review emitted events.

</cdx-accordion>

### Initially selected

The ToggleButtonGroup can have an initial selection.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
    <initially-selected-single-value-toggle-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/InitiallySelectedSingleValueToggleButtonGroup.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/InitiallySelectedSingleValueToggleButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

To start with one button already selected, initialize `v-model` to that value.

Use the `icon` property to add an icon before the text of a button. Use the `disabled` property
to disable individual buttons. For more information on how to control the appearance of each
button, visit the [ButtonGroup documentation](./button-group).

</cdx-accordion>

### Multiple values

In this example, multiple buttons can be selected at a time.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
    <multi-value-toggle-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/MultiValueToggleButtonGroup.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/MultiValueToggleButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

To allow multiple values to be selected, initialize `v-model` to an empty array (`[]`). To start
with some of buttons already selected, initialize `v-model` to an array of the values of those
buttons.  Open up the console to review emitted events.

</cdx-accordion>

### Disabled

You can disable the entire ToggleButtonGroup or individual buttons.

<cdx-demo-wrapper>
<template v-slot:demo>
    <disabled-toggle-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/DisabledToggleButtonGroup.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/DisabledToggleButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

The entire component can be disabled by setting the `disabled` prop. Individual buttons can be
disabled by setting their `disabled` property.

</cdx-accordion>

### Overflowing buttons

When the button group is too large to fit on one line, the buttons overflow to the next line.

<cdx-demo-wrapper>
<template v-slot:demo>
    <maximum-toggle-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/MaximumToggleButtonGroup.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/MaximumToggleButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Custom button display

The contents of the buttons can be customized using the default slot.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
    <toggle-button-group-with-slot />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button-group/examples/ToggleButtonGroupWithSlot.vue [NPM]

<<< @/../component-demos/toggle-button-group/examples-mw/ToggleButtonGroupWithSlot.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

The `ButtonGroupItem` object for each button is available through the `button` binding, and the selected state of each button is
available through the `selected` binding. In this example, the value of the button is displayed
after its label, but only if the button is selected.

</cdx-accordion>

## Technical implementation

### Vue usage

Whether the group is single-select or multi-select is automatically detected based on the value
bound to `v-model`: if it's an array, the group allows multiple selections; otherwise, it only
allows a single selection. To initially select nothing, initialize the `v-model` value to
`null` (for single-select groups) or `[]` (for multi-select groups).

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next button within the group or to the next interactive element in tab order when the focus is placed on the last button of the group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous button within the group or to the previous interactive element when the focus is placed on the first button of the group. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on one of the ToggleButtons within the group, it toggles that button on and off. |
