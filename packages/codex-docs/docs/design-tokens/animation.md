<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Animation

## Animation delay

<cdx-docs-tokens-table
	:tokens="tokens['animation-delay']"
	token-demo="CdxDocsTokenDemo"
	css-property="animation-delay"
	demo-class="cdx-docs-animation-demo"
	style-target="inner"
/>

## Animation duration

<cdx-docs-tokens-table
	:tokens="tokens['animation-duration']"
	token-demo="CdxDocsTokenDemo"
	css-property="animation-duration"
	demo-class="cdx-docs-animation-demo"
	style-target="inner"
/>

## Animation timing function

<cdx-docs-tokens-table
	:tokens="tokens['animation-timing-function']"
	token-demo="CdxDocsTokenDemo"
	css-property="animation-timing-function"
	demo-class="cdx-docs-animation-demo"
	style-target="inner"
/>