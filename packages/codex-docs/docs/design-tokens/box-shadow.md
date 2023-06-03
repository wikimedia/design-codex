<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
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

## Deprecated token aliases

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases['box-shadow']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

<style lang="less">
@import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-demo--box-shadow-color {
	.cdx-docs-tokens-demo__token {
		box-shadow: @box-shadow-inset-small var( --cdx-demo-box-shadow-color );
	}
}
</style>
