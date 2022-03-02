<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Transition

<cdx-docs-tokens-table
	:tokens="tokens.transition"
	token-demo="CdxDocsTransitionDemo"
	css-property="transition"
/>

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
