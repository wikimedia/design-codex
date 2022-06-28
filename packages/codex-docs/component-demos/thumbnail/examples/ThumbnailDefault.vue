<template>
	<cdx-thumbnail :thumbnail="thumbnailData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxThumbnail, Thumbnail } from '@wikimedia/codex';

const thumbnailData: Thumbnail = {
	width: 200,
	height: 150,
	url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
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
