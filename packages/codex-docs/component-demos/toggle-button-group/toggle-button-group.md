<script setup>
import SingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/SingleValueToggleButtonGroup.vue';
import InitiallySelectedSingleValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/InitiallySelectedSingleValueToggleButtonGroup.vue';
import MultiValueToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/MultiValueToggleButtonGroup.vue';
import DisabledToggleButtonGroup from '@/../component-demos/toggle-button-group/examples/DisabledToggleButtonGroup.vue';
import ToggleButtonGroupWithSlot from '@/../component-demos/toggle-button-group/examples/ToggleButtonGroupWithSlot.vue';
</script>

## Demos

### Single value
To allow only a single value to be selected, initialize `v-model` to `null`.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<single-value-toggle-button-group />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-button-group/examples/SingleValueToggleButtonGroup.vue

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

<<< @/../component-demos/toggle-button-group/examples/InitiallySelectedSingleValueToggleButtonGroup.vue

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

<<< @/../component-demos/toggle-button-group/examples/MultiValueToggleButtonGroup.vue

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

<<< @/../component-demos/toggle-button-group/examples/DisabledToggleButtonGroup.vue

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

<<< @/../component-demos/toggle-button-group/examples/ToggleButtonGroupWithSlot.vue

</template>
</cdx-demo-wrapper>