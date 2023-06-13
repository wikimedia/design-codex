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
import { CdxLabel } from '../lib';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';
</script>
