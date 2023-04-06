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

		<h3>CSS-only version</h3>

		<!-- Basic card -->
		<span class="cdx-card">
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Card title</span>
				<span class="cdx-card__text__description">Description</span>
				<span class="cdx-card__text__supporting-text">Supporting text</span>
			</span>
		</span>

		<br>

		<!-- Card with image -->
		<span class="cdx-card">
			<span class="cdx-card__thumbnail cdx-thumbnail">
				<span
					class="cdx-thumbnail__image cdx-demo-colored-pencils"
					:style="{ backgroundImage: `url( ${thumbnailData.url } )` }"
				/>
			</span>
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Card title</span>
				<span class="cdx-card__text__description">Description</span>
			</span>
		</span>

		<br>

		<!-- Card with icon -->
		<span class="cdx-card">
			<span class="cdx-card__icon cdx-demo-css-icon--robot" />
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Card title</span>
				<span class="cdx-card__text__description">Description</span>
			</span>
		</span>
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

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon--robot {
	.cdx-mixin-css-icon( @cdx-icon-robot );
}
</style>
