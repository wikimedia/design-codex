<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Color

## Text colors

<cdx-docs-tokens-table
	:tokens="tokens.color"
	token-demo="CdxDocsTokenDemo"
	css-property="background-color"
	demo-class="cdx-docs-color-demo"
/>

## Background colors

<cdx-docs-tokens-table
	:tokens="tokens['background-color']"
	token-demo="CdxDocsTokenDemo"
	css-property="background-color"
	demo-class="cdx-docs-color-demo"
/>
