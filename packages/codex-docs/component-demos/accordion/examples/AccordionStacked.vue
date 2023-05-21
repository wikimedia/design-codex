<template>
	<cdx-accordion>
		<template #title>
			Accordion title 1
		</template>
		Accordion content 1
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion title 2
		</template>
		Accordion content 2
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion title 3
		</template>
		Accordion content 3
	</cdx-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionStacked',
	components: { CdxAccordion }
} );
</script>
