<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Cancel
		</cdx-button>
		<cdx-button>
			Save
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Submit
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonHierarchy',
	components: {
		CdxButton
	}
} );
</script>
