<template>
	<cdx-field>
		<cdx-text-input v-model="inputValue" :start-icon="cdxIconWikitext" />
		<template #label>
			Signature
		</template>
		<template #description>
			Enter your signature using plain text or wikitext
		</template>
		<template #help-text>
			Use "~~~~" on talk pages to include your signature and a timestamp
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxField } from '@wikimedia/codex';
import { cdxIconWikitext } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputField',
	components: { CdxTextInput, CdxField },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue,
			cdxIconWikitext
		};
	}
} );
</script>
