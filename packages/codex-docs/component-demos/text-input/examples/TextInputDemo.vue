<template>
	<div>
		<p v-if="showValue" class="cdx-docs-demo-text">
			Input value: {{ inputValue }}
		</p>

		<cdx-text-input
			v-model="inputValue"
			v-bind="inputProps"
			aria-label="TextInput default demo"
			:placeholder="placeholder"
			@update:model-value="onEvent( 'update:modelValue', $event )"
			@input="onEvent( 'input', $event )"
			@change="onEvent( 'change', $event )"
			@focus="onEvent( 'focus', $event )"
			@blur="onEvent( 'blur', $event )"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

/**
 * Component for demonstrating the TextInput component by showing how the value is bound and
 * tracked, and outputting event details in the console. This component is for demo purposes only;
 * a cleaned-up version of each example will be shown as the code snippet.
 */
export default defineComponent( {
	name: 'TextInputDemo',
	components: { CdxTextInput },
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
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	setup( props ) {
		const inputValue = ref( props.initialValue );

		/**
		 * @param {string} eventName
		 * @param {Event|string} event
		 */
		const onEvent = function ( eventName, event ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value:', event );
		};

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
