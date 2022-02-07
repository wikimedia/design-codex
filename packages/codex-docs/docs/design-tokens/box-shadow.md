<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Box shadow

<TokensTable
	:tokens="tokens['box-shadow']"
	token-demo="BoxShadowDemo"
	css-property="box-shadow"
/>
