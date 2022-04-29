<script setup>
import CheckboxGroup from '@/../component-demos/checkbox/examples/CheckboxGroup.vue';
import SingleCheckbox from '@/../component-demos/checkbox/examples/SingleCheckbox.vue';
import InlineCheckboxes from '@/../component-demos/checkbox/examples/InlineCheckboxes.vue';
import IndeterminateState from '@/../component-demos/checkbox/examples/IndeterminateState.vue';
</script>

## Demos

Open up the browser console to see events emitted on input.

### Single checkbox

A single checkbox does not need an `inputValue` prop. `v-model` is bound to a
boolean value: `true` for on, `false` for off.

<cdx-demo-wrapper>
<template v-slot:demo>
<single-checkbox />
</template>

<template v-slot:code>

<<< @/../component-demos/checkbox/examples/SingleCheckbox.vue

</template>
</cdx-demo-wrapper>

### Checkbox group

For a group of checkboxes, each Checkbox component's `v-model` will be bound to
an array of the `inputValue` props of the checkboxes that are currently "on".

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<checkbox-group />
</template>

<template v-slot:code>

<<< @/../component-demos/checkbox/examples/CheckboxGroup.vue

</template>
</cdx-demo-wrapper>

### Inline checkboxes

<cdx-demo-wrapper>
<template v-slot:demo>
<inline-checkboxes />
</template>

<template v-slot:code>

<<< @/../component-demos/checkbox/examples/InlineCheckboxes.vue

</template>
</cdx-demo-wrapper>

### Indeterminate state

The indeterminate state indicates that a checkbox is neither on nor off. Within this component, this
state is purely visual. The parent component must house the logic to set a checkbox to the
indeterminate state via this prop (e.g. in the case of a set of nested checkboxes where some boxes
are checked and some are not, making the parent checkbox neither fully on nor fully off).

This prop is independent of the value provided by `v-model`. If `indeterminate` is set to `true`,
the indeterminate visual state will display, but the value will not be affected. Nor will the value
affect the visual state: indeterminate overrides the checked and unchecked visual states. If
indeterminate changes to false, the visual state will reflect the current v-model value.

In the example below, all of the checkboxes have their `indeterminate` prop set to `true` initially.
As a result, they all appear to be in the indeterminate state initially, whether they are checked or
not. Checking or unchecking a checkbox will undo the indeterminate state since you have provided
a definite value for the checkbox.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<indeterminate-state />
</template>

<template v-slot:code>

<<< @/../component-demos/checkbox/examples/IndeterminateState.vue

</template>
</cdx-demo-wrapper>
