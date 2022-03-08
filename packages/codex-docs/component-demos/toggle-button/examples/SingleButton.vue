<template>
	<div>
		<p class="cdx-docs-demo-text">
			Toggle button value: {{ buttonValue }}
		</p>
		<cdx-toggle-button
			v-model="buttonValue"
			@update:model-value="onUpdate"
		>
			Button label
		</cdx-toggle-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleButton',
	components: { CdxToggleButton },
	setup() {
		const buttonValue = ref( false );

		const onUpdate = ( value: boolean ) => {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event: ' + value );
		};

		return {
			buttonValue,
			onUpdate
		};
	}
} );
</script>
