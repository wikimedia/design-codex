<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import AccordionDefault from '@/../component-demos/accordion/examples/AccordionDefault.vue';
import AccordionDescription from '@/../component-demos/accordion/examples/AccordionDescription.vue';
import AccordionStacked from '@/../component-demos/accordion/examples/AccordionStacked.vue';
import AccordionActionButton from '@/../component-demos/accordion/examples/AccordionActionButton.vue';
import AccordionDifferentContent from '@/../component-demos/accordion/examples/AccordionDifferentContent.vue';
import AccordionActionVisible from '@/../component-demos/accordion/examples/AccordionActionVisible.vue';
import AccordionHeadings from '@/../component-demos/accordion/examples/AccordionHeadings.vue';

const controlsConfig = [
	{
		name: 'default',
		type: 'slot',
		default: 'The default slot is the content of the accordion'
	},
	{
		name: 'description',
		type: 'slot',
		default: ''
	},
	{
		name: 'title',
		type: 'slot',
		default: 'Customizable accordion component title'
	},
	{
		name: 'actionIcon',
		type: 'icon'
	},
	{
		name: 'actionAlwaysVisible',
		type: 'boolean',
	}
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-accordion v-bind="propValues">
		{{ slotValues.default }}
		<template v-if="slotValues.title" #title>
			{{ slotValues.title }}
		</template>
		<template v-if="slotValues.description" #description>
			{{ slotValues.description }}
		</template>
	</cdx-accordion>
</template>
</cdx-demo-wrapper>

### Default

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-default />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionDefault.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With description

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-description />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionDescription.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Stacked

It's possible to stack accordions by adding them next to each other in the markup.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-stacked />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionStacked.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionStacked.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With action button

To add an action button to the accordion, pass the `actionButton` prop. The button is placed in the
top right corner of the accordion, and it emits an event `actionButtonClicked` when clicked.

::: tip
If you are displaying an action button, make sure to provide a label for this
button for accessibility purposes by using the `actionButtonLabel` prop.
:::


<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-action-button />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionActionButton.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionActionButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With always visible action

To show the icon even when the accordion is collapsed, set the `actionAlwaysVisible` prop.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-action-visible />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionActionVisible.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionActionVisible.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With different content

The accordion can be used with different elements, including images or tables.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-different-content />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionDifferentContent.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionDifferentContent.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With different heading levels

The accordion heading can be changed to any heading level by passing the `headingLevel` prop.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<accordion-headings />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/accordion/examples/AccordionHeadings.vue [NPM]

<<< @/../component-demos/accordion/examples-mw/AccordionHeadings.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>