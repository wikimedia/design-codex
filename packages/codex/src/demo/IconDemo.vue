<template>
	<section id="cdx-icon">
		<h2>Icons</h2>
		<p dir="rtl">
			<cdx-icon :icon="cdxIconArrowNext" /> next
		</p>
		<p lang="nl" dir="ltr">
			<cdx-icon :icon="cdxIconBold" /> Bold
		</p>
		<p>
			<cdx-icon
				:icon="cdxIconArticleCheck"
				icon-label="A label to describe the icon."
			/> article check
		</p>
		<h3>
			CSS-only version
		</h3>
		<h4>Simple icon</h4>
		<p>
			<span class="cdx-demo-css-icon cdx-demo-css-icon--tag" />
			Label
		</p>
		<h4>Icon with color</h4>
		<p>
			<span class="cdx-demo-css-icon cdx-demo-css-icon--trash" />
			Delete
		</p>
		<h4>Flip for RTL</h4>
		<p>
			<span dir="ltr" class="cdx-demo-css-icon cdx-demo-css-icon--article" />
			Article (LTR)
		</p>
		<p>
			<span dir="rtl" class="cdx-demo-css-icon cdx-demo-css-icon--article" />
			Article (RTL)
		</p>
		<h4>Flip for RTL, with exceptions</h4>
		<p>
			<span
				dir="ltr"
				class="cdx-demo-css-icon cdx-demo-css-icon--article-not-found"
			/>
			Article not found (LTR)
		</p>
		<p>
			<span
				dir="rtl"
				class="cdx-demo-css-icon cdx-demo-css-icon--article-not-found"
			/>
			Article not found (RTL)
		</p>
		<p>
			<span
				dir="rtl"
				lang="he"
				class="cdx-demo-css-icon cdx-demo-css-icon--article-not-found"
			/>
			Article not found (RTL, Hebrew)
		</p>
		<h4>Separate RTL icon</h4>
		<p>
			<span
				dir="ltr"
				class="cdx-demo-css-icon cdx-demo-css-icon--articles-search"
			/>
			Articles search (LTR)
		</p>
		<p>
			<span
				dir="rtl"
				class="cdx-demo-css-icon cdx-demo-css-icon--articles-search"
			/>
			Articles search (RTL)
		</p>
		<h4>Language variants</h4>
		<p lang="de">
			<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough" />
			Strikethrough (German)
		</p>
		<p lang="en">
			<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough" />
			Strikethrough (English)
		</p>
		<p lang="fi">
			<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough" />
			Strikethrough (Finnish)
		</p>
	</section>
</template>

<script lang="ts" setup>
import { CdxIcon } from '../lib';
import { cdxIconArrowNext, cdxIconBold, cdxIconArticleCheck } from '@wikimedia/codex-icons';
</script>

<style lang="less">
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--tag {
		.cdx-mixin-icon-background-image( @cdx-icon-tag );
	}

	&--trash {
		.cdx-mixin-icon-background-image( @cdx-icon-trash, @color-destructive );
	}

	&--article {
		.cdx-mixin-icon-background-image( @cdx-icon-article );
	}

	&--article-not-found {
		.cdx-mixin-icon-background-image( @cdx-icon-article-not-found );
	}

	&--articles-search {
		.cdx-mixin-icon-background-image( @cdx-icon-articles-search );
	}

	&--strikethrough {
		.cdx-mixin-icon-background-image( @cdx-icon-strikethrough );
	}
}
</style>
