<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/index.json';
</script>

# Transition

## Transition-duration

<cdx-docs-tokens-table
	:tokens="tokens['transition-duration']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-duration"
/>

## Transition-timing-function

<cdx-docs-tokens-table
	:tokens="tokens['transition-timing-function']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-timing-function"
/>


## Transition-property

<cdx-docs-tokens-table
	:tokens="tokens['transition-property']"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition-property"
/>

## Transition shorthand

<cdx-docs-tokens-table
	:tokens="tokens.transition"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition"
/>
