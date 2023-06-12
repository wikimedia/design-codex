<template>
	<cdx-field
		class="cdx-demo-nested-fields"
		:status="fieldsetStatus"
		:messages="fieldsetMessages"
		:is-fieldset="true"
		:disabled="disabled"
	>
		<template #label>
			Item weight
		</template>

		<div class="cdx-demo-nested-fields__inputs">
			<cdx-field
				class="cdx-demo-nested-fields__inputs__weight"
				:status="weightStatus"
				:messages="weightMessages"
			>
				<template #label>
					Weight value
				</template>
				<template #description>
					Numerical value of the weight
				</template>

				<cdx-text-input
					v-model="weightValue"
					@blur="validateWeight"
				/>
			</cdx-field>
			<cdx-field
				class="cdx-demo-nested-fields__inputs__unit"
				:status="unitsStatus"
				:messages="unitsMessages"
			>
				<template #label>
					Unit
				</template>
				<template #description>
					Must be from pre-approved list of units
				</template>
				<template #help-text>
					Hint: try searching for "grams"
				</template>

				<cdx-lookup
					v-model:selected="unitsValue"
					:menu-items="menuItems"
					@input="onLookupInput"
				/>
			</cdx-field>
		</div>
	</cdx-field>
	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxLookup,
	CdxTextInput,
	CdxToggleSwitch,
	MenuItemData,
	ValidationStatusType
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithFields',
	components: {
		CdxField,
		CdxLookup,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		// Set up data for the weight value field.
		const weightValue = ref( '' );
		const weightStatus = ref<ValidationStatusType>( 'default' );
		const weightMessages = { error: 'Invalid weight value' };

		function validateWeight() {
			const weightTrimmed = weightValue.value.replace( / /g, '' );
			if ( weightTrimmed.length === 0 ) {
				weightStatus.value = 'default';
				return;
			}
			weightStatus.value = isNaN( Number( weightTrimmed ) ) ?
				'error' : 'default';
		}

		// Set up data for the unit field.
		const unitsValue = ref( '' );
		const unitsStatus = ref<ValidationStatusType>( 'default' );
		const unitsMessages = { error: 'No matching units found' };
		const units = [
			{ value: 'ounces' },
			{ value: 'pounds' },
			{ value: 'grams' },
			{ value: 'kilograms' }
		];
		const menuItems = ref<MenuItemData[]>( [] );

		function onLookupInput( value: string ) {
			if ( value ) {
				menuItems.value = units.filter( ( item ) =>
					item.value.includes( value )
				);
				unitsStatus.value = menuItems.value.length === 0 ? 'error' : 'default';
			} else {
				unitsStatus.value = 'default';
			}
		}

		// Set up data for the wrapper Field component.
		const fieldsetMessages = { error: 'One of the values is invalid.' };
		const fieldsetStatus = computed( () => weightStatus.value === 'error' || unitsStatus.value === 'error' ?
			'error' : 'default'
		);

		const disabled = ref( false );

		return {
			weightValue,
			weightStatus,
			weightMessages,
			validateWeight,
			menuItems,
			onLookupInput,
			unitsValue,
			unitsStatus,
			unitsMessages,
			fieldsetMessages,
			fieldsetStatus,
			disabled
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-nested-fields {
	margin-bottom: @spacing-250;

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: @spacing-50;

		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			flex-direction: row;
		}
	}
}
</style>
