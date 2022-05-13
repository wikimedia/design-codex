<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Size

## Size

The size tokens are used to define the size of elements, applied for example on the `width` and
`height` properties.

<cdx-docs-tokens-table
	:tokens="tokens.size"
	token-demo="CdxDocsSizeDemo"
/>

## Min-size

<cdx-docs-tokens-table
	:tokens="tokens['min-size']"
	token-demo="CdxDocsSizeDemo"
/>

## Max-width

<cdx-docs-tokens-table
	:tokens="tokens['max-width']"
	exclude-tokens="breakpoint"
	token-demo="CdxDocsSizeDemo"
	css-property="width"
/>
