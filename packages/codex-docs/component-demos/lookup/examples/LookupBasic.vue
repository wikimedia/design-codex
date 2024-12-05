<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup basic demo"
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
	name: 'LookupBasic',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );

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
