<template>
	<div class="cdx-docs-card-group">
		<p>Nearby Pages</p>
		<div class="cdx-docs-card-group__cards">
			<cdx-card
				v-for="card in cards"
				:key="card.pageid"
				class="cdx-docs-card-group__card"
				:url="card.url"
				:force-thumbnail="true"
				:thumbnail="card.thumbnail"
			>
				<template #title>
					{{ card.title }}
				</template>
				<template #description>
					{{ card.description }}
				</template>
				<template #supporting-text>
					<cdx-icon :icon="cdxIconMapPin" size="small" /> Distance: {{ card.distance }}
				</template>
			</cdx-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard, CdxIcon } from '@wikimedia/codex';
import { cdxIconMapPin } from '@wikimedia/codex-icons';

// Simulation of results from a MediaWiki API.
const cards = [
	{
		pageid: 3613583,
		url: 'https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area',
		title: 'Golden Gate National Recreation Area',
		description: 'U.S. National Recreation Area surrounding San Francisco Bay Area',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg'
		},
		distance: '170m'
	},
	{
		pageid: 176931,
		url: 'https://en.wikipedia.org/wiki/Internet_Archive',
		title: 'Internet Archive',
		description: 'American non-profit organization providing archives of digital media since 1996',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png'
		},
		distance: '300m'
	},
	{
		pageid: 11002203,
		url: 'https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music',
		title: 'Green Apple Books & Music',
		description: 'Bookstore in San Francisco',
		distance: '350m'
	},
	{
		pageid: 6761105,
		url: 'https://en.wikipedia.org/wiki/Mountain_Lake_Park',
		title: 'Mountain Lake Park',
		description: 'Park in San Francisco, California',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mountain_Lake_%28468742548%29.jpg/150px-Mountain_Lake_%28468742548%29.jpg'
		},
		distance: '570m'
	}
];

export default defineComponent( {
	name: 'CardGroupWithThumbnails',
	components: { CdxCard, CdxIcon },
	setup() {
		return {
			cards,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-card-group {
	// The application implementing Cards must handle Card group layout styles.
	&__cards {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-100;
	}

	&__card {
		flex-basis: calc( 50% - @spacing-50 );
		box-sizing: @box-sizing-base;
	}

	p {
		margin-top: 0;
		font-weight: @font-weight-bold;
	}
}
</style>
