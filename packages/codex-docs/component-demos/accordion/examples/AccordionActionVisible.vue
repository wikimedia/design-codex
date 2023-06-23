<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<br>
	<p v-if="showHandleButtonClickResult">
		Action button clicked
	</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'AccordionActionVisible',
	components: { CdxAccordion },
	setup() {
		const showHandleButtonClickResult = ref( false );
		const handleButtonClick = () => {
			showHandleButtonClickResult.value = true;
			setTimeout( () => {
				showHandleButtonClickResult.value = false;
			}, 2000 );
		};

		return {
			cdxIconEdit,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
