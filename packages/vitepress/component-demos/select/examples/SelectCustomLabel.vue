<template>
	<div>
		<CdxSelect
			v-model="selection"
			:options="options"
			default-label="Choose an option"
		>
			<template #label="{ selectedOption, defaultLabel }">
				<span v-if="selectedOption">
					<span>You have selected: {{ selectedOption.label }}</span>
				</span>
				<span v-else>
					{{ defaultLabel }}
				</span>
			</template>
		</CdxSelect>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxSelect } from 'vue-components/src/lib';

export default defineComponent( {
	name: 'SelectCustomLabel',
	components: { CdxSelect },
	data() {
		return {
			options: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ label: 'Option C', value: 'c' },
				{ label: 'Option D', value: 'd', disabled: true }
			],
			selection: null
		};
	}
} );
</script>
