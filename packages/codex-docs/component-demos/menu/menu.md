<script setup>
import InputWithMenu from '@/../component-demos/menu/examples/InputWithMenu.vue';
import InputWithMenuCustomItemDisplay from '@/../component-demos/menu/examples/InputWithMenuCustomItemDisplay.vue';
import InputWithMenuFooter from '@/../component-demos/menu/examples/InputWithMenuFooter.vue';
import InputWithMenuScroll from '@/../component-demos/menu/examples/InputWithMenuScroll.vue'
import InputWithMenuNoResults from '@/../component-demos/menu/examples/InputWithMenuNoResults.vue'
import InputWithMenuGroups from '@/../component-demos/menu/examples/InputWithMenuGroups.vue';
import InputWithMenuPending from '@/../component-demos/menu/examples/InputWithMenuPending.vue'
import InputWithMenuPendingWithItems from '@/../component-demos/menu/examples/InputWithMenuPendingWithItems.vue'
import MultiselectMenu from '@/../component-demos/menu/examples/MultiselectMenu.vue';
</script>

A Menu displays a list of available options, suggestions, or actions. They unfold from a
control (e.g. a button, selector or input) after it is activated by a user.

## Guidelines

### When to use menus
Menus are intended to be used within other components such as Select, Lookup, or MenuButton.
The Menu is displayed when the user interacts with the corresponding trigger element.

### Specifications

![Specification of Menu.](../../assets/components/menu-specifications.svg)

The menu is always displayed within a control or input, and it may include the
following elements:

1. **Menu header** (optional)<br>
An optional non-interactive item that serves to group other menu items under a clear title. This header can optionally include a start icon and a description.
2. **Menu items**<br>
One or more menu items will appear within the menu. Refer to [MenuItem](./menu-item.md) to learn
more about available display options.
3. **Footer** (optional)<br>
An optional interactive footer can appear at the end of the menu items to display extra information
or provide an access to further results. This footer can optionally include a start icon.
4. **Divider** (optional)<br>
An optional divider will separate a set of related menu items when there is no clear title to group them.

Menus have a drop shadow in order to separate it more clearly from the content
below. This shadow is a 20% opacity Black color with the X axis moved 0 pixels,
the Y axis moved 2 pixels, and a 2 pixel blur.

#### Component limitations

The Menu component can accommodate numerous items, using a scrollbar when necessary. When scrolling,
the optional menu footer remains fixed, ensuring consistent navigation.

It is recommended to avoid lengthy menus and utilize a scrollbar when the menu size exceeds
manageable limits. The visible menu items may vary based on screen size, available space, and the
component's context. Refer to each component's maximum recommendation to decide the suitable
menu items.

Refer to the [Menu component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=12482-16037&mode=design&t=iIWQDWOgBGJn3YHy-11).


### Types
The base menu consists of a combination of menu items with an optional footer
item positioned below the menu items group.

![Example of Menu with different menu items and footer.](../../assets/components/menu-types-footer.svg)

Menu items can include selectable options or trigger actions and can be customized with different text or media elements. Refer to [MenuItem](./menu-item.md) to learn more about on available customization options.

#### No results
When no results are present to show in the menu, a non-interactive "no results"
message will appear within the menu.

![Example of Menu with no results found.](../../assets/components/menu-types-no-results.svg)

#### Selection types
Menus can support different selection types depending on the component in which they are displayed:
1. **Single-selection**<br>Allows the user to select only one item from the menu at a time.
2. **Multi-selection**<br>Enables the user to select multiple items from the menu. A check icon is displayed next to the label to indicate that more than one item can be selected.

![Types of selection of menu items: single-selection or multi-selection.](../../assets/components/menu-item-types-selection.svg)

#### Grouping
Items within a menu can be grouped in two ways, depending on whether or not they have a clear title to show for the group:
1. **With title**<br>A prominent header can be added as a title to group a set of menu items.
2. **With no title**<br>In those cases where there is no clear title to include for the groups, a divider can be used to separate related items from other items in a menu.

![Types of grouping items within a Menu: with header or with dividers.](../../assets/components/menu-types-grouping.svg)

### Interaction states
The interaction states of the menu affect the entire menu (group of menu items),
while individual [menu item](./menu-item.md) states are specifically defined
within each respective item. The menu component has two main states:

![Interaction states of Menu: default and loading.](../../assets/components/menu-interaction-states.svg)

1. Default
2. Loading

### Best practices

Consider the following recommendations when using menus.

#### Media elements

Menus can incorporate different content and media types. Refer to [MenuItem](./menu-item.md) to explore all the available customization options for menu items.

<cdx-demo-rules>

<template #do-media>

![Two different menus being displayed within Selects: one using start icons and the other using thumbnails.](../../assets/components/menu-best-practices-media-do.svg)

</template>

<template #do-text>

- Use icons to enhance the visual representation of text within menus.
- Use thumbnails within menu items to display a small preview of an image.

</template>

<template #dont-media>

![Two different menus being displayed within Selects: one menu incorrectly using start icons with no text and the other one combining both icons and thumbnail in the same menu.](../../assets/components/menu-best-practices-media-dont.svg)

</template>

<template #dont-text>

- Include only icons or thumbnails without labels within the menu as it would negatively impact accessibility and readability.
- Combine menu items that use both icons and thumbnails within the same menu.

</template>

</cdx-demo-rules>

#### Grouping menu items

<cdx-demo-rules>

<template #do-media>

![Menu using headers with a short label and longer description to group a list of multiple menu items.](../../assets/components/menu-best-practices-headers-do.svg)

</template>

<template #do-text>

- Use headers to group one or more sets of menu items when there is a clear title for the group.
- Keep the header’s label as short as possible to make the groups titles scannable, and use the header’s description in case you need to include additional information about the label.

</template>

<template #dont-media>

![Menu using headers with long labels with custom styles and dividers to group a list of multiple menu items.](../../assets/components/menu-best-practices-headers-dont.svg)

</template>

<template #dont-text>

- Combine headers and dividers to separate groups within the same menu.
- Apply custom styles to the headers or dividers.
- Indent the menu items under the header to avoid misalignment.
- Make the header’s label too long. Instead, use the header’s description to provide any extra information about the label.

</template>

</cdx-demo-rules>

<cdx-demo-rules>

<template #do-media>

![Menu using dividers to create three group of related menu items.](../../assets/components/menu-best-practices-dividers-do.svg)

</template>

<template #do-text>

- Use dividers to separate groups of items when there is no clear title to include for the groups.
- Use dividers to organize a list of multiple items into clear and related groups.

</template>

<template #dont-media>

![Menu using dividers to separate each one of the three items in the menu.](../../assets/components/menu-best-practices-dividers-dont.svg)

</template>

<template #dont-text>

- Use dividers to separate each one of the items in the menu. Instead, use dividers to group related items.
- Use dividers to create groups if there are few items in the menu, such as only 2 or 3 items.

</template>

</cdx-demo-rules>

### Content

Dropdown menus let readers choose one item from a set of options. Giving the choices a logical
sequence makes them easy to scan and process.

<cdx-demo-rules>
<template #do-media>

![Dropdown menus conveying examples of alphabetically organized options.](../../assets/components/dropdown-content-do.svg)

</template>
<template #do-text>

- Alphabetize the drop-down choices, if appropriate, or organize them in the most logical order. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</template>
<template #dont-media>

![Dropdown menus conveying examples of unorganized options.](../../assets/components/dropdown-content-dont.svg)

</template>
<template #dont-text>

- List the choices randomly. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</template>
</cdx-demo-rules>

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

### With menu groups

You can group menu items together by adding menu group definitions via the `menuItems` prop. Refer
to the [MenuGroupData type](../types-and-constants.md#menugroupdata) to learn about other menu
group features.

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

### With multiselect

To enable multiple selections, set the `selected` prop to an array: an empty array when there are
no selections, and an array of the selected menu items' values when there are selections.

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

## Vue usage

::: warning
This is not a standalone component. It's intended for use inside other components, mainly within
Codex. For example, the [Select](./select), [Lookup](./lookup) and [MenuButton](./menu-button)
components use this component internally.
:::

Designed for use in components, like Select, Lookup and MenuButton, that display a menu below another
element (for example, a text input). This component renders a list of items, manages which item is
selected, highlighted, and active, and handles keyboard navigation. It does not display the
selected item or manage an input; the parent component needs to do that.

Components using a menu should use the [useFloatingMenu](../../composables/demos/use-floating-menu)
composable to ensure the menu is positioned correctly relative to the input (or other triggering
element). The useFloatingMenu composable also manages the rounded corners on the Menu; if you
are not using the useFloatingMenu composable, you will have to do this yourself, by setting
`border-top-left-radius` and `border-top-right-radius` to `border-radius-sharp` token.

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
