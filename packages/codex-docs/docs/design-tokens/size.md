<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Size

## Size

<TokensTable
	:tokens="tokens.size"
	token-demo="SizeDemo"
/>

## Min-size

<TokensTable
	:tokens="tokens['min-size']"
	token-demo="SizeDemo"
/>

## Width

<TokensTable
	:tokens="tokens.width"
	token-demo="SizeDemo"
	css-property="width"
/>

## Max-width

<TokensTable
	:tokens="tokens['max-width']"
	token-demo="SizeDemo"
	css-property="width"
/>

## Min-height

<TokensTable
	:tokens="tokens['min-height']"
	token-demo="SizeDemo"
	css-property="height"
/>

## Min-width

<TokensTable
	:tokens="tokens['min-width']"
	token-demo="SizeDemo"
	css-property="width"
/>
