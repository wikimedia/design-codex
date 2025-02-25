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

# Box-shadow

## Shadow (shorthand)

Shadows are used to show depth on the surface of a page. Borders are used alongside shadows to further emphasize the edge of a shape, especially in dark mode, where shadows are far more subtle.

The "light source" for these shadows is oriented between the top and center of the object which has the shadow applied. There are two levels of shadows in Codex represented as `small`, `medium`, and `large`.

- **Small** should be used for elements which other content disappears behind, and are on the lowest possible elevated plane, such as ProgressBars, toolbars, and collapsed headers.
- **Medium** should be used for elements which appear overtop of other content, but are triggered from a directly related element on the page, such as Menus.
- **Large** should be used for elements which appear overtop of an entire page or surface area, or require extra attention, such as Dialogs, Toasts, previews, and bottom sheets.

*Shadow levels should not change when a new plane is created. For example, a Menu which appears within a Dialog should still have a `medium` box-shadow.*

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']"
	exclude-tokens="tokens['drop']['inset']['outset']['color']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Inset shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['inset']"
	exclude-tokens="color"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Outset shadow

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['outset']"
	exclude-tokens="color"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

## Box-shadow color

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['color']"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow-color"
	css-property="--cdx-demo-box-shadow-color"
/>

## Drop shadow (deprecated)

*Drop shadows are deprecated, and [shadow shorthands](#shadow-shorthand) should be used instead.*

<cdx-docs-tokens-table
	:tokens="tokens['box-shadow']['drop']"
	exclude-tokens="color"
	token-demo="CdxDocsTokenDemo"
	token-category="box-shadow"
	css-property="box-shadow"
/>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-demo--box-shadow-color {
	.cdx-docs-tokens-demo__token {
		box-shadow: @box-shadow-inset-small var( --cdx-demo-box-shadow-color );
	}
}
</style>
