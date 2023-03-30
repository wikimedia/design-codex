<template>
	<div
		class="cdx-text-area"
		:class="rootClasses"
		:style="rootStyle"
	>
		<textarea
			v-bind="otherAttrs"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useSplitAttributes from '../../composables/useSplitAttributes';
// TODO: import icons

/**
 * Multi-line text input that allows manual resizing.
 */
export default defineComponent( {
	name: 'CdxTextArea',
	inheritAttrs: false,
	// TODO: add props
	// props: {},
	setup( props, { attrs } ) {
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
			otherAttrs
		};
	}
} );
</script>

<style lang="less">
	@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

	/* stylelint-disable-next-line block-no-empty */
	.cdx-text-area {}
</style>
