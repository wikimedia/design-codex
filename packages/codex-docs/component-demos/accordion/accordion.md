<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import AccordionDefault from '@/../component-demos/accordion/examples/AccordionDefault.vue';
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

## Overview

### When to use Accordion

Use the Accordion component when you need to organize blocks of content into sections. Avoid using an Accordion when the user needs to read the content by default. In this case, use another component or group of elements instead.

Expanded Accordion content can be as long as needed, and the type of content can vary contextually. Headings should be used to label each section of content.

### About Accordion

Accordion includes the following elements.

#### Expand icon

An arrow icon is placed next to the accordion’s label to visually indicate that the Accordion can be expanded or collapsed.

#### Label

The title or label provides a brief description of the Accordion's content. Pressing on this section expands or collapses the Accordion.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Customize the label to other styles by applying any of the existing fonts, text sizes or formats defined in our [font design tokens](../../design-tokens/font.html).

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Always make sure to emphasize the label more prominently than the expanded content.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid customizing the label color as it may lead to contrast issues with the various states of the Accordion.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid combining different text styles within the labels of the same Accordion group.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid including links in the Accordion label.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Description (optional)

A description can be included to provide more information about the title or label.

#### Action (optional)

An action (such as edit) could appear at the end of the heading section and it will affect the entire Accordion item.

#### Expanded content

The expanded content within the Accordion can include paragraph text, links, images, videos, tables, or form items. There are no restrictions on the minimum or maximum amount of content that can be included in the expanded section.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use sub-headers to represent different subsections within Accordion content.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid nesting additional Accordions within an Accordion item to create subsections.</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Basic usage

<cdx-demo-wrapper>
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

### With action button

By default, action buttons display when the Accordion is open.

<cdx-demo-wrapper>
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

<cdx-accordion>

<template #title>Developer notes</template>

To add an action button to the Accordion, pass the `actionButton` prop. The button is placed in the
top right corner of the Accordion, and it emits an event `actionButtonClicked` when clicked.

If you are displaying an action button, make sure to provide a label for this
button for accessibility purposes by using the `actionButtonLabel` prop.

</cdx-accordion>

### With always visible action

<cdx-demo-wrapper>
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

<cdx-accordion>

<template #title>Developer notes</template>

To show the icon even when the Accordion is collapsed, set the `actionAlwaysVisible` prop.

</cdx-accordion>

### With different content

The Accordion can be used with different elements, including images, tables, or form items..

<cdx-demo-wrapper>
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

### Heading levels

By default, the title of an Accordion is an `<h3>` element. You can customize the heading level if
level 3 is not appropriate for the context. You can also change the text style of the Accordion
title using Codex design tokens.

In the example below, the heading level is set to 2 and the font size is increased.

<cdx-demo-wrapper>
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

<cdx-accordion>

<template #title>Developer notes</template>

The Accordion heading can be changed to any heading level by passing the `headingLevel` prop.

</cdx-accordion>

## Technical implementation

### Vue usage

::: tip `open` Attribute supported
The Accordion component uses a HTML `<details>` element under the hood.
Adding an [`open` boolean attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open)
to this component will cause it to render in the expanded state initially. All
other behavior will be unchanged.
:::

### CSS-only version

#### Markup Structure

The CSS-only Accordion component is a `<details>` element with some custom styling.

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

#### Stacked

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

##### Open by default

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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element within the Accordion or to the next Accordion in a group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element within the Accordion or to the previous Accordion in a group. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | It expands and collapses the Accordion content. |