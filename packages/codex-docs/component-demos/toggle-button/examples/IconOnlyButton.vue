<template>
	<div>
		<cdx-toggle-button
			v-model="buttonValue"
		>
			<cdx-icon :icon="buttonIcon" :icon-label="iconLabel" />
		</cdx-toggle-button>
	</div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPause, cdxIconPlay } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		// Pause/play menu - button not toggled on means currently paused.
		const buttonIcon = computed( () => {
			if ( buttonValue.value ) {
				// Currently playing.
				return cdxIconPause;
			}
			return cdxIconPlay;
		} );
		const iconLabel = computed( () => {
			if ( buttonValue.value ) {
				// Currently playing
				return 'Pause';
			}
			return 'Play';
		} );

		return {
			buttonValue,
			buttonIcon,
			iconLabel
		};
	}
} );
</script>
