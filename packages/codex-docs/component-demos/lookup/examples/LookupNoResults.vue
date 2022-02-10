<template>
	<div>
		<cdx-lookup
			v-model="selection"
			:options="menuOptions"
			@new-input="onInput"
		>
			<template v-if="noResults" #footer>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuOption } from '@wikimedia/codex';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupNoResults',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
		const menuOptions = ref<MenuOption[]>( [] );
		const noResults = ref( false );

		function onInput( value: string ) {
			if ( value ) {
				menuOptions.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
				noResults.value = menuOptions.value.length === 0;
			} else {
				noResults.value = false;
			}
		}

		return {
			selection,
			menuOptions,
			noResults,
			onInput
		};
	}
} );
</script>
