<template>
	<ul role="listbox">
		<cdx-menu-item
			v-bind="menuItem"
			search-query="Donaudampfschiffahrtselektrizit"
			:highlight-query="true"
			:hide-description-overflow="true"
		/>
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 2201357,
	label: 'Donaudampfschiffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft',
	url: 'https://en.wikipedia.org/wiki/Donaudampfschiffahrtselektrizit%C3%A4tenhauptbetriebswerkbauunterbeamtengesellschaft',
	description: 'Arguably the longest German word, which again, is Donaudampfschiffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft',
	id: 'menu-item-hide-overflow',
	language: {
		// Support: Firefox, which only hyphenates capitalized words when lang="de".
		label: 'de'
	}
};

export default defineComponent( {
	name: 'MenuItemHideOverflow',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
