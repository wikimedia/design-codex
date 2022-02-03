<template>
	<div class="vp-animation-demo">
		<div class="vp-animation-demo__bar" :style="style" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'AnimationDemo',
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
		// TODO
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
@import ( reference ) '@wikimedia/codex-tokens/dist/theme-wikimedia-ui.less';

// FIXME: Tech debt. To be removed as soon as Id58bb6ce050 is in.
@width-breakpoint-tablet: 720px;

.vp-animation-demo {
	width: 100px;
	height: 50px;
	border: @border-base;

	@media screen and ( min-width: @width-breakpoint-tablet ) {
		width: 300px;
	}

	&__bar {
		background-color: @background-color-primary;
		height: 100%;
		animation: vp-animation-demo__bar-animation;
		animation-duration: 2000ms;
		animation-iteration-count: infinite;
	}
}

@keyframes vp-animation-demo__bar-animation {
	0%,
	100% {
		width: 0;
	}

	50% {
		width: 100%;
	}
}
</style>
