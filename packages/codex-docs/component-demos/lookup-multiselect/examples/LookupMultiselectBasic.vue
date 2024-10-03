<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-lookup-multiselect
			v-model:input-chips="chips"
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="LookupMultiselect basic demo"
			@input="onInput"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup-multiselect>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookupMultiselect } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'LookupMultiselectBasic',
	components: {
		CdxLookupMultiselect
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			} else {
				menuItems.value = [];
			}
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
