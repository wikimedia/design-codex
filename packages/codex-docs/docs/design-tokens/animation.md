<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-tokens/dist/index.json';
</script>

# Animation

## Animation-delay

<TokensTable
	:tokens="tokens['animation-delay']"
	token-demo="AnimationDemo"
	css-property="animation-delay"
/>

## Animation-duration

<TokensTable
	:tokens="tokens['animation-duration']"
	token-demo="AnimationDemo"
	css-property="animation-duration"
/>