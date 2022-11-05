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
