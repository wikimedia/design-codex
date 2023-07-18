<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="Lookup with placeholder"
			placeholder="Start typing a vegetable name..."
			@input="onInput"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupWithPlaceholder',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );

		/**
		 * Filter items on input.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			}
		}

		return {
			selection,
			menuItems,
			onInput
		};
	}
} );
</script>
