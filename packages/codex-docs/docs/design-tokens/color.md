<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Color

## Text colors

<CdxDocsTokensTable
	:tokens="tokens.color"
	token-demo="CdxDocsColorDemo"
/>

## Background colors

<CdxDocsTokensTable
	:tokens="tokens['background-color']"
	token-demo="CdxDocsColorDemo"
/>
