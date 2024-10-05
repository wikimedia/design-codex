<script setup>
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import defaultModeTokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import darkModeTokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui-mode-dark.json';

const { isDark } = useData();

const isMounted = ref( false );
onMounted( () => { isMounted.value = true; } );

// We have to update this on mount to force the server-rendered HTML, which includes inlined styles
// for the color demo circles' background-colors, to update.
const tokens = computed( () => isMounted.value && isDark.value ? darkModeTokens : defaultModeTokens );
</script>

# Color

For documentation on the entire color palette, visit [Colors](../style-guide/colors.md).

:::tip
Some colors vary between light and dark modes. Use the color mode switcher in the site header to see
the colors in the different modes. Using design tokens rather than raw hex codes will ensure you're
automatically using the right color for the chosen mode.
:::

## Text colors

<cdx-docs-tokens-table
	:tokens="tokens.color"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Background colors

<cdx-docs-tokens-table
	:tokens="tokens['background-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Accent color

<cdx-docs-tokens-table
	:tokens="tokens['accent-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Border and box-shadow colors

For information on border colors visit
[Border](/design-tokens/border) and for box-shadow colors [Box-shadow](/design-tokens/box-shadow)
token page.
