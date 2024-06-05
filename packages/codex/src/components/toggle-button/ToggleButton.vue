<template>
	<button
		class="cdx-toggle-button"
		:class="rootClasses"
		:aria-pressed="modelValue"
		:disabled="disabled"
		@click="onClick"
		@keydown.space.enter="setActive( true )"
		@keyup.space.enter="setActive( false )"
	>
		<!-- @slot Button content -->
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
	setup( props, { emit, slots, attrs } ) {
		const isIconOnly = useIconOnlyButton( slots.default, attrs, 'CdxToggleButton' );

		// Support: Firefox (space), all (enter)
		// Whether the button is being pressed via the space or enter key. Needed to apply
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

		return {
			rootClasses,
			onClick,
			setActive
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
			color: @color-emphasized;
			border-color: @border-color-interactive;
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
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-base;
			color: @color-base--hover;
		}

		// Enabled + active state has some shared styles for quiet and framed, see above.
		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-interactive;
		}

		// &:enabled:focus has some shared styles for quiet and framed, see above.
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-disabled;
		color: @color-inverted;
		border-color: @border-color-disabled;
	}

	&.cdx-toggle-button--toggled-on:enabled {
		background-color: @background-color-progressive--active;
		color: @color-inverted-fixed;
		border-color: @border-color-progressive--active;

		&:hover {
			background-color: @background-color-progressive--hover;
			// Same color as not hovering, needed to override the other :hover rule above
			color: @color-inverted-fixed;
			border-color: @border-color-progressive--hover;
		}

		&:focus {
			border-color: @border-color-progressive--focus;
			// Make `box-shadow` feature a `1px` White inset outline with a value combination.
			/* stylelint-disable-next-line stylistic/declaration-colon-newline-after,
				stylistic/value-list-comma-newline-after */
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
				@box-shadow-inset-medium @box-shadow-color-inverted;
		}

		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-interactive;
			// Repeat general enabled + active styles here, to override more specific
			// color/border-color/box-shadow rules
			color: @color-emphasized;
			border-color: @border-color-interactive;
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
		}

		&:hover {
			background-color: @background-color-interactive-subtle;
		}

		// `&:enabled:focus` has some shared styles for quiet and framed, see above.
		&:focus {
			background-color: @background-color-interactive-subtle;
		}

		// Enabled + active state has some shared styles for quiet and framed, see above
		&:active,
		&.cdx-toggle-button--is-active {
			background-color: @background-color-interactive;
		}
	}

	// No difference between disabled toggled-on and toggled-off.
	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		color: @color-disabled;
	}
}
</style>
