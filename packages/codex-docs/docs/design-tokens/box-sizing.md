<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Box sizing

<TokensTable
	:tokens="tokens['box-sizing']"
/>
