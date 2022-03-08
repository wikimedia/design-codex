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

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPause, cdxIconPlay, Icon } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		// Pause/play menu - button not active means currently paused
		const buttonIcon = computed( (): Icon => {
			if ( buttonValue.value ) {
				// Currently playing
				return cdxIconPause;
			}
			return cdxIconPlay;
		} );
		const buttonText = computed( (): string => {
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
