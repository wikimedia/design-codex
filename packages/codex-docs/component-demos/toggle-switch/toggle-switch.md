<script setup>
import { ref } from 'vue';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import SingleSwitch from '@/../component-demos/toggle-switch/examples/SingleSwitch.vue';
import SingleSwitchWithLabel from '@/../component-demos/toggle-switch/examples/SingleSwitchWithLabel.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Label for ToggleSwitch'
	}
];
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="switchValue">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-docs-configurable-generic v-bind="propValues">
{{ slotValues.default }}
</cdx-docs-configurable-generic>
</template>
</cdx-demo-wrapper>

### Default

Toggle the ToggleSwitch to see the value change. Open up the console to see emitted events.

<cdx-demo-wrapper>
<template v-slot:demo>
<single-switch />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitch.vue

</template>
</cdx-demo-wrapper>

### With label

Adding content into ToggleSwitch's default slot will generate a `<label>` element associated with
the `<input>`.

<cdx-demo-wrapper>
<template v-slot:demo>
<single-switch-with-label />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitchWithLabel.vue

</template>
</cdx-demo-wrapper>
