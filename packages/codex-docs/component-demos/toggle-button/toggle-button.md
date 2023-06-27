<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import IconButton from '@/../component-demos/toggle-button/examples/IconButton.vue';
import IconOnlyButton from '@/../component-demos/toggle-button/examples/IconOnlyButton.vue';
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

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="buttonValue">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-docs-configurable-generic v-bind="propValues">
{{ slotValues.default }}
</cdx-docs-configurable-generic>
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

### Stateful (icon-only)
Example usage as an icon-only pause/play button, changing the icon when toggled.

<cdx-demo-wrapper>
<template v-slot:demo>
<icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-button/examples/IconOnlyButton.vue

</template>
</cdx-demo-wrapper>
