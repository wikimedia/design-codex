<script setup>
import InputWithMenu from '@/../component-demos/menu/examples/InputWithMenu.vue';
import InputWithMenuCustomItemDisplay from '@/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue';
import InputWithMenuFooter from '@/../component-demos/menu/examples/InputWithMenuFooter.vue';
import InputWithMenuScroll from '@/../component-demos/menu/examples/InputWithMenuScroll.vue'
import InputWithMenuNoResults from '@/../component-demos/menu/examples/InputWithMenuNoResults.vue'
import InputWithMenuPending from '@/../component-demos/menu/examples/InputWithMenuPending.vue'
import InputWithMenuPendingWithItems from '@/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue'
</script>

A Menu displays a list of available options or suggestions. They unfold from a
control (e.g. a button, selector or input) after it is activated by a user.

## Guidelines

### Using menus
Menus are intended to be used within other components such as Select or Lookup,
where they appear when the user interacts with or selects the corresponding
element.

![Example of Codex Menu with different menu items.](../../assets/components/menu-using.svg)

### Specifications

![Specification of Menu.](../../assets/components/menu-specifications.svg)

The menu is always displayed within a control or input, and it may include the
following elements:

1. **Menu items**<br>
One or more menu items will appear within the menu. Refer to [MenuItem](./menu-item.md) to learn
more about available display options.

2. **Footer** (optional)<br>
An optional interactive footer can appear at the end of the menu items to display extra information
or provide an access to further results.

Menus have a drop shadow in order to separate it more clearly from the content
below. This shadow is a 20% opacity Black color with the X axis moved 0 pixels,
the Y axis moved 2 pixels, and a 2 pixel blur.

Refer to the [Menu component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=6754-63118&mode=design&t=2O0ceqiRfqCtnidq-11).


### Types
The base menu consists of a combination of menu items with an optional footer
item positioned below the menu items group.

![Example of Menu with different menu items and footer.](../../assets/components/menu-types-footer.svg)

#### Scroll
The number of visible menu items within the menu can be customized. When a
visible item limit is set, the menu’s height will be limited so that only that
number of menu items will display, the rest being available via scroll. When
scrolling is activated, the footer will remain fixed at the bottom.

![Example of Menu with scroll and sticky footer.](../../assets/components/menu-types-scroll.svg)

#### No results
When no results are present to show in the menu, a non-interactive "no results"
message will appear within the menu.

![Example of Menu with no results found.](../../assets/components/menu-types-no-results.svg)

### Interaction states
The interaction states of the menu affect the entire menu (group of menu items),
while individual [menu item](./menu-item.md) states are specifically defined
within each respective item. The menu component has two main states:

![Interaction states of Menu: default and loading.](../../assets/components/menu-interaction-states.svg)

1. Default
2. Loading

### Content

Dropdown menus let readers choose one item from a set of options. Giving the choices a logical sequence makes them easy to scan and process.

<cdx-demo-rules>
<template #do-media>

![A screenshot of interface dropdown menus conveying examples of alphabetically organized options.](../../assets/components/dropdown-content-do.svg)

</template>
<template #do-text>

- Alphabetize the drop-down choices, if appropriate. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</template>
<template #dont-media>

![A screenshot of interface dropdown menus conveying examples of unorganized options.](../../assets/components/dropdown-content-dont.svg)

</template>
<template #dont-text>

- List the choices randomly. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</template>
</cdx-demo-rules>

## Demos

### Simple menu with input

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <input-with-menu />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenu.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenu.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom menu item display

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-custom-item-display />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuCustomItemDisplay.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With interactive footer item

Use the `footer` prop to add a special menu item that will appear at the end of the menu. When
scrolling is enabled, the footer item is pinned to the bottom of the menu (see the next demo). The
footer item can be customized via the `default` slot, just like regular menu items.

See the [TypeaheadSearch](./typeahead-search) demos for a real-world example.

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-footer />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuFooter.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuFooter.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With scrolling enabled

In the Menu component, all menu items will be shown by default and the height of the menu will grow
to accommodate the menu items. To limit the number of menu items shown at once and enable scrolling
within the menu, set the `visibleItemLimit` prop to a positive number.

Although the default behavior in the Menu component is to show all menu items, some components that
use the Menu component have a default `visibleItemLimit` prop set.

This demo includes a footer item, which is "sticky" to the bottom of the menu. 

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-scroll />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuScroll.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuScroll.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With no results message

If the `no-results` slot is populated, the Menu component will automatically display it when there
are zero menu items.

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-no-results />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuNoResults.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuNoResults.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuPending.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuPending.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

When there are menu items, only the inline progress bar will display.

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-pending-with-items />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuPendingWithItems.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

::: warning
This is not a standalone component. It's intended for use inside other components, mainly within
Codex. For example, the [Select](./select) and [Lookup](./lookup) components use this
component internally.
:::

Designed for use in components, like Select and Lookup, that display a menu below another element
(for example, a text input). This component renders a list of items, manages which item is
selected, highlighted, and active, and handles keyboard navigation. It does not display the
selected item or manage an input; the parent component needs to do that.

Components using a menu should use the [useFloatingMenu](../../composables/demos/use-floating-menu)
composable to ensure the menu is positioned correctly relative to the input (or other triggering
element). The useFloatingMenu composable also manages the rounded corners on the Menu; if you
are not using the useFloatingMenu composable, you will have to do this yourself, by setting
`border-top-left-radius` and `border-top-right-radius` to `@border-radius-sharp`.

The `selected` and `expanded` props must be bound with `v-model`, even if the parent component
doesn't use them. Without these `v-model` bindings, the menu won't function correctly.

The menu itself is not focusable; for keyboard navigation to work, the parent component
needs to provide a focusable element, listen for `keydown` events on that element, and pass
those events to the menu by calling the `delegateKeyNavigation` method.

For accessibility support, the parent component must set the following attributes on the
focusable element:
- `role="combobox"`
- `aria-controls`, set to the ID of the menu
- `aria-expanded`, set to `"true"` when the menu is expanded and to `"false"` when it's closed
  (the useGeneratedId composable can be used to assign an ID to the menu)
- `aria-activedescendant`, set to the ID of the highlighted menu item (use the `.id` property of
  the object returned by the getHighlightedMenuItem method)
- If the menu's items change in response to the user typing in a text input, `aria-autocomplete`
  should be set to the appropriate value. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete)
  for documentation on which value to set for this attribute.
