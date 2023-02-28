<template>
	<div
		class="cdx-docs-transition-demo"
		:class="transitionClass"
		:style="style"
	>
		<span>Hello</span>
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

		const transitionClass = computed( () : string|string[] =>
			// If cssProperty is 'transition-property', make sure that only the properties
			// listed in it are transitioned; if not, transition everything
			props.cssProperty === 'transition-property' ?
				props.tokenValue.split( ',' ).map(
					( tProp ) => `cdx-docs-transition-demo--transition-${tProp.trim()}`
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

.cdx-docs-transition-demo {
	background-color: @background-color-base;
	color: @color-progressive;
	position: relative;
	width: @size-full;
	height: @size-300;
	border: @border-width-base @border-style-base @border-color-base;
	padding: @spacing-25 @spacing-75;
	transition-property: border-color, box-shadow, background-color, color, padding;
	transition-duration: @transition-duration-medium;

	span {
		position: absolute;
		top: @spacing-half;
		left: @spacing-half;
		margin-left: -@spacing-half;
		transform: translate( @spacing-75, -@spacing-half );
		transition-property: margin-left, transform;
		transition-duration: @transition-duration-medium;
	}

	&--transition-all:hover,
	&--transition-border-color:hover {
		border-color: @border-color-progressive--focus;
	}

	&--transition-all:hover,
	&--transition-box-shadow:hover {
		box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
	}

	&--transition-all:hover,
	&--transition-background-color:hover {
		background-color: @background-color-interactive;
	}

	&--transition-all:hover,
	&--transition-color:hover {
		color: @color-destructive;
	}

	&--transition-all:hover {
		span {
			margin-left: 0;
			transform: translate( -@spacing-half, -@spacing-half );
		}
	}
}
</style>
