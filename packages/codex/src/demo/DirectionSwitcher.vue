<template>
	<cdx-button
		v-for="direction in directions"
		:key="direction.value"
		type="primary"
		:action="modelValue === direction.value ? 'progressive' : 'default'"
		@click="$emit( 'update:modelValue', direction.value )"
	>
		{{ direction.label }}
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CdxButton from '../components/button/Button.vue';
import { HTMLDirection } from '../types';

// TODO this component will be superfluous once we have a ButtonGroup component
export default defineComponent( {
	components: {
		CdxButton
	},
	props: {
		modelValue: {
			type: String as PropType<HTMLDirection>,
			default: 'ltr'
		}
	},
	emits: [
		'update:modelValue'
	],
	data: () => ( {
		directions: [
			{ value: 'ltr', label: 'LTR' },
			{ value: 'rtl', label: 'RTL' }
		]
	} )
} );
</script>
