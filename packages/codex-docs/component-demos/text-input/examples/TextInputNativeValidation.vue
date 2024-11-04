<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			ref="textInput"
			v-model="inputValue"
			input-type="email"
			@blur="onBlur"
			@invalid="onInvalid"
			@input="onInput"
		/>
		<template #label>
			Email
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputNativeValidation',
	components: { CdxTextInput, CdxField },
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the number input.
		 */
		function onBlur() {
			textInput.value.checkValidity();
		}

		/**
		 * When the input is found to be invalid, set the Field status to error
		 * and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value = { error: event.target.validationMessage };
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value = null;
		}

		return {
			textInput,
			inputValue,
			status,
			messages,
			onBlur,
			onInvalid,
			onInput
		};
	}
} );
</script>
