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
import { defineComponent, computed } from 'vue';

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
		cssProperty: {
			type: String,
			default: ''
		}
	},
	setup( props ) {
		const isPercentage = ( size: string|undefined ) : boolean => !!size && size.endsWith( '%' );
		const isTooBig = ( size: string | undefined ) : boolean =>
			!!size && size.endsWith( 'px' ) && Number( size.slice( 0, -2 ) ) > 300;

		const width = computed( () =>
			props.cssProperty === 'width' || props.cssProperty === '' ? props.tokenValue : undefined
		);
		const height = computed( () =>
			props.cssProperty === 'height' || props.cssProperty === '' ? props.tokenValue : undefined
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
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-size-demo {
	position: relative;
	width: 100px;
	height: 50px;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		width: 300px;
	}

	&__inner {
		background-color: @background-color-primary;
	}

	&--percentage {
		border: @border-width-base @border-style-base @border-color-base;
	}

	&--too-big {
		display: none;
	}
}
</style>
