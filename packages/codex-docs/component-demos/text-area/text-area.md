<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextAreaDefault from '@/../component-demos/text-area/examples/TextAreaDefault.vue';
import TextAreaWithPlaceholder from '@/../component-demos/text-area/examples/TextAreaWithPlaceholder.vue';
import TextAreaWithRows from '@/../component-demos/text-area/examples/TextAreaWithRows.vue';
import TextAreaWithAutosize from '@/../component-demos/text-area/examples/TextAreaWithAutosize.vue';
import TextAreaWithDisabled from '@/../component-demos/text-area/examples/TextAreaWithDisabled.vue';
import TextAreaWithReadonly from '@/../component-demos/text-area/examples/TextAreaWithReadonly.vue';
import TextAreaWithIcons from '@/../component-demos/text-area/examples/TextAreaWithIcons.vue';


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
        name: 'startIcon',
        type: 'icon'
    },
    {
        name: 'endIcon',
        type: 'icon'
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
    }
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

By default, the initial value of the `autosize` prop is false. When `autosize` is false, the textarea will display a grabber/resize tool and a scrollbar to view the overflow content. The `<textarea>` can be manually resized vertically to increase height of the element.

Note: The initial min-height of the `<textarea>` is set to 64px.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-default />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaDefault.vue

</template>
</cdx-demo-wrapper>

### With placeholder

We passed in a native attribute, `placeholder`, to hint to users what to enter into the control.

Note: Placeholders are not a substitute for a proper `<label>` element tied to the control.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-placeholder />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithPlaceholder.vue

</template>
</cdx-demo-wrapper>

### With rows

This example demonstrates how to pass in the native attribute, `rows`, to the `<textarea>`.

The `rows` attribute takes a positive number which represents the number of text lines to display in the control.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-rows />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithRows.vue

</template>
</cdx-demo-wrapper>

### With autosize

When the `autosize` prop is set to `true`, the TextArea automatically grows with the height of the content inside `<textarea>`.

The grabber/resize tool is not displayed when `autosize` is set to `true`.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-autosize />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithAutosize.vue

</template>
</cdx-demo-wrapper>

### With icons

TextArea can pass in a start icon and end icon as props. This example shows how to add icons to the component. Also see [Icon](./icon.md).

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-icons />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithIcons.vue

</template>
</cdx-demo-wrapper>

### With disabled

You can disable the component by adding the `disabled` attribute.

When `<textarea>` is `disabled`, the user cannot interact with the control. Users cannot click or select in the control and the form cannot be submitted.

<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-disabled />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithDisabled.vue

</template>
</cdx-demo-wrapper>

### With readonly

You can make the component `readonly` by adding the `readonly` attribute.

When `<textarea>` is `readonly`, the user cannot modify the value of the control. Some key differences between `disabled` and `readonly` is that `readonly` does not prevent users from selecting and clicking in the form. Users can highlight and copy content in readonly. Readonly is tabbable and the form can be submitted.

One example usage of `readonly` textarea is when you want to prevent a user from typing into the textarea until a condition is met like selecting a a checkbox. In this situation, when the condition is met we can use JavaScript to remove the `readonly` to make the textarea editable.



<cdx-demo-wrapper>
<template v-slot:demo>
<text-area-with-readonly />
</template>

<template v-slot:code>

<<< @/../component-demos/text-area/examples/TextAreaWithReadonly.vue

</template>
</cdx-demo-wrapper>