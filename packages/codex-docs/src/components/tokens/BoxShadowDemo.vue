<template>
	<div class="cdx-docs-box-shadow-demo" :style="style" />
</template>

<script lang="ts">
// TODO merge this with BorderDemo and/or ColorDemo
// TODO or rename it to cover the fact that it's also used for outline
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'CdxDocsBoxShadowDemo',
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

		return {
			style
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-box-shadow-demo {
	width: 100px;
	height: 50px;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		width: 300px;
	}
}
</style>
