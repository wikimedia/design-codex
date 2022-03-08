<script setup>
import InputWithMenu from '@/../component-demos/menu/examples/InputWithMenu.vue';
import InputWithMenuAndFooter from '@/../component-demos/menu/examples/InputWithMenuAndFooter.vue';
</script>

::: warning
This is not a standalone component. It's intended for use inside other components, mainly within
Codex. For example, the [Select](./select) and [Lookup](./lookup) components use this component
internally.
:::

## Demos

### Simple menu with input

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenu.vue

</template>
</cdx-demo-wrapper>

### Menu with footer and custom menu item display

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-and-footer />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuAndFooter.vue

</template>
</cdx-demo-wrapper>