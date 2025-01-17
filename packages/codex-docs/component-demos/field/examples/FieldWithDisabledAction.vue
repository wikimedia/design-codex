<template>
	<form>
		<cdx-field>
			<cdx-text-input
				ref="textInput"
				v-model="inputValue"
				placeholder="e.g. http://example.com"
				input-type="url"
				@input="onInput"
			/>
			<template #label>
				URL or citation
			</template>
			<template #help-text>
				URL's should use a format such as http://example.com
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-demo-form-button"
			:disabled="isDisabled"
			@click.prevent="onSubmit"
		>
			Generate
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxButton,
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxButton,
		CdxField,
		CdxTextInput
	},
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const isDisabled = ref( true );

		function onInput() {
			isDisabled.value = !textInput.value.checkValidity() || inputValue.value.length === 0;
		}

		function onSubmit() {
			// eslint-disable-next-line no-console
			console.log( 'Success!' );
		}

		return {
			textInput,
			inputValue,
			isDisabled,
			onInput,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-form-button {
	margin-top: @spacing-75;
}
</style>
