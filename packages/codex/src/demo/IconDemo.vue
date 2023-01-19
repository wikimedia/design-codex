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
	</section>
</template>

<script lang="ts" setup>
import { CdxIcon } from '../lib';
import { cdxIconArrowNext, cdxIconBold, cdxIconArticleCheck } from '@wikimedia/codex-icons';
</script>
