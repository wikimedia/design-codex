<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
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

Press the ToggleButton to see the value change. Open up the console to see emitted events.

ToggleButtons should always have a static label. This helps indicate to the user (including users
of assistive technology) what it means for the button to be on or off. If you want a button with a
label that changes when it is pressed, use the Button component instead.

<cdx-demo-wrapper>
<template v-slot:demo>
	<single-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button/examples/SingleButton.vue [NPM]

<<< @/../component-demos/toggle-button/examples-mw/SingleButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon only

When the ToggleButton includes only an icon and no text,  add an `aria-label` to the ToggleButton 
to ensure the button is understandable to those using assistive technology.

<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-only-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button/examples/IconOnlyButton.vue [NPM]

<<< @/../component-demos/toggle-button/examples-mw/IconOnlyButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

The `v-model` value will be a boolean, it is `true` if the button is currently toggled ("on")
and `false` otherwise ("off").
