<template>
	<section id="cdx-link">
		<h2>Link</h2>
		<h3>Standard Link</h3>
		<p> Lorem ipsum <a class="my-custom-link-class" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Underlined Link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-underlined" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Icon Link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class" href="https://example.com"><cdx-icon :icon="cdxIconLink" />dolor sic amet</a></p>
		<p>Lorem ipsum <a class="my-custom-link-class is-underlined" href="https://example.com">dolor sic amet <cdx-icon :icon="cdxIconLinkExternal" /></a></p>

		<h3>Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Underlined Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link is-underlined" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Icon Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link" href="https://example.com"><cdx-icon :icon="cdxIconLink" />dolor sic amet</a></p>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link is-underlined" href="https://example.com">dolor sic amet <cdx-icon :icon="cdxIconLinkExternal" /></a></p>
	</section>
</template>

<script lang="ts" setup>
import { CdxIcon } from '../lib';
import { cdxIconLink, cdxIconLinkExternal } from '@wikimedia/codex-icons';
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/link.less';

// stylelint-disable selector-class-pattern
a.my-custom-link-class {
	.cdx-mixin-link();

	.cdx-icon {
		color: inherit;
		margin-right: @spacing-x-small;
	}
}
</style>
