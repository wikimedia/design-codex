<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Box sizing

<CdxDocsTokensTable
	:tokens="tokens['box-sizing']"
/>
