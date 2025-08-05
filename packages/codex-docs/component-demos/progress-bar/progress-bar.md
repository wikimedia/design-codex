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
		name: 'disabled',
		type: 'boolean'
	}
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

Use a ProgressBar when you want to provide real-time feedback on the progress of
ongoing operations, such as file uploads or form submissions. There are different types of ProgressBars, depending on your intended use.

1. **Default ProgressBar** indicates that the ongoing system process will affect an
entire view or page area.
2. **Inline ProgressBar** is available to indicate progress within other components, such as [Menu](./menu.md) or
[Dialog](./dialog.md).

Avoid using a ProgressBar if the progress of a task is not crucial to user understanding or if the task is expected to complete quickly.

### About ProgressBar

ProgressBar includes the following elements.

#### Progress element

Visual representation of the progress displayed as a filled blue bar.

#### Bar container

Background container that holds the progress bar.

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

::: warning
Due to the lack of descriptive text, a default ProgressBar requires one of the
following attributes: `aria-label` or `aria-hidden`.

The `aria-label` attribute must be applied to the ProgressBar to ensure it is accessible to assistive technology users. An exception is an inline ProgressBar used within another component,
such as the [Menu component](./menu.md), where they are excluded from the accessibility tree by
adding `aria-hidden` attribute.
:::

### Inline

An inline version is available for use within other components. See
[Menu](./menu#pending-state) for sample usage.

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
