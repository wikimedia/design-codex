<script setup>
import TokensTable from '../../src/components/tokens/TokensTable.vue';
import { spacing } from '@wikimedia/codex-design-tokens/dist/index.json';
</script>

# Spacing

<TokensTable
	:tokens="spacing"
	token-demo="SpacingDemo"
/>
