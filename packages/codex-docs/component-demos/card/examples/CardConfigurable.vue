<template>
	<cdx-card
		:url="url"
		:icon="icon"
		:force-thumbnail="forceThumbnail"
		:thumbnail-position="thumbnailPosition"
		:thumbnail-size="thumbnailSize"
		:separation="separation"
	>
		<template #title>
			<slot name="title" />
		</template>
		<template #description>
			<slot name="description" />
		</template>
		<template #supporting-text>
			<slot name="supporting-text" />
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CardConfigurable',
	components: { CdxCard },
	props: {
		url: {
			type: String,
			default: ''
		},
		icon: {
			type: [ String, Object ],
			default: ''
		},
		forceThumbnail: {
			type: Boolean,
			default: false
		},
		thumbnailPosition: {
			type: String,
			default: 'inline-start'
		},
		thumbnailSize: {
			type: String,
			default: 'small'
		},
		separation: {
			type: String,
			default: 'outline'
		}
	}
} );
</script>
