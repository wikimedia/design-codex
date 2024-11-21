<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			@input="onInput"
			@blur="validate"
		/>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithSuccess',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => ( {
			success: `The username "${ inputValue.value }" is available.`
		} ) );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// If this were real, we'd check to see if the username
			// is actually unique. But this is just an example, so
			// we'll show the success message no matter what.
			status.value = 'success';
		}

		return {
			inputValue,
			status,
			messages,
			onInput,
			validate
		};
	}
} );
</script>
