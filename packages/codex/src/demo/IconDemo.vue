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
			<span class="cdx-demo-css-icon cdx-demo-css-icon--cancel" />
			Cancel
		</p>
		<h4>Icon sizes</h4>
		<p>
			<span class="cdx-demo-css-icon--bookmark" />
			Bookmark (medium)
		</p>
		<p>
			<span class="cdx-demo-css-icon--bell" />
			Bell (small)
		</p>
		<p>
			<span class="cdx-demo-css-icon--arrow-next" />
			Arrow next (extra-small)
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
	&--tag {
		.cdx-mixin-css-icon( @cdx-icon-tag );
	}

	&--cancel {
		.cdx-mixin-css-icon( @cdx-icon-cancel, @color-destructive );
	}

	&--bookmark {
		.cdx-mixin-css-icon( @cdx-icon-bookmark );
	}

	&--bell {
		.cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
	}

	&--arrow-next {
		.cdx-mixin-css-icon( @cdx-icon-arrow-next, @color-progressive, @size-icon-x-small );
	}

	&--article {
		.cdx-mixin-css-icon( @cdx-icon-article );
	}

	&--article-not-found {
		.cdx-mixin-css-icon( @cdx-icon-article-not-found );
	}

	&--articles-search {
		.cdx-mixin-css-icon( @cdx-icon-articles-search );
	}

	&--strikethrough {
		.cdx-mixin-css-icon( @cdx-icon-strikethrough );
	}
}
</style>
