<script setup>
import { ref } from 'vue';
import ConfigurableSwitch from '@/../component-demos/toggle-switch/examples/ConfigurableSwitch.vue';
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

<Wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
<template v-if="slotValues.default.length > 0">
<ConfigurableSwitch v-bind="propValues">
{{ slotValues.default }}
</ConfigurableSwitch>
</template>
<template v-else>
<ConfigurableSwitch v-bind="propValues" />
</template>
</template>
</Wrapper>

### Default

Toggle the ToggleSwitch to see the value change. Open up the console to see emitted events.

<Wrapper>
<template v-slot:demo>
<SingleSwitch />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitch.vue

</template>
</Wrapper>

### With label

Adding content into ToggleSwitch's default slot will generate a `<label>` element associated with
the `<input>`.

<Wrapper>
<template v-slot:demo>
<SingleSwitchWithLabel />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitchWithLabel.vue

</template>
</Wrapper>
