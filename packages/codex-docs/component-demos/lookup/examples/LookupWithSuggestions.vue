<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup with suggested items demo"
			@input="onInput"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupWithSuggestions',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		// Set up a group of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );

		const menuConfig = {
			boldLabel: true
		};

		/**
		 * Filter items on input.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				// When the input is cleared, show the suggestions again.
				menuItems.value = initialMenuItems;
			}
		}

		return {
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
