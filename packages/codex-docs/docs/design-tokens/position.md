<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { position } from '@wikimedia/codex-design-tokens/index.json';
</script>

# Position

<cdx-docs-tokens-table
	:tokens="position"
	token-demo="CdxDocsTokenDemo"
	token-category="position"
	css-property="left"
	style-target="inner"
/>
