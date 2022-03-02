<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Z-Index

<cdx-docs-tokens-table
	:tokens="tokens['z-index']"
/>
