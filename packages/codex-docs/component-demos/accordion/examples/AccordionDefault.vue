<template>
	<cdx-accordion>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDefault',
	components: { CdxAccordion }
} );
</script>
