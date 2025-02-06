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

## Text color

<cdx-docs-tokens-table
	:tokens="tokens.color"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Background color

<cdx-docs-tokens-table
	:tokens="tokens['background-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>

## Border color

For more information on border tokens visit the [Border](/design-tokens/border) page.

<cdx-docs-tokens-table
	:tokens="tokens['border-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-color"
/>

## Box-shadow color

For more information on border tokens visit the [Box-shadow](/design-tokens/box-shadow) page.

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['color']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow-color"
	css-property="--cdx-demo-box-shadow-color"
/>

## Accent color

<cdx-docs-tokens-table
	:tokens="tokens['accent-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="color"
	css-property="background-color"
/>
