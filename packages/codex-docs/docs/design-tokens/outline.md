<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { outline } from '@wikimedia/codex-design-tokens/index.json';
</script>

# Outline

<cdx-docs-tokens-table
	:tokens="outline"
	token-demo="CdxDocsTokenDemo"
	token-category="outline"
	css-property="outline"
/>
