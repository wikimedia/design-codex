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

# Box shadow

:::tip
Some box shadow colors vary between light and dark modes. Use the color mode switcher in the site
header to check the box shadow colors in the different modes. Using design tokens rather than raw hex
codes will ensure you're automatically using the right color for the chosen mode.
:::

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	exclude-tokens="color"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Box shadow colors
<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['color']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow-color"
	css-property="--cdx-demo-box-shadow-color"
/>

<style lang="less">
@import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-demo--box-shadow-color {
	.cdx-docs-tokens-demo__token {
		box-shadow: @box-shadow-inset-small var( --cdx-demo-box-shadow-color );
	}
}
</style>
