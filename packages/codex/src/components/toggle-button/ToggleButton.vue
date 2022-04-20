<template>
	<button
		class="cdx-toggle-button"
		:class="rootClasses"
		:aria-pressed="modelValue"
		:disabled="disabled"
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
		},
		/**
		 * Whether the toggle button should be "quiet", which renders more minimally.
		 */
		quiet: {
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
			// Quiet means frameless among other things
			'cdx-toggle-button--quiet': props.quiet,
			'cdx-toggle-button--framed': !props.quiet,
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
@import './../../themes/mixins/button.less';

// Same as OOUI
// TODO add this to wikimedia-ui tokens instead
@background-color-filled--active--disabled: mix(
	@color-primary--active,
	@background-color-filled--disabled,
	35%
);

// TODO move these to the design tokens
@background-color-toggle-button-quiet--hover: @color-base90;
@background-color-toggle-button-quiet--active: @color-base80;
@background-color-toggle-button-quiet--focus: @color-base90;
@background-color-toggle-button-quiet--toggled-on: @color-base80;

// Common styles for framed and quiet versions
.cdx-toggle-button {
	// mixin for common base styles for buttons
	.cdx-mixin-button();

	&:enabled {
		color: @color-base;

		// Use hand cursor. This is non-standard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: @cursor-pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:active {
			color: @color-base--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	.cdx-icon {
		// Any icons used in the toggle button content should have the same color as the
		// rest of the content. This overrides the color rule in Icon.vue.
		color: inherit;
	}
}

// Framed version
.cdx-toggle-button--framed {
	&:enabled {
		background-color: @background-color-framed;
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		// &:enabled:active has some shared styles for quiet and framed, see above.
		&:active {
			background-color: @background-color-framed--active;
		}

		// &:enabled:focus has some shared styles for quiet and framed, see above.
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
		border-color: @border-color-base--disabled;
	}

	&.cdx-toggle-button--toggled-on:enabled {
		background-color: @color-primary--active;
		color: @color-base--inverted;
		border-color: @border-color-primary--active;

		&:hover {
			background-color: @color-progressive--hover;
			// Same color as not hovering, needed to override the other :hover rule above
			color: @color-base--inverted;
			border-color: @border-color-progressive--hover;
		}

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @background-color-framed--active;
			// Repeat general :enabled:active styles here, to override more specific
			// color/border-color/box-shadow rules
			color: @color-base--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}
}

// Quiet toggle button
.cdx-toggle-button--quiet {
	// Override `<button>` default background color.
	background-color: @background-color-base--transparent;
	border-color: @border-color-transparent;

	&:enabled {
		&.cdx-toggle-button--toggled-on {
			background-color: @background-color-toggle-button-quiet--toggled-on;
		}

		&:hover {
			background-color: @background-color-toggle-button-quiet--hover;
		}

		// `&:enabled:focus` has some shared styles for quiet and framed, see above.
		&:focus {
			background-color: @background-color-toggle-button-quiet--focus;
		}

		// `&:enabled:active` has some shared styles for quiet and framed, see above
		&:active {
			background-color: @background-color-toggle-button-quiet--active;
		}
	}

	// No difference between disabled toggled-on and toggled-off.
	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		color: @color-base--disabled;
	}
}
</style>
