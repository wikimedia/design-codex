<template>
	<section id="cdx-accordion">
		<h2>Accordion</h2>
		<h3>Accordion with title and content</h3>
		<cdx-accordion>
			<template #title>
				Accordion title
			</template>
			Accordion content
		</cdx-accordion>

		<h3>Accordion with a title and an image as a content</h3>
		<cdx-accordion>
			<template #title>
				Accordion title 2
			</template>
			<img
				alt="mediawiki logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
			>
		</cdx-accordion>

		<h3>Accordion with an action icon</h3>
		<cdx-accordion :action-icon="cdxIconEdit">
			<template #title>
				Accordion title
			</template>
			Accordion content
		</cdx-accordion>

		<h3>Accordions stacked on each other</h3>
		<cdx-accordion>
			<template #title>
				Accordion title 1
			</template>
			Accordion content 1
		</cdx-accordion>
		<cdx-accordion>
			<template #title>
				Accordion title 2
			</template>
			Accordion content 2
		</cdx-accordion>
		<cdx-accordion>
			<template #title>
				Accordion title 3
			</template>
			Accordion content 3
		</cdx-accordion>
	</section>
</template>

<script setup lang="ts">
import { cdxIconEdit } from '@wikimedia/codex-icons';
import { CdxAccordion } from '../lib';
</script>
