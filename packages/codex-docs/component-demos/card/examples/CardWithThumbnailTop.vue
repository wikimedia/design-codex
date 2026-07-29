<template>
	<cdx-card :thumbnail="thumbnailData" thumbnail-position="block-start">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Felis_margarita_harrisoni_-_Sandkatze.jpg/1280px-Felis_margarita_harrisoni_-_Sandkatze.jpg'
};

export default defineComponent( {
	name: 'CardWithThumbnailTop',
	components: { CdxCard },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
