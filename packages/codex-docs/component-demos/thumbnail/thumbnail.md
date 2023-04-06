<script setup>
import { CdxThumbnail } from '@wikimedia/codex';
import ThumbnailDefault from '@/../component-demos/thumbnail/examples/ThumbnailDefault.vue';
import ThumbnailCustomIcon from '@/../component-demos/thumbnail/examples/ThumbnailCustomIcon.vue';
</script>

## Demos

### Default

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<thumbnail-default />
</template>

<template v-slot:code>

<<< @/../component-demos/thumbnail/examples/ThumbnailDefault.vue

</template>
</cdx-demo-wrapper>

### Placeholder

The placeholder serves two purposes:

1. To display while a thumbnail image is loading, improving the experience of those with slower
   connections
2. To display when a thumbnail image is not provided

The second case may occur in a group of components, like Cards or MenuItems, when some items have a
thumbnail image but some do not. In this case, the placeholder icon helps maintain a consistent
layout for all items. See the [MenuItem demo](./menu-item.html#within-a-list) for an example.

#### Default placeholder

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-thumbnail :thumbnail="null" />
</template>

<template v-slot:code>

```vue-html
<cdx-thumbnail :thumbnail="null" />
```

</template>
</cdx-demo-wrapper>

#### Custom placeholder icon

To customize the placeholder icon, use the `placeholderIcon` prop.

<cdx-demo-wrapper>
<template v-slot:demo>
	<thumbnail-custom-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/thumbnail/examples/ThumbnailCustomIcon.vue

</template>
</cdx-demo-wrapper>

### CSS-only version

### Markup structure

For the CSS-only version, a `background-image` rule must be set on the inner span. You can do this
via a `style` attribute (like in the example below), or by adding a custom CSS class to the inner
span and adding the `background-image` rule in your styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper <span>. -->
	<span class="cdx-thumbnail">
		<!-- Image span. -->
		<span class="cdx-thumbnail__image" style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );"></span>
	</span>
</template>
<template v-slot:code>

```html
<!-- Wrapper <span>. -->
<span class="cdx-thumbnail">
	<!-- Image span. -->
	<span class="cdx-thumbnail__image" style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );"></span>
</span>
```

</template>
</cdx-demo-wrapper>

### Placeholder

#### Default placeholder

To show the default placeholder icon, add two nested `<span>` elements inside the wrapper `<span>`:
1. An outer `<span>` with the class `cdx-thumbnail__placeholder`
2. An inner `<span>` with the class `cdx-thumbnail__placeholder__icon`

The default placeholder icon will automatically be added as a background image to the inner
`<span>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-thumbnail">
		<span class="cdx-thumbnail__placeholder">
			<span class="cdx-thumbnail__placeholder__icon"></span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-thumbnail">
	<span class="cdx-thumbnail__placeholder">
		<span class="cdx-thumbnail__placeholder__icon"></span>
	</span>
</span>
```

</template>
</cdx-demo-wrapper>

#### Custom placeholder icon

To show a custom placeholder icon, add two nested `<span>` elements inside the wrapper `<span>`:
1. An outer `<span>` with the class `cdx-thumbnail__placeholder`
2. An inner `<span>` with your own custom CSS class

In your Less code, use your custom CSS class to add a [CSS-only icon](./icon.md#css-only-version).
Be sure to use `@color-placeholder` as the fill color.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-thumbnail">
		<span class="cdx-thumbnail__placeholder">
			<span class="cdx-demo-css-icon--article"></span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-thumbnail">
	<span class="cdx-thumbnail__placeholder">
		<span class="cdx-demo-css-icon--article"></span>
	</span>
</span>
```

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
```

</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
</style>
