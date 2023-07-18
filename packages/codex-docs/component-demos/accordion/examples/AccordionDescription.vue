<template>
	<cdx-accordion>
		<template #title>
			Accordion title
		</template>
		<template #description>
			This is a description for the accordion
		</template>
		<p>
			The accordion content can be as longer as needed, and the type of content can vary
			according to the need of each use case.
		</p>
		<p>Headings should be used to label each section of content</p>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			This is a very long title which should be moved to the next line if there is not
			enough space
		</template>
		<template #description>
			The description can be a very long and sometimes it is needed to wrap it to the next
			line
		</template>
		<p>A paragraph can be added here with a short or long informative text.</p>
		<p>
			Another paragraph can be added here with a short or long informative text.
			There is no limit to the length of the paragraphs.
		</p>
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDescription',
	components: { CdxAccordion }
} );
</script>
