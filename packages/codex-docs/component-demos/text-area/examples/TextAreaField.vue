<template>
	<cdx-field>
		<cdx-text-area v-model="textareaValue" placeholder="Describe what you changed" />
		<template #label>
			Edit summary
		</template>
		<template #description>
			Briefly describe your changes
		</template>
		<template #help-text>
			By saving changes, you agree to the
			<a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use">Terms of Use</a>,
			and you irrevocably agree to release your contribution under the
			<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY-SA 4.0 License</a>
			and the
			<a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License">GFDL</a>.
			You agree that a hyperlink or URL is sufficient attribution under the Creative Commons
			license.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaField',
	components: { CdxTextArea, CdxField },
	setup() {
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
