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

A tooltip is a small, informative text that appears when a user hovers over a user interface element.

## Guidelines

### When to use tooltips

Use the Tooltip component to add a small piece of information to its associated
element. Tooltips can be used to explain the meaning or purpose of interface
elements like icons and buttons, or to show the full version of truncated text. 

### Specifications

![Specification of Tooltip](../../assets/components/tooltip-specifications.svg)

1. **Content** <br>
Tooltip content

### Component limitations

The maximum width for the Tooltip is set at `@size-1600` (256px).

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

The Tooltip component is implemented as a Vue.js
[custom directive](https://vuejs.org/guide/reusability/custom-directives.html#custom-directives). 
This means that rather than existing as a stand-alone component, it can be added
to any component or markup element inside of a Vue.js template.

To use the Tooltip, register it under the `directives` property instead of the `components`
property:

```js{7-9}
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MyComponent',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
```

In the example above, a directive registered under the name `tooltip` can be used
in templates as `v-tooltip`.

If the Tooltip directive is needed across multiple components, consider registering
it globally when the Vue app is mounted:

```js{6}
import { createApp } from 'vue';
import MyApp from './App.vue';
import { CdxTooltip } from '@wikimedia/codex';

const app = createApp( App )
    .directive( 'tooltip', CdxTooltip )
	.mount( '#my-app' );
```

::: warning Not directly usable on all components
Vue directives work best when they are applied directly on HTML elements inside
another component's template, like `<button>` or `<input>`.

A directive can also be used on another Vue component, but it will always be applied
to the outermost element of that component's own template. The tooltip directive will
function as expected when used with the `CdxButton` component (because the outermost
element of that component is a `<button>` element), but it will *not* behave correctly
when used with the `CdxTextInput` component (which has a `<div>` as the outermost element).

Future Codex releases may update components like `CdxTextInput` so that the
tooltip functionality is built-in. See the Vue docs about custom directives for more
information about how to work with custom directives.
:::