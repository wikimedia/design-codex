<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Box shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	exclude-tokens="color"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Box shadow colors
<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['color']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow-color"
	css-property="--cdx-demo-box-shadow-color"
/>

<style lang="less">
@import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-demo--box-shadow-color {
	.cdx-docs-tokens-demo__token {
		box-shadow: @box-shadow-inset-small var( --cdx-demo-box-shadow-color );
	}
}
</style>
