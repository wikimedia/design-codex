<template>
	<cdx-icon
		v-if="icon"
		:icon="icon"
		:size="size"
		:lang="language"
	/>
	<p v-else>
		Select an icon
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SimpleIcon',
	components: { CdxIcon },
	props: {
		icon: {
			type: [ String, Object ],
			default: ''
		},
		language: {
			type: String,
			default: 'en'
		},
		size: {
			type: String,
			default: 'medium'
		}
	},
	setup() {
		return {
		};
	}
} );
</script>
