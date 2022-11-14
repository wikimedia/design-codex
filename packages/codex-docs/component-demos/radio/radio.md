<script setup>
import RadioGroup from '@/../component-demos/radio/examples/RadioGroup.vue';
import InlineRadios from '@/../component-demos/radio/examples/InlineRadios.vue';
</script>

## Demos

### Radio group

<cdx-demo-wrapper :force-reset="true" :force-controls="true">
<template v-slot:demo>
<radio-group />
</template>

<template v-slot:code>

<<< @/../component-demos/radio/examples/RadioGroup.vue

</template>
</cdx-demo-wrapper>

### Inline radios

<cdx-demo-wrapper>
<template v-slot:demo>
<inline-radios />
</template>

<template v-slot:code>

<<< @/../component-demos/radio/examples/InlineRadios.vue

</template>
</cdx-demo-wrapper>
