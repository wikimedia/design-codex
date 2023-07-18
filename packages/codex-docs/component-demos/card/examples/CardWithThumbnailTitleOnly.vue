<template>
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

const thumbnailData = {
	width: 200,
	height: 180,
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/200px-Juvenile_Ragdoll.jpg'
};

export default defineComponent( {
	name: 'CardWithThumbnailTitleOnly',
	components: { CdxCard },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
