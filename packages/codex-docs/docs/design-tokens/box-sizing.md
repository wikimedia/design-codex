<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Box sizing

<cdx-docs-tokens-table
	:tokens="tokens['box-sizing']"
/>
