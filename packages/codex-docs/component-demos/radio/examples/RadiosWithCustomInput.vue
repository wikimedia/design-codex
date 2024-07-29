<template>
	<!-- Note: This form does not POST or GET on submit -->
	<form
		id="block-expiration"
		name="expiration-form"
	>
		<cdx-field
			:is-fieldset="true"
			:status="status"
			:messages="messages"
			form="block-expiration"
		>
			<template #label>
				Expiration
			</template>
			<template #description>
				When do you want the block to expire?
			</template>
			<cdx-radio
				v-for="radio in radios"
				:key="'radio-' + radio.value"
				v-model="radioValue"
				name="radio-with-custom-input-demo"
				:input-value="radio.value"
				@change="validate( $event )"
			>
				{{ radio.label }}
				<template v-if="radio.value === 'other'" #custom-input>
					<cdx-field
						:is-fieldset="true"
						:status="textFieldStatus"
						:messages="textFieldMessages"
						class="my-custom-input-field"
					>
						<cdx-text-input
							v-model="otherInputValue"
							aria-label="TextInput custom input"
							placeholder="Custom duration..."
							:disabled="radioValue !== 'other'"
						/>
					</cdx-field>
				</template>
			</cdx-radio>
		</cdx-field>
		<cdx-button
			class="my-button"
			action="progressive"
			weight="primary"
			form="block-expiration"
			name="submit-expiration"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { CdxRadio, CdxField, CdxTextInput, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithCustomInput',
	components: { CdxRadio, CdxField, CdxTextInput, CdxButton },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Preset duration',
				value: 'preset'
			},
			{
				label: 'Specific date and time',
				value: 'specific'
			},
			{
				label: 'Other duration',
				value: 'other'
			}
		];
		const otherInputValue = ref( '' );

		// Validation
		const status = ref( 'default' );
		const textFieldStatus = ref( 'default' );
		const messages = { error: 'Please select an option' };
		const textFieldMessages = { error: '"Other" option must be provided' };
		function validate() {
			// When "other" radio is selected, ensure the custom input has a value.
			if ( radioValue.value === 'other' ) {
				return otherInputValue.value.length > 0;
			} else if ( radioValue.value.length > 0 ) {
				// When a radio other than "other" is selected.
				return true;
			} else {
				// When no radio is selected, validation fails.
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
			// When validation is unsuccessful, show an error state.
			} else if ( radioValue.value === 'other' && otherInputValue.value.length === 0 ) {
				// When "other" is selected and text field is empty, show text field's error state.
				textFieldStatus.value = 'error';
			} else {
				// When validation is not successful (no selected radio), show the error state.
				status.value = 'error';
			}
		}

		watch( radioValue, () => {
			if ( validate() ) {
				// Reset the statuses when radio selection changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			} else if ( radioValue.value.length > 0 ) {
				// When validation is unsuceessful, reset the statuses when any radio
				// including "other" is selected.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		watch( otherInputValue, () => {
			if ( validate() ) {
				// Reset the statuses when input changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		return {
			radioValue,
			radios,
			otherInputValue,
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
