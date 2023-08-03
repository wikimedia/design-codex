<template>
	<ul role="listbox">
		<cdx-menu-item
			v-bind="menuItem"
			search-query="Donaudampfschiffahrtselektrizit"
			:highlight-query="true"
		/>
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

// See https://phabricator.wikimedia.org/T280982.
const menuItem = {
	value: 2201357,
	label: 'Donaudampfschiffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft',
	url: 'https://en.wikipedia.org/wiki/Donaudampfschiffahrtselektrizit%C3%A4tenhauptbetriebswerkbauunterbeamtengesellschaft',
	description: 'Arguably the longest German word',
	id: 'menu-item-long-text'
};

export default defineComponent( {
	name: 'MenuItemLongText',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
