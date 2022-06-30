<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CardDefault',
	components: { CdxCard }
} );
</script>
