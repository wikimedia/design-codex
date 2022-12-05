<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { spacing, padding } from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Spacing

`spacing` design tokens are applied in `padding` and `margin` properties.
They are used to create a consistent spacing within and between components.

<cdx-docs-tokens-table
	:tokens="spacing"
	token-demo="CdxDocsSpacingDemo"
/>

## Padding

`padding` category design tokens are deprecated and only `spacing` tokens should be used.
They are here for backwards compatibility with WikimediaUI Base uses.

<cdx-docs-tokens-table
	:tokens="padding"
	token-demo="CdxDocsTokenDemo"
	token-category="padding"
	css-property="padding"
	style-target="wrapper"
/>
