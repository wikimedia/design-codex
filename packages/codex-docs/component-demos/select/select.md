<script setup>
import BasicSelect from '@/../component-demos/select/examples/BasicSelect.vue';
import SelectCustomLabel from '@/../component-demos/select/examples/SelectCustomLabel.vue';
import SelectCustomOption from '@/../component-demos/select/examples/SelectCustomOption.vue';
</script>

## Demos

### Basic Usage

Options must have a value, and can have a label to display in the UI. If no
label is provided (like the third option in this example), the value will be
displayed.

<cdx-demo-wrapper>
<template v-slot:demo>
<basic-select />
</template>
<template v-slot:code>

<<< @/../component-demos/select/examples/BasicSelect.vue

</template>
</cdx-demo-wrapper>

### With custom label display

The `label` scoped slot enables you to customize the display of the label, with
bindings for the `selectedOption` and the `defaultLabel`.

<cdx-demo-wrapper>
<template v-slot:demo>
<select-custom-label />
</template>
<template v-slot:code>

<<< @/../component-demos/select/examples/SelectCustomLabel.vue

</template>
</cdx-demo-wrapper>

### With custom option display

The `menu-option` scoped slot enables you to customize the display of each
option, with a binding for the `option`.

<cdx-demo-wrapper>
<template v-slot:demo>
<select-custom-option />
</template>
<template v-slot:code>

<<< @/../component-demos/select/examples/SelectCustomOption.vue

</template>
</cdx-demo-wrapper>
