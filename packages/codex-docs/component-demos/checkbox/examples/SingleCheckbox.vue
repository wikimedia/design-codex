<template>
	<div>
		<p class="cdx-docs-demo-text">
			Checkbox value: {{ checkboxValue }}
		</p>

		<cdx-checkbox v-model="checkboxValue" @update:model-value="onUpdate">
			Checked if true
		</cdx-checkbox>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'SingleCheckbox',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( false );

		const onUpdate = getEventLogger<string>( 'update:modelValue' );

		return {
			checkboxValue,
			onUpdate
		};
	}
} );
</script>
