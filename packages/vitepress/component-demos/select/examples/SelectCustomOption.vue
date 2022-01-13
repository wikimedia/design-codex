<template>
	<cdx-select
		v-model="selection"
		class="vp-select-custom-option"
		:options="options"
		default-label="Choose an option"
	>
		<template #menu-option="{ option }">
			<cdx-icon v-if="option.icon" :icon="option.icon" />
			<span>{{ option.label }}</span>
		</template>
	</cdx-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxSelect, CdxIcon } from 'vue-components/src/lib';
import { cdxIconGlobe, cdxIconStar, cdxIconHieroglyph, cdxIconCamera } from 'icons';

export default defineComponent( {
	name: 'SelectCustomOption',
	components: { CdxSelect, CdxIcon },
	data() {
		return {
			options: [
				{ label: 'Option A', value: 'a', icon: cdxIconGlobe },
				{ label: 'Option B', value: 'b', icon: cdxIconStar },
				{ label: 'Option C', value: 'c', icon: cdxIconHieroglyph },
				{ label: 'Option D', value: 'd', icon: cdxIconCamera, disabled: true }
			],
			selection: null
		};
	}
} );
</script>

<style scoped>
.vp-select-custom-option .cdx-icon {
	margin-right: 0.5em;
}
</style>
