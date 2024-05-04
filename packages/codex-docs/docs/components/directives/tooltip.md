---
outline: [ 2, 3 ]
---

<script setup>
import TooltipConfigurable from '@/../component-demos/tooltip/examples/TooltipConfigurable.vue';
import TooltipBasic from '@/../component-demos/tooltip/examples/TooltipBasic.vue';

const controlsConfig = [
	{
		name: 'position',
		type: 'radio',
		options: [
			'bottom',
			'top',
			'left',
			'right'
		]
	},
	{
		name: 'textContent',
		type: 'text',
		initial: 'Tooltip text'
	}
];

</script>

# Tooltip

## Guidelines

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<tooltip-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>


### Basic Example

<cdx-demo-wrapper>
<template v-slot:demo>
	<tooltip-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tooltip/examples/TooltipBasic.vue [NPM]

<<< @/../component-demos/tooltip/examples-mw/TooltipBasic.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>


## Vue Usage