<script setup>
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import defaultModeTokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
import darkModeTokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui-mode-dark.json';

const { isDark } = useData();

const isMounted = ref( false );
onMounted( () => { isMounted.value = true; } );

// We have to update this on mount to force the server-rendered HTML to update.
const tokens = computed( () => isMounted.value && isDark.value ? darkModeTokens : defaultModeTokens );
</script>

# Border

:::tip
Some border colors vary between light and dark modes. Use the color mode switcher in the site
header to see the border colors in the different modes. Using design tokens rather than raw hex
codes will ensure you're automatically using the right color for the chosen mode.
:::

## Border width

<cdx-docs-tokens-table
	:tokens="tokens['border-width']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-width"
/>

## Border style

<cdx-docs-tokens-table
	:tokens="tokens['border-style']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-style"
/>

## Border color

<cdx-docs-tokens-table
	:tokens="tokens['border-color']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-color"
/>

## Border (shorthand)

Note, that only most common shorthands are provided given the number of border-color variants.

<cdx-docs-tokens-table
	:tokens="tokens['border']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border"
/>

## Border radius
<cdx-docs-tokens-table
	:tokens="tokens['border-radius']"
	token-demo="CdxDocsTokenDemo"
	token-category="border"
	css-property="border-radius"
/>
