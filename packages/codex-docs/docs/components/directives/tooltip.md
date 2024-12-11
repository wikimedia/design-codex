---
outline: [ 2, 3 ]
---

<script setup>
import TooltipConfigurable from '@/../component-demos/tooltip/examples/TooltipConfigurable.vue';
import TooltipBasic from '@/../component-demos/tooltip/examples/TooltipBasic.vue';
import TooltipPlacement from '@/../component-demos/tooltip/examples/TooltipPlacement.vue';

const controlsConfig = [
	{
		name: 'placement',
		type: 'select',
		menuItems: [
			{ value: 'bottom' },
			{ value: 'bottom-start' },
			{ value: 'bottom-end' },
			{ value: 'top' },
			{ value: 'top-start' },
			{ value: 'top-end' },
			{ value: 'right' },
			{ value: 'right-start' },
			{ value: 'right-end' },
			{ value: 'left' },
			{ value: 'left-start' },
			{ value: 'left-end' }
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

A Tooltip is a brief message that shows up when a user hovers over a specific
part of the user interface, providing additional information.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<tooltip-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use Tooltip

Use the Tooltip component to add a small piece of information to its associated
element. Tooltips can be used to explain the meaning or purpose of interface
elements like icons and buttons where the initial element might not be clear, or
to show the full version of truncated text where space is not available.

### About Tooltip

The Tooltip will be shown on hover or focus of its trigger. On touchable
screens, the Tooltip can be shown by long pressing on the trigger. By default,
the Tooltip appears beneath its trigger, but automatically moves based on the
placement of the trigger and the edge of the viewport.

The Tooltip component is purely informational and includes text-only content.

<cdx-demo-best-practices>

<cdx-demo-best-practice>
	Use punctuation for more than one sentence.
</cdx-demo-best-practice>

<cdx-demo-best-practice type="dont">
	Don't provide significant details or information in Tooltips, such as errors —
	Tooltips can be easily overlooked.
</cdx-demo-best-practice>

<cdx-demo-best-practice type="dont">
	Don't include interactive elements like links or buttons within a Tooltip.
</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Basic usage

Apply a Tooltip to a component or native HTML element. When you hover over the component or element, the Tooltip displays additional information.

:::tip
Tooltip is implemented as a custom Vue directive, `v-tooltip` that can be directly applied to a component or HTML element.
:::

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

### Custom placement

The default placement of the Tooltip is `bottom`. Specify the placement by using an argument in your
directive like `v-tooltip:top`. The `top` argument places the Tooltip on top of the reference
element.

The Tooltip can appear in the following places:
- `bottom`, `bottom-start`, `bottom-end`
- `top`, `top-start`, `top-end`
- `right`, `right-start`, `right-end`
- `left`, `left-start`, `left-end`

<cdx-demo-wrapper>
<template v-slot:demo>
	<tooltip-placement />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tooltip/examples/TooltipPlacement.vue [NPM]

<<< @/../component-demos/tooltip/examples-mw/TooltipPlacement.vue [MediaWiki]

:::

</template>

</cdx-demo-wrapper>

## Technical implementation

### Vue Usage

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
to the outermost element of that component's own template. The Tooltip directive will
function as expected when used with the `CdxButton` component (because the outermost
element of that component is a `<button>` element), but it will *not* behave correctly
when used with the `CdxTextInput` component (which has a `<div>` as the outermost element).

Future Codex releases may update components like `CdxTextInput` so that the
tooltip functionality is built-in. See the Vue docs about custom directives for more
information about how to work with custom directives.
:::

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Esc</kbd> | Dismisses the Tooltip. |