<template>
	<cdx-field
		class="cdx-demo-chip-input-limited"
		:status="status"
		:messages="messages"
	>
		<cdx-chip-input
			v-model:input-chips="exampleChips"
			v-model:input-value="inputValue"
			:chip-validator="chipValidator"
		/>
		<template #label>
			Aliases
		</template>
		<template #description>
			Alternative names help others easily find the function
		</template>
		<template #help-text>
			<span class="cdx-demo-chip-input-limited__char-count" :class="limitClass">
				{{ characterCount }}
			</span>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxChipInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputWithLimit',
	components: { CdxChipInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const exampleChips = ref( [] );

		const chipValidator = ( value ) => value.length <= 10;

		const status = computed( () =>
			chipValidator( inputValue.value ) ? 'default' : 'error'
		);
		const messages = { error: 'Chip text is too long' };

		const characterCount = computed( () => 10 - inputValue.value.length );
		const limitClass = computed( () => {
			return {
				'cdx-demo-chip-input-limited__char-count--error': status.value === 'error'
			};
		} );

		return {
			inputValue,
			exampleChips,
			chipValidator,
			status,
			messages,
			characterCount,
			limitClass
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-chip-input-limited {
	&__char-count {
		float: right;

		&--error {
			color: @color-error;
		}
	}
}
</style>
