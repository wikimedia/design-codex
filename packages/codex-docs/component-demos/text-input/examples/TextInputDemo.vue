<template>
	<div>
		<p v-if="showValue" class="cdx-docs-demo-text">
			Input value: {{ inputValue }}
		</p>

		<cdx-text-input
			v-model="inputValue"
			v-bind="inputProps"
			:placeholder="placeholder"
			@update:model-value="onEvent( 'update:modelValue', $event )"
			@input="onEvent( 'input', $event )"
			@change="onEvent( 'change', $event )"
			@focus="onEvent( 'focus', $event )"
			@blur="onEvent( 'blur', $event )"
		/>
		<cdx-button v-if="allowReset" @click="resetInput">
			Reset
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { CdxButton, CdxTextInput } from '@wikimedia/codex';
import { Icon } from '@wikimedia/codex-icons';

interface InputProps {
	inputType?: 'text' | 'search',
	disabled?: boolean,
	startIcon?: Icon,
	endIcon?: Icon,
	clearable?: boolean
}

/**
 * Component for demonstrating the TextInput component by showing how the value is bound and
 * tracked, and outputting event details in the console. This component is for demo purposes only;
 * a cleaned-up version of each example will be shown as the code snippet.
 */
export default defineComponent( {
	name: 'TextInputDemo',
	components: { CdxButton, CdxTextInput },
	props: {
		/**
		 * Whether to show the current input value above the input
		 */
		showValue: {
			type: Boolean,
			default: false
		},
		/**
		 * Initial value of the input, if any
		 */
		initialValue: {
			type: String,
			default: ''
		},
		/**
		 * Whether the reset button should show
		 */
		allowReset: {
			type: Boolean,
			default: false
		},
		/**
		 * Placeholder text for the input.
		 */
		placeholder: {
			type: String,
			default: ''
		},
		/**
		 * Props to bind to the CdxTextInput
		 */
		inputProps: {
			type: Object as PropType<InputProps>,
			default: () => {
				return {};
			}
		}
	},
	setup( props ) {
		const { initialValue } = toRefs( props );
		const inputValue = ref( initialValue.value );

		const onEvent = ( eventName: string, value: string ): void => {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value: ' + value );
		};

		const resetInput = () => {
			inputValue.value = initialValue.value;
		};

		return {
			inputValue,
			onEvent,
			resetInput
		};
	}
} );
</script>
