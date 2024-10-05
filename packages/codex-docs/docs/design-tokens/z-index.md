<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Z-Index

There are `z-index` tokens for different layout items. Only use the stacking tokens at the end of this list when layering items in a component or a small area within a layout.

<cdx-docs-tokens-table
	:tokens="tokens['z-index']"
    token-category="z-index"
/>
