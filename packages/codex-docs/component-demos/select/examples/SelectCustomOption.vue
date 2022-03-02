<template>
	<cdx-select
		v-model="selection"
		class="cdx-docs-select-custom-option"
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
import { CdxSelect, CdxIcon } from '@wikimedia/codex';
import { cdxIconGlobe, cdxIconStar, cdxIconHieroglyph, cdxIconCamera } from '@wikimedia/codex-icons';

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

<style scoped lang="less">
// stylelint-disable-next-line selector-class-pattern
.cdx-docs-select-custom-option .cdx-icon {
	[ dir='ltr' ] & {
		margin-right: 0.5em;
	}

	[ dir='rtl' ] & {
		margin-left: 0.5em;
	}
}
</style>
