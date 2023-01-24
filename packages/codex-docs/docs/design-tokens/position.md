<script setup>
import CdxDocsTokensTable from '../../src/components/tokens/TokensTable.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';
</script>

# Position

<cdx-docs-tokens-table
	:tokens="tokens.position"
	token-demo="CdxDocsTokenDemo"
	token-category="position"
	css-property="left"
	style-target="inner"
/>

# Background position

<cdx-docs-tokens-table
	:tokens="tokens['background-position']"
	token-demo="CdxDocsTokenDemo"
	token-category="background-position"
	css-property="background-position"
/>