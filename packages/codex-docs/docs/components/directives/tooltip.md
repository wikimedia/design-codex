---
outline: [ 2, 3 ]
---

<script setup>
import TooltipConfigurable from '@/../component-demos/tooltip/examples/TooltipConfigurable.vue';
import TooltipBasic from '@/../component-demos/tooltip/examples/TooltipBasic.vue';
import TooltipPosition from '@/../component-demos/tooltip/examples/TooltipPosition.vue';

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

Apply the custom tooltip directive, `v-tooltip` to a component or native HTML element.
When you hover over the component or element, the tooltip displays additional information.

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

### Custom position

The default placement of the tooltip is the `bottom` position.
Specify the tooltip's placement by using arguments in your directive like `v-tooltip:top`.
The `top` argument specifies to position the tooltip on top of the reference element.

The tooltip can be positioned to these values:
- `bottom`, `bottom-start`, `bottom-end`
- `top`, `top-start`, `top-end`
- `right`, `right-start`, `right-end`
- `left`, `left-start`, `left-end`

<cdx-demo-wrapper>
<template v-slot:demo>
	<tooltip-position />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tooltip/examples/TooltipPosition.vue [NPM]

<<< @/../component-demos/tooltip/examples-mw/TooltipPosition.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

## Vue Usage