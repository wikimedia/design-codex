<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Size

## Size

<cdx-docs-tokens-table
	:tokens="tokens.size"
	token-demo="CdxDocsSizeDemo"
/>

## Min-size

<cdx-docs-tokens-table
	:tokens="tokens['min-size']"
	token-demo="CdxDocsSizeDemo"
/>

## Width

<cdx-docs-tokens-table
	:tokens="tokens.width"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>

## Max-width

<cdx-docs-tokens-table
	:tokens="tokens['max-width']"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>

## Min-height

<cdx-docs-tokens-table
	:tokens="tokens['min-height']"
	token-demo="CdxDocsSizeDemo"
	css-property="height"
/>

## Min-width

<cdx-docs-tokens-table
	:tokens="tokens['min-width']"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>
