<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Color

## Text colors

<cdx-docs-tokens-table
	:tokens="tokens.color"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Background colors

<cdx-docs-tokens-table
	:tokens="tokens['background-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Accent color

<cdx-docs-tokens-table
	:tokens="tokens['accent-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Border and box-shadow colors

For information on border colors visit
[Border](/design-tokens/border) and for box-shadow colors [Box-shadow](/design-tokens/box-shadow)
token page.

## Deprecated token aliases

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.color"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

<cdx-docs-tokens-table
	:tokens="aliases['background-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>
