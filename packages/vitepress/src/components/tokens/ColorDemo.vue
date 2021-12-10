<template>
	<div class="vp-color-demo" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'ColorDemo',
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
@import ( reference ) 'design-tokens/dist/theme-wikimedia-ui.less';

// FIXME: Tech debt. To be removed as soon as Id58bb6ce050 is in.
@width-breakpoint-tablet: 720px;

.vp-color-demo {
	width: 96px;
	height: 96px;
	border: 1px solid rgba( 0, 0, 0, 0.1 );
	border-radius: @border-radius-circle;
}
</style>
