<template>
	<li
		:id="id"
		role="option"
		class="cdx-option"
		:class="rootClasses"
		:aria-disabled="disabled"
		:aria-selected="selected"
		@mouseenter="onMouseEnter"
		@mousedown.prevent="onMouseDown"
		@click="onClick"
	>
		<!-- @slot Optional content, will replace label if provided -->
		<slot>
			{{ label || value }}
		</slot>
	</li>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { MenuState } from '../../types';

/**
 * Option within a menu.
 *
 * This component is meant to be used within the Menu component.
 */
export default defineComponent( {
	name: 'CdxOption',

	props: {
		id: {
			type: String,
			required: true
		},

		/**
		 * The value provided to the parent menu component when this option is
		 * selected.
		 */
		value: {
			type: [ String, Number ] as PropType<string|number>,
			required: true
		},
		/**
		 * Whether the option is disabled. Defaults to false.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Optional label for the option.
		 */
		label: {
			type: String,
			default: ''
		},
		/**
		 * Whether this option is selected
		 */
		selected: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether this option is active
		 */
		active: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether this option is highlighted
		 */
		highlighted: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * Emitted when the option becomes selected, active or highlighted in response to
		 * user interaction. Handled in the Menu component.
		 *
		 * @property {MenuState} menuState State this option is entering
		 */
		'change'
	],

	setup: ( props, { emit } ) => {
		const onMouseEnter = () => {
			emit( 'change', 'highlighted' );
		};

		const onMouseDown = () => {
			emit( 'change', 'active' );
		};

		const onClick = () => {
			emit( 'change', 'selected' );
		};

		const rootClasses = computed( () : Record<string, boolean> => {
			return {
				'cdx-option--selected': props.selected,
				'cdx-option--active': props.active,
				'cdx-option--highlighted': props.highlighted,
				'cdx-option--enabled': !props.disabled,
				'cdx-option--disabled': !!props.disabled
			};
		} );

		return {
			onMouseEnter,
			onMouseDown,
			onClick,
			rootClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@min-width-select: 280px;
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );

.cdx-option {
	color: @color-base;
	list-style: none;
	position: relative;
	padding: @padding-base;
	overflow: hidden;
	line-height: @line-height-component;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition-property: @transition-property-base;
	transition-duration: @transition-duration-base;

	&--enabled {
		&:hover,
		&.cdx-option--highlighted {
			background-color: @background-color-base--hover;
			cursor: @cursor-base--hover;
		}
	}

	&--active,
	&--active:hover {
		background-color: @background-color-base--active;
		color: @color-progressive;
	}

	&--selected,
	&--selected:hover {
		background-color: @background-color-base--active;
	}

	&--selected:hover,
	&--selected&--highlighted {
		color: @color-progressive;
	}

	&--disabled,
	&--disabled .cdx-icon {
		color: @color-base--disabled;
	}

	&--disabled {
		cursor: @cursor-base--disabled;
	}
}
</style>
