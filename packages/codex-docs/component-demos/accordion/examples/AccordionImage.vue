<template>
	<cdx-accordion>
		<template #title>
			Accordion with image
		</template>
		<img
			alt="mediawiki logo"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
		>
	</cdx-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionImage',
	components: { CdxAccordion }
} );
</script>
