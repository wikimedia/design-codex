<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { padding } from 'design-tokens/dist/index.json';
</script>

# Padding

<TokensTable
	:tokens="padding"
	token-demo="PaddingDemo"
	css-property="padding"
/>
