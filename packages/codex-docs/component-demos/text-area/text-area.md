<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';

const controlsConfig = [
    {
        name: 'status',
        type: 'radio',
        options: [ 'default', 'error' ]
    },
    {
        name: 'autosize',
        type: 'boolean'
    },
    {
        name: 'placeholder',
        type: 'text'
    },
    {
        name: 'disabled',
        type: 'boolean'
    },
    {
        name: 'readonly',
        type: 'boolean'
    },
    {
        name: 'rows',
        type: 'text'
    },
];
</script>

::: tip Attributes passed to textarea
This component will pass any HTML attributes applied to it, except for CSS class, to the `<textarea>` element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="textareaValue">
<template v-slot:demo="{ propValues }">
<cdx-docs-configurable-generic v-bind="propValues"/>
</template>
</cdx-demo-wrapper>

### Default

The TextArea component uses `v-model` to two-way bind the reactive reference to the value of `<textarea>`. The reactive reference will automatically update when the value changes in the `<textarea>`. The value updates due to an emitted `input` event.
