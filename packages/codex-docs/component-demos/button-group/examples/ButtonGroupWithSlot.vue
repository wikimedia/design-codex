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

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonGroupWithSlot',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
