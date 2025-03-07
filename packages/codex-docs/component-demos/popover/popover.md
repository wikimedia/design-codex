<script setup>
import { ref } from 'vue';
import { CdxPopover, CdxToggleButton } from '@wikimedia/codex';

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Popover title' },
	{ name: 'icon', type: 'icon' },
	{ name: 'useCloseButton', type: 'boolean' },
	{
		name: 'placement',
		type: 'select',
		menuItems: [
			{ value: 'bottom' },
			{ value: 'bottom-start' },
			{ value: 'bottom-end' },
			{ value: 'top' },
			{ value: 'top-start' },
			{ value: 'top-end' },
			{ value: 'right' },
			{ value: 'right-start' },
			{ value: 'right-end' },
			{ value: 'left' },
			{ value: 'left-start' },
			{ value: 'left-end' }
		]
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Popover body content.'
	},
];

const showPopover = ref( false );
const anchorElement = ref( null );
</script>

<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-toggle-button v-model="showPopover" ref="anchorElement">
	Open Popover
</cdx-toggle-button>
<cdx-popover
	v-model:open="showPopover"
	render-in-place
	v-bind="propValues"
	:anchor="anchorElement"
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
