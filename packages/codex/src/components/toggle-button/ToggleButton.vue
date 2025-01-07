<template>
	<button
		class="cdx-toggle-button"
		:class="rootClasses"
		:aria-pressed="modelValue"
		:disabled="disabled"
		type="button"
		@click="onClick"
		@keydown.space.enter.prevent="onKeyDown"
		@keyup.space.enter="onKeyUp"
	>
		<!-- @slot ToggleButton content -->
		<slot />
	</button>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import useIconOnlyButton from '../../composables/useIconOnlyButton';

/**
 * A button that can be toggled on and off.
 */
export default defineComponent( {
	name: 'CdxToggleButton',
	props: {
		/**
		 * Whether the ToggleButton should be set to "on" (true) or "off" (false).
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the disabled attribute should be added to the ToggleButton, which prevents
		 * it from being clicked.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the ToggleButton should be "quiet", which renders more minimally.
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
	setup( props, { emit, slots, attrs } ) {
		const isIconOnly = useIconOnlyButton( slots.default, attrs, 'CdxToggleButton' );

		// Support: Firefox (space), all (enter)
		// Whether the ToggleButton is being pressed via the space or enter key. Needed to apply
		// consistent active styles across browsers. For mousedown/mouseup, the browser's native
		// :active state will suffice.
		const isActive = ref( false );

		const rootClasses = computed( () => ( {
			// Quiet means frameless among other things
			'cdx-toggle-button--quiet': props.quiet,
			'cdx-toggle-button--framed': !props.quiet,
			// Provide --toggled-off too so that we can simplify selectors
			'cdx-toggle-button--toggled-on': props.modelValue,
			'cdx-toggle-button--toggled-off': !props.modelValue,
			'cdx-toggle-button--icon-only': isIconOnly.value,
			'cdx-toggle-button--is-active': isActive.value
		} ) );

		const onClick = (): void => {
			emit( 'update:modelValue', !props.modelValue );
		};

		const setActive = ( active: boolean ) => {
			isActive.value = active;
		};

		function onKeyDown() {
			setActive( true );
		}

		function onKeyUp() {
			setActive( false );
			onClick();
		}

		return {
			rootClasses,
			onClick,
			onKeyDown,
			onKeyUp
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button.less';

// Common styles for framed and quiet versions
.cdx-toggle-button {
	// mixin for common base styles for buttons
	.cdx-mixin-button();

	&:enabled {
		color: @color-base;

		&:hover {
			background-color: @background-color-interactive-subtle--hover;
			// Use hand cursor. This is nonstandard for a button but allows for a visible
			// interactivity distinction from the disabled state.
			cursor: @cursor-base--hover;
		}

		&:focus {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-interactive-subtle--active;
			border-color: @border-color-transparent;
			box-shadow: none;
		}
	}

	.cdx-icon {
		// Any icons used in the toggle button content should have the same color as the
		// rest of the content. This overrides the color rule in Icon.vue.
		color: inherit;
		// TODO: The vertical alignment in the current DOM structure is not ideal. The icon should
		// be aligned with the text baseline, but this doesn't work well in our multi font-size
		// skin setup in MediaWiki. This is a temporary compromise to be resolved with either
		// skin specific CSS or a DOM structure change. See T326900.
		vertical-align: middle;
	}
}

// Framed version
.cdx-toggle-button--framed {
	&:enabled {
		background-color: @background-color-interactive-subtle;
		color: @color-base;
		border-color: @border-color-interactive;

		&:hover {
			background-color: @background-color-interactive-subtle--hover;
			border-color: @border-color-interactive--hover;
			cursor: @cursor-base--hover;
		}

		// Enabled + active state has some shared styles for quiet and framed, see above.
		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-interactive-subtle--active;
			border-color: @border-color-interactive--active;
			box-shadow: none;
		}

		// &:enabled:focus has some shared styles for quiet and framed, see above.
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-disabled;
		color: @color-disabled-emphasized;
		border-color: @border-color-transparent;
	}

	&.cdx-toggle-button--toggled-on:enabled {
		background-color: @background-color-progressive;
		color: @color-inverted-fixed;
		border-color: @border-color-transparent;

		&:hover {
			background-color: @background-color-progressive--hover;
			border-color: @border-color-transparent;
		}

		&:focus {
			border-color: @border-color-progressive--focus;
			// Make `box-shadow` feature a `1px` White inset outline with a value combination.
			/* stylelint-disable-next-line @stylistic/declaration-colon-newline-after,
				@stylistic/value-list-comma-newline-after */
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
				@box-shadow-inset-medium @box-shadow-color-inverted;
		}

		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-progressive--active;
			border-color: @border-color-transparent;
			// Repeat general enabled + active styles here, to override more specific
			// color/border-color/box-shadow rules
			box-shadow: none;
		}
	}
}

// Quiet toggle button
.cdx-toggle-button--quiet {
	// Override `<button>` default background color.
	background-color: @background-color-transparent;
	border-color: @border-color-transparent;

	&:enabled {
		&.cdx-toggle-button--toggled-on {
			background-color: @background-color-interactive;

			&:hover {
				background-color: @background-color-interactive--hover;
			}

			// `&:enabled:focus` has some shared styles for quiet and framed, see above.
			&:focus {
				background-color: @background-color-interactive;
			}

			// Enabled + active state has some shared styles for quiet and framed, see above
			&:active,
			&.cdx-toggle-button--is-active {
				background-color: @background-color-interactive--active;
			}
		}
	}

	// No difference between disabled toggled-on and toggled-off.
	&:disabled {
		color: @color-disabled;
	}
}
</style>
