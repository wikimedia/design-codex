<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { outline } from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Outline

<cdx-docs-tokens-table
	:tokens="outline"
	token-demo="CdxDocsBoxShadowDemo"
	css-property="outline"
/>
