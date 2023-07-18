<template>
	<cdx-thumbnail :thumbnail="thumbnailData" />
</template>

<script>
import { defineComponent } from 'vue';
import { CdxThumbnail } from '@wikimedia/codex';

const thumbnailData = {
	width: 200,
	height: 150,
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

export default defineComponent( {
	name: 'ThumbnailDefault',
	components: { CdxThumbnail },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
