<template>
	<cdx-accordion separation="outline">
		<template #title>
			Accordion title
		</template>
		<p>
			The accordion content can be as longer as needed, and the type of content can vary
			according to the need of each use case.
		</p>
		<p>Headings should be used to label each section of content</p>
	</cdx-accordion>
	<cdx-accordion separation="outline">
		<template #title>
			This is a very long title which should be moved to the next line if there is
			not enough space
		</template>
		<p>A paragraph can be added here with a short or long informative text.</p>
		<p>
			Another paragraph can be added here with a short or long informative text.
			There is no limit to the length of the paragraphs.
		</p>
	</cdx-accordion>
	<cdx-accordion separation="outline" open>
		<template #title>
			Open by default
		</template>
		<p>This Accordion is open by default</p>
		<p>
			Simply add the "open" boolean attribute to this component to have it
			initially render in the expanded state. All other behavior is unchanged.
		</p>
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDefault',
	components: { CdxAccordion }
} );
</script>
