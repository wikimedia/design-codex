<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { outline } from 'design-tokens/dist/index.json';
</script>

# Outline

<TokensTable
	:tokens="outline"
	token-demo="BoxShadowDemo"
	css-property="outline"
/>
