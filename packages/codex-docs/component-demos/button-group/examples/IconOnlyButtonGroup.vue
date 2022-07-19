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
	name: 'IconOnlyButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 'edit', label: null, icon: cdxIconEdit, ariaLabel: 'Edit' },
			{ value: 'talk', label: null, icon: cdxIconSpeechBubble, ariaLabel: 'Discuss' },
			{ value: 'save', label: null, icon: cdxIconCheck, ariaLabel: 'Done', disabled: true },
			{ value: 'back', label: null, icon: cdxIconArrowPrevious, ariaLabel: 'Go back', disabled: true },
			{ value: 'delete', label: null, icon: cdxIconTrash, ariaLabel: 'Delete' }
		];

		const onClick = getEventLogger<string|number>( 'click' );

		return {
			buttons,
			onClick
		};
	}
} );
</script>
