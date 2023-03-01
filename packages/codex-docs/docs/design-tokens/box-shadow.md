<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Box shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Deprecated aliases in WikimediaUI Base

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
