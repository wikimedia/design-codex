<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Breakpoint

## Min-Width

<cdx-docs-tokens-table
	:tokens="tokens['min-width']['breakpoint']"
	token-category="breakpoint"
/>

## Max-Width

<cdx-docs-tokens-table
	:tokens="tokens['max-width']['breakpoint']"
	token-category="breakpoint"
/>