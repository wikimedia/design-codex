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

::: warning
This is not a standalone component, nor will it typically be directly used. It's intended for use
by the Menu component, which will provide it with props and menu state information. See
[Menu](./menu) for more details.
:::

## Demos

Note that these demos do not properly show some interactive states of menu items (like active or
hovered/highlighted), since they display menu items as standalone or as part of an always-expanded,
detached menu. To see the full interactivity of menu items, check out a component that contains a
menu, like [Select](./select), [Lookup](./lookup), or [TypeaheadSearch](./typeahead-search).

### Configurable

Note that manually hovering over or selecting this menu item is disabled, the configuration options
to set these states should be used.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
<cdx-menu-item v-bind="propValues" id="cdx-demo-menu-item-configurable" value=""></cdx-menu-item>
</template>
</cdx-demo-wrapper>

### Default

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemDefault />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemDefault.vue

</template>
</cdx-demo-wrapper>

### With description and bold label

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemWithDescription />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemWithDescription.vue

</template>
</cdx-demo-wrapper>

### With link

If a `url` property is included, the menu item will be wrapped in an anchor tag.

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemWithUrl />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemWithUrl.vue

</template>
</cdx-demo-wrapper>

### With icon

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemWithIcon />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemWithIcon.vue

</template>
</cdx-demo-wrapper>

### With thumbnail

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemWithThumbnail />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemWithThumbnail.vue

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

<<< @/../component-demos/menu-item/examples/MenuItemHighlightQuery.vue

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

<<< @/../component-demos/menu-item/examples/MenuItemWithMatch.vue

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

<<< @/../component-demos/menu-item/examples/MenuItemWithSupportingText.vue

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

<<< @/../component-demos/menu-item/examples/MenuItemMultipleLangs.vue

</template>
</cdx-demo-wrapper>

### With long title and search query highlighted

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemLongText />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemLongText.vue

</template>
</cdx-demo-wrapper>

### With description text overflow hidden

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemHideOverflow />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemHideOverflow.vue

</template>
</cdx-demo-wrapper>

### Within a list

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItems />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItems.vue

</template>
</cdx-demo-wrapper>

### With graphemes

<cdx-demo-wrapper>
<template v-slot:demo>
<MenuItemsGraphemes />
</template>
<template v-slot:code>

<<< @/../component-demos/menu-item/examples/MenuItemsGraphemes.vue

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
// Menus in this demo aren't absolutely positioned relative to something else.
// Target .cdx-demo-wrapper__demo-pane instead of .cdx-demo-wrapper to avoid also applying this
// rule to the menu in the icon picker in the wrapper's controls
/* stylelint-disable-next-line selector-class-pattern */
.cdx-demo-wrapper :deep( .cdx-demo-wrapper__demo-pane .cdx-menu ) {
	position: static;
	box-shadow: none;
}

// Disable manual hover/select/etc. for the configurable demo
/* stylelint-disable-next-line selector-max-id */
#cdx-demo-menu-item-configurable {
	pointer-events: none;
}
</style>
