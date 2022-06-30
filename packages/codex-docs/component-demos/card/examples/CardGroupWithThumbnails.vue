<template>
	<div class="cdx-docs-card-group-with-thumbnails">
		<p>Nearby Pages</p>
		<cdx-card
			v-for="card in cards"
			:key="card.pageid"
			class="cdx-docs-card-group-with-thumbnails__card"
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
				<cdx-icon :icon="cdxIconMapPin" /> Distance: {{ card.distance }}
			</template>
		</cdx-card>
	</div>
</template>

<script lang="ts">
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
			width: 150,
			height: 113,
			url: '//upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg'
		},
		distance: '170m'
	},
	{
		pageid: 176931,
		url: 'https://en.wikipedia.org/wiki/Internet_Archive',
		title: 'Internet Archive',
		description: 'American non-profit organization providing archives of digital media since 1996',
		thumbnail: {
			width: 150,
			height: 146,
			url: '//upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png'
		},
		distance: '300m'
	},
	{
		pageid: 11002203,
		url: 'https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music',
		title: 'Green Apple Books & Music',
		description: 'Bookstore in San Francisco',
		distance: '350m'
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
.cdx-docs-card-group-with-thumbnails {
	p {
		margin-top: 0;
		font-weight: bold;
	}

	// The application implementing Cards must handle Card group layout styles.
	&__card {
		margin-bottom: 16px;

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
