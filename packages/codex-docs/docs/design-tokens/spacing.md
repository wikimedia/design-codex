<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import { spacing } from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import aliases from '@wikimedia/codex-design-tokens/deprecated-aliases-wikimedia-ui-base.json';
</script>

# Spacing

`spacing` design tokens are applied in `padding` and `margin` properties.
They are used to create a consistent spacing within and between components.

<cdx-docs-tokens-table
	:tokens="spacing"
	token-demo="CdxDocsSpacingDemo"
/>

## Deprecated token aliases

:::warning
The tokens below are **not available in Codex**. There are only available as deprecated aliases in
[WikimediaUI Base](https://www.npmjs.com/package/wikimedia-ui-base).
:::

<cdx-docs-tokens-table
	:tokens="aliases.padding"
	token-demo="CdxDocsSpacingDemo"
/>
