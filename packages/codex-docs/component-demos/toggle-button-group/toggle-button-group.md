<script setup>
import SingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/SingleValueToggleButtonGroup.vue';
import InitiallySelectedSingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/InitiallySelectedSingleValueToggleButtonGroup.vue';
import MultiValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/MultiValueToggleButtonGroup.vue';
import DisabledToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/DisabledToggleButtonGroup.vue';
import MaximumToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/MaximumToggleButtonGroup.vue';
import ToggleButtonGroupWithSlot from '@/../component-demos/toggle-button-group/examples/ToggleButtonGroupWithSlot.vue';
</script>

A ToggleButtonGroup is a group of [ToggleButtons](./toggle-button.md) that allows users to select one
or multiple buttons from the group.

## Guidelines

### Using toggle button groups

Buttons within the toggle button group must carry a label. In the case of icon-only buttons, the
label will be available only to screen reader users.

Use the ToggleButtonGroup when you require users to select either one or multiple options from a
group. If you want users to choose from a set of actions, with the restriction that only one can be
active simultaneously, use the
[ButtonGroup](./button-group.md) instead.

![Example of a Codex ToggleButtonGroup.](../../assets/components/toggle-button-group-using.svg)

### Specifications

![Specification of ToggleButtonGroup.](../../assets/components/toggle-button-group-specifications.svg)

A toggle button group consists of normal (framed) buttons, which may include the following elements:
1. **Icon** (optional)<br>
Icons simplify user recognition and provide the ability to shorten button labels to a minimum.
2. **Label**<br>
Button labels should be as short as possible, with text that clearly states what option will be
selected when the button is toggled on.
3. **White line**<br>
For toggled-on buttons, a white line is added to visually separate them, whether they are on the
same line or placed on different rows in the stacked version.

Refer to the
[ToggleButtonGroup component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=6639-59752&mode=design&t=RQzmW0S7riPfuDMF-11).

#### Stacked buttons

When the ToggleButtonGroup exceeds the available space on a single line, the buttons will wrap onto
the next line.

![Example of a ToggleButtonGroup with stacked buttons in two lines.](../../assets/components/toggle-button-group-types.svg)

### Interaction states

ToggleButtonGroups have the following visually separate states:

![Interaction states of ToggleButtonGroup, affecting the buttons within the group: default, hover, active, focus, selected, disabled, selected-hover, selected-active, selected-focus, two buttons selected, all buttons selected, and all buttons disabled.](../../assets/components/toggle-button-group-interaction-states.svg)

1. Default
2. Hover on one button
3. Active button
4. Focus on one button
5. One button is selected
6. One button is disabled
7. Hover on the selected button
8. The selected button is active
9. Focus on the selected button
10. Two buttons are selected
11. All buttons are selected
12. All buttons are disabled

## Demos

### Single value
To allow only a single value to be selected, initialize `v-model` to `null`.

<cdx-demo-wrapper :force-reset="true" :force-controls="true">
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

### Initially selected single value
To start with one button already selected, initialize `v-model` to that value.

Use the `icon` property to add an icon before the text of a button. Use the `disabled` property
to disable individual buttons. For more information on how to control the appearance of each
button, see the [ButtonGroup documentation](./button-group).

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


### Multiple values
To allow multiple values to be selected, initialize `v-model` to an empty array (`[]`). To start
with some of buttons already selected, initialize `v-model` to an array of the values of those
buttons.

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

### Disabled
The entire component can be disabled by setting the `disabled` prop. Individual buttons can be
disabled by setting their `.disabled` property.

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
The contents of the buttons can be customized using the default slot. The `ButtonGroupItem` object
for each button is available through the `button` binding, and the selected state of each button is
available through the `selected` binding. In this example, the value of the button is displayed
after its label, but only if the button is selected.

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

## Vue usage

Whether the group is single-select or multi-select is automatically detected based on the value
bound to `v-model`: if it's an array, the group allows multiple selections; otherwise, it only
allows a single selection. To initially select nothing, initialize the `v-model` value to
`null` (for single-select groups) or `[]` (for multi-select groups).
