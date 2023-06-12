<template>
	<cdx-field
		class="cdx-demo-complex-field"
		:label-icon="cdxIconMapPin"
		:is-fieldset="true"
		:disabled="disabled"
		:status="status"
		:messages="messages"
	>
		<template #label>
			Coordinate location
		</template>

		<div class="cdx-demo-complex-field__inputs">
			<!-- You can include a visually-hidden label via the Label component... -->
			<cdx-label
				label="Coordinates"
				:hide-label="true"
				input-id="coordinates-value"
			/>
			<cdx-text-input
				id="coordinates-value"
				v-model="coordinatesValue"
				@blur="validate"
			/>

			<!-- ...or just use `aria-label`. -->
			<cdx-select
				v-model:selected="precisionValue"
				aria-label="Precision"
				:menu-items="menuItems"
			/>
		</div>

		<template #help-text>
			Please enter coordinates as decimal degrees.
		</template>
	</cdx-field>

	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	CdxField,
	CdxLabel,
	CdxSelect,
	CdxTextInput,
	CdxToggleSwitch,
	MenuItemData,
	ValidationStatusType
} from '@wikimedia/codex';
import { cdxIconMapPin } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'FieldWithTwoInputs',
	components: {
		CdxField,
		CdxLabel,
		CdxSelect,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		const coordinatesValue = ref( '' );

		const menuItems: MenuItemData[] = [
			{ label: 'to 1/1000 of an arcsecond', value: '.001' },
			{ label: 'to 1/100 of an arcsecond', value: '.01' },
			{ label: 'to 1/10 of an arcsecond', value: '.1' },
			{ label: 'to an arcsecond', value: '1' }
		];
		const precisionValue = ref( '.001' );

		const messages = { error: 'Please enter a valid coordinate location.' };
		const status = ref<ValidationStatusType>( 'default' );

		function validate() {
			const regEx = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

			if ( coordinatesValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			status.value = regEx.test( coordinatesValue.value ) ? 'default' : 'error';
		}

		const disabled = ref( false );

		return {
			coordinatesValue,
			menuItems,
			precisionValue,
			messages,
			status,
			validate,
			disabled,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-complex-field {
	margin-bottom: @spacing-250;

	&__inputs {
		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			display: flex;
		}

		.cdx-text-input {
			margin-bottom: @spacing-50;

			@media screen and ( min-width: @min-width-breakpoint-desktop ) {
				margin-right: @spacing-50;
			}
		}
	}
}
</style>
