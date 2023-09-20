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
import { getButtonLabel } from '../../utils/buttonHelpers';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

/**
 * A set of two or more buttons representing equally important actions.
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
		return {
			getButtonLabel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button-group.less';

.cdx-button-group {
	.cdx-mixin-button-group();

	.cdx-button {
		.cdx-mixin-button-group-button();
	}
}
</style>
