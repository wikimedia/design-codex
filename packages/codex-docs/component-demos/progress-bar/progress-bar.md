<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import { CdxProgressBar } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'inline',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	}
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
<cdx-docs-configurable-generic v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Default

Default indeterminate progress bar.

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-progress-bar />
</template>

<template v-slot:code>

```vue-html
<cdx-progress-bar />
```

</template>
</cdx-demo-wrapper>

### Inline

An inline version is available for use within other components. See [Menu](./menu#pending-state) for
sample usage.

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-progress-bar :inline="true" />
</template>

<template v-slot:code>

```vue-html
<cdx-progress-bar :inline="true" />
```

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div with ARIA attributes -->
	<div class="cdx-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">
		<!-- Empty inner div -->
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<!-- Wrapper div with ARIA attributes -->
<div class="cdx-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">
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
	<div class="cdx-progress-bar cdx-progress-bar--inline" role="progressbar" aria-valuemin="0" aria-valuemax="100">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--inline" role="progressbar" aria-valuemin="0" aria-valuemax="100">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

### Disabled

For a disabled progress bar, add the `cdx-progress-bar--disabled` class to the root `<div>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-bar cdx-progress-bar--disabled" role="progressbar" aria-valuemin="0" aria-valuemax="100">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--disabled" role="progressbar" aria-valuemin="0" aria-valuemax="100">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-progress-bar cdx-progress-bar--inline cdx-progress-bar--disabled" role="progressbar" aria-valuemin="0" aria-valuemax="100">
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<template v-slot:code>

```html
<div class="cdx-progress-bar cdx-progress-bar--inline cdx-progress-bar--disabled" role="progressbar" aria-valuemin="0" aria-valuemax="100">
	<div class="cdx-progress-bar__bar" />
</div>
```

</template>
</cdx-demo-wrapper>