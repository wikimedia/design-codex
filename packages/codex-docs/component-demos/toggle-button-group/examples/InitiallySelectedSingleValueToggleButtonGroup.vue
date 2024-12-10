<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';
import {
	cdxIconImageLayoutBasic,
	cdxIconImageLayoutFrame,
	cdxIconImageLayoutFrameless,
	cdxIconImageLayoutThumbnail
} from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'InitiallySelectedSingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'basic', label: 'Basic', icon: cdxIconImageLayoutBasic },
			{ value: 'framed', label: 'Framed', icon: cdxIconImageLayoutFrame },
			{ value: 'frameless', label: 'Frameless', icon: cdxIconImageLayoutFrameless },
			{ value: 'thumbnail', label: 'Thumbnail', icon: cdxIconImageLayoutThumbnail }
		];

		// Initially select the 'Framed' button
		const selectedValue = ref( 'framed' );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
