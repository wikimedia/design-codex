<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Cursor

<TokensTable
	:tokens="tokens.cursor"
	token-demo="CdxDocsTokenDemo"
	css-property="cursor"
	demo-class="cdx-docs-cursor-demo"
/>
