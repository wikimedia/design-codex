<script setup>
import BasicTabs from '@/../component-demos/tabs/examples/BasicTabs.vue';
import DynamicallyGeneratedTabs from '@/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue';

const controlsConfig = [
	{
		name: 'framed',
		type: 'boolean'
	}
];
</script>

## Demos
### Basic Example

Two styles are available, framed and frameless.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<basic-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/BasicTabs.vue

</template>
</cdx-demo-wrapper>

### Dynamic replacement of slot content

The Tabs component will re-render if the provided slot content changes.
Clicking the button below will replace the initial tabs with a new set;
the header row will update to match.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<dynamically-generated-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue

</template>
</cdx-demo-wrapper>