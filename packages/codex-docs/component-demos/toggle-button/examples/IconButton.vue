<template>
	<div>
		<cdx-toggle-button
			v-model="buttonValue"
		>
			<cdx-icon :icon="buttonIcon" />
			{{ buttonText }}
		</cdx-toggle-button>
	</div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPause, cdxIconPlay } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		// Pause/play menu - button not active means currently paused
		const buttonIcon = computed( () => {
			if ( buttonValue.value ) {
				// Currently playing
				return cdxIconPause;
			}
			return cdxIconPlay;
		} );
		const buttonText = computed( () => {
			if ( buttonValue.value ) {
				// Currently playing
				return 'Pause';
			}
			return 'Play';
		} );

		return {
			buttonValue,
			buttonIcon,
			buttonText
		};
	}
} );
</script>
