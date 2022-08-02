<template>
	<section id="cdx-icon">
		<h2>Icons</h2>
		<p dir="rtl">
			<cdx-icon :icon="cdxIconArrowNext" /> next
		</p>
		<p lang="nl" dir="ltr">
			<cdx-icon :icon="cdxIconBold" /> Bold
		</p>
	</section>
</template>

<script lang="ts" setup>
import { CdxIcon } from '../lib';
import { cdxIconArrowNext, cdxIconBold } from '@wikimedia/codex-icons';
</script>
