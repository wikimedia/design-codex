<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Size

## Size

<CdxDocsTokensTable
	:tokens="tokens.size"
	token-demo="CdxDocsSizeDemo"
/>

## Min-size

<CdxDocsTokensTable
	:tokens="tokens['min-size']"
	token-demo="CdxDocsSizeDemo"
/>

## Width

<CdxDocsTokensTable
	:tokens="tokens.width"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>

## Max-width

<CdxDocsTokensTable
	:tokens="tokens['max-width']"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>

## Min-height

<CdxDocsTokensTable
	:tokens="tokens['min-height']"
	token-demo="CdxDocsSizeDemo"
	css-property="height"
/>

## Min-width

<CdxDocsTokensTable
	:tokens="tokens['min-width']"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>
