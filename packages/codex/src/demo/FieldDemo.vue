<template>
	<section id="cdx-field">
		<h2>Field</h2>

		<h3>TextInput field with validation</h3>
		<cdx-field
			:label-icon="cdxIconUserAvatar"
			:status="status"
			:messages="messages"
		>
			<cdx-text-input v-model="inputValue" />
			<template #label>
				Username
			</template>
			<template #description>
				Enter a unique username
			</template>
		</cdx-field>

		<h3>TextInput field with custom validation message</h3>
		<p>
			This example displays the different status validation messages based on the number of
			characters typed in the input (1 = warning, 2 = success, 3 and above = error).
			When one character is typed in the input, it displays the warning status.
			When two characters are typed in the input, it displays the success status.
			Otherwise, it displays the error status.
		</p>
		<cdx-field
			:status="statusForCustomExample"
			:messages="messagesForCustomExample"
		>
			<cdx-text-input
				v-model="inputValueForCustomExample"
			/>
			<template #label>
				Improvement
			</template>
			<template #description>
				Describe any improvements you made
			</template>
			<!-- Warning slot content will override the warning message via `messages` props. -->
			<template #warning>
				Press <kbd><kbd>Ctrl</kbd>+<kbd>Enter</kbd></kbd> to publish your changes.
			</template>
		</cdx-field>

		<h3>Radio group fieldset</h3>
		<cdx-field :is-fieldset="true">
			<cdx-radio
				v-for="radio in radios"
				:key="'radio-' + radio.value"
				v-model="radioValue"
				name="radio-group"
				:input-value="radio.value"
			>
				{{ radio.label }}
			</cdx-radio>
			<template #label>
				Notifications
			</template>
			<template #description>
				Choose how often you'd like to receive notifications
			</template>
			<template #help-text>
				Note that you can update this preference later
			</template>
		</cdx-field>
	</section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CdxField, CdxTextInput, CdxRadio } from '../lib';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';

// TextInput with validation.
const inputValue = ref( '' );
const status = computed( () => inputValue.value.length > 1 ? 'error' : 'default'
);
const messages = { error: 'Your username is too long' };

// Custom status validation message with HTML.
const inputValueForCustomExample = ref( '' );
const statusForCustomExample = computed( () => {
	if ( inputValueForCustomExample.value.length === 0 ) {
		return 'default';
	}
	if ( inputValueForCustomExample.value.length === 1 ) {
		return 'warning';
	}
	if ( inputValueForCustomExample.value.length === 2 ) {
		return 'success';
	}
	return 'error';
} );
const messagesForCustomExample = {
	// This warning message will not render because the warning slot was provided.
	warning: 'Press <kbd><kbd>Ctrl</kbd>+<kbd>Enter</kbd></kbd> to publish your changes',
	error: 'Please check the field for errors.',
	success: 'Your changes have been successfully saved! 🎉'
};

// Radio group fieldset.
const radioValue = ref( 'daily' );
const radios = [
	{
		label: 'Daily',
		value: 'daily'
	},
	{
		label: 'Weekly',
		value: 'weekly'
	},
	{
		label: 'Monthly',
		value: 'monthly'
	}
];
</script>
