<template>
	<cdx-radio
		v-model="radioValue"
		name="radio-configurable-demo"
		input-value="radio"
	>
		<slot />
		<template #description>
			<slot name="description" />
		</template>
	</cdx-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxRadio
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioConfigurable',
	components: {
		CdxRadio
	},
	setup() {
		const radioValue = ref( '' );

		return {
			radioValue
		};
	}
} );
</script>
