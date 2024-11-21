<template>
	<div
		class="cdx-docs-transition-demo"
		:class="transitionClass"
		:style="style"
	>
		<span>mouse here</span>
		<div class="cdx-docs-transition-demo__animation" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsTransitionDemo',
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

		const transitionClass = computed(
			// If cssProperty is 'transition-property', make sure that only the properties
			// listed in it are transitioned; if not, transition everything
			() : string|string[] => props.cssProperty === 'transition-property' ?
				props.tokenValue.split( ',' ).map(
					( tProp ) => `cdx-docs-transition-demo--transition-${ tProp.trim() }`
				) :
				'cdx-docs-transition-demo--transition-all'
		);

		return {
			style,
			transitionClass
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

@transition-duration-inherit: inherit;
@transition-font-color-transparent: transparent;
@transition-property-width: width;

.cdx-docs-transition-demo {
	background-color: @background-color-interactive-subtle;
	color: @color-subtle;
	opacity: @opacity-base;
	display: none;
	align-content: center;
	position: relative;
	width: @size-full;
	height: @size-250;
	border: @border-width-base @border-style-dashed @border-color-subtle;
	border-radius: @border-radius-base;
	padding: @spacing-25 @spacing-75;
	font-size: @font-size-x-small;
	line-height: @line-height-xx-small;
	text-align: center;
	transition-property: @transition-property-base;
	transition-duration: @transition-duration-medium;
	transition-timing-function: @transition-timing-function-user;

	span {
		position: relative;
		// Ensure text is above the animation.
		z-index: @z-index-stacking-2;
		transition-property: @transition-property-icon;
		transition-duration: @transition-duration-base;
		transition-timing-function: @transition-timing-function-user;
	}

	& &__animation {
		background-color: @background-color-progressive;
		position: absolute;
		top: 0;
		left: 0;
		z-index: @z-index-stacking-1;
		width: @size-0;
		height: @size-full;
		transition-property: @transition-property-width;
		// Inherit transition duration inline styles set via JS or base demo CSS styles.
		transition-duration: @transition-duration-inherit;
		transition-timing-function: @transition-timing-function-user;
	}

	@media ( min-width: @min-width-breakpoint-tablet ) and ( hover: hover ) {
		display: block;

		&--transition-all:hover &__animation {
			// Animate blue fill on hover.
			width: @size-full;
		}

		&--transition-all:hover,
		&--transition-border-color:hover {
			border: @border-width-thick @border-style-base @border-color-progressive;
		}

		&--transition-all:hover,
		&--transition-box-shadow:hover {
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
		}

		&--transition-all:hover,
		&--transition-background-color:hover {
			background-color: @background-color-base;
		}

		&--transition-all:hover {
			color: @transition-font-color-transparent;
		}

		&--transition-color:hover {
			color: @color-emphasized;
		}

		&--transition-opacity:hover {
			opacity: @opacity-low;
		}

		&--transition-all:hover,
		&--transition-background-color:hover,
		&--transition-border-color:hover,
		&--transition-box-shadow:hover,
		&--transition-color:hover,
		&--transition-opacity:hover {
			// Override `text` cursor style in all transition demos.
			cursor: @cursor-base;
		}
	}
}
</style>
