<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Font

## Font family

<cdx-docs-tokens-table
	:tokens="tokens['font-family']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="font-family"
/>

## Font size

<cdx-docs-tokens-table
	:tokens="tokens['font-size']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="font-size"
/>

## Font weight

<cdx-docs-tokens-table
	:tokens="tokens['font-weight']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="font-weight"
/>

## Line height

<cdx-docs-tokens-table
	:tokens="tokens['line-height']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="line-height"
/>

## Text decoration

<cdx-docs-tokens-table
	:tokens="tokens['text-decoration']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="text-decoration"
/>
