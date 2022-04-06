<template>
	<cdx-text-input
		v-model="inputValue"
		v-bind="textInputProps"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { CdxTextInput, TextInputType } from '@wikimedia/codex';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputDefault',
	components: { CdxTextInput },
	props: {
		inputType: {
			type: String as PropType<TextInputType>,
			default: 'text'
		},
		startIcon: {
			type: Boolean,
			default: false
		},
		endIcon: {
			type: Boolean,
			default: false
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
	setup( props ) {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string | number>( '' );

		const textInputProps = computed( () => {
			return {
				inputType: props.inputType,
				startIcon: props.startIcon ? cdxIconSearch : undefined,
				endIcon: props.endIcon ? cdxIconInfoFilled : undefined,
				clearable: props.clearable,
				disabled: props.disabled
			};
		} );

		return {
			inputValue,
			textInputProps
		};
	}
} );
</script>
