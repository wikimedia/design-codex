<script setup>
import { CdxMenuItem } from '@wikimedia/codex';
import MenuItemDefault from '@/../component-demos/menu-item/examples/MenuItemDefault.vue';
import MenuItemWithDescription from '@/../component-demos/menu-item/examples/MenuItemWithDescription.vue';
import MenuItemWithUrl from '@/../component-demos/menu-item/examples/MenuItemWithUrl.vue';
import MenuItemWithThumbnail from '@/../component-demos/menu-item/examples/MenuItemWithThumbnail.vue';
import MenuItemWithIcon from '@/../component-demos/menu-item/examples/MenuItemWithIcon.vue';
import MenuItemHighlightQuery from '@/../component-demos/menu-item/examples/MenuItemHighlightQuery.vue';
import MenuItemWithMatch from '@/../component-demos/menu-item/examples/MenuItemWithMatch.vue';
import MenuItemWithSupportingText from '@/../component-demos/menu-item/examples/MenuItemWithSupportingText.vue';
import MenuItemMultipleLangs from '@/../component-demos/menu-item/examples/MenuItemMultipleLangs.vue';
import MenuItemLongText from '@/../component-demos/menu-item/examples/MenuItemLongText.vue';
import MenuItemHideOverflow from '@/../component-demos/menu-item/examples/MenuItemHideOverflow.vue';
import MenuItems from '@/../component-demos/menu-item/examples/MenuItems.vue';
import MenuItemsGraphemes from '@/../component-demos/menu-item/examples/MenuItemsGraphemes.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'selected',
		type: 'boolean'
	},
	{
		name: 'active',
		type: 'boolean'
	},
	{
		name: 'highlighted',
		type: 'boolean'
	},
	{
		name: 'label',
		type: 'text',
		initial: 'Item label'
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
		name: 'icon',
		type: 'icon',
		initial: 'cdxIconGlobe'
	},
	{
		name: 'description',
		type: 'text',
		initial: 'Description text'
	},
	{
		name: 'searchQuery',
		type: 'text'
	},
	{
		name: 'boldLabel',
		type: 'boolean'
	},
	{
		name: 'hideDescriptionOverflow',
		type: 'boolean'
	}
];
</script>

A MenuItem is a selectable option within a Menu.

::: warning
This is not a standalone component, nor will it typically be directly used. It's
intended for use by the Menu component, which will provide it with props and
menu state information. See [Menu](./menu.md) for more details.
:::

## Guidelines

### When to use menu items
MenuItem is an “internal” component, used exclusively to represent content
within a [Menu](./menu.md). It cannot be used by itself.

MenuItems contain text, and supporting media (icons or thumbnails) that
represent an available choice for users.

### Specifications

![Specification of MenuItem.](../../assets/components/menu-item-specifications.svg)

Each menu item may include the following elements:
1. **Visual element** (optional)<br>An icon or thumbnail can be included in order to provide more context about the menu item content.
2. **Label**<br>A clear and descriptive title for the menu item.
3. **Supporting text** (optional)<br>Optional and subtle text that supports or explains the label.
4. **Match text** (optional)<br>In the context of a search suggestions menu, this optional text displays the alternative label of an item that matches the search query (e.g. an alias).
5. **Description** (optional)<br>Optional and subtle descriptive text that provides additional information about the menu item.

#### Component limitations

Menu items have no minimum or maximum character requirement, although concise text is recommended. If the label is multiline, the supporting text will be positioned next to the last line of the label.

Refer to the [MenuItem component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=4918-48934&mode=design&t=wJPfPzkECREKvMoi-0).

### Interaction states
Menu items have the following visually separate states:

![Interaction states of MenuItem: default, hover, active, selected, selected-hover, selected-active, disabled, destructive-default, destructive-hover, and destructive-active.](../../assets/components/menu-item-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover
3. Active
4. Selected
5. Selected hover
6. Selected active
7. Disabled
8. Destructive default
9. Destructive hover
10. Destructive active

</div>

::: tip Note
Only menu items representing options can be selected, while menu items representing actions can only be clicked.
:::

### Best practices

Consider the following recommendations when using menu items within menus.

#### Icon, label, and description

<cdx-demo-rules>

<template #do-media>

![MenuItem featuring a simple icon and concise label and description.](../../assets/components/menu-item-best-practices-do.svg)

</template>

<template #do-text>

- Use icons to emphasize the meaning of the label, adapting them as needed for each project.
- Keep the label and optional description concise to enhance menu scannability and readability.

</template>

<template #dont-media>

![MenuItem featuring a complex icon, a label, and a lengthy description.](../../assets/components/menu-item-best-practices-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.
- Overcrowd menu items with lengthy labels and descriptions.

</template>

</cdx-demo-rules>

#### Supporting text

<cdx-demo-rules>

<template #do-media>

![MenuItem featuring supporting text within brackets.](../../assets/components/menu-item-best-practices-do-2.svg)

</template>

<template #do-text>

- Include supporting text within brackets to explain where a search result is redirected from.

</template>

<template #dont-media>

![MenuItem featuring supporting text without brackets.](../../assets/components/menu-item-best-practices-dont-2.svg)

</template>

<template #dont-text>

- Include supporting text without brackets. It should always be enclosed within brackets to differentiate it from the item label.

</template>

</cdx-demo-rules>

## Demos

Note that these demos do not properly show some interactive states of menu items
(like active or hovered/highlighted), since they display menu items as
standalone or as part of an always-expanded, detached menu. To see the full
interactivity of menu items, check out a component that contains a menu, like
[Select](./select), [Lookup](./lookup), or [TypeaheadSearch](./typeahead-search).
### Configurable

Note that manually hovering over or selecting this menu item is disabled, the
configuration options to set these states should be used.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<ul role="listbox">
		<cdx-menu-item v-bind="propValues" id="cdx-demo-menu-item-configurable" value=""></cdx-menu-item>
	</ul>
</template>
</cdx-demo-wrapper>

### Default

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

### With description and bold label

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemWithDescription />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemWithDescription.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemWithDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With link

If a `url` property is included, the menu item will be wrapped in an anchor tag.

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

### With search query highlighted

When a menu item displays a search result, the current search query can be provided (along with the
`highlightQuery` prop) and it will be visually differentiated within the menu item's title. The
search query text will have a normal font weight, while the rest of the title will be bold,
which is meant to bring attention to the available suggestions based on the current search query.

In the example below, the search query is "Co".

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

### With search query match

For search results, a `match` property may be included that represents the text related to that item
that matched the search query (e.g. a [Wikidata alias](https://www.wikidata.org/wiki/Help:Aliases)).
The match will be displayed after the label. In the example below, the search query is "felis
margarita," an alias of the Wikidata item "sand cat."

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

### With supporting text

Text that supports or explains the label can be added via the `supportingText` prop. This text will
be displayed after the label in a more subtle color.

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

### With multiple languages

Individual `lang` attributes can be set for the `label`, `description`, `match`, and
`supportingText` props via the `language` prop, which is an object of `lang` attributes for those 
props.

The example below demonstrates a search result in a Greek interface for the English word
"moon."

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

### With long title and search query highlighted

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemLongText />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemLongText.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemLongText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With description text overflow hidden

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemHideOverflow />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemHideOverflow.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemHideOverflow.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Within a list

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItems />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItems.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItems.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With graphemes

<cdx-demo-wrapper>
<template v-slot:demo>
	<MenuItemsGraphemes />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-item/examples/MenuItemsGraphemes.vue [NPM]

<<< @/../component-demos/menu-item/examples-mw/MenuItemsGraphemes.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

A value must be provided, and various optional elements can be displayed:
- A human-readable label
- A description
- A thumbnail or icon

Alternately, the entire content and layout of the menu item can be customized via the default
slot.

For search results, the search query can be visually differentiated within the result title.

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
