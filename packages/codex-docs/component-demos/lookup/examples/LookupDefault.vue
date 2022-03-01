<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-lookup
			v-model="selection"
			:options="menuOptions"
			@new-input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuOption } from '@wikimedia/codex';
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
