<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { position } from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Position

<TokensTable
	:tokens="position"
	token-demo="PositionDemo"
/>
