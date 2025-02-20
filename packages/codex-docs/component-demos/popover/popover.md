<script setup>
import { ref } from 'vue';
import { CdxPopover, CdxToggleButton } from '@wikimedia/codex';

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Popover title' },
	{ name: 'icon', type: 'icon' },
	{ name: 'useCloseButton', type: 'boolean' },
	{
		name: 'default',
		type: 'slot',
		default: 'Popover body content.'
	},
];

const showPopover = ref( false );
</script>

<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-toggle-button v-model="showPopover">
	Open Popover
</cdx-toggle-button>
<cdx-popover
	v-model:open="showPopover"
	render-in-place
	v-bind="propValues"
>
	<template #default>
		{{ slotValues.default }}
	</template>
</cdx-popover>
</template>
</cdx-demo-wrapper>

## Overview

## Examples

## Technical implementation

### Vue usage
