<template>
	<p class="cdx-docs-demo-text">
		Form data: {{ formData }}
	</p>
	<cdx-field
		:is-fieldset="true"
	>
		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			name="checkbox-with-custom-input-demo"
			:input-value="checkbox.value"
		>
			{{ checkbox.label }}
			<template v-if="checkbox.value === 'other'" #custom-input>
				<cdx-text-input
					v-model="inputValue"
					:disabled="!checkboxValue.includes( 'other' )"
					aria-label="TextInput custom input"
					placeholder="Custom option..."
				/>
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
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxCheckbox, CdxField, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxWithCustomInput',
	components: { CdxCheckbox, CdxField, CdxTextInput },
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

		return {
			checkboxValue,
			checkboxes,
			inputValue,
			formData
		};
	}
} );
</script>
