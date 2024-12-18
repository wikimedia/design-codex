<template>
	<div ref="rootElement" class="cdx-toggle-button-group">
		<cdx-toggle-button
			v-for="( button, index ) in buttons"
			:key="button.value"
			:ref="( ref ) => assignTemplateRef( ref, index )"
			:model-value="isSelected( button )"
			:disabled="button.disabled || disabled"
			:aria-label="button.ariaLabel"
			@update:model-value="onUpdate( button, $event )"
			@focus="onFocus( index )"
			@blur="onBlur"
			@keydown="onKeydown"
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
import { defineComponent, PropType, toRef } from 'vue';
import { ButtonGroupItem } from '../../types';
import { getButtonLabel } from '../../utils/buttonHelpers';
import useButtonGroupKeyboardNav from '../../composables/useButtonGroupKeyboardNav';
import CdxIcon from '../icon/Icon.vue';
import CdxToggleButton from '../toggle-button/ToggleButton.vue';

/**
 * A group of ToggleButtons. May be configured to allow for
 * either single-select or multi-select behavior.
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
		const {
			rootElement,
			assignTemplateRef,
			onFocus,
			onBlur,
			onKeydown
		} = useButtonGroupKeyboardNav( toRef( props, 'buttons' ) );

		function isSelected( button: ButtonGroupItem ): boolean {
			if ( Array.isArray( props.modelValue ) ) {
				return props.modelValue.includes( button.value );
			} else if ( props.modelValue !== null ) {
				return props.modelValue === button.value;
			}
			return false;
		}

		function onUpdate( button: ButtonGroupItem, nowSelected: boolean ) {
			if ( Array.isArray( props.modelValue ) ) {
				const wasSelected = props.modelValue.includes( button.value );
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
			rootElement,
			assignTemplateRef,
			onFocus,
			onBlur,
			onKeydown,
			getButtonLabel,
			isSelected,
			onUpdate
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button-group.less';

.cdx-toggle-button-group {
	.cdx-mixin-button-group();

	.cdx-toggle-button {
		.cdx-mixin-button-group-button();

		&--toggled-on:enabled {
			// Make the borders of a toggled-on button appear above the borders of adjacent
			// toggled-off buttons, but not above the borders of an active or focused button
			// (those get `z-index: 3;` in 'button-group.less').
			z-index: @z-index-stacking-2;

			/* stylelint-disable @stylistic/declaration-colon-newline-after,
				@stylistic/value-list-comma-newline-after */
			// When two toggled-on buttons are adjacent to each other, display a white line
			// between them, using the same box-shadow trick as in 'button-group.less'.
			box-shadow: @box-shadow-outset-small-top @box-shadow-color-inverted,
				@box-shadow-outset-small-start @box-shadow-color-inverted;

			&:focus {
				// Add a white box-shadow around the existing box-shadow applied to focused
				// ToggleButtons. This is similar to the box-shadow above but slightly different:
				// it appears on all four edges, not just the left and top edges.
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
					@box-shadow-inset-medium @box-shadow-color-inverted,
					@box-shadow-outset-small @box-shadow-color-inverted;
			}
			/* stylelint-enable @stylistic/declaration-colon-newline-after,
				@stylistic/value-list-comma-newline-after */
		}
	}
}
</style>
