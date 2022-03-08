<script setup>
import BasicSelect from '@/../component-demos/select/examples/BasicSelect.vue';
import SelectCustomLabel from '@/../component-demos/select/examples/SelectCustomLabel.vue';
import SelectCustomMenuItem from '@/../component-demos/select/examples/SelectCustomMenuItem.vue';
</script>

## Demos

### Basic Usage

Menu items must have a value, and can have a label to display in the UI. If no
label is provided (like the third menu item in this example), the value will be
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
bindings for the `selectedMenuItem` and the `defaultLabel`.

<cdx-demo-wrapper>
<template v-slot:demo>
<select-custom-label />
</template>
<template v-slot:code>

<<< @/../component-demos/select/examples/SelectCustomLabel.vue

</template>
</cdx-demo-wrapper>

### With custom menu item display

The `menu-item` scoped slot enables you to customize the display of each
menu item, with a binding for the `menuItem`.

<cdx-demo-wrapper>
<template v-slot:demo>
<select-custom-menu-item />
</template>
<template v-slot:code>

<<< @/../component-demos/select/examples/SelectCustomMenuItem.vue

</template>
</cdx-demo-wrapper>
