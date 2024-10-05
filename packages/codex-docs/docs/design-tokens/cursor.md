<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Cursor

<cdx-docs-tokens-table
	:tokens="tokens.cursor"
	token-demo="CdxDocsCursorDemo"
	token-category="cursor"
	css-property="cursor"
/>
