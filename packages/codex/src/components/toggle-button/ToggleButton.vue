<template>
	<button
		class="cdx-toggle-button"
		:class="rootClasses"
		:aria-pressed="modelValue"
		:disabled="disabled"
		@mousedown.prevent
		@click="onClick"
	>
		<!-- @slot Button content -->
		<slot />
	</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

/**
 * A toggle button wrapping slotted content.
 *
 * You should always include some content to display on the button via the default slot.
 *
 * The `v-model` value will be a boolean, it is `true` if the button is currently toggled ("on")
 * and `false` otherwise (button is "off").
 */
export default defineComponent( {
	name: 'CdxToggleButton',
	props: {
		/**
		 * Whether the button should be set to "on" (true) or "off" (false).
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the disabled attribute should be added to the button, which prevents
		 * it from being clicked.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes (i.e. when the state is toggled)
		 *
		 * @property {boolean} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const rootClasses = computed( () => ( {
			// Provide --toggled-off too so that we can simplify selectors
			'cdx-toggle-button--toggled-on': props.modelValue,
			'cdx-toggle-button--toggled-off': !props.modelValue
		} ) );

		const onClick = (): void => {
			emit( 'update:modelValue', !props.modelValue );
		};

		return {
			rootClasses,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// Same as OOUI
// TODO add this to wikimedia-ui tokens instead
@background-color-filled--active--disabled: mix(
	@color-primary--active,
	@background-color-filled--disabled,
	35%
);

// Base styles are based on the cdx-button styles.
.cdx-toggle-button {
	box-sizing: @box-sizing-base;

	// Interactive elements have a minimum touch area.
	min-width: @min-size-base;
	min-height: @min-size-base;
	max-width: @max-width-button;

	// Support Firefox, Safari: Normalize by removing the `margin`.
	margin: 0;
	border-width: @border-width-base;
	border-style: @border-style-base;
	border-radius: @border-radius-base;
	padding-right: @padding-horizontal-base;
	padding-left: @padding-horizontal-base;

	// Support IE 11: Normalize by showing `overflow`.
	overflow: visible;

	// Support all browsers: Normalize by inheriting `font-family`.
	// Initial value depends on user-agent.
	font-family: inherit;

	// Support all browsers: Normalize by inheriting `font-size` over initial value of `none`.
	font-size: inherit;
	font-weight: @font-weight-bold;

	// Support Edge, Firefox, and IE: Normalize by removing the inheritance of `text-transform`.
	text-transform: none;

	// Contents are single line.
	white-space: nowrap;

	// Basic transition: 100ms for color, background color, border color, and box shadow
	transition: @transition-base;
	transition-property: @transition-property-base;

	// Support Firefox: Normalize by hiding the inner focus `border` and `padding`.
	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&:enabled {
		background-color: @background-color-framed;
		color: @color-base;
		border-color: @border-color-base;

		// Use hand cursor. This is non-standard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: @cursor-pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
		border-color: @border-color-base--disabled;
	}

	&--toggled-on:disabled {
		background-color: @background-color-filled--active--disabled;
	}

	&--toggled-on:enabled {
		background-color: @color-primary--active;
		color: @color-base--inverted;
		border-color: @border-color-primary--active;

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:hover {
			// Same as not hovering, needed to override the rule of hovering over all
			// non-disabled instances set above.
			background-color: @color-primary--active;
			color: @color-base--inverted;
		}
	}

	.cdx-icon {
		/*
		Any icons used in the toggle button content should have the same color as the
		rest of the content. This overrides the color rule in Icon.vue.
		*/
		color: inherit;
	}
}
</style>
