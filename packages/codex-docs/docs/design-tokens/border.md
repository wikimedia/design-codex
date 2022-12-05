<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Border

## Width

<cdx-docs-tokens-table
	:tokens="tokens['border-width']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-width"
/>

## Style

<cdx-docs-tokens-table
	:tokens="tokens['border-style']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-style"
/>

## Color

<cdx-docs-tokens-table
	:tokens="tokens['border-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-color"
/>

## Radius
<cdx-docs-tokens-table
	:tokens="tokens['border-radius']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-radius"
/>
