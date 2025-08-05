<script setup>
import { CdxMenuItem, CdxAccordion } from '@wikimedia/codex';
import MenuItemDefault from '@/../component-demos/menu-item/examples/MenuItemDefault.vue';
import MenuItemWithUrl from '@/../component-demos/menu-item/examples/MenuItemWithUrl.vue';
import MenuItemWithThumbnail from '@/../component-demos/menu-item/examples/MenuItemWithThumbnail.vue';
import MenuItemWithIcon from '@/../component-demos/menu-item/examples/MenuItemWithIcon.vue';
import MenuItemHighlightQuery from '@/../component-demos/menu-item/examples/MenuItemHighlightQuery.vue';
import MenuItemWithMatch from '@/../component-demos/menu-item/examples/MenuItemWithMatch.vue';
import MenuItemWithSupportingText from '@/../component-demos/menu-item/examples/MenuItemWithSupportingText.vue';
import MenuItemMultipleLangs from '@/../component-demos/menu-item/examples/MenuItemMultipleLangs.vue';

const controlsConfig = [
	{
		name: 'highlighted',
		type: 'boolean'
	},
	{
		name: 'active',
		type: 'boolean'
	},
	{
		name: 'selected',
		type: 'boolean'
	},
	{
		name: 'multiselect',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'icon',
		type: 'icon',
		initial: 'cdxIconGlobe'
	},
	{
		name: 'label',
		type: 'text',
		initial: 'Item label'
	},
	{
		name: 'boldLabel',
		type: 'boolean'
	},
	{
		name: 'match',
		type: 'text'
	},
	{
		name: 'supportingText',
		type: 'text'
	},
	{
		name: 'description',
		type: 'text',
		initial: 'Description text'
	},
	{
		name: 'hideDescriptionOverflow',
		type: 'boolean'
	},
	{
		name: 'searchQuery',
		type: 'text'
	},
	{
		name: 'action',
		type: 'radio',
		options: [ 'default', 'destructive' ],
	}
];
</script>

A MenuItem is a selectable option within a [Menu](./menu.md).

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<ul role="listbox">
		<cdx-menu-item v-bind="propValues" id="cdx-demo-menu-item-configurable" value=""></cdx-menu-item>
	</ul>
</template>
</cdx-demo-wrapper>

## Overview

### When to use MenuItem

MenuItem is an “internal” component, used exclusively to represent content within a
[Menu](./menu.md). It cannot be used by itself.

### About MenuItem

MenuItems can have one of two functions:
1. **Selectable options**<br>MenuItems in form elements like [Select](./select.md) or [Combobox](./combobox.md) are selectable.
2. **Trigger actions**<br>MenuItems in [MenuButton](menu-button.md) trigger actions. There are two types of actions:
	- **Standard actions**<br>neutral actions such as "Edit" or "Share".
	- **Destructive actions**<br>actions with potentially negative or irreversible impact, such as "Delete".

MenuItem includes the following elements.

#### Media (optional)

An Icon or Thumbnail can be included in order to provide more context about the menu item content.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use an Icon to visually reinforce the MenuItem content.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use a Thumbnail to provide a preview of the MenuItem content.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Label

A clear and descriptive title for the MenuItem.

#### Supporting text (optional)

Text that supports or explains the label. This is often used to indicate search redirects in a Menu
of search results.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Keep supporting text short to avoid overcrowding the layout.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include supporting text within brackets to explain where a search result is redirected from.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Search query match (optional)

In the context of a search suggestions menu, this optional text displays the alternative label of an item that matches the search query (e.g. an alias).

#### Description (optional)

Descriptive text that provides additional information about the menu item.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Keep description text concise to keep the Menu scannable and readable.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

Note that these demos do not properly show some interactive states of MenuItems (like active or
hovered/highlighted), since they display MenuItems as standalone or as part of an always-expanded,
detached Menu. To understand the full interactivity of MenuItems, check out a component that contains a
Menu, like [Select](./select), [Lookup](./lookup), or [TypeaheadSearch](./typeahead-search).

### Basic usage

By default, the MenuItem's `label` will be displayed in the regular font weight.
This MenuItem has a bold `label` and a `description`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemDefault />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemDefault.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With link

If a `url` property is included, the MenuItem will be wrapped in an anchor `<a>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithUrl />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithUrl.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithUrl.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icon

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithIcon />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithIcon.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With thumbnail

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithThumbnail />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithThumbnail.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithThumbnail.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Search query highlight

When a MenuItem displays a search result, the current `searchQuery` can be provided and will be
visually differentiated within the MenuItem's `label`. The `searchQuery` text will have a normal
font weight, while the rest of the `label` will be bold, which is meant to bring attention to the
available suggestions based on the current `searchQuery`.

In the example below, the `searchQuery` is "Co".

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemHighlightQuery />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemHighlightQuery.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemHighlightQuery.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To highlight the search query within the label text, set `highlightQuery` to `true` and provide the
current `searchQuery` text.

</cdx-accordion>

### Search query match

For search results, a `match` property may be included that represents the text related to that item
that matched the `searchQuery` (e.g. a [Wikidata alias](https://www.wikidata.org/wiki/Help:Aliases)).
The `match` will be displayed after the `label`.

In the example below, the `searchQuery` is "felis margarita," an alias of the Wikidata item "sand
cat." The `match` is included when highlighting the search query within a result's title.

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithMatch />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithMatch.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithMatch.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Supporting text

Text that supports or explains the `label` can be added via the `supportingText` prop. This text
will be displayed after the `label` in a more subtle color, and is not included when highlighting
a search query within the title.

The example below shows a result for the search term "Corn," which redirects to the article for
"Maize" on English Wikipedia.

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithSupportingText />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithSupportingText.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithSupportingText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Multiple languages

The MenuItem component can support different languages for different text elements. The example
below demonstrates a search result in a Greek interface for the English word "moon."

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemMultipleLangs />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemMultipleLangs.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemMultipleLangs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Individual `lang` attributes can be set for the `label`, `description`, `match`, and
`supportingText` props via the `language` prop, which is an object of `lang` attributes for those
props.

</cdx-accordion>

## Technical implementation

### Vue usage

::: warning
This is not a standalone component, nor will it typically be directly used. It's
intended for use by the Menu component, which will provide it with props and
menu state information. Visit [Menu](./menu.md) for more details.
:::

A value must be provided, and various optional elements can be displayed:
- A human-readable label
- A description
- A thumbnail or icon

Alternately, the entire content and layout of the MenuItem can be customized via the default
slot.

<style lang="less" scoped>
// Menus in this demo aren't absolutely positioned relative to something else.
// Target .cdx-demo-wrapper__demo-pane instead of .cdx-demo-wrapper to avoid also applying this
// rule to the menu in the icon picker in the wrapper's controls
/* stylelint-disable-next-line selector-class-pattern */
.cdx-demo-wrapper :deep( .cdx-demo-wrapper__demo-pane .cdx-menu ) {
	position: static;
	box-shadow: none;
}

.cdx-demo-wrapper :deep( ul ) {
	margin: 0;
	padding: 0;
}

// Disable manual hover/select/etc. for the configurable demo
/* stylelint-disable-next-line selector-max-id */
#cdx-demo-menu-item-configurable {
	pointer-events: none;
}
</style>
