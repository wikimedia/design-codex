<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { position } from 'design-tokens/dist/index.json';
</script>

# Position

<TokensTable
	:tokens="position"
	token-demo="PositionDemo"
/>
