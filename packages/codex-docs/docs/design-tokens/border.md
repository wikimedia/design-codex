<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
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
