<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Cursor

<cdx-docs-tokens-table
	:tokens="tokens.cursor"
	token-demo="CdxDocsTokenDemo"
	token-category="cursor"
	css-property="cursor"
/>
