<template>
	<div>
		<cdx-toggle-button
			v-model="buttonValue"
			aria-label="Play"
		>
			<cdx-icon :icon="cdxIconPlay" />
		</cdx-toggle-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPlay } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		return {
			buttonValue,
			cdxIconPlay
		};
	}
} );
</script>
