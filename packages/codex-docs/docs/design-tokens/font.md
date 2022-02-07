<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Font

## Font-family

<TokensTable
	:tokens="tokens['font-family']"
	token-demo="FontDemo"
	css-property="font-family"
/>

## Font-weight

<TokensTable
	:tokens="tokens['font-weight']"
	token-demo="FontDemo"
	css-property="font-weight"
/>

## Line-height

<TokensTable
	:tokens="tokens['line-height']"
	token-demo="FontDemo"
	css-property="line-height"
/>
