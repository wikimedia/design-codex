<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Size

The size tokens are used to define the size of elements, applied for example on the `width` and `height` properties.

## Size

:::tip
Some size design tokens, e.g. `size-icon` are referencing CSS custom properties rather than raw
values. This means that the tokens will not work in various preprocessor functions (like Less
`unit()`) and may require relying on CSS `calc()` function for basic calculations.
:::

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
