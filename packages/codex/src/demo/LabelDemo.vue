<template>
	<section id="cdx-label">
		<h2>Label</h2>
		<cdx-label :icon="cdxIconUserAvatar">
			Label text
			<template #description>
				<a href="#">Wikifunctions</a> input type
			</template>
		</cdx-label>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxLabel from '../components-wip/label/Label.vue';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';
</script>
