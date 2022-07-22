<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
	<p>
		Selected value:
		{{ selectedValue ?? '(null)' }}
	</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup, ButtonGroupItem } from '@wikimedia/codex';
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
		const buttons: ButtonGroupItem[] = [
			{ value: 'basic', label: 'Basic', icon: cdxIconImageLayoutBasic },
			{ value: 'framed', label: 'Framed', icon: cdxIconImageLayoutFrame },
			{ value: 'frameless', label: 'Frameless', icon: cdxIconImageLayoutFrameless },
			{ value: 'thumbnail', label: 'Thumbnail', icon: cdxIconImageLayoutThumbnail, disabled: true }
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
