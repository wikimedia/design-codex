<template>
	<div>
		<cdx-label input-id="username-input">
			Username
		</cdx-label>
		<cdx-text-input id="username-input" v-model="inputValue" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelBasic',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
