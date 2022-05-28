<template>
	<div class="cdx-docs-font-demo" :style="style">
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
	name: 'CdxDocsFontDemo',
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
.cdx-docs-font-demo {
	p {
		line-height: inherit;
	}
}
</style>
