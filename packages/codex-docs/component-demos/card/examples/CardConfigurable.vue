<template>
	<cdx-card :url="url" :icon="icon">
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
		}
	}
} );
</script>
