<script setup>
import { ref } from 'vue';
import { CdxFilterChipInput } from '@wikimedia/codex';
import FilterChipInputConfigurable from '@/../component-demos/filter-chip-input/examples/FilterChipInputConfigurable.vue';
import FilterChipInputBasic from '@/../component-demos/filter-chip-input/examples/FilterChipInputBasic.vue';
import FilterChipInputWithIcons from '@/../component-demos/filter-chip-input/examples/FilterChipInputWithIcons.vue';
import FilterChipInputWithPlaceholder from '@/../component-demos/filter-chip-input/examples/FilterChipInputWithPlaceholder.vue';
import FilterChipInputDisabled from '@/../component-demos/filter-chip-input/examples/FilterChipInputDisabled.vue';

const controlsConfig = [
	{
		name: 'removeButtonLabel',
		type: 'text',
		default: 'Remove'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	}
];
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<filter-chip-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic Usage

Pass an array of filter chip data to the input using `v-model:input-chips`. When the user adds or
removes a filter chip, the array will automatically be updated.

Text for the `aria-label` of each filter chip's "remove" button is a required prop.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-input-basic />
</template>

<template v-slot:code>

<<< @/../component-demos/filter-chip-input/examples/FilterChipInputBasic.vue

</template>
</cdx-demo-wrapper>

### With icons

Filter chips added by the user cannot be added with icons, but icons can be included in filters
provided by the parent component.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-input-with-icons />
</template>
<template v-slot:code>

<<< @/../component-demos/filter-chip-input/examples/FilterChipInputWithIcons.vue

</template>
</cdx-demo-wrapper>

### With placeholder

Placeholder and other attributes of the `<input>` element can be bound to the FilterChipInput
component and will be passed down to the `<input>` element within.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-input-with-placeholder />
</template>
<template v-slot:code>

<<< @/../component-demos/filter-chip-input/examples/FilterChipInputWithPlaceholder.vue

</template>
</cdx-demo-wrapper>

### Disabled

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-input-disabled />
</template>
<template v-slot:code>

<<< @/../component-demos/filter-chip-input/examples/FilterChipInputDisabled.vue

</template>
</cdx-demo-wrapper>
