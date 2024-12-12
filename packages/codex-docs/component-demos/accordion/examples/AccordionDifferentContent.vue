<template>
	<cdx-accordion>
		<template #title>
			Accordion with an image
		</template>
		<img
			alt="mediawiki logo"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
		>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a table
		</template>
		<cdx-table
			caption="Dogs"
			:columns="columns"
			:data="data"
			:hide-caption="true"
			:use-row-headings="true"
		/>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a textarea
		</template>
		<cdx-text-area placeholder="Start typing..." />
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion, CdxTextArea, CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDifferentContent',
	components: { CdxAccordion, CdxTextArea, CdxTable },
	setup() {
		const columns = [
			{ id: 'trait', label: '' },
			{ id: 'rex', label: 'Rex' },
			{ id: 'bella', label: 'Bella' },
			{ id: 'max', label: 'Max' }
		];
		const data = [
			{ trait: 'Breed', rex: 'German Shepherd', bella: 'Golden Retriever', max: 'Bulldog' },
			{ trait: 'Age', rex: 5, bella: 3, max: 7 },
			{ trait: 'Owner', rex: 'John', bella: 'Sarah', max: 'Michael' },
			{ trait: 'Eating habits', rex: 'Healthy appetite', bella: 'Picky eater', max: 'Enjoys treats' }
		];

		return {
			columns,
			data
		};
	}
} );
</script>
