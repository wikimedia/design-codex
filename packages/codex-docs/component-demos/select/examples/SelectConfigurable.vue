<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		:default-icon="defaultIcon"
		:default-label="defaultLabel"
		:disabled="disabled"
	/>
</template>

<script lang="ts">
import {
	PropType,
	ref,
	defineComponent
} from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import { CdxSelect, MenuItemData } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const menuItems: MenuItemData[] = [
	{
		value: 'camera',
		label: 'Camera',
		description: 'optical device for recording or transmitting photographic images or videos',
		icon: cdxIconCamera
	},
	{
		value: 'book',
		label: 'Book',
		description: 'written text that can be published in printed or electronic form',
		icon: cdxIconBook
	},
	{
		value: 'clock',
		label: 'Clock',
		description: 'instrument that measures the passage of time',
		icon: cdxIconClock
	}
];

export default defineComponent( {
	name: 'SelectConfigurable',
	components: { CdxSelect },
	props: {
		defaultIcon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},
		defaultLabel: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const selection = ref<string|number|null>( null );

		return {
			selection,
			menuItems
		};
	}
} );
</script>
