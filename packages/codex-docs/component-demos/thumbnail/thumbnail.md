<script setup>
import { CdxThumbnail } from '@wikimedia/codex';
import ThumbnailDefault from './../../component-demos/thumbnail/examples/ThumbnailDefault.vue';
import ThumbnailCustomIcon from './../../component-demos/thumbnail/examples/ThumbnailCustomIcon.vue';
</script>

## Demos

### Default

<cdx-demo-wrapper>
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

```vue
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
