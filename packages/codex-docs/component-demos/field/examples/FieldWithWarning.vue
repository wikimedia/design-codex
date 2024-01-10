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
		<template #help-text>
			Username must be capitalized and have no spaces
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
	name: 'FieldWithWarning',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const originalName = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => {
			return {
				warning: `The username was automatically changed from "${ originalName.value }" to "${ inputValue.value }".`
			};
		} );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// Trim off spaces at the beginning and end; we don't
			// need to inform the user of this.
			inputValue.value = inputValue.value.trim();

			// Store the original username.
			originalName.value = inputValue.value;

			// Remove spaces.
			inputValue.value = inputValue.value.replace( /\s/g, '' );

			// Capitalize.
			inputValue.value = inputValue.value[ 0 ].toUpperCase() + inputValue.value.slice( 1 );

			// Set warning status if the original username
			// was changed.
			status.value = originalName.value === inputValue.value ? 'default' : 'warning';
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
