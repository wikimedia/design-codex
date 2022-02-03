<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-tokens/dist/index.json';
</script>

# Border

## Width

<TokensTable
	:tokens="tokens['border-width']"
	token-demo="BorderDemo"
	css-property="border-width"
/>

## Style

<TokensTable
	:tokens="tokens['border-style']"
	token-demo="BorderDemo"
	css-property="border-style"
/>

## Color

<TokensTable
	:tokens="tokens['border-color']"
	token-demo="BorderDemo"
	css-property="border-color"
/>

## Radius
<TokensTable
	:tokens="tokens['border-radius']"
	token-demo="BorderDemo"
	css-property="border-radius"
/>
