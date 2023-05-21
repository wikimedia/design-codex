<template>
	<cdx-accordion disabled>
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
	name: 'AccordionDisabled',
	components: { CdxAccordion }
} );
</script>
