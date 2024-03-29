<template>
	<div
		class="cdx-docs-size-demo"
		:class="rootClasses"
		:style="rootStyle"
	>
		<div class="cdx-docs-size-demo__inner" :style="innerStyle" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent( {
	name: 'CdxDocsSizeDemo',
	props: {
		/**
		 * The value of the token we're demoing, which should be a distance value
		 * (in px, em, %, etc)
		 */
		tokenValue: {
			type: String,
			required: true
		},
		/** 'width', 'height', or an empty string for both */
		cssProperty: {
			type: String as PropType<'' | 'width' | 'height'>,
			default: '',
			validator: ( value: unknown ) => typeof value === 'string' &&
				[ '', 'width', 'height' ].includes( value )
		}
	},
	setup( props ) {
		const isPercentage = ( size: string|undefined ) : boolean => !!size && size.endsWith( '%' );
		const isTooBig = ( size: string | undefined ) : boolean =>
			!!size && size.endsWith( 'px' ) && Number( size.slice( 0, -2 ) ) > 300 ||
			!!size && size.endsWith( 'em' ) && Number( size.slice( 0, -2 ) ) > 30;

		const width = computed( () =>
			props.cssProperty !== 'height' ? props.tokenValue : undefined
		);
		const height = computed( () =>
			props.cssProperty !== 'width' ? props.tokenValue : undefined
		);

		const innerStyle = computed( () => ( {
			width: isPercentage( width.value ) ? width.value : '100%',
			height: isPercentage( height.value ) ? height.value : '100%'
		} ) );

		const rootStyle = computed( () => ( {
			width: isPercentage( width.value ) ? undefined : width.value,
			height: isPercentage( height.value ) ? undefined : height.value
		} ) );

		const rootClasses = computed( () => ( {
			'cdx-docs-size-demo--percentage': isPercentage( props.tokenValue ),
			'cdx-docs-size-demo--too-big': isTooBig( width.value ) || isTooBig( height.value )
		} ) );

		return {
			innerStyle,
			rootStyle,
			rootClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-size-demo {
	position: relative;
	height: @size-300;
	max-width: @size-800;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		max-width: @size-full;
	}

	&__inner {
		// TODO: This is semantically incorrect, there needs to be a static token.
		background-color: @background-color-progressive;
	}

	&--percentage {
		border: @border-base;
	}

	&.cdx-docs-tokens-demo__token--size-double {
		overflow: scroll hidden;
	}

	&--too-big,
	&.cdx-docs-tokens-demo__token--size-viewport-width-full,
	&.cdx-docs-tokens-demo__token--size-viewport-height-full {
		display: none;
	}
}

</style>
