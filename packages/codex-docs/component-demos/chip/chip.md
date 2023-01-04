<script setup>
import ChipWithIcon from '@/../component-demos/chip/examples/ChipWithIcon.vue';
import ChipWithLongText from '@/../component-demos/chip/examples/ChipWithLongText.vue';
import { CdxChip } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'notice', 'warning', 'error', 'success' ],
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Info Chip'
	}
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">

<template v-slot:demo="{ propValues, slotValues }" :show-generated-code="true">
<cdx-chip v-bind="propValues">
	{{ slotValues.default }}
</cdx-chip>
</template>

</cdx-demo-wrapper>

#### Default, with icon
Custom icons can only be used with the `notice` status. If they are passed with a different status, they will be ignored.

<cdx-demo-wrapper>
<template v-slot:demo>
<chip-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/chip/examples/ChipWithIcon.vue

</template>
</cdx-demo-wrapper>

#### Long Text
It is generally best practice to use short text with the InfoChip. If long text is used, it will be truncated with ellipsis. 

<cdx-demo-wrapper>
<template v-slot:demo>
<chip-with-long-text />
</template>
</cdx-demo-wrapper>