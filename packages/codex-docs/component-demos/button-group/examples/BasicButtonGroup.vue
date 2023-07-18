<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'BasicButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four' },
			{ value: 5, label: 'Five' }
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
