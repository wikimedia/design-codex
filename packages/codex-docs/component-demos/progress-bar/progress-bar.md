<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import { CdxProgressBar } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'inline',
		type: 'boolean'
	},
	{
		name: 'ariaLabel',
		type: 'text',
		initial: 'ProgressBar example'
	},
	{
		name: 'value',
		type: 'number',
		initial: null
	},
	{
		name: 'startLabel',
		type: 'text',
		initial: ''
	},
	{
		name: 'endLabel',
		type: 'text',
		initial: ''
	},
	{
		name: 'max',
		type: 'number',
		initial: 100
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
];
</script>

A ProgressBar is a visual element used to indicate the progress of an action or process.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<cdx-docs-configurable-generic v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use ProgressBar

Use a ProgressBar when you want to provide real-time feedback on the progress of ongoing operations (such as file uploads or form submissions), or when you or when you want to show progress toward a known result. There are different types of ProgressBars, depending on your intended use.

1. **Indeterminate ProgressBar (default)**<br>Use this variant to show that an operation is in progress when the amount of progress can’t be measured (for example, loading or processing with an unknown duration). This variation indicates that the ongoing system process will affect an entire view or area.
  - **Inline** is available to indicate progress within other components, such as [Menu](./menu.md) or
[Dialog](./dialog.md).
2. **Determinate ProgressBar**<br>Use this variant when progress is measurable and can be represented against a known total (for example, completion percentage or progress toward a goal).

Avoid using a ProgressBar if the progress of a task is not crucial to user understanding or if the task is expected to complete quickly.

### About ProgressBar

ProgressBar includes the following elements.

#### Progress element

Visual representation of the progress displayed as a filled bar.

#### Bar container

Container that holds the progress bar, showing the extent of the progress.

#### Label

The determinate ProgressBar can include optional labels at both sides of the bar container.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use a contextual label that describes what the progress represents.</cdx-demo-best-practice>
<cdx-demo-best-practice>Place the counter progress at the end of the ProgressBar</cdx-demo-best-practice>
<cdx-demo-best-practice>Format progress values as X / Y, where the first number represents the current progress and the second number represents the total or goal. Use a forward slash ( / ) to minimize translation needs and maintain consistency across languages.</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Basic usage

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-progress-bar aria-label="Indeterminate progress bar" />
</template>

<template v-slot:code>

```vue-html
<cdx-progress-bar aria-label="Indeterminate progress bar" />
```

</template>

</cdx-demo-wrapper>

### Determinate with labels

Labels can be added at either end of the bar using the `startLabel` and `endLabel` props. This is useful for showing numeric indicators such as “0 / 100%” or other contextual information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-progress-bar
		aria-label="Progress bar with labels"
		:value="25"
		start-label="0%"
		end-label="25%"
	/>
</template>

<template v-slot:code>

```vue-html
<cdx-progress-bar
	aria-label="Progress bar with labels"
	:value="25"
	start-label="0%"
	end-label="25%"
/>
```

</template>

</cdx-demo-wrapper>

::: warning
Due to the lack of descriptive text, a default ProgressBar requires one of the
following attributes: `aria-label` or `aria-hidden`.

The `aria-label` attribute must be applied to the ProgressBar to ensure it is accessible to assistive technology users. An exception is an inline ProgressBar used within another component,
such as the [Menu component](./menu.md), where they are excluded from the accessibility tree by
adding `aria-hidden` attribute.
:::

### Inline

An inline version is available for use within other components. Refer to [Menu](./menu#pending-state) for sample usage.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-progress-bar :inline="true" aria-label="ProgressBar example" />
</template>

<template v-slot:code>

```vue-html
<cdx-progress-bar :inline="true" />
```

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper `<div>` element with ARIA attributes. -->
	<div class="cdx-progress-bar" role="progressbar" aria-label="ProgressBar example">
		<!-- Empty inner `<div>`. -->
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<!-- Wrapper `<div>` element with ARIA attributes. -->
<div class="cdx-progress-bar" role="progressbar" aria-label="ProgressBar example">
	<!-- Empty inner `<div>`. -->
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

#### Inline

For an inline ProgressBar, add the `cdx-progress-bar--inline` class to the root `<div>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-bar cdx-progress-bar--inline" role="progressbar">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--inline" role="progressbar">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

#### Disabled

For a disabled ProgressBar, add the `cdx-progress-bar--disabled` class to the root `<div>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-bar cdx-progress-bar--disabled" role="progressbar">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--disabled" role="progressbar">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-bar cdx-progress-bar--inline cdx-progress-bar--disabled" role="progressbar">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--inline cdx-progress-bar--disabled" role="progressbar">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

#### Determinate

For a determinate ProgressBar, add the `cdx-progress-bar--determinate` class to the root `<div>` and set the CSS variables `--cdx-progress-value` and `--cdx-progress-max` in the style tag.

<cdx-demo-wrapper>
<template v-slot:demo>
<div
	class="cdx-progress-bar cdx-progress-bar--block"
	role="progressbar"
	aria-label="Loading progress"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow="40"
	style="--cdx-progress-value: 40; --cdx-progress-max: 100;"
>
	<div class="cdx-progress-bar__bar cdx-progress-bar__bar--determinate"></div>
</div>
</template>

<template v-slot:code>

```html
<div
	class="cdx-progress-bar cdx-progress-bar--block"
	role="progressbar"
	aria-label="Loading progress"
	style="--cdx-progress-value: 40; --cdx-progress-max: 100;"
>
	<div class="cdx-progress-bar__bar cdx-progress-bar__bar--determinate"></div>
</div>
```

</template>
</cdx-demo-wrapper>
