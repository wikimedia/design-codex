<template>
	<section id="cdx-image">
		<h2>Image</h2>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<h3>Default Image</h3>
			<cdx-image
				:src="imageData.url"
				:alt="imageData.alt"
				:width="imageData.width"
				:height="imageData.height"
			/>
		</div>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<h3>Broken Image</h3>
			<cdx-image
				src="invalid_url.jpg"
				alt="This image failed to load."
				:width="400"
				:height="220"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxImage } from '../lib';

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park',
	width: 400,
	height: 220
};
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-flex-container {
	gap: @spacing-100;
}

</style>
