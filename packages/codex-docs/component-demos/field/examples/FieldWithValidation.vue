<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input v-model="inputValue" />
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
		<template #help-text>
			Username cannot be longer than 1 character
		</template>
	</cdx-field>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = computed( () =>
			inputValue.value.length > 1 ? 'error' : 'default'
		);
		const messages = { error: 'Your username is too long' };

		return {
			inputValue,
			status,
			messages
		};
	}
} );
</script>
