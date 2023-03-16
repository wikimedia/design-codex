<template>
	<section id="cdx-link">
		<h2>Link</h2>
		<h3>Standard Link</h3>
		<p> Lorem ipsum <a class="my-custom-link-class" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Underlined Link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-underlined" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Icon Link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-underlined" href="https://example.com">dolor sic amet<cdx-icon :icon="cdxIconLinkExternal" /></a></p>

		<h3>Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Underlined Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link is-underlined" href="https://example.com">dolor sic</a> amet.</p>

		<h3>Icon Red link</h3>
		<p>Lorem ipsum <a class="my-custom-link-class is-red-link is-underlined" href="https://example.com">dolor sic amet<cdx-icon :icon="cdxIconLinkExternal" /></a></p>

		<h3>Links with custom CSS selectors</h3>
		<div class="my-link-wrapper">
			<p>Lorem ipsum <a href="https://www.example.com">regular link</a></p>
			<p class="my-link-wrapper-with-underline">
				Lorem ipsum <a href="https://www.example.com">underlined link</a>
			</p>
			<p>Lorem ipsum <a class="my-link-red" href="https://www.example.com">regular red link</a></p>
			<p class="my-link-wrapper-with-underline">
				Lorem ipsum <a class="my-link-red" href="https://www.example.com">underlined red link</a>
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxIcon } from '../lib';
import { cdxIconLinkExternal } from '@wikimedia/codex-icons';
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/link.less';

a.my-custom-link-class {
	.cdx-mixin-link();

	.cdx-icon {
		color: inherit;
		margin-right: @spacing-25;
	}
}

.my-link-wrapper {
	a {
		.cdx-mixin-link-base();

		&.my-link-red {
			.cdx-mixin-link-red();
		}
	}

	&-with-underline a {
		.cdx-mixin-link-underlined();
	}
}
</style>
