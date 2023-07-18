<template>
	<cdx-thumbnail :thumbnail="null" :placeholder-icon="cdxIconArticle" />
</template>

<script>
import { defineComponent } from 'vue';
import { CdxThumbnail } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ThumbnailCustomIcon',
	components: { CdxThumbnail },
	setup() {
		return {
			cdxIconArticle
		};
	}
} );
</script>
