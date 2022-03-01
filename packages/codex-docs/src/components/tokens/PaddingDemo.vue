<template>
	<div class="cdx-docs-padding-demo" :style="style">
		<div class="cdx-docs-padding-demo__inner" />
	</div>
</template>

<script lang="ts">
// TODO maybe merge with SizeDemo
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsPaddingDemo',
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

.cdx-docs-padding-demo {
	position: relative;
	width: 100px;
	height: 50px;
	border: @border-base;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		width: 300px;
	}

	&__inner {
		background-color: @background-color-base--disabled;
		width: 100%;
		height: 100%;
	}
}
</style>
