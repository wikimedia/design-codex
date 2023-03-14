<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Transition

## Transition-duration

<cdx-docs-tokens-table
	:tokens="tokens['transition-duration']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-duration"
/>

## Transition-timing-function

<cdx-docs-tokens-table
	:tokens="tokens['transition-timing-function']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-timing-function"
/>


## Transition-property

<cdx-docs-tokens-table
	:tokens="tokens['transition-property']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-property"
/>

## Deprecated token aliases

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.transition"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition"
/>
