<script setup>
import MenuItemDefault from './../../component-demos/menu-item/examples/MenuItemDefault.vue';
import MenuItemWithDescription from './../../component-demos/menu-item/examples/MenuItemWithDescription.vue';
import MenuItemWithUrl from './../../component-demos/menu-item/examples/MenuItemWithUrl.vue';
import MenuItemWithThumbnail from './../../component-demos/menu-item/examples/MenuItemWithThumbnail.vue';
import MenuItemWithIcon from './../../component-demos/menu-item/examples/MenuItemWithIcon.vue';
import MenuItemHighlightQuery from './../../component-demos/menu-item/examples/MenuItemHighlightQuery.vue';
import MenuItemWithMatch from './../../component-demos/menu-item/examples/MenuItemWithMatch.vue';
import MenuItemMultipleLangs from './../../component-demos/menu-item/examples/MenuItemMultipleLangs.vue';
import MenuItemLongText from './../../component-demos/menu-item/examples/MenuItemLongText.vue';
import MenuItemHideOverflow from './../../component-demos/menu-item/examples/MenuItemHideOverflow.vue';
import MenuItems from './../../component-demos/menu-item/examples/MenuItems.vue';
import MenuItemsGraphemes from './../../component-demos/menu-item/examples/MenuItemsGraphemes.vue';
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
`highlightQuery` prop) and it will be highlighted within the menu item's title. In the example
below, the search query is "Co".

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

### With multiple languages

In addition to simple strings, the `label`, `description`, and `match` props can be objects with
a string value and an associated language code. The `lang` attribute for that string will be set in
the markup. The example below demonstrates a search result in a Greek interface for the English word
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
// This menu isn't absolutely positioned relative to something else.
.cdx-demo-wrapper :deep( ul ) {
	position: static;
	box-shadow: none;
}
</style>
