<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-tokens/dist/index.json';
</script>

# Color

## Text colors

<TokensTable
	:tokens="tokens.color"
	token-demo="ColorDemo"
/>

## Background colors

<TokensTable
	:tokens="tokens['background-color']"
	token-demo="ColorDemo"
/>
