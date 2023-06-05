<script setup>
import AccordionDefault from '@/../component-demos/accordion/examples/AccordionDefault.vue';
import AccordionStacked from '@/../component-demos/accordion/examples/AccordionStacked.vue';
import AccordionDisabled from '@/../component-demos/accordion/examples/AccordionDisabled.vue';
import AccordionActionButton from '@/../component-demos/accordion/examples/AccordionActionButton.vue';
import AccordionImage from '@/../component-demos/accordion/examples/AccordionImage.vue';
import AccordionIconVisible from '@/../component-demos/accordion/examples/AccordionIconVisible.vue';
import AccordionHeadings from '@/../component-demos/accordion/examples/AccordionHeadings.vue';
</script>

## Demos

### Default

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-default />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionDefault.vue

</template>
</cdx-demo-wrapper>

### Stacked

It's possible to stack accordions by adding them next to each other in the markup.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-stacked />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionStacked.vue

</template>
</cdx-demo-wrapper>

### With action button

To add an action button to the accordion, pass the `actionButton` prop. The button is placed in the
top right corner of the accordion, and it emits an event `actionButtonClicked` when clicked.

::: tip
If you are displaying an action button, make sure to provide a label for this
button for accessibility purposes by using the `actionButtonLabel` prop.
:::


<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-action-button />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionActionButton.vue

</template>
</cdx-demo-wrapper>

### With always visible icon

To show the icon even when the accordion is collapsed, set the `iconAlwaysVisible` prop.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-icon-visible />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionIconVisible.vue

</template>
</cdx-demo-wrapper>

### With image

The accordion can be used with different elements, including images.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-image />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionImage.vue

</template>
</cdx-demo-wrapper>

### With different heading levels

The accordion heading can be changed to any heading level by passing the `headingLevel` prop.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-headings />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionHeadings.vue

</template>
</cdx-demo-wrapper>

### Disabled

The accordion can be disabled by passing the `disabled` prop. This will disable the accordion and
the action button.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
    <accordion-disabled />
</template>
<template v-slot:code>

<<< @/../component-demos/accordion/examples/AccordionDisabled.vue

</template>
</cdx-demo-wrapper>
