<script setup>
import BasicTabs from '@/../component-demos/tabs/examples/BasicTabs.vue';
import ManyTabs from '@/../component-demos/tabs/examples/ManyTabs.vue';
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

Two stylistic variants are available, quiet (the default) and framed.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<basic-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/BasicTabs.vue

</template>
</cdx-demo-wrapper>

### Header row scroll

When the width of the header row exceeds the width of its container, arrow buttons will appear to
enable scrolling through tab names.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<many-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/ManyTabs.vue

</template>
</cdx-demo-wrapper>

### Dynamic replacement of slot content

The Tabs component will re-render if the provided slot content changes.
Clicking the button below will replace the initial tabs with a new set;
the header row will update to match.

<cdx-demo-wrapper>
<template v-slot:demo="{ propValues }">
<dynamically-generated-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
// Override Vitepress styles.
// TODO: remove this once T296106 is complete.
.cdx-demo-wrapper {
	:deep( ul ) {
		list-style: none;
	}

	:deep( li + li ) {
		margin-top: 0;
	}

	:deep( h2 ) {
		margin: 0 0 24px;
		border-top: none;
		border-bottom: solid 1px #c8ccd1;
		padding-bottom: 4px;
	}

	:deep( h3 ) {
		margin-top: 0;
	}
}
</style>
