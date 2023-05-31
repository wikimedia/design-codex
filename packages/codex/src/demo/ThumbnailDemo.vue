<template>
	<section id="cdx-thumbnail">
		<h2>Thumbnail</h2>
		<cdx-thumbnail :thumbnail="thumbnailData" />

		<h3>CSS-only version</h3>
		<span class="cdx-thumbnail">
			<span
				class="cdx-thumbnail__image cdx-demo-colored-pencils"
				:style="{ backgroundImage: `url( ${thumbnailData.url } )` }"
			/>
		</span>
	</section>
</template>

<script lang="ts" setup>
import { CdxThumbnail, Thumbnail } from '../lib';
const thumbnailData: Thumbnail = {
	width: 200,
	height: 150,
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};
</script>
