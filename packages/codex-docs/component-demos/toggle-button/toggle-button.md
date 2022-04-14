<script setup>
import ConfigurableButton from '@/../component-demos/toggle-button/examples/ConfigurableButton.vue';
import IconButton from '@/../component-demos/toggle-button/examples/IconButton.vue';
import SingleButton from '@/../component-demos/toggle-button/examples/SingleButton.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'quiet',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Button text'
	}
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
<configurable-button v-bind="propValues">
{{ slotValues.default }}
</configurable-button>
</template>
</cdx-demo-wrapper>

### Default

Toggle the ToggleButton to see the value change. Open up the console to see emitted events.

<cdx-demo-wrapper>
<template v-slot:demo>
<single-button />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-button/examples/SingleButton.vue

</template>
</cdx-demo-wrapper>

### Stateful

Example usage as a pause/play button, changing the icon and text when toggled.

<cdx-demo-wrapper>
<template v-slot:demo>
<icon-button />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-button/examples/IconButton.vue

</template>
</cdx-demo-wrapper>

<style scoped>
.vp-wrapper :deep( p ) {
	margin: 0 0 16px 0;
	font-weight: bold;
}
</style>