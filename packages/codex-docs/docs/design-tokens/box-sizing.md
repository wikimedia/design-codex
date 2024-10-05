<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Box sizing

<cdx-docs-tokens-table
	:tokens="tokens['box-sizing']"
	token-category="box-sizing"
/>
