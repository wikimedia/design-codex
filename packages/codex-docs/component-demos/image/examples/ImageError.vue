<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxImage } from '@wikimedia/codex';

const imageData = {
	url: 'https://invalid-url.example.com/nonexistent-image.jpg',
	alt: 'This is an example of an image error state',
	width: 400,
	height: 220
};

export default defineComponent( {
	name: 'ImageError',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
