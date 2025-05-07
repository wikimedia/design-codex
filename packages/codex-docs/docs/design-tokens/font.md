<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Font

## Font family

When referring to `sans-serif` or `serif`, the font-family that will be used is dependent on the operating system. For example, the default sans-serif font in Windows is [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI), and the default sans-serif font in macOS is [SF Pro](https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface)#SF_Pro/SF_UI). Other common system sans-serif fonts include [Arial](https://en.wikipedia.org/wiki/Arial), [Roboto](https://en.wikipedia.org/wiki/Roboto), and [Helvetica](https://en.wikipedia.org/wiki/Helvetica). Common system serif fonts include [Times New Roman](https://en.wikipedia.org/wiki/Times_New_Roman) and [Georgia](https://en.wikipedia.org/wiki/Georgia_(typeface)).

<cdx-docs-tokens-table
	:tokens="tokens['font-family']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="font-family"
/>

## Font size

:::tip
Font size design tokens are referencing CSS custom properties rather than raw values. This means
that the tokens will not work in various preprocessor functions (like Less `unit()`) and
may require relying on CSS `calc()` function for basic calculations.
:::

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

:::tip
Line height design tokens are referencing CSS custom properties rather than raw values. This means
that the tokens will not work in various preprocessor functions (like Less `unit()`) and
may require relying on CSS `calc()` function for basic calculations.
:::

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

## Text overflow

<cdx-docs-tokens-table
	:tokens="tokens['text-overflow']"
	token-demo="CdxDocsFontDemo"
	token-category="font"
	css-property="text-overflow"
/>
