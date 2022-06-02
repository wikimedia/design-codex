<template>
	<button
		class="cdx-button"
		:class="rootClasses"
		@click="onClick"
	>
		<!-- @slot Button content -->
		<slot />
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { ButtonActions, ButtonTypes } from '../../constants';
import { ButtonAction, ButtonType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const buttonTypeValidator = makeStringTypeValidator( ButtonTypes );
const buttonActionValidator = makeStringTypeValidator( ButtonActions );

/**
 * A button wrapping slotted content.
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
		 * Button type. See the [Design Style Guide](https://design.wikimedia.org/style-guide/components/buttons.html).
		 *
		 * @values 'normal', 'primary', 'quiet'
		 */
		type: {
			type: String as PropType<ButtonType>,
			default: 'normal',
			validator: buttonTypeValidator
		}
	},
	emits: [ 'click' ],
	setup( props, { emit } ) {
		const rootClasses = computed( () => ( {
			[ `cdx-button--action-${props.action}` ]: true,
			[ `cdx-button--type-${props.type}` ]: true,
			'cdx-button--framed': props.type !== 'quiet'
		} ) );

		const onClick = ( event: Event ) => {
			emit( 'click', event );
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

// TODO: Tokenize.
@background-color-normal-progressive--active: lighten( @color-progressive--active, 60% );
@background-color-normal-destructive--active: lighten( @color-destructive--active, 60% );

.cdx-button {
	// mixin for common base styles for buttons
	.cdx-mixin-button();

	&:enabled {
		color: @color-base;

		&:hover {
			// Use hand cursor. This is nonstandard for a button but allows for a visible
			// interactivity distinction from the disabled state.
			cursor: @cursor-base--hover;
		}

		// Amplify 'interaction' feeling when pressed, by not setting focus “outline” style while
		// in active state.
		&:focus:not( :active ) {
			border-color: @border-color-base--focus;
			box-shadow: @box-shadow-progressive--focus;
			// Set the standard focus `outline` transparent. A `border` and `box-shadow` visual
			// focus is added above for common rendering.
			// In Windows high contrast mode the transparent outline becomes visible.
			outline: @outline-base--focus;
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		border-color: @border-color-transparent;
	}

	.cdx-icon {
		// Any icons used in the button content should have the color of the surrounding text
		// This overrides the color rule in Icon.vue, and ensures that the rules below changing the
		// text color for progressive and destructive buttons also apply to icons.
		color: inherit;
	}
}

// Non-quiet “framed” buttons (normal and primary types)
.cdx-button--framed {
	&:enabled {
		background-color: @background-color-framed;
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
	}
}

.cdx-button--type-primary {
	// Progressive primary buttons
	&.cdx-button--action-progressive {
		&:enabled {
			background-color: @background-color-progressive;
			color: @color-base--inverted;
			border-color: @border-color-progressive;

			&:hover {
				background-color: @background-color-progressive--hover;
				border-color: @border-color-progressive--hover;
			}

			&:active {
				background-color: @background-color-progressive--active;
				border-color: @border-color-progressive--active;
			}

			&:focus:not( :active ) {
				border-color: @border-color-progressive--focus;
				// `@box-shadow-progressive-filled--focus` for `1px` White inset
				// outline.
				box-shadow: @box-shadow-progressive-filled--focus;
			}
		}
	}

	// Destructive primary buttons
	&.cdx-button--action-destructive {
		&:enabled {
			background-color: @background-color-destructive;
			color: @color-base--inverted;
			border-color: @border-color-destructive;

			&:hover {
				background-color: @background-color-destructive--hover;
				border-color: @border-color-destructive--hover;
			}

			&:active {
				background-color: @background-color-destructive--active;
				border-color: @border-color-destructive--active;
			}

			&:focus:not( :active ) {
				border-color: @border-color-destructive--focus;
				// `@box-shadow-destructive-filled--focus` for `1px` White inset
				// outline.
				box-shadow: @box-shadow-destructive-filled--focus;
			}
		}
	}
}

.cdx-button--type-normal {
	// Normal progressive buttons
	&.cdx-button--action-progressive {
		&:enabled {
			color: @color-progressive;

			&:hover {
				color: @color-progressive--hover;
				border-color: @border-color-progressive--hover;
			}

			&:active {
				background-color: @background-color-normal-progressive--active;
				color: @color-progressive--active;
				border-color: @border-color-progressive--active;
			}

			// `:focus` styles covered in `.cdx-button` selector above.
			// `color` inherited from `:enabled` rule.
		}
	}

	// Normal destructive buttons
	&.cdx-button--action-destructive {
		&:enabled {
			color: @color-destructive;

			&:hover {
				color: @color-destructive--hover;
				border-color: @border-color-destructive--hover;
			}

			&:active {
				background-color: @background-color-normal-destructive--active;
				color: @color-destructive--active;
				border-color: @border-color-destructive--active;
			}

			&:focus:not( :active ) {
				border-color: @border-color-destructive--focus;
				box-shadow: @box-shadow-destructive--focus;
			}
		}
	}
}

// Quiet buttons.
.cdx-button--type-quiet {
	// Reset `<button>` default background color.
	background-color: transparent;
	border-color: @border-color-transparent;

	&:enabled {
		&:hover {
			background-color: @background-color-quiet--hover;
		}

		&:active {
			background-color: @background-color-quiet--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	// Progressive quiet buttons.
	&.cdx-button--action-progressive {
		&:enabled {
			color: @color-progressive;

			&:hover {
				background-color: @background-color-quiet-progressive--hover;
				color: @color-progressive--hover;
			}

			&:active {
				background-color: @background-color-progressive--active;
				color: @color-base--inverted;
				border-color: @border-color-progressive--active;
			}

			// `:focus` styles covered in `.cdx-button` selector above.
			// `color` inherited from `:enabled` rule.
		}
	}

	// Destructive quiet buttons.
	&.cdx-button--action-destructive {
		&:enabled {
			color: @color-destructive;

			&:hover {
				background-color: @background-color-quiet-destructive--hover;
				color: @color-destructive--hover;
			}

			&:active {
				background-color: @background-color-destructive--active;
				color: @color-base--inverted;
				border-color: @color-destructive--active;
			}

			&:focus:not( :active ) {
				border-color: @border-color-destructive--focus;
				box-shadow: @box-shadow-destructive--focus;
			}
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		color: @color-base--disabled;
	}
}
</style>
