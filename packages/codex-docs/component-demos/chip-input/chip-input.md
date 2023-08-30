<script setup>
import { ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
import ChipInputConfigurable from '@/../component-demos/chip-input/examples/ChipInputConfigurable.vue';
import ChipInputBasic from '@/../component-demos/chip-input/examples/ChipInputBasic.vue';
import ChipInputWithIcons from '@/../component-demos/chip-input/examples/ChipInputWithIcons.vue';
import ChipInputWithPlaceholder from '@/../component-demos/chip-input/examples/ChipInputWithPlaceholder.vue';
import ChipInputDisabled from '@/../component-demos/chip-input/examples/ChipInputDisabled.vue';

const controlsConfig = [
	{
		name: 'removeButtonLabel',
		type: 'text',
		default: 'Remove'
	},
	{
		name: 'separateInput',
		type: 'boolean'
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
	<chip-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic Usage

Pass an array of chip data to the input using `v-model:input-chips`. When the user adds or
removes a chip, the array will automatically be updated.

Text for the `aria-label` of each chip's "remove" button is a required prop.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputBasic.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

Chips added by the user cannot be added with icons, but icons can be included in chips
provided by the parent component.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-with-icons />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputWithIcons.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With placeholder

Placeholder and other attributes of the `<input>` element can be bound to the ChipInput
component and will be passed down to the `<input>` element within.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-with-placeholder />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputWithPlaceholder.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputWithPlaceholder.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Disabled

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-disabled />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputDisabled.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputDisabled.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>
