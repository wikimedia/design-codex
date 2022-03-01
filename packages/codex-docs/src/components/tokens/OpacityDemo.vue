<template>
	<div class="cdx-docs-opacity-demo" :style="style" />
</template>

<script lang="ts">
// TODO merge with ColorDemo
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsOpacityDemo',
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
			opacity: props.tokenValue
		} ) );

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-opacity-demo {
	background-color: #000;
	width: 100px;
	height: 50px;
	border: 1px solid rgba( 0, 0, 0, 0.1 );
	border-radius: @border-radius-base * 2;
	box-shadow: rgba( 0, 0, 0, 0.1 ) 0 1px 3px 0;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		width: 300px;
	}
}
</style>
