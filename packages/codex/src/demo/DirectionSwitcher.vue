<template>
	<cdx-toggle-button-group
		v-model="modelWrapper"
		:buttons="buttons"
		class="cdx-demo-direction-switcher"
	/>
</template>

<script lang="ts">
import { defineComponent, toRef, PropType } from 'vue';
import CdxToggleButtonGroup from '../components/toggle-button-group/ToggleButtonGroup.vue';
import useModelWrapper from '../composables/useModelWrapper';
import { ButtonGroupItem, HTMLDirection } from '../types';

export default defineComponent( {
	components: {
		CdxToggleButtonGroup
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
		const buttons: ButtonGroupItem[] = [
			{ value: 'ltr', label: 'LTR' },
			{ value: 'rtl', label: 'RTL' }
		];
		const modelWrapper = useModelWrapper( toRef( props, 'modelValue' ), emit );

		return {
			buttons,
			modelWrapper
		};
	}
} );
</script>

<style lang="less">
.cdx-demo-direction-switcher {
	display: inline-block;
}
</style>
