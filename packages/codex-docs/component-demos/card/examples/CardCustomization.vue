<template>
	<cdx-card :icon="cdxIconRobot">
		<template #header-start>
			<cdx-info-chip status="warning">
				Warning
			</cdx-info-chip>
		</template>
		<template #header-end>
			<cdx-button weight="quiet" aria-label="More options">
				<cdx-icon :icon="cdxIconEllipsis" />
			</cdx-button>
		</template>
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
		<template #supporting-text>
			Supporting text
		</template>
		<template #footer>
			<cdx-button>
				Action
			</cdx-button>
			<cdx-button weight="quiet">
				Action
			</cdx-button>
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard, CdxInfoChip, CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis, cdxIconRobot } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CardWithSlots',
	components: { CdxCard, CdxInfoChip, CdxButton, CdxIcon },
	setup() {
		return { cdxIconEllipsis, cdxIconRobot };
	}
} );
</script>
