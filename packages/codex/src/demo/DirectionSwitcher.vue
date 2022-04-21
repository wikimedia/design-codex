<template>
	<!--
		Not using v-model so that
		a) values can be synced (with inverse values for the two buttons)
		b) update event can be emitted
	-->
	<cdx-toggle-button :model-value="isLTR" @update:model-value="useLTR">
		LTR
	</cdx-toggle-button>
	<cdx-toggle-button :model-value="isRTL" @update:model-value="useRTL">
		RTL
	</cdx-toggle-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import CdxToggleButton from '../components/toggle-button/ToggleButton.vue';
import { HTMLDirection } from '../types';

// TODO this component will be superfluous once we have a ButtonGroup component
export default defineComponent( {
	components: {
		CdxToggleButton
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
	setup( props, { emit } ) {
		// State
		const isLTR = computed( () => props.modelValue === 'ltr' );
		const isRTL = computed( () => props.modelValue === 'rtl' );

		// Toggle - if the currently-used direction is clicked again, it does nothing
		const useLTR = () => {
			emit( 'update:modelValue', 'ltr' );
		};
		const useRTL = () => {
			emit( 'update:modelValue', 'rtl' );
		};

		return {
			isLTR,
			isRTL,
			useLTR,
			useRTL
		};
	}
} );
</script>
