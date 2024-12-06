<template>
	<cdx-checkbox v-model="checkboxValue" @update:model-value="onUpdate">
		Send password reset emails only when both email address and username are provided.
		<template #description>
			This improves privacy and helps prevent unsolicited emails.
		</template>
	</cdx-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxWithDescription',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkboxValue,
			onUpdate
		};
	}
} );
</script>
