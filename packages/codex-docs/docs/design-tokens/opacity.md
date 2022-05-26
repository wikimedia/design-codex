<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { opacity } from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Opacity

<cdx-docs-tokens-table
	:tokens="opacity"
	token-demo="CdxDocsTokenDemo"
	css-property="opacity"
	demo-class="cdx-docs-opacity-demo"
/>
