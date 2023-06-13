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

const inputValue = ref( '' );
const status = computed( () =>
	inputValue.value.length > 1 ? 'error' : 'default'
);
const messages = { error: 'Your username is too long' };

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
