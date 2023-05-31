<template>
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCard, Thumbnail } from '@wikimedia/codex';

const thumbnailData: Thumbnail = {
	width: 200,
	height: 150,
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

export default defineComponent( {
	name: 'CardWithThumbnail',
	components: { CdxCard },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
