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

An Accordion is an expandable and collapsible section of content, often featured
in a vertically stacked list with other Accordions. Accordions are commonly used
to organize content into collapsed sections, making the interface easier to
navigate.

## Guidelines

### Using accordions

Use the Accordion component when you need to organize blocks of content into sections. Avoid using an accordion component when the user needs to read the content by default. In this case, use another component or group of elements instead.

Expanded accordion content can be as long as needed, and the type of content can vary contextually. Headings should be used to label each section of content.

### Specifications

![Specification of Accordion.](../../assets/components/accordion-specifications.svg)

Accordion includes the following items:
1. **Arrow**<br>An arrow icon is placed next to the accordion’s label to visually indicate that the accordion can be expanded or collapsed.
2. **Label**<br>The title or label provides a brief description of the accordion's content. Clicking on this section expands or collapses the accordion.
3. **Description** (optional)<br>A subtle text could optimally appear to provide more information about the title or label.
4. **Action** (optional)<br>
An action (such as edit) could optionally appear at the end of the heading section and it will affect the entire accordion item.
5. **Accordion’s content**<br>When the accordion is expanded, its content becomes visible, and the arrow icon rotates to show the expanded state.

The accordion's label and description have no minimum or maximum length restrictions. However, shorter labels are encouraged, as additional information about the label can be included in a description below.

#### Label style
By default, the label text style is set to the base font in bold. However, it can be easily customized to other styles by applying any of the existing fonts, text sizes or formats defined in our [font design tokens](https://doc.wikimedia.org/codex/latest/design-tokens/font.html).

Always make sure to emphasize the label more prominently than the expanded content.

![Different font styles of labeling for accordions.](../../assets/components/accordion-specifications-label.svg)

#### Expanded content
The content within the accordion can include paragraph text, menu items, links, images, videos, tables, or form items. There are no restrictions on the minimum or maximum amount of content that can be included in the expanded section.

![Different types of expanded content within an accordion.](../../assets/components/accordion-specifications-content.svg)

#### Scroll
If the accordion's content exceeds the viewport height, the entire accordion will be vertically scrolled. There will be no scrolling within the expanded content of the accordion.

![Scrolling accordion with three accordion items.](../../assets/components/accordion-specifications-scroll.svg)

Refer to the [Accordion component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10016-92440&mode=design&t=2O0ceqiRfqCtnidq-11).

### Interaction states
Accordions are divided into collapsed and expanded states as follows:

![Interaction states of Accordion for both collapsed and expanded: default, hover, active and focus.](../../assets/components/accordion-interaction-states.svg)

1. Default collapsed
2. Hover collapsed
3. Active collapsed
4. Focus collapsed
5. Default expanded
6. Hover expanded
7. Active expanded
8. Focus expanded

### Best practices

Consider the following recommendations when using accordions.

#### Usage

<cdx-demo-rules>

<template #do-media>

![A screenshot of two accordions with an InfoChip adjacent to their labels.](../../assets/components/accordion-practices-usage-do.svg)

</template>

<template #do-text>

- Use InfoChip next to the label to provide additional information.

</template>

<template #dont-media>

![A screenshot of two accordions: one with a warning icon and the other with an InfoChip.](../../assets/components/accordion-practices-usage-dont.svg)

</template>

<template #dont-text>

- Mix different elements within the accordions of the same group.

</template>

</cdx-demo-rules>

#### Label

<cdx-demo-rules>

<template #do-media>

![A screenshot of an Accordion group with customized label styles.](../../assets/components/accordion-best-practices-label-do.svg)

</template>

<template #do-text>

- Customize the label style if needed in your project.
- Ensure that the label is emphasized more prominently than the expanded content.

</template>

<template #dont-media>

![A screenshot of an Accordion group with customized label colors.](../../assets/components/accordion-best-practices-label-dont.svg)

</template>

<template #dont-text>

- Customize the label color as it may lead to contrast issues with the various states of the Accordion.
- Combine different text styles within the labels of the same accordion group.
- Include links in the accordion label.

</template>

</cdx-demo-rules>

#### Expand icon

<cdx-demo-rules>

<template #do-media>

![A screenshot displaying an Accordion group using the icons ‘expand’ and ‘collapse’.](../../assets/components/accordion-best-practices-expand-do.svg)

</template>

<template #do-text>

- Use the ‘expand’ icon when the accordion is collapsed and the ‘collapse’ one when it's expanded.

</template>

<template #dont-media>

![A screenshot displaying an Accordion group using the icons ‘add’ and ‘substract’.](../../assets/components/accordion-best-practices-expand-dont.svg)

</template>

<template #dont-text>

- Replace the predefined collapse and expand icons with other icons.

</template>

</cdx-demo-rules>

#### Expanded content

<cdx-demo-rules>

<template #do-media>

![A screenshot displaying an Accordion group with one accordion expanded, containing an image and a set of paragraphs.](../../assets/components/accordion-best-practices-content-do.svg)

</template>

<template #do-text>

- Include paragraph text, menu items, links, images, videos, tables, or form items within the accordion content.
- Use sub-headers to represent different subsections within an accordion item.

</template>

<template #dont-media>

![A screenshot displaying an Accordion group with one accordion expanded, containing other nested accordions.](../../assets/components/accordion-best-practices-content-dont.svg)

</template>

<template #dont-text>

- Nest additional accordions within an accordion item to create subsections. If you need to represent different subsections within an accordion item, use sub-headers instead.

</template>

</cdx-demo-rules>

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

<cdx-demo-wrapper :force-controls="true" :allow-table-styles="true">
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

## Vue usage

::: tip `open` Attribute supported
The Accordion component uses a HTML `<details>` element under the hood.
Adding an [`open` boolean attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open)
to this component will cause it to render in the expanded state initially. All
other behavior will be unchanged.
:::
## CSS-only version

### Markup Structure

The CSS-only Accordion component is just a `<details>` element with some custom styling.

<cdx-demo-wrapper>
<template v-slot:demo>
	<details class="cdx-accordion">
		<summary>
			<h3 class="cdx-accordion__header">
				<span class="cdx-accordion__header__title">
					CSS-only Accordion Title
				</span>
				<span class="cdx-accordion__header__description">
					CSS-only Accordion Description
				</span>
			</h3>
		</summary>
		<div class="cdx-accordion__content">
			<p>Lorem ipsum dolor sic amet...</p>
		</div>
	</details>
</template>

<template v-slot:code>

```html
<details class="cdx-accordion">
	<!-- The <summary> element must be the first child, and is required -->
	<summary>
		<!-- <summary> should contain a header; can be any heading level -->
		<h3 class="cdx-accordion__header">
		<!-- If using only a title, no <span> tags are required here;
		however, if you want a title and a description to appear on
		separate lines, you should wrap them in spans as below and
		use the appropriate class names -->
			<span class="cdx-accordion__header__title">
				CSS-only Accordion Title
			</span>
			<span class="cdx-accordion__header__description">
				CSS-only Accordion Description
			</span>
		</h3>
	</summary>
	<!-- The <details> element will treat all other children besides
	<summary> as collapsible content; it is recommended to wrap
	this content in a div with the .cdx-accordion__content class
	to get content which is aligned with the heading above. -->
	<div class="cdx-accordion__content">
		<p>Lorem ipsum dolor sic amet...</p>
	</div>
</details>
```

</template>

</cdx-demo-wrapper>

### Stacked

As with the Vue version, multiple Accordion components can be stacked.

<cdx-demo-wrapper>
<template v-slot:demo>
	<details class="cdx-accordion">
		<summary>
			<h3 class="cdx-accordion__header">
				<span class="cdx-accordion__header__title">
					Accordion 1
				</span>
			</h3>
		</summary>
		<div class="cdx-accordion__content">
			<p>Lorem ipsum dolor sic amet...</p>
		</div>
	</details>
	<details class="cdx-accordion">
		<summary>
			<h3 class="cdx-accordion__header">
				<span class="cdx-accordion__header__title">
					Accordion 2
				</span>
			</h3>
		</summary>
		<div class="cdx-accordion__content">
			<p>Lorem ipsum dolor sic amet...</p>
		</div>
	</details>
	<details class="cdx-accordion">
		<summary>
			<h3 class="cdx-accordion__header">
				<span class="cdx-accordion__header__title">
					Accordion 3
				</span>
			</h3>
		</summary>
		<div class="cdx-accordion__content">
			<p>Lorem ipsum dolor sic amet...</p>
		</div>
	</details>
</template>

<template v-slot:code>

```html
<details class="cdx-accordion">
	<summary>
		<h3 class="cdx-accordion__header">
			<span class="cdx-accordion__header__title">
				Accordion 1
			</span>
		</h3>
	</summary>
	<div class="cdx-accordion__content">
		<p>Lorem ipsum dolor sic amet...</p>
	</div>
</details>
<details class="cdx-accordion">
	<summary>
		<h3 class="cdx-accordion__header">
			<span class="cdx-accordion__header__title">
				Accordion 2
			</span>
		</h3>
	</summary>
	<div class="cdx-accordion__content">
		<p>Lorem ipsum dolor sic amet...</p>
	</div>
</details>
<details class="cdx-accordion">
	<summary>
		<h3 class="cdx-accordion__header">
			<span class="cdx-accordion__header__title">
				Accordion 2
			</span>
		</h3>
	</summary>
	<div class="cdx-accordion__content">
		<p>Lorem ipsum dolor sic amet...</p>
	</div>
</details>
```

</template>

</cdx-demo-wrapper>

#### Open by default

As with the Vue version, the Accordion component can default to the expanded
state by using the boolean `open` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
	<details class="cdx-accordion" open>
		<summary>
			<h3 class="cdx-accordion__header">
				<span class="cdx-accordion__header__title">
					Open by default
				</span>
				<span class="cdx-accordion__header__description">
					This Accordion component is open by default
				</span>
			</h3>
		</summary>
		<div class="cdx-accordion__content">
			<p>Lorem ipsum dolor sic amet...</p>
		</div>
	</details>
</template>

<template v-slot:code>

```html
<details class="cdx-accordion" open>
	<summary>
		<h3 class="cdx-accordion__header">
			<span class="cdx-accordion__header__title">
				CSS-only Accordion Title
			</span>
			<span class="cdx-accordion__header__description">
				CSS-only Accordion Description
			</span>
		</h3>
	</summary>
	<div class="cdx-accordion__content">
		<p>Lorem ipsum dolor sic amet...</p>
	</div>
</details>
```

</template>

</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	// Ensure the demo with an image as Accordion content doesn't overflow the container.
	:deep( img ) {
		max-width: @size-full;
	}
}
</style>
