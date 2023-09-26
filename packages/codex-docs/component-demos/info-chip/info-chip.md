<script setup>
import ChipWithIcon from '@/../component-demos/info-chip/examples/ChipWithIcon.vue';
import ChipWithLongText from '@/../component-demos/info-chip/examples/ChipWithLongText.vue';
import { CdxInfoChip } from '@wikimedia/codex';

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
	<cdx-info-chip v-bind="propValues">
		{{ slotValues.default }}
	</cdx-info-chip>
</template>

</cdx-demo-wrapper>

#### Default, with icon
Custom icons can only be used with the `notice` status. If they are passed with a different status, they will be ignored.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chip-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/info-chip/examples/ChipWithIcon.vue [NPM]

<<< @/../component-demos/info-chip/examples-mw/ChipWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Long Text
It is generally best practice to use short text with the InfoChip. Long text content will be truncated with an ellipsis and lines will not be wrapped.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chip-with-long-text />
</template>
</cdx-demo-wrapper>

## Vue usage
