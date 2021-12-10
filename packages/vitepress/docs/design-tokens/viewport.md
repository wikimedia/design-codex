<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { viewport } from 'design-tokens/dist/index.json';
</script>

# Viewport

<TokensTable
	:tokens="viewport"
/>
