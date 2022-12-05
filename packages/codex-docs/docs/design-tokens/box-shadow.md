<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Box shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>
