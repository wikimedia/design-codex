<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Animation

## Animation-delay

<CdxDocsTokensTable
	:tokens="tokens['animation-delay']"
	token-demo="CdxDocsAnimationDemo"
	css-property="animation-delay"
/>

## Animation-duration

<CdxDocsTokensTable
	:tokens="tokens['animation-duration']"
	token-demo="CdxDocsAnimationDemo"
	css-property="animation-duration"
/>