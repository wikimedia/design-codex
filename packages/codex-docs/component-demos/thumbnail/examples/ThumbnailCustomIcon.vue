<template>
	<cdx-thumbnail :thumbnail="null" :placeholder-icon="cdxIconArticle" />
</template>

<script lang="ts">
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
