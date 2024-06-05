<script setup>
import { CdxMenuButton } from '@wikimedia/codex';
import MenuButtonConfigDemo from '@/../component-demos/menu-button/examples/MenuButtonConfigDemo.vue';
import MenuButtonBasic from '@/../component-demos/menu-button/examples/MenuButtonBasic.vue';
import MenuButtonWithIconOnly from '@/../component-demos/menu-button/examples/MenuButtonWithIconOnly.vue';
import MenuButtonWithIconAndText from '@/../component-demos/menu-button/examples/MenuButtonWithIconAndText.vue';
import MenuButtonAndMenuItemsWithIcons from '@/../component-demos/menu-button/examples/MenuButtonAndMenuItemsWithIcons.vue';
import MenuButtonWithScroll from '@/../component-demos/menu-button/examples/MenuButtonWithScroll.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Options'
	}
];
</script>

The MenuButton component is a [ToggleButton](./toggle-button.md) that, when toggled on, displays a [Menu](./menu.md) with options.

## Guidelines

### When to use menu buttons

MenuButton serves for accessing additional actions or settings associated with the button that triggers the menu.

Use the MenuButton component when the space is limited and you need to provide users with a set of related actions or options within a single button.

Avoid using MenuButton when there are only one or two actions to display. In that case, consider using separate buttons instead. Additionally, refrain from using MenuButton if the actions displayed are essential and require immediate visibility without additional interaction.

### Specifications

MenuButton includes the following items:

1. **ToggleButton**<br>
A single button to display the menu. It can include an icon, a clear label, or both.
2. **Menu**<br>
A selectable list of related actions or options that can optionally contain start icons.

![Specification of MenuButton.](../../assets/components/menu-button-specifications.svg)

#### Component limitations

The menu will display a minimum of 2 actions or options. There is no limit on the number of visible menu items; a scrollbar will appear if the menu size exceeds manageable limits.

The base minimum width for the MenuButton component is set at `@size-800` (equivalent to `128px` in the default Codex theme). Once the text exceeds this min-width, the menu will expand to accommodate the content, up to a maximum width of `@size-2400` (equivalent to `384px`).

![Two MenuButtons: one with 2 items and a width of 128px, and the other with 5 items and a width of 384px.](../../assets/components/menu-button-specifications-min-max.svg)

#### Position of the menu

When the menu is presented in LTR direction, Bottom-Right is the default position, while Bottom-Left is the default position in RTL direction. As an alternative to these base positions, the following ones can also be used to fit the space or scroll in the screen:

![MenuButton positions determined by the display direction of the Menu.](../../assets/components/menu-button-position.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Bottom-Right
2. Bottom-Left
3. Top-Right
4. Top-Left
5. Right-Top
6. Right-Bottom
7. Left-Top
8. Left-Bottom

</div>

Refer to the [MenuButton component in Codex Figma](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/❖-Codex-components?node-id=17053-2508&t=ZQCKNGZzfCQTFPwt-11).

### Types

Since MenuButton uses a [ToggleButton](./toggle-button.md) and a [Menu](./menu.md), it can use any of their available properties, such as displaying text on the button or including icons in the menu.

![Two MenuButtons: one with an icon-only button and menu items with text, and the other with a text button and menu items with icons and text.](../../assets/components/menu-button-types.svg)

### Interaction states

The Menu appears once the ToggleButton is selected.

![Two MenuButtons: one with an icon-only button and menu items with text, and the other with a text button and menu items with icons and text.](../../assets/components/menu-button-interaction-states.svg)

1. Default
2. Hover
3. Active
4. Focus
5. Disabled
6. Toggled-on

### Best practices

Consider the following recommendations when working with menu buttons.

<cdx-demo-rules>

<template #do-media>

![A MenuButton being used to display different actions.](../../assets/components/menu-button-use-do.svg)

</template>

<template #do-text>

- Use MenuButton to display additional actions within a single button.

</template>

<template #dont-media>

![A MenuButton incorrectly used to select an option.](../../assets/components/menu-button-use-dont.svg)

</template>

<template #dont-text>

- Use the MenuButton as a selector for choosing an option. In such cases, use a [Select](./select.md) instead.

</template>

</cdx-demo-rules>

<cdx-demo-rules>

<template #do-media>

![A MenuButton displaying menu items with start icons.](../../assets/components/menu-button-content-do.svg)

</template>

<template #do-text>

- Enhance the visual representation of text by incorporating icons into menu items.

</template>

<template #dont-media>

![A MenuButton displaying menu items with thumbnails.](../../assets/components/menu-button-content-dont.svg)

</template>

<template #dont-text>

- Use thumbnails within the menus of MenuButton, as they could make the menu excessively large.

</template>

</cdx-demo-rules>

<cdx-demo-rules>

<template #do-media>

![A MenuButton displaying four normal actions and one destructive.](../../assets/components/menu-button-menu-items-do.svg)

</template>

<template #do-text>

- Use the `color-destructive` in case an action within the Menu is destructive.

</template>

<template #dont-media>

![A MenuButton displaying three normal actions and two destructive.](../../assets/components/menu-button-menu-items-dont.svg)

</template>

<template #dont-text>

- Include more than one destructive action within the menu.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | If the focus is placed on the button, it opens and closes the menu. If the focus is placed in any of the options within the displayed menu, it activates that option. |
| <kbd>Space</kbd> | If the focus is placed on the button, it opens and closes the menu. |
| <kbd>Down arrow</kbd> / <kbd>Up arrow</kbd> | If the menu is displayed, it navigates through menu options. |
| <kbd>Esc</kbd> | It closes the menu when it is open. |
| <kbd>Home</kbd> | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| <kbd>End</kbd> | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :force-reset="true">
<template v-slot:demo="{ propValues, slotValues }">
	<menu-button-config-demo v-bind="propValues">
		<template v-if="slotValues.default">
			{{ slotValues.default }}
		</template>
	</menu-button-config-demo>
</template>
</cdx-demo-wrapper>

### Basic usage

MenuButton has two required props: `selected` and `menuItems`.
The `selected` prop needs to be bound with `v-model`.

Customize the content within the toggle button by using the default slot.
You can pass in text and/or a Icon to the slot content.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonBasic.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon-only

When using an icon-only toggle button, add an `aria-label`.

To add an icon, insert the Icon component in the slot content.
Refer to the [Icon](./icon.md) component and the [overview of icons](../../icons/overview.md)
to learn more about using icons.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-with-icon-only />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonWithIconOnly.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonWithIconOnly.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icon and text

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-with-icon-and-text />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonWithIconAndText.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonWithIconAndText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Menu items with icons

You can add icons to individual menu items by including the `icon` property in the list of
`menuItems`. Be sure to `import` or `require` each icon, then add the icon name from this
[list of icons](../../icons/all-icons.md) as the `icon` property's value.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-and-menu-items-with-icons />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonAndMenuItemsWithIcons.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonAndMenuItemsWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With configurable scroll

You can use the `menuConfig` prop to set a visible menu item limit.
Refer to the [`MenuConfig`](../types-and-constants.md#menuconfig) type for more configuration options.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-with-scroll />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonWithScroll.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonWithScroll.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue Usage
