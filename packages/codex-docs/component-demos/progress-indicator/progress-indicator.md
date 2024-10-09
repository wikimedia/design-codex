<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import { CdxProgressIndicator } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'showLabel',
		type: 'boolean',
		initial: false
	},
	{
		name: 'default',
		type: 'slot',
		initial: 'ProgressIndicator label'
	}
];
</script>

A ProgressIndicator is a visual element used to indicate the ongoing, indefinite progress of an
action or process.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-progress-indicator v-bind="propValues">
		{{ slotValues.default }}
	</cdx-progress-indicator>

</template>
</cdx-demo-wrapper>

## Overview

### When to use ProgressIndicator

ProgressIndicator animates continuously to indicate that an action or content loading is in
progress, helping users understand when the system is actively working on a task with unknown
completion time.

**Use ProgressIndicator when:**
- Indicating asynchronous processes with an unknown completion time.
- Displaying inline with text to represent ongoing background processes.
- Loading section-level content where preserving layout isn't essential.
- Providing immediate feedback for user-initiated actions.
- Offering a compact, animated visual cue to indicate ongoing activity.

**Avoid using ProgressIndicator when:**
- Loading states need to maintain content layout. In such cases, use an inline
  [ProgressBar](./progress-bar.md) instead.

[//]: # (TODO: Add back when Skeleton is available: Multiple items are loading simultaneously in a list or grid - use a skeleton instead.)


### About ProgressIndicator

ProgressIndicator includes the following elements.

#### Spinner indicator
A rotating element that represents an ongoing process or loading state. It helps users understand
that an action is in progress.

<cdx-demo-best-practices>
	<cdx-demo-best-practice type="do">Use for indeterminate, short-duration processes.
	</cdx-demo-best-practice>
	<cdx-demo-best-practice type="dont">Don't modify the spinner's color or size.
	</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Label (optional)
A brief message providing additional context about the loading process, such as a description of
the action being performed or an estimated wait time.
<cdx-demo-best-practices>
	<cdx-demo-best-practice type="do">Include a label when additional clarification is needed for
	the loading context.</cdx-demo-best-practice>
	<cdx-demo-best-practice type="dont">Don't use lengthy or unclear loading messages.
	</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Basic usage
By default, the spinner appears without text, serving as a simple visual indicator of a loading
process.

<cdx-demo-best-practices>
	<cdx-demo-best-practice type="do">Center the spinner in its loading area.
	</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-progress-indicator>
		ProgressIndicator label
	</cdx-progress-indicator>
</template>

<template v-slot:code>

```vue-html
<cdx-progress-indicator>
	ProgressIndicator label
</cdx-progress-indicator>
```

</template>
</cdx-demo-wrapper>

::: warning
ProgressIndicator require one of the following: Label via default slot
or set the `aria-hidden` attribute.

When either is set the ProgressIndicator is understandable to assistive
technology users.
:::

### With label
A spinner can be accompanied by text in cases where additional context is needed to clarify the
loading process.

<cdx-demo-best-practices>
	<cdx-demo-best-practice type="do">Use clear, concise text to describe the loading process.
	</cdx-demo-best-practice>
	<cdx-demo-best-practice type="dont">Don't use long or multi-line text.</cdx-demo-best-practice>
	<cdx-demo-best-practice type="dont">Don't add ellipsis (…) to loading text - the spinner
	already communicates the ongoing process.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-progress-indicator show-label>
		ProgressIndicator label
	</cdx-progress-indicator>
</template>

<template v-slot:code>

```vue-html
<cdx-progress-indicator show-label>
	ProgressIndicator label
</cdx-progress-indicator>
```

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

The most common usage of ProgressIndicators is without a label. In the CSS-only version, there
is a small deviation from the Vue version. The `aria-label` attribute is used to provide a
description of the progress indicator to assistive technologies – instead of a label element to
ensure leaner markup.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-indicator">
		<div class="cdx-progress-indicator__indicator">
			<progress class="cdx-progress-indicator__indicator__progress" aria-label="ProgressIndicator label"></progress>
		</div>
	</div>
</template>

<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-progress-indicator">
	<!-- The animated element itself. -->
	<div class="cdx-progress-indicator__indicator">
		<!-- The `<progress>` element itself, visually hidden, with ARIA label. -->
		<progress class="cdx-progress-indicator__indicator__progress" aria-label="ProgressIndicator label"></progress>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With visible label

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-indicator">
		<div class="cdx-progress-indicator__indicator">
			<progress class="cdx-progress-indicator__indicator__progress" id="cdx-demo-progress-indicator-0"></progress>
		</div>
		<div class="cdx-label cdx-progress-indicator__label">
			<label class="cdx-label__label" for="cdx-demo-progress-indicator-0">
				<span class="cdx-label__label__text">ProgressIndicator label</span>
			</label>
		</div>
	</div>
</template>

<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-progress-indicator">
	<!-- The animated element itself. -->
	<div class="cdx-progress-indicator__indicator">
		<!-- The `<progress>` element itself, visually hidden, with `id` to connect with label. -->
		<progress class="cdx-progress-indicator__indicator__progress" id="cdx-demo-progress-indicator-0"></progress>
	</div>
	<!-- Label wrapper `<div>` element. -->
	<div class="cdx-label cdx-progress-indicator__label">
		<!-- Actual `<label>` element with `for` attribute to establish connection. -->
		<label class="cdx-label__label" for="cdx-demo-progress-indicator-0">
			<span class="cdx-label__label__text">ProgressIndicator label</span>
		</label>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>


<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	// Center ProgressIndicator in demos.
	:deep( .cdx-demo-wrapper__demo-pane__demo ) {
		display: flex;
		justify-content: center;
	}
}
</style>