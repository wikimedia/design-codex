<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import { CdxProgressBar } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'inline',
		type: 'boolean'
	},
	{
		name: 'aria-label',
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

## Guidelines

### Using progress bars
Use a ProgressBar when you want to provide real-time feedback on the progress of
ongoing operations, such as file uploads or form submissions.

If the progress of a task is not crucial to user understanding or if the task is
expected to complete quickly, avoid using a ProgressBar.

![Example of Codex ProgressBar.](../../assets/components/progress-bar-using.svg)

### Specifications

![Specification of ProgressBar.](../../assets/components/progress-bar-specifications.svg)

Progress bars include the following elements:
1. **Progress bar**<br>Visual representation of the progress displayed as a filled blue bar.
2. **Bar container**<br>White container that holds the progress bar.

### Types
There are different types of progress bars, depending on your intended use.

#### Default progress bar
Elevated progress bar to indicate that the ongoing system process will affect an
entire view or page area.

![A ProgressBar displayed on top of a Wikipedia article page.](../../assets/components/progress-bar-types-base.svg)

#### Inline progress bar
An inline and smaller version of the progress bar is available to indicate
progress within other components, such as [Menu](./menu.md) or
[Dialog](./dialog.md).

![An inline ProgressBar displayed within a dialog.](../../assets/components/progress-bar-types-inline.svg)

### Interaction states
Indeterminate progress bars are always in motion and cannot be in an empty, completed,
or disabled state.

![Active state of the indeterminate ProgressBar in constant motion.](../../assets/components/progress-bar-interaction-states.svg)

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<cdx-docs-configurable-generic v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Default

Default indeterminate progress bar.

::: warning
Due to the lack of descriptive text, default progress bars require one of the
following attributes: `aria-label` or `aria-hidden`.

The attribute `aria-label` has to be used on progress bars to be understandable
by assistive technology users. Exceptions are inline progress bars in component
combinations, e.g. in the [Menu component](./menu.md), that are skipped by
adding `aria-hidden`.
:::

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

## Vue usage

## CSS-only version

### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div with ARIA attributes -->
	<div class="cdx-progress-bar" role="progressbar" aria-label="ProgressBar example">
		<!-- Empty inner div -->
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<!-- Wrapper div with ARIA attributes -->
<div class="cdx-progress-bar" role="progressbar" aria-label="ProgressBar example">
	<!-- Empty inner div -->
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

### Inline

For an inline progress bar, add the `cdx-progress-bar--inline` class to the root `<div>`.

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

### Disabled

For a disabled progress bar, add the `cdx-progress-bar--disabled` class to the root `<div>`.

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