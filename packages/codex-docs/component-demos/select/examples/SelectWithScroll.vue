<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		default-label="Choose an option"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';
export default defineComponent( {
	name: 'SelectWithScroll',
	components: { CdxSelect },
	data() {
		return {
			menuConfig: {
				visibleItemLimit: 6
			},
			menuItems: [
				{ label: 'One', value: '1' },
				{ label: 'Two', value: '2' },
				{ label: 'Three', value: '3' },
				{ label: 'Four', value: '4' },
				{ label: 'Five', value: '5' },
				{ label: 'Six', value: '6' },
				{ label: 'Seven', value: '7' },
				{ label: 'Eight', value: '8' },
				{ label: 'Nine', value: '9' },
				{ label: 'Ten', value: '10' },
				{ label: 'Eleven', value: '11' },
				{ label: 'Twelve', value: '12' }
			],
			selection: null
		};
	}
} );
</script>
