<template>
	<div class="cdx-docs-border-demo" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsBorderDemo',
	props: {
		/**
		 * The value of the token we're demoing
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
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-border-demo {
	width: 50px;
	height: 50px;
	border: @border-width-base @border-style-base @border-color-base;
}
</style>
