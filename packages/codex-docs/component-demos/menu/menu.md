<script setup>
import InputWithMenu from '@/../component-demos/menu/examples/InputWithMenu.vue';
import InputWithMenuCustomItemDisplay from '@/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue';
import InputWithMenuScroll from '@/../component-demos/menu/examples/InputWithMenuScroll.vue'
import InputWithMenuNoResults from '@/../component-demos/menu/examples/InputWithMenuNoResults.vue'
import InputWithMenuPending from '@/../component-demos/menu/examples/InputWithMenuPending.vue'
import InputWithMenuPendingWithItems from '@/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue'
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

### Menu with custom menu item display

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-custom-item-display />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue

</template>
</cdx-demo-wrapper>

### Menu with scrolling enabled

In the Menu component, all menu items will be shown by default and the height of the menu will grow
to accommodate the menu items. To limit the number of menu items shown at once and enable scrolling
within the menu, set the `visibleItemLimit` prop to a positive number.

Although the default behavior in the Menu component is to show all menu items, some components that
use the Menu component have a default `visibleItemLimit` prop set.

You can also add a sticky footer to the bottom of the menu with the `footer` prop.
This footer will only be shown if there is also at least one regular menu item.
It can be customized in the `default` slot together with the regular menu items.

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-scroll />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuScroll.vue

</template>
</cdx-demo-wrapper>

### Menu with no results message

If the `no-results` slot is populated, the Menu component will automatically display it when there
are zero menu items.

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-no-results />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuNoResults.vue

</template>
</cdx-demo-wrapper>

### Pending state

Pending state indicators can be displayed to indicate that menu items are being fetched. Set the
`pending` prop to `true` to show the inline progress bar and "pending" message, which can be
populated via the `pending` slot. See [TypeaheadSearch](./typeahead-search#pending-state) for a
real-world implementation of this.

When there are no menu items (e.g. on an initial search), the inline progress bar and the "pending"
message will display.

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-pending />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuPending.vue

</template>
</cdx-demo-wrapper>

When there are menu items, only the inline progress bar will display.

<cdx-demo-wrapper>
<template v-slot:demo>
<input-with-menu-pending-with-items />
</template>
<template v-slot:code>

<<< @/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue

</template>
</cdx-demo-wrapper>
