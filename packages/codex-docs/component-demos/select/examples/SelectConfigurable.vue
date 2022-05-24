<template>
	<cdx-select
		v-model:selected="selection"
		v-bind="selectProps"
		:menu-items="menuItems"
	/>
</template>

<script lang="ts">
import {
	ref,
	defineComponent,
	computed
} from 'vue';
import { CdxSelect, MenuItemData } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock, cdxIconSearch } from '@wikimedia/codex-icons';

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
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		defaultLabel: {
			type: String,
			default: ''
		}
	},
	setup( props ) {

		const selection = ref<string|number|null>( null );
		const selectProps = computed( () => ( {
			defaultIcon: props.defaultIcon ? cdxIconSearch : undefined,
			disabled: props.disabled,
			defaultLabel: props.defaultLabel
		} ) );

		return {
			selection,
			menuItems,
			selectProps
		};
	}
} );
</script>
