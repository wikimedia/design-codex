<template>
	<div
		v-if="includeWrapper"
		:style="wrapperStyle"
	>
		<div class="cdx-docs-tokens-demo__token__inner" :style="innerStyle" />
	</div>
	<div
		v-else
		:style="innerStyle"
	/>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

/**
 * Generic token demo, needs configuration with a CSS property, value, and the class for the demo
 * that controls the common styles for different values.
 */
export default defineComponent( {
	name: 'CdxDocsTokenDemo',
	props: {
		/**
		 * The value of the token we're demoing, should be appropriate for the property.
		 */
		tokenValue: {
			type: String,
			required: true
		},
		/**
		 * Name of the CSS property to demonstrate token application, which is
		 * used in the `style` attribute.
		 * “Position” uses for example `left`.
		 */
		cssProperty: {
			type: String,
			required: true
		},
		/**
		 * If there should be both a wrapper and an inner div, which one should the
		 * style be applied to? Omit entirely to only have a single div.
		 */
		styleTarget: {
			type: String as PropType<'' | 'wrapper' | 'inner'>,
			default: '',
			validator: ( value: unknown ) => typeof value === 'string' &&
				[ '', 'wrapper', 'inner' ].includes( value )
		}
	},
	setup( props ) {
		const includeWrapper = computed( () => props.styleTarget !== '' );
		const wrapperStyle = computed( () => {
			// Only apply the demo styles if styleTarget is 'wrapper'.
			if ( props.styleTarget === 'wrapper' ) {
				return { [ props.cssProperty ]: props.tokenValue };
			}
			return {};
		} );
		const innerStyle = computed( () => {
			// Apply unless styleTarget is 'wrapper'.
			if ( props.styleTarget === 'wrapper' ) {
				return {};
			}
			return { [ props.cssProperty ]: props.tokenValue };
		} );

		return {
			includeWrapper,
			wrapperStyle,
			innerStyle
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

/** Demos that style a rectangle (this may be in addition to extra styles below) */
.cdx-docs-tokens-demo {
	&--animation &__token,
	&--box-shadow &__token,
	&--opacity &__token,
	&--outline &__token,
	&--padding &__token {
		width: 100px;
		height: 50px;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			width: 300px;
		}
	}

	&--animation &__token {
		border: @border-width-base @border-style-base @border-color-base;

		&__inner {
			background-color: @background-color-primary;
			height: 100%;
			animation-name: cdx-docs-animation-demo__inner-animation;
			animation-duration: 2000ms;
			animation-iteration-count: infinite;
		}
	}

	&--border &__token {
		width: 50px;
		height: 50px;
		border: @border-width-base @border-style-base @border-color-base;

		&--border-radius-pill {
			width: 100px;
		}
	}

	&--color &__token {
		width: 96px;
		height: 96px;
		border: @border-width-base @border-style-base rgba( 0, 0, 0, 0.1 );
		border-radius: @border-radius-circle;
	}

	&--cursor &__token {
		background-color: @background-color-progressive;
		width: 50px;
		height: 50px;
		border-radius: @border-radius-circle;
	}

	&--opacity &__token {
		background-color: #000;
		border: @border-width-base @border-style-base rgba( 0, 0, 0, 0.1 );
		border-radius: @border-radius-base * 2;
		box-shadow: rgba( 0, 0, 0, 0.1 ) 0 1px 3px 0;
	}

	&--padding &__token {
		position: relative;
		border: @border-width-base @border-style-base @border-color-base;

		&__inner {
			background-color: @background-color-base--disabled;
			width: 100%;
			height: 100%;
		}
	}

	&--position &__token {
		position: relative;
		box-sizing: content-box;
		width: 50px;
		height: 50px;
		margin-left: 50px;
		border: @border-width-base @border-style-base @border-color-base;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			width: 250px;
		}

		&__inner {
			background-color: fade( @background-color-primary, 75% );
			position: absolute;
			top: 12.5px;
			left: 12.5px;
			width: 25px;
			height: 25px;
			border: @border-width-base @border-style-base @border-color-base;
		}
	}
}

// Animation tokens demo animation.
@keyframes cdx-docs-animation-demo__inner-animation {
	0%,
	100% {
		width: 0;
	}

	50% {
		width: 100%;
	}
}
</style>
