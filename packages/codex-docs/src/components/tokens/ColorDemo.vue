<template>
	<div class="cdx-docs-color-demo" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsColorDemo',
	props: {
		/**
		 * The value of the token we're demoing, which should be a hex value.
		 */
		tokenValue: {
			type: String,
			required: true
		}
	},
	setup( props ) {
		const style = computed( () => ( {
			'background-color': props.tokenValue
		} ) );

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-color-demo {
	width: 96px;
	height: 96px;
	border: @border-width-base @border-style-base rgba( 0, 0, 0, 0.1 );
	border-radius: @border-radius-circle;
}
</style>
