<template>
	<div>
		<p>Checkbox value: {{ checkboxValue }}</p>
		<CdxCheckbox v-model="checkboxValue" @update:model-value="onUpdate">
			Checked if true
		</CdxCheckbox>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CdxCheckbox from 'vue-components/src/components/checkbox/Checkbox.vue';

export default defineComponent( {
	name: 'SingleCheckbox',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( false );

		const onUpdate = ( value: string ): void => {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event: ' + value );
		};

		return {
			checkboxValue,
			onUpdate
		};
	}
} );
</script>

<style scoped>
/* For demo purposes only. */
p {
	margin-top: 0;
	font-weight: bold;
}
</style>
