<template>
	<div class="cdx-docs-cursor-demo" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsCursorDemo',
	props: {
		/**
		 * The value of the token we're demoing
		 */
		tokenValue: {
			type: String,
			required: true
		}
	},
	setup( props ) {
		const style = computed( () => ( {
			cursor: props.tokenValue
		} ) );

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-cursor-demo {
	background-color: @background-color-progressive;
	width: 50px;
	height: 50px;
	border-radius: @border-radius-circle;
}
</style>
