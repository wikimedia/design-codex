<template>
	<div class="cdx-docs-font-demo" :style="style">
		<p>
			The quick brown fox
			<br>
			jumps over the lazy dog.
			<span class="cdx-docs-font-demo__text-overflow-addition">
				Sometimes twice, sometimes three times.
			</span>
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
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-table .cdx-docs-font-demo {
	p {
		line-height: inherit;
	}

	.cdx-docs-font-demo__text-overflow-addition {
		display: none;
	}
}

.cdx-docs-tokens-table [ class*='cdx-docs-tokens-demo__token--text-overflow' ] {
	> p {
		max-width: @size-2400;
		text-overflow: inherit;
	}

	.cdx-docs-font-demo__text-overflow-addition {
		display: inline;
	}

	br {
		display: none;
	}
}

.cdx-docs-tokens-table .cdx-docs-tokens-demo {
	.cdx-docs-tokens-demo__token--text-overflow-clip {
		> p {
			overflow: visible;
			white-space: normal;
		}
	}

	:not( .cdx-docs-tokens-demo__token--text-overflow-clip ) {
		> p {
			overflow: hidden;
			white-space: nowrap;
		}
	}
}
</style>
