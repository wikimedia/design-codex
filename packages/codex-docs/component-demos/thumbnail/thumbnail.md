<script setup>
import { CdxThumbnail } from '@wikimedia/codex';
import ThumbnailDefault from '@/../component-demos/thumbnail/examples/ThumbnailDefault.vue';
import ThumbnailCustomIcon from '@/../component-demos/thumbnail/examples/ThumbnailCustomIcon.vue';
</script>

A Thumbnail is a visual element used to display a small preview of an image. Thumbnails provide
users with a quick glimpse of the associated content.

## Guidelines

### Using thumbnails
Use the Thumbnail component to include small previews of images that can provide
context or support the meaning of the content included in components such as
[Card](./card.md) or [MenuItem](./menu-item.md).

The placeholder icon will display until the thumbnail image loads, or if a
thumbnail image is not provided.

### Specifications

![Specification of Thumbnail.](../../assets/components/thumbnail-specifications.svg)

The thumbnail component may include the following elements:
1. **Image**<br>The thumbnail displays an image if one has been uploaded.
2. **Placeholder icon**<br>If the thumbnail doesn't have an loaded image, it presents a placeholder gray icon against a light gray background.

In both scenarios, the thumbnail features a Gray300 border to ensure sufficient
contrast when placed on white backgrounds.

Thumbnails are set to a default square size of `size-250` token (equivalent to `40px` in the default
Codex theme). They cannot be scaled smaller than this size but can be scaled up to `@ize-800`
(equivalent to `128px` in the default Codex theme).

Refer to the [Thumbnail component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=6111-59883&mode=design&t=juAVVGeUnMoEFBEV-11).

### Types
There are two types of thumbnails based on whether an image has been loaded or not:
1. **Image**<br>If an image has been loaded, the thumbnail will display the image.
2. **Placeholder**<br>If no image has been loaded, the thumbnail will show a placeholder icon against a light gray background.

![Types of Thumbnail: with image and with placeholder.](../../assets/components/thumbnail-types.svg)

### Interaction states
Thumbnail component just have two states:

![Interaction states of Thumbnail: default and loading.](../../assets/components/thumbnail-interaction-states.svg)

1. **Default**: it will display the image if it is uploaded.
2. **Loading**: it displays the placeholder view until the thumbnail image loads.

### Best practices

Consider the following recommendations when using thumbnails.

#### Usage

<cdx-demo-rules>

<template #do-media>

![Thumbnail within a Card.](../../assets/components/thumbnail-best-practices-usage-do.svg)

</template>

<template #do-text>

- Use Thumbnail as a preview of an image within other components such as
[Card](./card.md) or [MenuItem](./menu-item.md).

</template>

<template #dont-media>

![Thumbnail within an InfoBox.](../../assets/components/thumbnail-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Replace images with Thumbnails, as Thumbnail is intended only as preview and an image should remain high-resolution.

</template>

</cdx-demo-rules>

#### Icon

<cdx-demo-rules>

<template #do-media>

![Thumbnail using a customized simple icon.](../../assets/components/thumbnail-best-practices-icon-do.svg)

</template>

<template #do-text>

- Customize the icon within placeholder thumbnails.
- Use icons that provide clear context for the use of the thumbnail.

</template>

<template #dont-media>

![Thumbnail using a customized complex icon.](../../assets/components/thumbnail-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.

</template>

</cdx-demo-rules>

## Demos

### Default

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<thumbnail-default />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/thumbnail/examples/ThumbnailDefault.vue [NPM]

<<< @/../component-demos/thumbnail/examples-mw/ThumbnailDefault.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/thumbnail/examples/ThumbnailCustomIcon.vue [NPM]

<<< @/../component-demos/thumbnail/examples-mw/ThumbnailCustomIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

## CSS-only version

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

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
```

:::

</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
</style>
