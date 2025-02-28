<template>
	<cdx-field
		class="cdx-demo-indeterminate"
		:is-fieldset="true"
	>
		<template #label>
			Availability
		</template>
		<template #description>
			Select the days on which you are available.
		</template>

		<cdx-checkbox
			v-model="selectAllValue"
			:indeterminate="isIndeterminate"
			@update:model-value="onSelectAll"
		>
			Select all
		</cdx-checkbox>

		<div class="cdx-demo-indeterminate__group">
			<cdx-checkbox
				v-for="checkbox in daysCheckboxes"
				:key="'checkbox-' + checkbox.value"
				v-model="daysValue"
				:input-value="checkbox.value"
				@update:model-value="onSelectDay"
			>
				{{ checkbox.label }}
			</cdx-checkbox>
		</div>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxCheckbox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'IndeterminateState',
	components: { CdxCheckbox, CdxField },
	setup() {
		const selectAllValue = ref( false );
		const daysValue = ref( [ 'mon', 'tue', 'wed' ] );
		const daysCheckboxes = [
			{
				label: 'Monday',
				value: 'mon'
			},
			{
				label: 'Tuesday',
				value: 'tue'
			},
			{
				label: 'Wednesday',
				value: 'wed'
			},
			{
				label: 'Thursday',
				value: 'thur'
			},
			{
				label: 'Friday',
				value: 'fri'
			}
		];

		// Set the top checkbox to indeterminate when the days checkboxes are
		// not all the same (all un-checked or all checked).
		const isIndeterminate = computed( () => daysValue.value.length > 0 &&
			daysValue.value.length < daysCheckboxes.length );

		/**
		 * Handle interaction with the "select all" checkbox.
		 *
		 * @param value New value of the "select all" box
		 */
		function onSelectAll( value ) {
			if ( value ) {
				// If the "select all" box is checked, check all days.
				daysValue.value = daysCheckboxes.map( ( day ) => day.value );
			} else {
				// If "select all" is unchecked, un-check all days.
				daysValue.value = [];
			}
		}

		/**
		 * Handle interaction with the day checkboxes.
		 */
		function onSelectDay() {
			// If all days are checked, check "select all".
			if ( daysValue.value.length === daysCheckboxes.length ) {
				selectAllValue.value = true;
			}
			// If no days are checked, un-check "select all".
			if ( daysValue.value.length === 0 ) {
				selectAllValue.value = false;
			}
		}

		return {
			selectAllValue,
			daysValue,
			daysCheckboxes,
			isIndeterminate,
			onSelectAll,
			onSelectDay
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-indeterminate {
	&__group {
		// Align sub-checkboxes with the label of the top-level checkbox.
		// Equal to `26px` in `16px` base at default font size mode.
		padding-left: calc( @font-size-medium + 10px );
	}
}

</style>
