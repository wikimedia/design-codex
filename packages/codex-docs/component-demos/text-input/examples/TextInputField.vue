<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			:start-icon="cdxIconUserAvatar"
			placeholder="Enter your username"
			@blur="onBlur"
			@input="onInput"
		/>
		<template #label>
			Username
		</template>
		<template #description>
			This username will be visible to other users.
		</template>
		<template #help-text>
			Username must be between 4 and 20 characters.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxField } from '@wikimedia/codex';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputField',
	components: { CdxTextInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the input.
		 */
		function onBlur() {
			const inputLength = inputValue.value.length;
			if ( inputLength > 0 && inputLength < 4 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too short.' };
			} else if ( inputLength > 20 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too long.' };
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
			inputValue,
			status,
			messages,
			onBlur,
			onInput,
			cdxIconUserAvatar
		};
	}
} );
</script>
