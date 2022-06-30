<template>
	<cdx-card url="https://www.example.com">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CardWithLink',
	components: { CdxCard }
} );
</script>
