<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Size

## Size

The size tokens are used to define the size of elements, applied for example on the `width` and
`height` properties.

<cdx-docs-tokens-table
	:tokens="tokens.size"
	token-demo="CdxDocsSizeDemo"
/>

## Minimum size

<cdx-docs-tokens-table
	:tokens="tokens['min-size']"
	token-demo="CdxDocsSizeDemo"
/>

## Maximum width

<cdx-docs-tokens-table
	:tokens="tokens['max-width']"
	exclude-tokens="breakpoint"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>

## Deprecated token aliases

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.size"
	token-demo="CdxDocsSizeDemo"
/>

<cdx-docs-tokens-table
	:tokens="aliases['min-size']"
	token-demo="CdxDocsSizeDemo"
/>
