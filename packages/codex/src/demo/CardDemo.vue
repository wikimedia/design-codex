<template>
	<section id="cdx-card">
		<h2>Card</h2>

		<!-- Basic card -->
		<cdx-card>
			<template #title>
				Card title
			</template>
			<template #description>
				Description
			</template>
			<template #supporting-text>
				Supporting text
			</template>
		</cdx-card>

		<br>

		<!-- Card with image -->
		<cdx-card :thumbnail="thumbnailData">
			<template #title>
				Card title
			</template>
			<template #description>
				Description
			</template>
		</cdx-card>

		<br>

		<!-- Card with icon -->
		<cdx-card :icon="cdxIconRobot">
			<template #title>
				Card title
			</template>
			<template #description>
				Description
			</template>
		</cdx-card>
	</section>
</template>

<script lang="ts" setup>
import { CdxCard, Thumbnail } from '../lib';
import { cdxIconRobot } from '@wikimedia/codex-icons';

const thumbnailData: Thumbnail = {
	width: 200,
	height: 150,
	url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};
</script>
