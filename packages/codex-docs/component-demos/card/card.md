<script setup>
import CardDefault from '@/../component-demos/card/examples/CardDefault.vue';
import CardWithLink from '@/../component-demos/card/examples/CardWithLink.vue';
import CardWithIcon from '@/../component-demos/card/examples/CardWithIcon.vue';
import CardWithThumbnail from '@/../component-demos/card/examples/CardWithThumbnail.vue';
import CardWithThumbnailTitleOnly from '@/../component-demos/card/examples/CardWithThumbnailTitleOnly.vue';
import CardGroupWithThumbnails from '@/../component-demos/card/examples/CardGroupWithThumbnails.vue';
import CardMaximum from '@/../component-demos/card/examples/CardMaximum.vue';
</script>

## Demos

### Default

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
<card-default />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardDefault.vue

</template>
</cdx-demo-wrapper>

### With link

Adding the `url` prop will make the root element of the Card an anchor element.

<cdx-demo-wrapper>
<template v-slot:demo>
<card-with-link />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardWithLink.vue

</template>
</cdx-demo-wrapper>

### Media

A Card can have either an icon or a thumbnail. Card text will be aligned to the top of the media,
unless there is only a title, which will be aligned to the center of the media.

#### With icon

<cdx-demo-wrapper>
<template v-slot:demo>
<card-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardWithIcon.vue

</template>
</cdx-demo-wrapper>

#### With thumbnail

<cdx-demo-wrapper>
<template v-slot:demo>
<card-with-thumbnail />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardWithThumbnail.vue

</template>
</cdx-demo-wrapper>

#### Title only

<cdx-demo-wrapper>
<template v-slot:demo>
<card-with-thumbnail-title-only />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardWithThumbnailTitleOnly.vue

</template>
</cdx-demo-wrapper>

### Card groups

Cards will often be displayed in groups. There are two considerations for Card groups:
- **Layout:** Layout styles for groups of Cards, e.g. margins or grid layout, must be added by the
application. The example below adds some simple layout styles to a group of Cards.
- **Media consistency:** As shown above, adding a `thumbnail` prop will display the thumbnail.
For groups of Cards, you may want to display a thumbnail for each Card if available, and otherwise
display a placeholder. To enable this behavior, add the `forceThumbnail` prop, as demonstrated
below.
The third item has no thumbnail and display a placeholder icon instead.

<cdx-demo-wrapper>
<template v-slot:demo>
<card-group-with-thumbnails />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardGroupWithThumbnails.vue

</template>
</cdx-demo-wrapper>

### Maximum example

The example below contains a title, a description, a thumbnail image, and some
"supporting text" (which contains an Icon as well as text content).

**Note:** When using an Icon component inside the Card's `supporting-text` slot,
it is recommended to set the Icon `size` property to `small`.

<cdx-demo-wrapper>
<template v-slot:demo>
<card-maximum />
</template>

<template v-slot:code>

<<< @/../component-demos/card/examples/CardMaximum.vue

</template>
</cdx-demo-wrapper>
