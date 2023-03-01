<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Opacity

<cdx-docs-tokens-table
	:tokens="tokens.opacity"
	token-demo="CdxDocsTokenDemo"
	token-category="opacity"
	css-property="opacity"
/>

## Opacity Icon

Legacy opacity for Icon states in CSS-only component and non-Codex products.

<cdx-docs-tokens-table
	:tokens="tokens['opacity-icon']"
	token-demo="CdxDocsTokenDemo"
	token-category="opacity-icon"
	css-property="opacity"
/>

## Deprecated aliases in WikimediaUI Base

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.opacity"
	token-demo="CdxDocsTokenDemo"
	token-category="opacity"
	css-property="opacity"
/>
