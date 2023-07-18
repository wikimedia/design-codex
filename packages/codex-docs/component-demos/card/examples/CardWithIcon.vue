<template>
	<cdx-card :icon="cdxIconRobot">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';
import { cdxIconRobot } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CardWithIcon',
	components: { CdxCard },
	setup() {
		return {
			cdxIconRobot
		};
	}
} );
</script>
