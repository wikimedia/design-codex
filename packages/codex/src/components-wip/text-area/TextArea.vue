<template>
	<div
		class="cdx-text-area"
		:class="rootClasses"
		:style="rootStyle"
	>
		<textarea
			v-bind="otherAttrs"
			v-model="wrappedModel"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useModelWrapper from '../../composables/useModelWrapper';
// TODO: import icons

/**
 * Multi-line text input that allows manual resizing.
 */
export default defineComponent( {
	name: 'CdxTextArea',
	inheritAttrs: false,
	props: {
		/**
		 * Current value of the textarea.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String ],
			default: ''
		}
	},
	emits: [
		/**
		 * When the textarea value changes
		 *
		 * @property {string} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { attrs, emit } ) {
		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the textarea element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		// TODO: add icon classes
		const internalClasses = computed( () => {
			return {};
		} );

		// helpers from composable - useSplitAttributes()
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		return {
			rootClasses,
			rootStyle,
			otherAttrs,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
	@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

	/* stylelint-disable-next-line block-no-empty */
	.cdx-text-area {}
</style>
