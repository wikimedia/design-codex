<template>
	<div>
		<cdx-toggle-button v-model="isExpanded">
			{{ isExpanded ? 'Accordion is Open' : 'Accordion is Closed' }}
		</cdx-toggle-button>

		<br><br>

		<cdx-accordion v-model="isExpanded">
			<template #title>
				Accordion controlled using v-model
			</template>

			Accordion content
		</cdx-accordion>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxAccordion, CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionProgrammaticControl',
	components: {
		CdxAccordion,
		CdxToggleButton
	},

	setup() {
		const isExpanded = ref( false );

		return {
			isExpanded
		};
	}
} );
</script>
