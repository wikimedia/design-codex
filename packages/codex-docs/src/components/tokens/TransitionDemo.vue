<template>
	<div
		class="vp-transition-demo"
		:class="transitionClass"
		:style="style"
	>
		<span>Hello</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'TransitionDemo',
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

		const transitionClass = computed( () : string|string[] =>
			// If cssProperty is 'transition-property', make sure that only the properties
			// listed in it are transitioned; if not, transition everything
			props.cssProperty === 'transition-property' ?
				props.tokenValue.split( ',' ).map(
					( tProp ) => `vp-transition-demo--transition-${tProp.trim()}`
				) :
				'vp-transition-demo--transition-all'
		);

		return {
			style,
			transitionClass
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// FIXME: Tech debt. To be removed as soon as Id58bb6ce050 is in.
@width-breakpoint-tablet: 720px;

.vp-transition-demo {
	background-color: @background-color-base;
	color: @color-primary;
	position: relative;
	width: 100px;
	height: 50px;
	border: @border-base;
	transition-property: border-color, box-shadow, background-color, color, padding;
	transition-duration: @transition-duration-medium;
	padding: @padding-base;

	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate( @padding-horizontal-base, -50% );
		margin-left: -50%;
		transition-property: margin-left, transform;
		transition-duration: @transition-duration-medium;
	}

	@media screen and ( min-width: @width-breakpoint-tablet ) {
		width: 300px;
	}

	&--transition-all:hover,
	&--transition-border-color:hover {
		border-color: @border-color-base--focus;
	}

	&--transition-all:hover,
	&--transition-box-shadow:hover {
		box-shadow: @box-shadow-primary--focus;
	}

	&--transition-all:hover,
	&--transition-background-color:hover {
		background-color: @background-color-base--hover;
	}

	&--transition-all:hover,
	&--transition-color:hover {
		color: @color-destructive;
	}

	&--transition-all:hover {
		span {
			margin-left: 0;
			transform: translate( -50%, -50% );
		}
	}
}
</style>