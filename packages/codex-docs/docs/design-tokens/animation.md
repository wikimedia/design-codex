<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Animation

## Animation delay

<cdx-docs-tokens-table
	:tokens="tokens['animation-delay']"
	token-demo="CdxDocsTokenDemo"
	token-category="animation"
	css-property="animation-delay"
	style-target="inner"
/>

## Animation duration

<cdx-docs-tokens-table
	:tokens="tokens['animation-duration']"
	token-demo="CdxDocsTokenDemo"
	token-category="animation"
	css-property="animation-duration"
	style-target="inner"
/>

## Animation timing function

<cdx-docs-tokens-table
	:tokens="tokens['animation-timing-function']"
	token-demo="CdxDocsTokenDemo"
	token-category="animation"
	css-property="animation-timing-function"
	style-target="inner"
/>