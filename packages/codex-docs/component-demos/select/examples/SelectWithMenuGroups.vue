<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SelectWithMenuGroups',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{
					label: 'Group A',
					items: [
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2', disabled: true },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' }
					]
				},
				{
					label: 'Group B',
					items: [
						{ label: 'Five', value: '5' },
						{ label: 'Six', value: '6' },
						{ label: 'Seven', value: '7' }
					]
				}
			],
			selection: null
		};
	}
} );
</script>
