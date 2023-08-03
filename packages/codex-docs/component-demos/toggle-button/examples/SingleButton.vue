<template>
	<div>
		<p class="cdx-docs-demo-text">
			Toggle button value: {{ buttonValue }}
		</p>
		<cdx-toggle-button
			v-model="buttonValue"
			@update:model-value="onUpdate"
		>
			<cdx-icon :icon="cdxIconPlay" />
			Play
		</cdx-toggle-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPlay } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'SingleButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttonValue,
			onUpdate,
			cdxIconPlay
		};
	}
} );
</script>
