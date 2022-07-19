<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButtonGroup, ButtonGroupItem } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconArrowPrevious, cdxIconTrash } from '@wikimedia/codex-icons';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'ButtonGroupWithIcons',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 'edit', label: 'Edit', icon: cdxIconEdit },
			{ value: 'talk', label: 'Discuss', icon: cdxIconSpeechBubble },
			{ value: 'save', label: 'Done', icon: cdxIconCheck, disabled: true },
			{ value: 'back', label: 'Go back', icon: cdxIconArrowPrevious, disabled: true },
			{ value: 'delete', label: 'Delete', icon: cdxIconTrash }
		];

		const onClick = getEventLogger<string|number>( 'click' );

		return {
			buttons,
			onClick
		};
	}
} );
</script>
