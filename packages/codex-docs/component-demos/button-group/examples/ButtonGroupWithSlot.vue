<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	>
		<template #default="{ button }">
			{{ button.label }}
			<sup>
				({{ button.value }})
			</sup>
		</template>
	</cdx-button-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButtonGroup, ButtonGroupItem } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'ButtonGroupWithSlot',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' }
		];

		const onClick = getEventLogger<string|number>( 'click' );

		return {
			buttons,
			onClick
		};
	}
} );
</script>
