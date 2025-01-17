<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Skip
		</cdx-button>
		<cdx-button>
			Previous
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Next
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiStepButtons',
	components: {
		CdxButton
	}
} );
</script>
