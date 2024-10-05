<template>
	<div
		class="cdx-docs-cursor-demo"
		:style="style"
	>
		<span>mouse here</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsCursorDemo',
	props: {
		/**
		 * The value of the token we're demoing, which should be a cursor value.
		 */
		tokenValue: {
			type: String,
			required: true
		},
		cssProperty: {
			type: String,
			required: true
		}
	},
	setup( props ) {
		const style = computed( () => ( {
			[ props.cssProperty ]: props.tokenValue
		} ) );

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-cursor-demo {
	background-color: @background-color-interactive-subtle;
	display: none;
	align-content: center;
	width: @size-full;
	height: @size-300;
	border-width: @border-width-base;
	border-style: @border-style-dashed;
	border-color: @border-color-subtle;
	border-radius: @border-radius-base;
	text-align: center;

	@media ( min-width: @min-width-breakpoint-tablet ) and ( hover: hover ) {
		display: block;
	}
}
</style>
