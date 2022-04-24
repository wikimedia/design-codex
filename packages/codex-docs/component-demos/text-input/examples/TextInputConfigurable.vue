<template>
	<cdx-text-input
		v-model="inputValue"
		:input-type="inputType"
		:start-icon="startIcon"
		:end-icon="endIcon"
		:clearable="clearable"
		:disabled="disabled"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { CdxTextInput, TextInputType } from '@wikimedia/codex';
import { Icon } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputDefault',
	components: { CdxTextInput },
	props: {
		inputType: {
			type: String as PropType<TextInputType>,
			default: 'text'
		},
		startIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		endIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		clearable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string | number>( '' );

		return {
			inputValue
		};
	}
} );
</script>
