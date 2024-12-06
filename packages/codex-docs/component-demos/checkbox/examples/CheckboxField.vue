<template>
	<cdx-field :is-fieldset="true">
		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			:input-value="checkbox.value"
		>
			{{ checkbox.label }}
		</cdx-checkbox>
		<template #label>
			Discussion pages
		</template>
		<template #description>
			These options are provided for the Discussion Tools Beta Feature.
			Learn more about these features at the <a href="#">feature summary</a>.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxField',
	components: { CdxCheckbox, CdxField },
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
			}
		];

		return {
			checkboxValue,
			checkboxes
		};
	}
} );
</script>
