<template>
	<!-- Note: This form does not POST or GET on submit -->
	<form
		id="discussion-pages"
		name="discussion-form"
	>
		<cdx-field
			:is-fieldset="true"
			:status="status"
			:messages="messages"
			form="discussion-pages"
		>
			<cdx-checkbox
				v-for="checkbox in checkboxes"
				:key="'checkbox-' + checkbox.value"
				v-model="checkboxValue"
				name="checkbox-with-custom-input-demo"
				:input-value="checkbox.value"
				@change="validate( $event )"
			>
				{{ checkbox.label }}
				<template v-if="checkbox.value === 'other'" #custom-input>
					<cdx-field
						:is-fieldset="true"
						:status="textFieldStatus"
						:messages="textFieldMessages"
						class="my-custom-input-field"
					>
						<cdx-text-input
							v-model="inputValue"
							:disabled="!checkboxValue.includes( 'other' )"
							aria-label="TextInput custom input"
							placeholder="Custom option..."
						/>
					</cdx-field>
				</template>
			</cdx-checkbox>
			<template #label>
				Discussion pages
			</template>
			<template #description>
				These options are provided for the Discussion Tools Beta Feature.
			</template>
			<template #help-text>
				Learn more about these features at the <a href="#">feature summary</a>.
				These tools require JavaScript to be enabled in your browser.
			</template>
		</cdx-field>
		<cdx-button
			class="my-button"
			action="progressive"
			weight="primary"
			form="discussion-pages"
			name="submit-discussion-pages"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { CdxCheckbox, CdxField, CdxTextInput, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxWithCustomInput',
	components: { CdxCheckbox, CdxField, CdxTextInput, CdxButton },
	setup() {
		const checkboxValue = ref( [ 'quickReply', 'quickTopic' ] );
		const checkboxes = [
			{
				label: 'Enable quick replying',
				value: 'quickReply'
			},
			{
				label: 'Enable quick topic adding',
				value: 'quickTopic'
			},
			{
				label: 'Automatically subscribe to topics',
				value: 'autoSubscribe'
			},
			{
				label: 'Other',
				value: 'other'
			}
		];

		const inputValue = ref( '' );

		// Capture form data.
		const formData = computed( () => ( {
			options: checkboxValue,
			otherValue: inputValue
		} ) );

		// Validation
		const status = ref( 'default' );
		const textFieldStatus = ref( 'default' );
		const messages = { error: 'Please select at least one option' };
		const textFieldMessages = { error: '"Other" option must be provided' };
		function validate() {
			if ( checkboxValue.value.includes( 'other' ) ) {
				// When "other" checkbox is checked, ensure the custom input has a value.
				return inputValue.value.length > 0;
			} else if ( checkboxValue.value.length > 0 ) {
				// When a checkbox other than "other" is checked.
				return true;
			} else {
				// When no checkbox is checked, validation fails.
				return false;
			}
		}

		function onSubmit() {
			// When validation is successful, show the success message.
			if ( validate() ) {
				status.value = 'default';
				textFieldStatus.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
				// eslint-disable-next-line no-console
				console.log( formData.value );
			// When validation is unsuccessful, show an error state.
			} else if ( checkboxValue.value.includes( 'other' ) && inputValue.value.length === 0 ) {
				// When "other" is checked and text field is empty, show text field's error state.
				textFieldStatus.value = 'error';
			} else {
				// When validation is not successful (no checked checkbox), show the error state.
				status.value = 'error';
			}
		}

		watch( checkboxValue, () => {
			if ( validate() ) {
				// Reset the statuses when checkbox selection changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			} else if ( checkboxValue.value.length > 0 ) {
				// When validation is unsuceessful, reset the statuses when any checkbox
				// including "other" is selected.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		watch( inputValue, () => {
			if ( validate() ) {
				// Reset the statuses when input changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		return {
			checkboxValue,
			checkboxes,
			inputValue,
			status,
			messages,
			validate,
			textFieldStatus,
			textFieldMessages,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-button {
	margin-top: @spacing-100;
}

.my-custom-input-field {
	.cdx-label {
		padding: 0;
	}

	.cdx-field__help-text {
		margin: 0;
	}
}

</style>
