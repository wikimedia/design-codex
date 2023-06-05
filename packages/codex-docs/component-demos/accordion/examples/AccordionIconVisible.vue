<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-button-label="Edit"
		icon-always-visible
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconDie"
		action-button-label="Random"
		icon-always-visible
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconBell"
		action-button-label="Notifications"
		icon-always-visible
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
import { cdxIconDie, cdxIconBell, cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'AccordionIconVisible',
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
			cdxIconDie,
			cdxIconBell,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
