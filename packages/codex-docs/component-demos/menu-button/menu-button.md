<script setup>
import { CdxMenuButton, CdxAccordion } from '@wikimedia/codex';
import MenuButtonConfigDemo from '@/../component-demos/menu-button/examples/MenuButtonConfigDemo.vue';
import MenuButtonBasic from '@/../component-demos/menu-button/examples/MenuButtonBasic.vue';
import MenuButtonWithIconOnly from '@/../component-demos/menu-button/examples/MenuButtonWithIconOnly.vue';
import MenuButtonAndMenuItemsWithIcons from '@/../component-demos/menu-button/examples/MenuButtonAndMenuItemsWithIcons.vue';
import MenuButtonSelection from '@/../component-demos/menu-button/examples/MenuButtonSelection.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'More options'
	}
];
</script>

The MenuButton component is a [ToggleButton](./toggle-button.md) that, when toggled on, displays a [Menu](./menu.md) with actions.

<cdx-demo-wrapper :controls-config="controlsConfig" :force-reset="true">
<template v-slot:demo="{ propValues, slotValues }">
	<menu-button-config-demo v-bind="propValues">
		<template v-if="slotValues.default">
			{{ slotValues.default }}
		</template>
	</menu-button-config-demo>
</template>
</cdx-demo-wrapper>

## Overview

### When to use MenuButton

Use the MenuButton component when the space is limited and you need to provide users with a set of related actions or options within a single button.

Avoid using MenuButton when there are only one or two actions to display. In that case, consider
using separate buttons instead. Additionally, do not use MenuButton if the actions are essential and
require immediate visibility without additional interaction.

The items within the Menu are meant to be actions. For a menu of selectable options, use [Select](./select.md).

### About MenuButton

MenuButton includes the following elements.

#### ToggleButton

A single button to display the Menu. It can include an icon, a text label, or both.

#### Menu

A list of related actions. The Menu can be placed in a variety of positions relative to the button.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Make MenuItems more easily recognizable by including clear and relevant icons.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use thumbnails within MenuItems, as they could make the Menu excessively large.</cdx-demo-best-practice>
</cdx-demo-best-practices>

MenuItems can represent two types of actions:
1. **Standard actions**<br>Neutral actions such as "Edit" or "Share".
2. **Destructive actions**<br>Actions with potentially negative or irreversible impact, such as "Delete".

## Examples

### Basic usage

The ToggleButton that displays the Menu can be customized with text, an Icon, or both.

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

<cdx-accordion>
<template #title>Developer notes</template>

MenuButton has two required props: `selected` and `menuItems`. The `selected` prop needs to be bound
with `v-model`.

</cdx-accordion>

### Icon-only

To add an icon, insert the Icon component in the slot content. Refer to the [Icon](./icon.md)
component and the [overview of icons](../../icons/overview.md) to learn more about using icons.

<cdx-demo-best-practices>
<cdx-demo-best-practice>When using an icon-only ToggleButton, add an `aria-label` to provide a label to users of assistive technology.</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

### MenuItems with icons

Refer to the [MenuItem](./menu-item.md) component to learn about all features available for
`menuItems`.

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

### Triggering actions

When the user selects a MenuItem, it can trigger an immediate action instead of (or in addition to)
storing their choice as a persistent selection.

<cdx-demo-best-practices>
<cdx-demo-best-practice>If an action is destructive, label it as such to inform users of its consequences.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't include more than one destructive action within the menu.</cdx-demo-best-practice>
</cdx-demo-best-practices>

In this example, selecting a MenuItem causes a message to temporarily display.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-selection />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonSelection.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

In this example, the component listens for `@update:selected` events from the MenuButton component,
handles the selection change with the `onSelect` method, displays a temporary message using the
[Message](./message.md) component, and resets the selection after a few seconds.

</cdx-accordion>

### Other features

The MenuButton component has an internal ToggleButton and Menu. You can use the
following features from those components in the MenuButton component:
- [Custom menu item display](./menu.html#menu-item-display)
- [Limited height with scrolling](./menu.html#with-scrolling-enabled)
- [Menu groups](./menu.html#menu-groups)
- [MenuItem features](./menu-item.html)

## Technical implementation

### Vue usage

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | If the focus is placed on the button, it opens and closes the menu. If the focus is placed in any of the options within the displayed menu, it activates that option. |
| <kbd>Space</kbd> | If the focus is placed on the button, it opens and closes the menu. |
| <kbd>Down arrow</kbd> / <kbd>Up arrow</kbd> | If the menu is displayed, it navigates through menu options. |
| <kbd>Esc</kbd> | It closes the menu when it is open. |
| <kbd>Home</kbd> | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| <kbd>End</kbd> | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
