<template>
	<div class="cdx-select" :class="rootClasses">
		<div
			ref="handle"
			class="cdx-select__handle"
			tabindex="0"
			role="combobox"
			aria-autocomplete="list"
			:aria-owns="menuId"
			:aria-labelledby="handleId"
			:aria-activedescendant="state.highlighted.value?.id"
			aria-haspopup="listbox"
			:aria-expanded="expanded"
			:aria-disabled="disabled"
			@click="onHandleClick"
			@blur="onBlur"
			@keydown.space.enter.up.down.tab.esc="onKeyNavigation"
		>
			<span
				:id="handleId"
				role="textbox"
				aria-readonly="true"
			>
				<!--
					@slot Display of the current selection or default label
					@binding {MenuOption|undefined} selectedOption The currently selected option
					@binding {string} defaultLabel The default label, provided via a prop
				-->
				<slot
					name="label"
					:selectedOption="state.selected.value"
					:defaultLabel="defaultLabel"
				>
					{{ currentLabel }}
				</slot>
			</span>
			<cdx-icon :icon="cdxIconExpand" class="cdx-select__indicator" />
		</div>

		<ul
			v-show="expanded"
			:id="menuId"
			class="cdx-select__menu"
			role="listbox"
		>
			<cdx-option
				v-for="( option, index ) in computedOptions"
				v-bind="option"
				:key="index"
				@change="handleOptionChange"
			>
				<!--
					@slot Display of an individual option in the menu
					@binding {MenuOption} option The current option
				-->
				<slot name="menu-option" :option="option" />
			</cdx-option>
		</ul>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	defineComponent,
	computed,
	ref,
	toRef
} from 'vue';

import { cdxIconExpand } from 'icons';
import CdxIcon from '../icon/Icon.vue';
import CdxOption from '../option/Option.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import useMenu from '../../composables/useMenu';
import { MenuOption } from '../../types';

/**
 * A dropdown menu similar to the HTML `<select>` element. Options are provided
 * as an array of MenuOption types, and `v-model` is used to bind the current
 * selection's value.
 */
export default defineComponent( {
	name: 'CdxSelect',
	components: {
		CdxIcon,
		CdxOption
	},

	props: {
		/**
		 * Menu options. See the MenuOption type.
		 */
		options: {
			type: Array as PropType<MenuOption[]>,
			required: true
		},

		/**
		 * Value provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			default: null
		},
		/**
		 * Label to display when no selection has been made.
		 */
		defaultLabel: {
			type: String,
			default: ''
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the selection value changes.
		 *
		 * @property {string | number} value The new value
		 */
		'update:modelValue'
	],

	setup( props, context ) {
		// Set up basic reactive values and template refs.
		const handle = ref<HTMLDivElement>();
		const handleId = useGeneratedId( 'select-handle' );
		const menuId = useGeneratedId( 'select-menu' );

		// The value of the component's current selection is tracked in the parent as a v-model
		// binding.
		const modelWrapper = useModelWrapper( toRef( props, 'modelValue' ), context.emit );

		// Get helpers from useMenu.
		const {
			computedOptions,
			state,
			expanded,
			onBlur,
			handleOptionChange,
			handleKeyNavigation
		} = useMenu( toRef( props, 'options' ), modelWrapper );

		// Set up the label that should display in the handle.
		const currentLabel = computed( () => {
			return state.selected.value ?
				( state.selected.value.label || state.selected.value.value ) :
				props.defaultLabel;
		} );

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-select--disabled': props.disabled,
				'cdx-select--expanded': expanded.value,
				'cdx-select--value-selected': !!state.selected.value,
				'cdx-select--no-selections': !state.selected.value
			};
		} );

		function onHandleClick(): void {
			if ( props.disabled ) {
				return;
			}

			expanded.value = !expanded.value;
			handle.value?.focus();
		}

		function onKeyNavigation( e: KeyboardEvent ) {
			if ( props.disabled ) {
				return;
			}
			handleKeyNavigation( e );
		}

		return {
			handle,
			handleId,
			menuId,
			computedOptions,
			state,
			expanded,
			onBlur,
			handleOptionChange,
			currentLabel,
			rootClasses,
			onHandleClick,
			cdxIconExpand,
			onKeyNavigation
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';
@import './../../themes/mixins/menu-icon.less';
@import './../../themes/mixins/options-menu.less';

.cdx-select {
	display: inline-block;
	position: relative;
	min-width: 280px;

	&__handle {
		background-color: @background-color-framed;
		color: @color-base;
		position: relative;
		box-sizing: border-box;
		min-height: @size-base;
		width: @size-full;
		border: @border-base;
		border-radius: @border-radius-base;
		// Add extra padding-right to make space for the handle indicator
		// Use 2 * horizontal-base because we need padding on both sides of the indicator
		padding: @padding-vertical-base
			calc( 2 * @padding-horizontal-base ~'+' @size-indicator )
			@padding-vertical-base
			@padding-horizontal-base;
		line-height: @line-height-base;
		transition-property: background-color, color, border-color, box-shadow;
		transition-duration: @transition-base;
		cursor: pointer;

		&--has-icon {
			padding-left: ( @padding-horizontal-base * 2 ) + @size-icon;
		}

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
			border-color: @border-color-base--hover;

			.cdx-select__indicator {
				color: @color-base--hover;
			}
		}

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
			outline: 0;
		}

		&:active {
			color: @color-base--active;
			border-color: @border-color-base--active;
		}
	}

	// stylelint-disable-next-line no-descending-specificity
	&__indicator {
		color: @color-base;
		.cdx-mixin-menu-icon( right, @size-indicator );
	}

	&__menu {
		.cdx-options-menu();
	}

	&--expanded {
		.cdx-select__handle {
			background-color: @background-color-framed--hover;

			&:hover .cdx-select__indicator {
				color: @color-base;
			}
		}
	}

	&--disabled {
		.cdx-select__handle {
			background-color: @background-color-base--disabled;
			color: @color-base--disabled;
			border-color: @border-color-base--disabled;
			text-shadow: @text-shadow-base--disabled;
			cursor: @cursor-base--disabled;

			&:hover .cdx-select__indicator {
				color: @color-base--disabled;
			}
		}

		// stylelint-disable-next-line no-descending-specificity
		.cdx-select__indicator {
			color: @color-base--disabled;
		}
	}
}
</style>
