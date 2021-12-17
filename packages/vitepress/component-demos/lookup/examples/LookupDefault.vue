<template>
	<div>
		<p>The current value is: {{ selection }}</p>

		<CdxLookup
			v-model="selection"
			:options="menuOptions"
			@update:input-value="onInput"
		/>
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

		function onInput( value: string ) {
			if ( value ) {
				menuOptions.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			}
		}

		return {
			selection,
			menuOptions,
			onInput
		};
	}
} );
</script>
