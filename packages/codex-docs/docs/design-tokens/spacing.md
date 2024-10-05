<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { spacing } from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Spacing

`spacing` design tokens are applied in `padding` and `margin` properties.
They are used to create a consistent spacing within and between components.

<cdx-docs-tokens-table
	:tokens="spacing"
    token-category="spacing"
/>
