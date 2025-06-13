<template>
	<section id="cdx-select">
		<h2>Select</h2>
		<cdx-select
			v-model:selected="selection"
			:menu-items="options"
			default-label="Choose an option"
		/>
		<p>Selected value: {{ selection || '(none)' }}</p>

		<h3>CSS-only select</h3>
		<select class="cdx-select">
			<option value="">
				Choose an option
			</option>
			<option value="a">
				Option A
			</option>
			<option value="b">
				Option B
			</option>
			<option value="c">
				Option C
			</option>
			<option value="d" disabled>
				Option D
			</option>
		</select>

		<h3>Select with hidden input for forms</h3>
		<form @submit.prevent="handleSubmit">
			<cdx-select
				v-model:selected="formSelection"
				:menu-items="options"
				default-label="Choose an option"
				name="fruit"
			/>
			<cdx-button
				action="progressive"
				weight="primary"
				type="submit"
			>
				Submit
			</cdx-button>
		</form>
		<p>Form data: {{ formData }}</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxSelect, MenuItemData, CdxButton } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];
const selection = ref<string|null>( null );
const formSelection = ref<string|null>( null );
const formData = ref<string>( '' );

function handleSubmit( event: Event ) {
	const form = event.target as HTMLFormElement;
	const formDataObj = new FormData( form );
	formData.value = formDataObj.get( 'fruit' ) as string;
}
</script>
