<template>
	<li
		:id="id"
		role="option"
		class="cdx-option"
		:class="rootClasses"
		:aria-disabled="disabled"
		:aria-selected="isSelected"
		@mousedown.prevent="onMousedown"
		@click="onClick"
	>
		<!-- @slot Optional content, will replace label if provided -->
		<slot>
			{{ label || value }}
		</slot>
	</li>
</template>

<script lang="ts">
import {
	PropType,
	computed,
	defineComponent,
	inject
} from 'vue';
import { MenuStateKey, MenuOptionsKey } from '../../constants';
import { MenuState, MenuOptionWithId } from '../../types';

/**
 * Option within a menu.
 *
 * This component is meant to be used within a menu component that implements
 * the useMenu() composition function, which is providing various helpers to
 * the Option component.
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
		}
	},

	emits: [
		/**
		 * Emitted to the parent, to be handled within useMenu.
		 *
		 * @property {MenuState} menuState Type of menu state that's changing
		 * @property {MenuOptionWithId} option This menu option
		 */
		'change'
	],

	setup: ( props, { emit } ) => {
		// Inject helpers provided by useMenu().
		const computedOptions = inject( MenuOptionsKey );
		const state = inject( MenuStateKey );

		const thisOption = computed( () =>
			computedOptions?.value.find( ( i ) => i.id === props.id )
		);

		// Ensure this component is used within the appropriate slot
		if ( !state || !thisOption.value ) {
			throw new Error( 'Option component must be used with a Menu component' );
		}

		const onMousedown = () => {
			emit( 'change', 'active', thisOption.value );
		};

		const onClick = () => {
			emit( 'change', 'selected', thisOption.value );
		};

		const isSelected = computed( () => {
			return props.id === state.selected.value?.id;
		} );

		const isHighlighted = computed( () => {
			return props.id === state.highlighted.value?.id;
		} );

		const isActive = computed( () => {
			return props.id === state.active.value?.id;
		} );

		const rootClasses = computed( () : Record<string, boolean> => {
			return {
				'cdx-option--selected': !!isSelected.value,
				'cdx-option--active': !!isActive.value,
				'cdx-option--highlighted': !!isHighlighted.value,
				'cdx-option--enabled': !props.disabled,
				'cdx-option--disabled': !!props.disabled
			};
		} );

		return {
			onMousedown,
			onClick,
			rootClasses,
			isSelected
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';

.cdx-option {
	color: @color-base;
	list-style: none;
	position: relative;
	padding: @padding-base;
	overflow: hidden;
	line-height: @line-height-base;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition-property: background-color, color;
	transition-duration: @transition-duration-base;

	&--enabled {
		cursor: pointer;

		&:hover {
			background-color: @background-color-base--hover;
		}
	}

	&--active,
	&--active:hover {
		background-color: @background-color-primary;
		color: @color-primary;
	}

	&--highlighted {
		background-color: @background-color-base--hover;
	}

	&--selected,
	&--selected:hover {
		background-color: @background-color-primary;
	}

	&--selected:hover,
	&--selected&--highlighted {
		color: @color-primary;
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
