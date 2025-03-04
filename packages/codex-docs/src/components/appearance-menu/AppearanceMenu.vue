<template>
	<div class="cdx-docs-font-mode-selector">
		<cdx-toggle-button
			ref="toggleButton"
			v-model="showPopover"
			aria-label="Show appearance options"
			quiet
		>
			<cdx-icon :icon="cdxIconConfigure" />
		</cdx-toggle-button>
		<cdx-popover
			v-model:open="showPopover"
			:anchor="toggleButton"
			:render-in-place="true"
			title="Appearance"
			placement="bottom-end"
			use-close-button
		>
			<cdx-field :is-fieldset="true">
				<template #label>
					Color
				</template>
				<cdx-radio
					v-for="colorModeItem in colorModeItems"
					:key="colorModeItem.value"
					v-model="wrappedColorMode"
					name="color-mode-options"
					:input-value="colorModeItem.value"
					@update:model-value="( newVal ) => updateStorage( 'cdxColorMode', newVal )"
				>
					{{ colorModeItem.label }}
				</cdx-radio>
			</cdx-field>

			<cdx-field :is-fieldset="true">
				<template #label>
					Text
				</template>
				<cdx-radio
					v-for="fontModeItem in fontModeItems"
					:key="fontModeItem.value"
					v-model="wrappedFontMode"
					name="font-mode-options"
					:input-value="fontModeItem.value"
					@update:model-value="( newVal ) => updateStorage( 'cdxFontMode', newVal )"
				>
					{{ fontModeItem.label }}
				</cdx-radio>
			</cdx-field>
		</cdx-popover>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import { useModelWrapper, CdxPopover, CdxToggleButton, CdxIcon, CdxField, CdxRadio } from '@wikimedia/codex';
import { cdxIconConfigure } from '@wikimedia/codex-icons';

export default defineComponent( {
	components: {
		CdxField,
		CdxIcon,
		CdxPopover,
		CdxRadio,
		CdxToggleButton
	},
	props: {
		colorMode: {
			type: String,
			default: null
		},
		fontMode: {
			type: String,
			default: null
		}
	},
	setup( props, { emit } ) {
		const toggleButton = ref();
		const showPopover = ref( false );

		const wrappedColorMode = useModelWrapper( toRef( props, 'colorMode' ), emit, 'update:color-mode' );
		const colorModeItems = [
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' },
			{ value: 'system', label: 'System' }
		];

		const wrappedFontMode = useModelWrapper( toRef( props, 'fontMode' ), emit, 'update:font-mode' );
		const fontModeItems = [
			{ value: 'small', label: 'Small' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'large', label: 'Large' },
			{ value: 'x-large', label: 'Extra Large' }
		];

		/**
		 * Store appearance preferences in localStorage so they persist across sessions and tabs.
		 *
		 * @param key localStorage key
		 * @param value The new value
		 */
		function updateStorage( key: string, value: string ) {
			localStorage.setItem( key, value );
		}

		return {
			toggleButton,
			showPopover,
			wrappedColorMode,
			colorModeItems,
			wrappedFontMode,
			fontModeItems,
			updateStorage,
			cdxIconConfigure
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-font-mode-selector {
	@media ( min-width: 768px ) {
		margin-left: @spacing-100;
	}
}
</style>
