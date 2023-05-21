<template>
	<cdx-accordion heading-level="h2">
		<template #title>
			Accordion heading h2
		</template>
		Accordion content 1
	</cdx-accordion>
	<cdx-accordion heading-level="h4">
		<template #title>
			Accordion heading h4
		</template>
		Accordion content 2
	</cdx-accordion>
	<cdx-accordion heading-level="h5">
		<template #title>
			Accordion heading h5
		</template>
		Accordion content 3
	</cdx-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionHeadings',
	components: { CdxAccordion }
} );
</script>
