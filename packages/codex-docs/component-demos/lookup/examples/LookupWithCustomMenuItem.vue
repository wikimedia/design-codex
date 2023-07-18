<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="Lookup component with custom MenuItem demo"
			@input="onInput"
		>
			<template #menu-item="{ menuItem }">
				<strong>{{ menuItem.label }}</strong> (value: {{ menuItem.value }})
			</template>
		</cdx-lookup>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupCustomMenuItem',
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
