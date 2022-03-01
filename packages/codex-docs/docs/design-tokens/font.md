<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Font

## Font-family

<CdxDocsTokensTable
	:tokens="tokens['font-family']"
	token-demo="CdxDocsFontDemo"
	css-property="font-family"
/>

## Font-weight

<CdxDocsTokensTable
	:tokens="tokens['font-weight']"
	token-demo="CdxDocsFontDemo"
	css-property="font-weight"
/>

## Line-height

<CdxDocsTokensTable
	:tokens="tokens['line-height']"
	token-demo="CdxDocsFontDemo"
	css-property="line-height"
/>
