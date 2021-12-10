<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from 'design-tokens/dist/index.json';
</script>

# Transition

<TokensTable
	:tokens="tokens.transition"
	token-demo="TransitionDemo"
	css-property="transition"
/>

## Transition-duration

<TokensTable
	:tokens="tokens['transition-duration']"
	token-demo="TransitionDemo"
	css-property="transition-duration"
/>

## Transition-timing-function

<TokensTable
	:tokens="tokens['transition-timing-function']"
	token-demo="TransitionDemo"
	css-property="transition-timing-function"
/>


## Transition-property

<TokensTable
	:tokens="tokens['transition-property']"
	token-demo="TransitionDemo"
	css-property="transition-property"
/>

