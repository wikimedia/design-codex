<template>
	<div class="vp-font-demo" :style="style">
		<p>
			The quick brown fox
			<br>
			jumps over the lazy dog.
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent( {
	name: 'FontDemo',
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
@import ( reference ) '@wikimedia/codex-tokens/dist/theme-wikimedia-ui.less';

.vp-font-demo {
	p {
		line-height: inherit;
	}
}
</style>
