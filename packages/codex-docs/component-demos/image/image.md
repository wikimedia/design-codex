<script setup>
import { CdxImage } from '@wikimedia/codex';
import ImageDefault from '@/../component-demos/image/examples/ImageDefault.vue';
import ImageAspectRatio from '@/../component-demos/image/examples/ImageAspectRatio.vue';
import ImagePlaceholder from '@/../component-demos/image/examples/ImagePlaceholder.vue';

const imageData = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
    alt: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park.',
    width: 350
}

const controlsConfig = [
  {
    name: 'aspectRatio',
    type: 'radio',
    label: 'Aspect Ratio',
    options: ['16:9', '3:2', '4:3', '1:1', '3:4', '2:3'],
    default: '16:9',
  },
  {
    name: 'objectFit',
    type: 'radio',
    label: 'Object Fit',
    options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    default: 'cover',
  },
  {
    name: 'objectPosition',
    type: 'radio',
    label: 'Object Position',
    options: ['top', 'bottom', 'left', 'right', 'center'],
    default: 'center',
  },
  {
    name: 'position',
    type: 'radio',
    label: 'Image Position',
    options: [
      'left',
      'center',
      'right',
    ],
    default: 'center',
  }
];
</script>

An Image is a visual element used to display content in various formats and states,
supporting features like aspect ratios, placeholders, and responsive sizing.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
  <template v-slot:demo="{ propValues }">
    <cdx-image
        :src="imageData.url"
        :alt="imageData.alt"
        :aspect-ratio="propValues.aspectRatio"
        :object-fit="propValues.objectFit"
        :objectPosition="propValues.objectPosition"
        :position="propValues.position"
        :width="imageData.width"
      />
  </template>
</cdx-demo-wrapper>

## Overview

### When to use Image
Use the Image component to display visual content like photos or illustrations that enhance context and meaning of surrounding content.

Avoid using the Image component for small previews. Use the [Thumbnail](./thumbnail.md) component instead.

::: tip Accessibility
Always provide meaningful `alt` text in Image to ensure accessibility.
:::

### About Image

Image includes the following elements.

#### Image

The Image component displays an image element if one has been uploaded.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use contextually relevant, neutral, high-quality images that accurately represent the subject and respect copyright requirements. Refer to the [Style Guide](../../style-guide/images.md) to learn more about how to use images.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Placeholder icon

If the image element is missing or loading, a placeholder icon on a light background is displayed.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Customize the icon if needed.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use icons that provide clear context for the use of the Image.</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Default

By default, the Image component displays an image in its original dimensions.

<cdx-demo-wrapper>
<template v-slot:demo>
	<image-default />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/image/examples/ImageDefault.vue [NPM]

<<< @/../component-demos/image/examples-mw/ImageDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Aspect Ratio

The component supports aspect ratios to preserve layout structure.

<cdx-demo-wrapper>
<template v-slot:demo>
	<image-aspect-ratio />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/image/examples/ImageAspectRatio.vue [NPM]

<<< @/../component-demos/image/examples-mw/ImageAspectRatio.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Placeholder

The placeholder serves two purposes:

1. To display while the image is loading, improving the experience of those with slower connections.
2. To display when an image element is not provided.

<cdx-demo-wrapper>
<template v-slot:demo>
	<image-placeholder />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/image/examples/ImagePlaceholder.vue [NPM]

<<< @/../component-demos/image/examples-mw/ImagePlaceholder.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage
