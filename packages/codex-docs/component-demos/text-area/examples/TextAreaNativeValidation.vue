<template>
	<form class="cdx-docs-text-area-native-validation">
		<cdx-field :status="status" :messages="messages">
			<cdx-text-area
				ref="textarea"
				v-model="textareaValue"
				required
				@invalid="onInvalid"
				@input="onInput"
			/>
			<template #label>
				Message
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-text-area-native-validation__submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea, CdxField, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaNativeValidation',
	components: { CdxTextArea, CdxField, CdxButton },
	setup() {
		const textarea = ref();
		const textareaValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref( {
			success: 'Submitted successfully!',
			error: ''
		} );

		/**
		 * On submit, validate the textarea.
		 */
		function onSubmit() {
			const isValid = textarea.value.checkValidity();
			if ( isValid ) {
				status.value = 'success';
			}
		}

		/**
		 * When the textarea is found to be invalid, set the Field status to
		 * error and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value.error = event.target.validationMessage;
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value.error = '';
		}

		return {
			textarea,
			textareaValue,
			status,
			messages,
			onSubmit,
			onInvalid,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-text-area-native-validation {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
