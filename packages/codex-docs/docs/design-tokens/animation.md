<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Animation

## Animation delay

<cdx-docs-tokens-table
	:tokens="tokens['animation-delay']"
	token-demo="CdxDocsAnimationDemo"
	css-property="animation-delay"
/>

## Animation duration

<cdx-docs-tokens-table
	:tokens="tokens['animation-duration']"
	token-demo="CdxDocsAnimationDemo"
	css-property="animation-duration"
/>

## Animation timing function

<cdx-docs-tokens-table
	:tokens="tokens['animation-timing-function']"
	token-demo="CdxDocsAnimationDemo"
	css-property="animation-timing-function"
/>