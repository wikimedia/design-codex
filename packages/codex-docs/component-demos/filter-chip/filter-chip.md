<script setup>
import { ref } from 'vue';
import { CdxFilterChip } from '@wikimedia/codex';
import FilterChipConfigurable from '@/../component-demos/filter-chip/examples/FilterChipConfigurable.vue';
import FilterChipBasic from '@/../component-demos/filter-chip/examples/FilterChipBasic.vue';
import FilterChipWithIcon from '@/../component-demos/filter-chip/examples/FilterChipWithIcon.vue';

const controlsConfig = [
	{
		name: 'removeButtonLabel',
		type: 'text',
		default: 'Remove'
	},
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Filter chip text'
	}
];
</script>

:::tip
The FilterChip component can be used by itself or within a [FilterChipInput](./filter-chip-input.md).
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<filter-chip-configurable v-bind="propValues">
		{{ slotValues.default }}
	</filter-chip-configurable>
</template>
</cdx-demo-wrapper>

### Basic usage

The parent component must handle removing the chip when the `remove-chip` event is emitted.

Since the "remove" button is icon-only, label text must be provided for the `aria-label` attribute
of the button. There is no default value for this visually-hidden label, which is required for
accessibility purposes.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/filter-chip/examples/FilterChipBasic.vue [NPM]

<<< @/../component-demos/filter-chip/examples-mw/FilterChipBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icon

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<filter-chip-with-icon />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/filter-chip/examples/FilterChipWithIcon.vue [NPM]

<<< @/../component-demos/filter-chip/examples-mw/FilterChipWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>
