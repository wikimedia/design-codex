<template>
	<div class="vp-border-demo" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'BorderDemo',
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

.vp-border-demo {
	width: 50px;
	height: 50px;
	border: @border-base;
}
</style>
