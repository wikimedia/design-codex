<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Box shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	token-demo="CdxDocsTokenDemo"
	css-property="box-shadow"
	demo-class="cdx-docs-box-shadow-demo"
/>
