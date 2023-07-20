<script setup>
import LookupDefault from '@/../component-demos/lookup/examples/LookupDefault.vue';
import LookupWithCustomMenuItem from '@/../component-demos/lookup/examples/LookupWithCustomMenuItem.vue';
import LookupNoResults from '@/../component-demos/lookup/examples/LookupNoResults.vue';
import LookupWithFetch from '@/../component-demos/lookup/examples/LookupWithFetch.vue';
import LookupClearableStartIcon from '@/../component-demos/lookup/examples/LookupClearableStartIcon.vue';
import LookupWithPlaceholder from '@/../component-demos/lookup/examples/LookupWithPlaceholder.vue';
import LookupField from '@/../component-demos/lookup/examples/LookupField.vue';
</script>

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#usage)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Default

The Lookup component will emit `input` events on input, which the parent component should
react to by computing or fetching menu items, then providing those items to the Lookup component for
display by updating the `menu-items` prop.

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text.

Note that in this example, menu items are Wikidata items with a human-readable label and a Wikidata
entity ID value.

::: warning
The parent component must update the `menu-items` prop after each `input` event, otherwise
the Lookup component will stay in the pending state indefinitely. If there are no results for the
given input, set the `menu-items` prop to an empty array (`[]`).
:::

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
<lookup-default />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupDefault.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom menu item display

The `menu-item` slot can be used to set up custom menu item content and formatting.

<cdx-demo-wrapper>
<template v-slot:demo>
<lookup-with-custom-menu-item />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithCustomMenuItem.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithCustomMenuItem.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With "no results" content

A non-interactive "no results" message can be displayed via the `no-results` slot. If populated,
this slot will automatically display when there are zero menu items.

<cdx-demo-wrapper>
<template v-slot:demo>
<lookup-no-results />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupNoResults.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupNoResults.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With fetched results and infinite scroll

Often, a Lookup component is used to fetch results from an API endpoint. Parent components should
react to the `input` event emitted by Lookup to search for results, then pass back to the
Lookup either an array of results to display as menu items or an empty array if there are no
results. Between those two events, a pending state animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled, when the user nears the end of the list of results, a `load-more` event is
emitted. The parent component can react to this by fetching more results and appending them to the
list of menu items provided to the Lookup. These new items will then be displayed within the menu.

<cdx-demo-wrapper>
<template v-slot:demo>
<lookup-with-fetch />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithFetch.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithFetch.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Clearable, with start icon

Props of the TextInput component can be bound to Lookup and will be passed down to the TextInput
component inside of it, so you can take advantage of features like the "clear" button and icons.

<cdx-demo-wrapper>
<template v-slot:demo>
<lookup-clearable-start-icon />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupClearableStartIcon.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupClearableStartIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With placeholder

Attributes (except for `class`) will fall through to the input element, so you can set things like
`placeholder` on the Lookup component and they'll be applied to the input.

<cdx-demo-wrapper>
<template v-slot:demo>
<lookup-with-placeholder />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupWithPlaceholder.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupWithPlaceholder.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A Lookup can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<lookup-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/lookup/examples/LookupField.vue [NPM]

<<< @/../component-demos/lookup/examples-mw/LookupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

There is no true CSS-only version of the Lookup component. However, a
[CSS-only TextInput component](./text-input.md#css-only-version) can be used instead, since it has
visual parity with the Lookup component with its menu collapsed. For example, you could display a
CSS-only TextInput on page load while a Vue app loads, then replace it with the Vue Lookup component once the Vue app has mounted.

The example below is a simple text input with a placeholder, but icons and different states are
supported—see the [TextInput docs](./text-input.md#css-only-version) for more information.


<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper div. -->
<div class="cdx-text-input">
	<!-- Input element with CSS class and attributes. -->
	<input class="cdx-text-input__input" type="text" placeholder="Start typing a vegetable name...">
</div>
```

</template>
</cdx-demo-wrapper>
