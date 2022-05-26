<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Border

## Width

<cdx-docs-tokens-table
	:tokens="tokens['border-width']"
	token-demo="CdxDocsTokenDemo"
	css-property="border-width"
	demo-class="cdx-docs-border-demo"
/>

## Style

<cdx-docs-tokens-table
	:tokens="tokens['border-style']"
	token-demo="CdxDocsTokenDemo"
	css-property="border-style"
	demo-class="cdx-docs-border-demo"
/>

## Color

<cdx-docs-tokens-table
	:tokens="tokens['border-color']"
	token-demo="CdxDocsTokenDemo"
	css-property="border-color"
	demo-class="cdx-docs-border-demo"
/>

## Radius
<cdx-docs-tokens-table
	:tokens="tokens['border-radius']"
	token-demo="CdxDocsTokenDemo"
	css-property="border-radius"
	demo-class="cdx-docs-border-demo"
/>
