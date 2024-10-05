<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Size

The size tokens are used to define the size of elements, applied for example on the `width` and `height` properties.

## Size

<cdx-docs-tokens-table
	:tokens="tokens.size"
	token-category="size"
/>

## Minimum size

<cdx-docs-tokens-table
	:tokens="tokens['min-size']"
	token-category="min-size"
/>

## Maximum width

<cdx-docs-tokens-table
	:tokens="tokens['max-width']"
	exclude-tokens="breakpoint"
	token-category="max-width"
	css-property="width"
/>
