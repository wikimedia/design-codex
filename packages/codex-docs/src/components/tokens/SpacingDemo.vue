<template>
	<div class="cdx-docs-spacing-demo">
		<span class="cdx-docs-spacing-demo__box" :style="style">
			Foo
		</span>
		<span class="cdx-docs-spacing-demo__box">
			Bar
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsSpacingDemo',
	props: {
		/**
		 * The value of the token we're demoing, which should be a spacing value
		 * (in px, em, or another absolute unit)
		 */
		tokenValue: {
			type: String,
			required: true
		}
	},
	setup( props ) {
		const style = computed( () => ( {
			'margin-inline-end': props.tokenValue
		} ) );

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-spacing-demo {
	position: relative;
	padding: @padding-base;

	&__box {
		display: inline-block;
		border: @border-base;
		padding: @padding-base;
	}
}
</style>
