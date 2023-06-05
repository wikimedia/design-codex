<script setup>
import { ref } from 'vue';
import { CdxLabel, CdxTextInput } from '@wikimedia/codex';
import LabelBasic from '@/../component-demos/label/examples/LabelBasic.vue';
import LabelVisuallyHidden from '@/../component-demos/label/examples/LabelVisuallyHidden.vue';
import LabelWithDescription from '@/../component-demos/label/examples/LabelWithDescription.vue';
import LegendWithDescription from '@/../component-demos/label/examples/LegendWithDescription.vue';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'optionalFlag',
		type: 'text',
		initial: '(optional)'
	},
	{
		name: 'visuallyHidden',
		type: 'boolean'
	},
	{
		name: 'isLegend',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Label text'
	},
	{
		name: 'description',
		type: 'slot',
		default: 'Short description text'
	},
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-label v-bind="propValues">
		{{ slotValues.default }}
		<template #description>{{ slotValues.description }}</template>
	</cdx-label>
</template>
</cdx-demo-wrapper>

### Basic usage

When using the Label component with an input, make sure to add an `id` attribute to the input and
use that to set the `for` attribute on the label. These attributes will be applied on the proper
element within each component (in the example below, that's the `<label>` for the Label component,
and the `<input>` for the TextInput).

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-basic />
</template>
<template v-slot:code>

<<< @/../component-demos/label/examples/LabelBasic.vue

</template>
</cdx-demo-wrapper>

### Visually-hidden label

In rare instances, you may not need a visible label if it's very clear from context how to use an
input. To achieve this, you can use the Label component to create a semantic label for assistive
technology, but add the `visuallyHidden` prop to visually hide the label.

Note that this will hide the entire output of the component, including the description.

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-visually-hidden />
</template>
<template v-slot:code>

<<< @/../component-demos/label/examples/LabelVisuallyHidden.vue

</template>
</cdx-demo-wrapper>

### Label vs. legend

This component outputs a `<label>` element by default. When the `isLegend` prop is set to `true`,
it will instead output a `<legend>` element. Use this within a `<fieldset>` element.

There is a named slot in the Label component, `description`, for including more information about
the field. It's important to note that, when `isLegend` is true, the description will be rendered
inside the `<legend>` element to ensure it will be read by assistive technology.

Below are examples of a label and a legend with an associated description.

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-with-description />
</template>
<template v-slot:code>

<<< @/../component-demos/label/examples/LabelWithDescription.vue

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
	<legend-with-description />
</template>
<template v-slot:code>

<<< @/../component-demos/label/examples/LegendWithDescription.vue

</template>
</cdx-demo-wrapper>
