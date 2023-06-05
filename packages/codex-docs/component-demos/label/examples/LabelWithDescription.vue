<template>
	<div>
		<cdx-label input-id="name-input">
			Name
			<template #description>
				Enter your preferred name
			</template>
		</cdx-label>
		<cdx-text-input id="name-input" v-model="inputValue" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelWithDescription',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
