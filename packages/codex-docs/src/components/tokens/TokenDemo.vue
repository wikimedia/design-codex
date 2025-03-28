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

<!-- eslint-disable max-len -->
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

// TODO: Tokenize.
@animation-duration-token-animation: 2000ms;
@border-color-token: rgba( 0, 0, 0, 0.1 );
@border-color-token-inverse: rgba( 255, 255, 255, 0.1 );

/** Demos that style a rectangle (this may be in addition to extra styles below) */
.cdx-docs-tokens-demo {
	&--animation &__token,
	&--outline &__token,
	&--padding &__token {
		width: @size-800;
		height: @size-300;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			width: @size-full;
		}
	}

	&--animation &__token {
		height: @size-100;
		border: @border-progressive;
		border-radius: @border-radius-base;

		&__inner {
			background-color: @background-color-progressive;
			height: @size-full;
			animation-name: cdx-docs-animation-demo__inner-animation;
			animation-duration: @animation-duration-token-animation;
			animation-iteration-count: @animation-iteration-count-base;
		}
	}

	&--box-shadow &__token,
	&--box-shadow-color &__token,
	&--color &__token,
	&--opacity &__token {
		width: @size-250;
		height: @size-250;
		border-radius: @border-radius-base;
	}

	&--border &__token {
		width: @size-300;
		height: @size-300;
		border: @border-base;
		border-radius: @border-radius-base;

		&--border-radius-pill {
			width: @size-800;
		}
	}

	&--font &__token {
		background-color: @background-color-neutral-subtle;
		border-radius: @border-radius-base;
		padding: @spacing-50 @spacing-75;
	}

	&--opacity {
		.cdx-docs-tokens-demo__token {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			background-image: repeating-conic-gradient( #000 0% 25%, transparent 0% 50% );
			background-position: 0 0;
			background-size: @size-125 @size-125;
			border: @border-base;
		}
	}

	&--opacity-icon &__token {
		.cdx-mixin-css-icon( @cdx-icon-logo-wikimedia );
		background-position: 0 0;
		background-size: @size-125 @size-125;
	}

	&--padding &__token {
		position: relative;
		border: @border-base;

		&__inner {
			background-color: @background-color-neutral-subtle;
			width: @size-full;
			height: @size-full;
		}
	}

	&--color &__token {
		border: @border-width-base @border-style-base @border-color-token;

		/* stylelint-disable-next-line selector-class-pattern */
		html.dark & {
			border-color: @border-color-token-inverse;
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
		width: @size-full;
	}
}
</style>
<!-- eslint-enable max-len -->
