<template>
	<div class="cdx-docs-card-group-with-divider">
		<h4>Changes to review</h4>
		<p>Help keep Wikipedia reliable by selecting an edit and reviewing the change.</p>
		<div>
			<cdx-card
				v-for="card in cards"
				:key="card.pageid"
				separation="divider"
			>
				<template #title>
					{{ card.title }}
				</template>
				<template #description>
					{{ card.description }}
				</template>
				<template #supporting-text>
					<a href="#">{{ card.username }}</a>
				</template>
			</cdx-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

// Simulation of results from a MediaWiki API.
const cards = [
	{
		pageid: 10001,
		title: 'Bath University Boat Club',
		description: '+1,548 – added years of birth and death at short description',
		username: 'Username1'
	},
	{
		pageid: 10002,
		title: 'List of extinct bird species since 1500',
		description: '-70 – Remove PROD, was previously PRODed in edit at 18:00, 12 December 2008 and later removed',
		username: 'Username2'
	},
	{
		pageid: 10003,
		title: 'Wem Delvoyee',
		description: '+48 – Added source about birth',
		username: 'Username3'
	},
	{
		pageid: 10004,
		title: '2018 Offaly Senior Hurling Championship',
		description: '+1,234 – No edit summary',
		username: 'Username4'
	}
];

export default defineComponent( {
	name: 'CardGroupWithDivider',
	components: { CdxCard },
	setup() {
		return {
			cards,
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-card-group-with-divider {
	h4 {
		margin: 0;
	}
}
</style>
