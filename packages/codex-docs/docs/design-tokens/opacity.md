<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Opacity

<cdx-docs-tokens-table
	:tokens="tokens.opacity"
	token-demo="CdxDocsTokenDemo"
	token-category="opacity"
	css-property="opacity"
/>

## Opacity Icon

Legacy opacity for Icon states in CSS-only component and non-Codex products.

<cdx-docs-tokens-table
	:tokens="tokens['opacity-icon']"
	token-demo="CdxDocsTokenDemo"
	token-category="opacity-icon"
	css-property="opacity"
/>