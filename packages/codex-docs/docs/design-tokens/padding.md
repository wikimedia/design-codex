<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { padding } from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Padding

<cdx-docs-tokens-table
	:tokens="padding"
	token-demo="CdxDocsTokenDemo"
	token-category="padding"
	css-property="padding"
	style-target="wrapper"
/>
