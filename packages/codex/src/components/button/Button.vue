<template>
	<button
		ref="button"
		class="cdx-button"
		:class="rootClasses"
		@keydown.space.enter.prevent="onKeyDown"
		@keyup.space.enter="onKeyUp"
		@click="onClick"
	>
		<!-- @slot Button content -->
		<slot />
	</button>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from 'vue';
import { ButtonActions, ButtonWeights, ButtonSizes } from '../../constants';
import { ButtonAction, ButtonWeight, ButtonSize } from '../../types';
import useIconOnlyButton from '../../composables/useIconOnlyButton';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const buttonActionValidator = makeStringTypeValidator( ButtonActions );
const buttonWeightValidator = makeStringTypeValidator( ButtonWeights );
const buttonSizeValidator = makeStringTypeValidator( ButtonSizes );

/**
 * A control that triggers an action when the user clicks or taps on it.
 */
export default defineComponent( {
	name: 'CdxButton',
	props: {
		/**
		 * The kind of action that will be taken on click.
		 *
		 * @values 'default', 'progressive', 'destructive'
		 */
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default',
			validator: buttonActionValidator
		},
		/**
		 * Visual prominence of the button.
		 *
		 * @values 'normal', 'primary', 'quiet'
		 */
		weight: {
			type: String as PropType<ButtonWeight>,
			default: 'normal',
			validator: buttonWeightValidator
		},
		/**
		 * Button size.
		 *
		 * Most buttons should use the default medium size. In rare cases the large size should
		 * be used, for example to make icon-only buttons larger on touchscreens.
		 *
		 * @values 'medium', 'large'
		 */
		size: {
			type: String as PropType<ButtonSize>,
			default: 'medium',
			validator: buttonSizeValidator
		}
	},
	emits: [ 'click' ],
	setup( props, { emit, slots, attrs } ) {
		const button = ref<HTMLButtonElement>();
		const isIconOnly = useIconOnlyButton( slots.default, attrs, 'CdxButton' );

		// Support: Firefox (space), all (enter)
		// Whether the button is being pressed via the space or enter key. Needed to apply
		// consistent active styles across browsers. For mousedown/mouseup, the browser's native
		// :active state will suffice.
		const isActive = ref( false );

		const rootClasses = computed( () => ( {
			[ `cdx-button--action-${ props.action }` ]: true,
			[ `cdx-button--weight-${ props.weight }` ]: true,
			[ `cdx-button--size-${ props.size }` ]: true,
			'cdx-button--framed': props.weight !== 'quiet',
			'cdx-button--icon-only': isIconOnly.value,
			'cdx-button--is-active': isActive.value
		} ) );

		const onClick = ( event: Event ) => {
			emit( 'click', event );
		};

		const setActive = ( active: boolean ) => {
			isActive.value = active;
		};

		function onKeyDown() {
			setActive( true );
		}

		function onKeyUp() {
			setActive( false );
			// Trigger a click. We do this instead of emitting a click event to trigger native
			// events, like form submission.
			button.value?.click();
		}

		return {
			button,
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

/* stylelint-disable max-nesting-depth */
.cdx-button {
	// Mixin for common base styles for buttons.
	.cdx-mixin-button();

	// Target both a CSS-only icon and a Vue icon, which could be included in the slot.
	.cdx-button__icon,
	.cdx-icon {
		// TODO: The vertical alignment in the current DOM structure is not ideal. The icon should
		// be aligned with the text baseline, but this doesn't work well in our multi font-size
		// theme setup in MediaWiki. This is a temporary compromise to be resolved with either
		// theme-specific CSS or a DOM structure change. See T326900.
		vertical-align: middle;
	}

	// Vue icon.
	.cdx-icon {
		// Any icons used in the button content should have the color of the surrounding text
		// This overrides the color rule in Icon.vue, and ensures that the rules below changing the
		// text color for progressive and destructive buttons also apply to icons.
		color: inherit;
	}

	// This class can be applied to inline elements other than `<button>`, like `<a>` or `<label`>.
	// We do not encourage this, but it is needed for some legacy code and progressive enhancements.
	&--fake-button {
		// In case it's a link.
		&,
		&:hover,
		&:focus {
			text-decoration: none;
		}
	}

	// Styles for enabled buttons of all weights and actions.
	// The class is included to enable these styles for elements other than <button>.
	&:enabled,
	&.cdx-button--fake-button--enabled {
		background-color: @background-color-interactive-subtle;
		color: @color-base;
		border-color: @border-color-interactive;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-base );
		}

		&:hover {
			background-color: @background-color-interactive-subtle--hover;
			border-color: @border-color-interactive--hover;
			// Use hand cursor. This is nonstandard for a button but allows for a visible
			// interactivity distinction from the disabled state.
			cursor: @cursor-base--hover;
		}

		&:active,
		&.cdx-button--is-active {
			background-color: @background-color-interactive-subtle--active;
			border-color: @border-color-interactive--active;
		}

		&:focus {
			// Set the standard focus `outline` transparent. A `border` and `box-shadow` visual
			// focus is added above for common rendering.
			// In Windows high contrast mode the transparent outline becomes visible.
			// As vendor stylesheets set the outline on `:focus`, we need to follow here too and
			// can't rely on the next selector to override it.
			outline: @outline-base--focus;
		}

		// Amplify 'interaction' feeling when pressed, by not setting focus “outline” style while
		// in active state.
		&:focus:not( :active ):not( .cdx-button--is-active ) {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
		}

		// Normal progressive buttons.
		&.cdx-button--action-progressive {
			background-color: @background-color-progressive-subtle;
			color: @color-progressive;
			border-color: @border-color-progressive;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-progressive );
			}

			&:hover {
				background-color: @background-color-progressive-subtle--hover;
				color: @color-progressive--hover;
				border-color: @border-color-progressive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-progressive--hover );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-progressive-subtle--active;
				color: @color-progressive--active;
				border-color: @border-color-progressive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-progressive--active );
				}
			}

			// `:focus` styles covered in `.cdx-button` selector above.
			// `color` inherited from `:enabled` rule.
		}

		// Normal destructive buttons.
		&.cdx-button--action-destructive {
			background-color: @background-color-destructive-subtle;
			color: @color-destructive;
			border-color: @border-color-destructive;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-destructive );
			}

			&:hover {
				background-color: @background-color-destructive-subtle--hover;
				color: @color-destructive--hover;
				border-color: @border-color-destructive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-destructive--hover );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-destructive-subtle--active;
				color: @color-destructive--active;
				border-color: @border-color-destructive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-destructive--active );
				}
			}

			&:focus:not( :active ):not( .cdx-button--is-active ) {
				border-color: @border-color-destructive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus;
			}
		}

		// Primary buttons.
		&.cdx-button--weight-primary {
			// Progressive primary buttons.
			&.cdx-button--action-progressive {
				background-color: @background-color-progressive;
				color: @color-inverted-fixed;
				border-color: @border-color-transparent;

				&:hover {
					background-color: @background-color-progressive--hover;
				}

				&:active,
				&.cdx-button--is-active {
					background-color: @background-color-progressive--active;
				}

				&:focus:not( :active ):not( .cdx-button--is-active ) {
					border-color: @border-color-progressive--focus;
					// Make `box-shadow` feature a `1px` White inset outline with a value
					// combination.
					/* stylelint-disable-next-line @stylistic/declaration-colon-newline-after,
						@stylistic/value-list-comma-newline-after */
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
						@box-shadow-inset-medium @box-shadow-color-inverted;
				}
			}

			// Destructive primary buttons.
			&.cdx-button--action-destructive {
				background-color: @background-color-destructive;
				color: @color-inverted-fixed;
				border-color: @border-color-transparent;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted-fixed );
				}

				&:hover {
					background-color: @background-color-destructive--hover;
				}

				&:active,
				&.cdx-button--is-active {
					background-color: @background-color-destructive--active;
				}

				&:focus:not( :active ):not( .cdx-button--is-active ) {
					// While Codex tokens feature `background-color-destructive--focus` it's not
					// necessary to duplicate it, as `background-color` is inherited.
					border-color: @border-color-destructive--focus;
					// Make `box-shadow` feature a `1px` White inset outline with a value
					// combination.
					/* stylelint-disable-next-line @stylistic/declaration-colon-newline-after,
						@stylistic/value-list-comma-newline-after */
					box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus,
						@box-shadow-inset-medium @box-shadow-color-inverted;
				}
			}
		}

		// Quiet buttons.
		&.cdx-button--weight-quiet {
			// Reset `<button>` default background color.
			background-color: @background-color-transparent;
			border-color: @border-color-transparent;

			&:hover {
				background-color: @background-color-interactive-subtle--hover;
				/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
				mix-blend-mode: @mix-blend-mode-blend;
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-interactive-subtle--active;
			}

			// `:focus` styles are the same as normal buttons.

			// Progressive quiet buttons.
			&.cdx-button--action-progressive {
				color: @color-progressive;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-progressive );
				}

				&:hover {
					background-color: @background-color-progressive-subtle--hover;
					color: @color-progressive--hover;
					border-color: @border-color-transparent;

					.cdx-button__icon {
						.cdx-mixin-button-css-icon-fallback-color( @color-progressive--hover );
					}
				}

				&:active,
				&.cdx-button--is-active {
					background-color: @background-color-progressive-subtle--active;
					color: @color-progressive--active;
					border-color: @border-color-transparent;

					.cdx-button__icon {
						.cdx-mixin-button-css-icon-fallback-color( @color-progressive--active );
					}
				}

				&:focus:not( :active ):not( .cdx-button--is-active ) {
					border-color: @border-color-progressive--focus;
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				}

				// `color` inherited from `:enabled` rule.
			}

			// Destructive quiet buttons.
			&.cdx-button--action-destructive {
				color: @color-destructive;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-destructive );
				}

				&:hover {
					background-color: @background-color-destructive-subtle--hover;
					color: @color-destructive--hover;
					border-color: @border-color-transparent;

					.cdx-button__icon {
						.cdx-mixin-button-css-icon-fallback-color( @color-destructive--hover );
					}
				}

				&:active,
				&.cdx-button--is-active {
					background-color: @background-color-destructive-subtle--active;
					color: @color-destructive--active;
					border-color: @border-color-transparent;

					.cdx-button__icon {
						.cdx-mixin-button-css-icon-fallback-color( @color-destructive--active );
					}
				}

				&:focus:not( :active ):not( .cdx-button--is-active ) {
					border-color: @border-color-destructive--focus;
					box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus;
				}
			}
		}
	}

	// Disabled styles all buttons.
	// These are the same for everything except quiet buttons.
	/* stylelint-disable no-descending-specificity */
	&:disabled,
	&.cdx-button--fake-button--disabled {
		background-color: @background-color-disabled;
		color: @color-disabled-emphasized;
		border-color: @border-color-transparent;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
		}

		// Disabled quiet buttons.
		&.cdx-button--weight-quiet {
			background-color: @background-color-transparent;
			color: @color-disabled;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-disabled );
			}
		}
	}
	/* stylelint-enable no-descending-specificity */
}
/* stylelint-enable max-nesting-depth */
</style>
