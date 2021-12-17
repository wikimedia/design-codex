<template>
	<div>
		<CdxLookup
			v-model="selection"
			:options="menuOptions"
			@update:input-value="onInput"
		>
			<template v-if="noResults" #footer>
				No results found.
			</template>
		</CdxLookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup } from 'vue-components/src/lib';
import { MenuOption } from 'vue-components/src/types';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupDefault',
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
