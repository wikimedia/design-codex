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
	url: '',
	alt: 'This is an example of an image placeholder',
	width: 400,
	height: 220,
	position: 'center'
};

export default defineComponent( {
	name: 'ImagePlaceholder',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
