<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import InputWithMenu from '@/../component-demos/menu/examples/InputWithMenu.vue';
import InputWithMenuCustomItemDisplay from '@/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue';
import InputWithMenuFooter from '@/../component-demos/menu/examples/InputWithMenuFooter.vue';
import InputWithMenuScroll from '@/../component-demos/menu/examples/InputWithMenuScroll.vue'
import InputWithMenuNoResults from '@/../component-demos/menu/examples/InputWithMenuNoResults.vue'
import InputWithMenuGroups from '@/../component-demos/menu/examples/InputWithMenuGroups.vue';
import InputWithMenuGroupsDividers from '@/../component-demos/menu/examples/InputWithMenuGroupsDividers.vue';
import InputWithMenuPending from '@/../component-demos/menu/examples/InputWithMenuPending.vue'
import InputWithMenuPendingWithItems from '@/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue'
import MultiselectMenu from '@/../component-demos/menu/examples/MultiselectMenu.vue';
</script>

A Menu displays a list of available options, suggestions, or actions. It expands from a
control (e.g. a button, selector or input) after it is activated by a user.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <input-with-menu />
</template>
</cdx-demo-wrapper>

## Overview

### When to use Menu

The Menu component is intended to be used within other components such as [Select](./select.md),
[Lookup](./lookup.md), or [MenuButton](./menu-button.md). The Menu is displayed when the user
interacts with the corresponding trigger element.

### About Menu

Menu includes the following elements.

#### Menu items

One or more menu items will appear within the Menu. Menu items can include selectable options or
trigger actions and can be customized with different text or media elements. Refer to
[MenuItem](./menu-item.md) to learn more about available display options.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Set a visible item limit when there are many menu items to enable scrolling.</cdx-demo-best-practice>
<cdx-demo-best-practice>When choosing a visible item limit, consider the layout, item types, and the number of items useful to view at once, depending on the triggering component.</cdx-demo-best-practice>
<cdx-demo-best-practice>

Generally, 5–7 visible items are recommended. Refer to [The Magical Number Seven, Plus or Minus Two](https://en.wikipedia.org/wiki/The_Magical_Number_Seven%2C_Plus_or_Minus_Two).

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't combine menu items that use both Icons and Thumbnails within the same Menu.</cdx-demo-best-practice>
<cdx-demo-best-practice>

Organize menu items logically or alphabetically. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Footer (optional)

An optional interactive footer can appear at the end of the menu items to display extra information
or provide access to further results. This footer can optionally include a start icon.

When scrolling is enabled, the footer is "sticky" to the end of the Menu so it is always visible.

## Examples

### Basic usage

This example has a TextInput as the trigger element. The `menuItems` use the default display, where
each item's `label` is displayed if one exists, otherwise its `value` is shown.

<cdx-demo-wrapper>
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

### Menu item display

You can customize the content of `menuItems`. In this example, the content is customized to show
both the item's `label` and `value`.

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

<cdx-accordion>
<template #title>Developer notes</template>

Use the default slot, which has a binding for `menuItem` data, to customize the output of each
MenuItem. Note that doing so overrides all markup inside the MenuItem component, so you may need to
recreate interactive styles (like the colors used for the selected `menuItem`).

</cdx-accordion>

### Menu footer

You can add an interactive `footer` to the end of the Menu. When scrolling is enabled, the `footer`
item is pinned to the bottom of the Menu.

Refer to the [TypeaheadSearch](./typeahead-search) demos for a real-world example.

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

<cdx-accordion>
<template #title>Developer notes</template>

Use the `footer` prop to add a special menu item that will appear at the end of the Menu. The
footer item can be customized via the `default` slot, just like regular `menuItems`.

</cdx-accordion>

### With scrolling enabled

All `menuItems` will be shown by default and the height of the Menu will grow to accommodate the
items. To limit the number of `menuItems` shown at once and enable scrolling within the Menu, set a
`visibleItemLimit`.

This example includes a `footer` item, which is "sticky" to the bottom of the Menu.

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

<cdx-accordion>
<template #title>Developer notes</template>

Set the `visibleItemLimit` prop to the number of `menuItems` that should be visible at a time.

</cdx-accordion>

### No results message

For Menus where results are fetched and may vary, a "no results" message can be added. It can then
be displayed under certain circumstances, such as when the user has entered text in a
[Lookup](./lookup.md) but there are no matching `menuItems` to show.

In this simplified example, the "no results" message displays when you focus on the input.

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

<cdx-accordion>
<template #title>Developer notes</template>

If the `no-results` slot is populated, the Menu component will automatically display it when there
are zero menu items. Further customization of this behavior should happen in the component using
Menu.

</cdx-accordion>

### Menu groups

Menu items can be grouped together to make it easier to scan the contents of the Menu. Menu groups can have a title, a description, and icon.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Keep menu group titles concise.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid mixing menu groups with individual menu items.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-groups />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuGroups.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuGroups.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

You can group menu items together by adding menu group definitions via the `menuItems` prop. Refer
to the [MenuGroupData type](../types-and-constants.md#menugroupdata) to learn about other menu
group features.

</cdx-accordion>

A menu group should always have a title, but the title can be visually-hidden if it's obvious from
context what the group represents. In such cases, dividers will separate the groups of menu items.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">Avoid mixing menu groups with visible titles and menu groups with visually-hidden titles.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
    <input-with-menu-groups-dividers />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/InputWithMenuGroupsDividers.vue [NPM]

<<< @/../component-demos/menu/examples-mw/InputWithMenuGroupsDividers.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Pending state

You can display an inline [ProgressBar](./progress-bar.md#inline) and a "pending" message when the
Menu is in a pending state, such as when `menuItems` are being fetched. In the simplified example
below, the pending state always displays when you focus on the input.

Refer to [TypeaheadSearch](./typeahead-search#pending-state) for a real-world implementation of this.

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

<cdx-accordion>
<template #title>Developer notes</template>

Set the `pending` prop to `true` to show the inline ProgressBar and "pending" message, which can be
populated via the `pending` slot.

</cdx-accordion>

When there are `menuItems` to show, only the inline ProgressBar will display.

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

### Multiselect

All of the examples above show Menus that allow a single selection at a time. The Menu component
also supports multiple selections, or multiselect.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
    <multiselect-menu />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu/examples/MultiselectMenu.vue [NPM]

<<< @/../component-demos/menu/examples-mw/MultiselectMenu.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To enable multiple selections, set the `selected` prop to an array: an empty array when there are
no selections, and an array of the selected menu items' values when there are selections.

</cdx-accordion>

## Technical implementation

### Vue usage

::: warning
This is not a standalone component. It's intended for use inside other components, mainly within
Codex. For example, the [Select](./select), [Lookup](./lookup) and [MenuButton](./menu-button)
components use this component internally.
:::

Designed for use in components, like Select, Lookup and MenuButton, that display a Menu below
another element (for example, a TextInput). This component renders a list of items, manages which
item is selected, highlighted, and active, and handles keyboard navigation. It does not display the
selected item or manage an input; the parent component needs to do that.

Components using a Menu should use the [useFloatingMenu](../../composables/demos/use-floating-menu)
composable to ensure the Menu is positioned correctly relative to the input (or other triggering
element). The useFloatingMenu composable also manages the rounded corners on the Menu; if you
are not using the useFloatingMenu composable, you will have to do this yourself, by setting
`border-top-left-radius` and `border-top-right-radius` to the `border-radius-sharp` token.

The `selected` and `expanded` props must be bound with `v-model`, even if the parent component
doesn't use them. Without these `v-model` bindings, the Menu won't function correctly.

The Menu itself is not focusable; for keyboard navigation to work, the parent component
needs to provide a focusable element, listen for `keydown` events on that element, and pass
those events to the Menu by calling the `delegateKeyNavigation` method.

For accessibility support, the parent component must set the following attributes on the
focusable element:
- `role="combobox"`
- `aria-controls`, set to the ID of the Menu's `ul`
- `aria-expanded`, set to `"true"` when the Menu is expanded and to `"false"` when it's closed
  (Vue's [useId](https://vuejs.org/api/composition-api-helpers#useid) function can be used to assign
  an ID to the Menu)
- `aria-activedescendant`, set to the ID of the highlighted menu item (use the `.id` property of
  the object returned by the getHighlightedMenuItem method)
- If the `menuItems` change in response to the user typing in a text input, `aria-autocomplete`
  should be set to the appropriate value. Visit [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete)
  for documentation on which value to set for this attribute.

In some environments, Menus might get cut off by other interface elements that are absolutely
positioned. This can be remedied by teleporting menus to another place in the DOM. Teleportation
for Menus is disabled by default, but can be enabled with `provide( 'CdxTeleportMenus', true );`.
To control where Menus are teleported, provide the `'CdxTeleportTarget'` key; refer to [the Dialog documentation](./dialog.html#vue-usage). Teleportation can be disabled on a per-Menu
basis by setting the `renderInPlace` prop, which prevents the Menu from being teleported even if
`'CdxTeleportMenus'` is true.

::: warning Styling content in teleported Menus
When a Menu is teleported. its contents will not be descendants of the element that contains
the `<cdx-menu>` tag. When styling the Menu or its MenuItems, be careful not to
use CSS selectors that assume the Menu is inside its parent component.

For example, CSS selectors like `.my-component .cdx-menu` or
`.my-component .cdx-menu-item` won't work. Instead,
set e.g. `class="my-component-menu"` on the `<cdx-menu>` tag, and use that
class to style the menu and its items.
:::

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | When tabbing over a single-select menu, it selects the currently highlighted menu item. |
| <kbd>Down arrow</kbd> | When the focus is placed on the component that contains the menu, it opens the menu. When the menu is open, it navigates through the menu items. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| <kbd>Up arrow</kbd> | When the focus is placed on the component that contains the menu, it opens the menu. When the menu is open, it navigates through menu options. |
| <kbd>Enter</kbd> | It opens and closes the menu. When the focus is on an item within the menu, it selects that item. |
| <kbd>Esc</kbd> | It closes the menu when it is open. |
| <kbd>Home</kbd> | Optionally, it moves the focus to the first item within the menu. Optionally, in a single-select list box, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| <kbd>End</kbd> | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
