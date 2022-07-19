<template>
	<div class="cdx-button-group">
		<cdx-button
			v-for="button in buttons"
			:key="button.value"
			:disabled="button.disabled || disabled"
			:aria-label="button.ariaLabel"
			@click="$emit( 'click', button.value )"
		>
			<!--
				@slot Content of an individual button
				@binding {ButtonGroupItem} button Object describing the button to display
			-->
			<slot :button="button">
				<cdx-icon v-if="button.icon" :icon="button.icon" />
				{{ getButtonLabel( button ) }}
			</slot>
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ButtonGroupItem } from '../../types';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

/**
 * Set of actions made up of two or more buttons.
 *
 * Buttons in this button group signal a number of equally important actions that will occur when
 * the user taps on them. Button groups feature a set of normal buttons that can include icons
 * and/or text labels.
 */
export default defineComponent( {
	name: 'CdxButtonGroup',
	components: {
		CdxButton,
		CdxIcon
	},
	props: {
		/**
		 * Objects describing the buttons in the group. See the ButtonGroupItem type.
		 */
		buttons: {
			type: Array as PropType<ButtonGroupItem[]>,
			required: true,
			validator: ( value: unknown ) => Array.isArray( value ) && value.length >= 1
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
		 * Emitted when a button is clicked
		 *
		 * @property {string | number} value The `value` property of the button that was clicked
		 */
		'click'
	],
	setup() {
		function getButtonLabel( button: ButtonGroupItem ) {
			if ( button.label === undefined ) {
				return button.value;
			}
			if ( button.label === null ) {
				return '';
			}
			return button.label;
		}

		return {
			getButtonLabel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-button-group {
	// Isolate the z-index hacks below into their own stacking context, so that they don't conflict
	// with other z-index tricks elsewhere on the page.
	position: relative;
	z-index: 0;

	.cdx-button {
		position: relative;

		&:not( :first-child ) {
			// To avoid double borders, shift each of the buttons (except the first one)
			// 1px to the left, so that its left border covers the right border of the button
			// before it, and only each button's left border is visible. Sometimes we need both or
			// neither of a button's borders to be visible, which is achieved with z-index rules
			// below.
			margin-left: -@border-width-base;

			// Make all borders sharp, overriding rounded corners, except the corner on the
			// outsides of the group (the first button's left corners, and the last button's
			// right corners)
			border-top-left-radius: @border-radius-sharp;
			border-bottom-left-radius: @border-radius-sharp;
		}

		&:not( :last-child ) {
			border-top-right-radius: @border-radius-sharp;
			border-bottom-right-radius: @border-radius-sharp;
		}

		&:enabled:active,
		&:enabled:focus {
			// When a button is active or focused, both its left and its right border need to be
			// visible. Pull it up above the other buttons, so that its right border isn't
			// obscured by the next button's left border
			z-index: 1;
		}

		&:disabled {
			// When a button is disabled, its border is the same color as its background.
			// Push it down below the other buttons so that both it doesn't obscure its
			// neighbor's border
			z-index: -1;
		}

		&:disabled + .cdx-button:disabled {
			// When two disabled buttons are adjacent to each other, display a white border
			// between them
			border-left-color: @border-color-filled--disabled;
		}
	}
}
</style>
