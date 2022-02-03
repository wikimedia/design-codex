<template>
	<div>
		<cdx-lookup
			v-model="selection"
			:options="menuOptions"
			:clearable="true"
			:start-icon="cdxIconSearch"
			@new-input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuOption } from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupClearableStartIcon',
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
			onInput,
			cdxIconSearch
		};
	}
} );
</script>
