<template>
	<div class="cdx-toggle-button-group">
		<cdx-toggle-button
			v-for="button in buttons"
			:key="button.value"
			:model-value="isSelected( button )"
			:disabled="button.disabled || disabled"
			:aria-label="button.ariaLabel"
			@update:model-value="onUpdate( button, $event )"
		>
			<!--
				@slot Content of an individual button
				@binding {ButtonGroupItem} button Object describing the button to display
				@binding {boolean} selected Whether the button is selected
			-->
			<slot :button="button" :selected="isSelected( button )">
				<cdx-icon v-if="button.icon" :icon="button.icon" />
				{{ getButtonLabel( button ) }}
			</slot>
		</cdx-toggle-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ButtonGroupItem } from '../../types';
import { getButtonLabel } from '../../utils/buttonHelpers';
import CdxIcon from '../icon/Icon.vue';
import CdxToggleButton from '../toggle-button/ToggleButton.vue';

/**
 * Group of toggle buttons that allows making a selection.
 *
 * Single-select groups behave like a group of radio buttons: only one value can be selected,
 * and clicking an already-selected value has no effect. Multi-select groups behave like a group of
 * checkboxes: multiple values can be selected, and clicking an already-selected value unselects it.
 *
 * Whether the group is single-select or multi-select is automatically detected based on the value
 * bound to `v-model`: if it's an array, the group allows multiple selections; otherwise, it only
 * allows a single selection. To initially select nothing, initialize the `v-model` value to
 * `null` (for single-select groups) or `[]` (for multi-select groups).
 */
export default defineComponent( {
	name: 'CdxToggleButtonGroup',
	components: {
		CdxIcon,
		CdxToggleButton
	},
	props: {
		/**
		 * Buttons to display. See the ButtonGroupItem type.
		 */
		buttons: {
			type: Array as PropType<ButtonGroupItem[]>,
			required: true,
			validator: ( value: unknown ) => Array.isArray( value ) && value.length >= 1
		},
		/**
		 * Selected value, or array of selected values.
		 *
		 * If this is a string or number, the button whose value equals that string or number is
		 * selected, and only a single selection is allowed. If this is an array, the buttons whose
		 * values equal any of the values in the array are selected, and multiple selections are
		 * allowed. To select none of the buttons initially, set this to `null`
		 * (for single-selection groups) or to `[]` (for multi-selection groups).
		 *
		 * Must be bound with `v-model`.
		 */
		modelValue: {
			type: [ String, Number, null, Array ] as
				PropType<string | number | null | ( string | number )[]>,
			required: true
		},
		/**
		 * Whether the entire group is disabled.
		 *
		 * If this is set to true, all buttons in the group are disabled. Buttons can also be
		 * disabled individually by setting their `disabled` property to true.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes.
		 *
		 * @property {string | number | ( string | number )[]} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit } ) {
		function isSelected( button: ButtonGroupItem ): boolean {
			if ( Array.isArray( props.modelValue ) ) {
				return props.modelValue.indexOf( button.value ) !== -1;
			} else if ( props.modelValue !== null ) {
				return props.modelValue === button.value;
			}
			return false;
		}

		function onUpdate( button: ButtonGroupItem, nowSelected: boolean ) {
			if ( Array.isArray( props.modelValue ) ) {
				const wasSelected = props.modelValue.indexOf( button.value ) !== -1;
				if ( nowSelected && !wasSelected ) {
					// Add button.value to props.modelValue
					emit( 'update:modelValue', props.modelValue.concat( button.value ) );
				} else if ( !nowSelected && wasSelected ) {
					// Remove button.value from props.modelValue
					emit( 'update:modelValue', props.modelValue.filter( ( v ) => v !== button.value ) );
				}
				// The other combinations (nowSelected && wasSelected, !nowSelected && !wasSelected)
				// should be impossible, and updating modelValue is not needed in those cases anyway
			} else {
				if ( nowSelected && props.modelValue !== button.value ) {
					emit( 'update:modelValue', button.value );
				}
				// if !nowSelected, the user has clicked the selected button in a single-select
				// ToggleButtonGroup. This should not lead to the button being unselected
				// (just like with a radio button), so do nothing.
			}
		}

		return {
			getButtonLabel,
			isSelected,
			onUpdate
		};
	}
} );
/* eslint-disable max-len */
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/button-group.less';

.cdx-toggle-button-group {
	.cdx-mixin-button-group();

	.cdx-toggle-button {
		.cdx-mixin-button-group-button();

		&--toggled-on:enabled {
			// Make the borders of a toggled-on button appear above the borders of adjacent
			// toggled-off buttons, but not above the borders of an active or focused button
			// (those get z-index: 3;)
			z-index: 2;
			// When two toggled-on buttons are adjacent to each other, display a white line
			// between them, using the same box-shadow trick as in button-group.less
			box-shadow: @box-shadow-outset-small-top @box-shadow-color-inverted, @box-shadow-outset-small-start @box-shadow-color-inverted;
		}
	}
}
</style>
