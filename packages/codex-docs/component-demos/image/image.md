<script setup>
import { CdxImage } from '@wikimedia/codex';
import ImageDefault from '@/../component-demos/image/examples/ImageDefault.vue';
import ImageAspectRatio from '@/../component-demos/image/examples/ImageAspectRatio.vue';
import ImagePlaceholder from '@/../component-demos/image/examples/ImagePlaceholder.vue';
import ImageError from '@/../component-demos/image/examples/ImageError.vue';

const controlsConfig = [
  {
    name: 'src',
    type: 'text',
    label: 'Image Source',
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
  },
  {
    name: 'alt',
    type: 'text',
    label: 'Alt Text',
    default: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park.',
  },
  {
    name: 'aspectRatio',
    type: 'radio',
    label: 'Aspect Ratio',
    options: ['16-9', '3-2', '4-3', '1-1', '3-4', '2-3'],
    default: 'null',
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
  },
  {
    name: 'width',
    type: 'text',
    label: 'Width',
    default: 350,
  },
  {
    name: 'height',
    type: 'text',
    label: 'Height',
    default: 200,
  },
];
</script>

An Image is a visual element used to display content in various formats and states,
supporting features like aspect ratios, placeholders,
and responsive sizing.

## Guidelines

### When to use images
Use the Image component to display visual content like photos or illustrations that enhance context and meaning.
Ideal for adding visual elements in layouts, supporting text content, or embedding in components like cards and dialogs.
Avoid using for purely decorative purposes or stylized visual elements.
Always include meaningful `alt` text for accessibility.

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
  <template v-slot:demo="{ propValues }">
    <cdx-image
        :src="propValues.src"
        :alt="propValues.alt"
        :aspect-ratio="propValues.aspectRatio"
        :object-fit="propValues.objectFit"
        :objectPosition="propValues.objectPosition"
        :position="propValues.position"
        :width="propValues.width"
        :height="propValues.height"
      />
  </template>
</cdx-demo-wrapper>

### Default

<cdx-demo-wrapper :force-controls="true">
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

<cdx-demo-wrapper :force-controls="true">
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

<cdx-demo-wrapper :force-controls="true">
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

### Error

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<image-error />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/image/examples/ImageError.vue [NPM]

<<< @/../component-demos/image/examples-mw/ImageError.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage
