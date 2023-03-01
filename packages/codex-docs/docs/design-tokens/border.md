<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Border

## Border width

<cdx-docs-tokens-table
	:tokens="tokens['border-width']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-width"
/>

## Border style

<cdx-docs-tokens-table
	:tokens="tokens['border-style']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-style"
/>

## Border color

<cdx-docs-tokens-table
	:tokens="tokens['border-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-color"
/>

## Border radius
<cdx-docs-tokens-table
	:tokens="tokens['border-radius']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-radius"
/>

## Deprecated aliases in WikimediaUI Base

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.border"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border"
/>

<cdx-docs-tokens-table
	:tokens="aliases['border-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-color"
/>
