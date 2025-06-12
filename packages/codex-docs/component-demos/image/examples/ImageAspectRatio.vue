<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:aspect-ratio="aspectRatio"
		:object-fit="objectFit"
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
	alt: 'An example image with aspect ratio 16:9',
	width: 400,
	height: 220,
	position: 'center'
};

const aspectRatio = '3:4';
const objectFit = 'cover';

export default defineComponent( {
	name: 'ImageAspectRatio',
	components: { CdxImage },
	setup() {
		return {
			imageData,
			aspectRatio,
			objectFit
		};
	}
} );
</script>
