<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxImage } from '@wikimedia/codex';

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park',
	width: 400,
	height: 220
};

export default defineComponent( {
	name: 'ImageDefault',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
