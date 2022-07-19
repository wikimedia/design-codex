<template>
	<cdx-button-group
		:buttons="buttons"
		:disabled="true"
		@click="onClick"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButtonGroup, ButtonGroupItem } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'DisabledButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four', disabled: true },
			{ value: 5, label: 'Five' }
		];

		const onClick = getEventLogger<string|number>( 'click' );

		return {
			buttons,
			onClick
		};
	}
} );
</script>
