<template>
	<cdx-select
		v-model:selected="selection"
		:default-icon="cdxIconLogoWikimedia"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		default-label="Select a Wikimedia project"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';
import { cdxIconLogoWikimedia, cdxIconLogoWikimediaCommons, cdxIconLogoWikipedia, cdxIconLogoWiktionary } from '@wikimedia/codex-icons';

const menuItems = [
	{
		value: 'commons',
		label: 'Wikimedia Commons',
		description: 'Freely usable media files',
		icon: cdxIconLogoWikimediaCommons
	},
	{
		value: 'wikipedia',
		label: 'Wikipedia',
		description: 'The free encyclopedia',
		icon: cdxIconLogoWikipedia
	},
	{
		value: 'wiktionary',
		label: 'Wiktionary',
		description: 'The free dictionary',
		icon: cdxIconLogoWiktionary
	}
];

export default defineComponent( {
	name: 'SelectWithIcons',
	components: { CdxSelect },
	data() {
		return {
			menuItems,
			selection: null,
			menuConfig: {
				boldLabel: true,
				hideDescriptionOverflow: true
			},
			cdxIconLogoWikimedia
		};
	}
} );
</script>
