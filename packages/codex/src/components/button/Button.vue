<template>
	<button
		class="cdx-button"
		:class="rootClasses"
		@click="onClick"
		@keydown.space.enter="setActive( true )"
		@keyup.space.enter="setActive( false )"
	>
		<!-- @slot Button content -->
		<slot />
	</button>
</template>

<script lang="ts">
import {
	Comment,
	PropType,
	SetupContext,
	VNode,
	VNodeArrayChildren,
	defineComponent,
	ref,
	computed,
	warn
} from 'vue';
import { ButtonActions, ButtonWeights, ButtonSizes } from '../../constants';
import { ButtonAction, ButtonWeight, ButtonSize } from '../../types';
import CdxIcon from '../icon/Icon.vue';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const buttonActionValidator = makeStringTypeValidator( ButtonActions );
const buttonWeightValidator = makeStringTypeValidator( ButtonWeights );
const buttonSizeValidator = makeStringTypeValidator( ButtonSizes );
const validateIconOnlyButtonAttrs = ( attrs: SetupContext['attrs'] ) => {
	if ( !attrs[ 'aria-label' ] && !attrs[ 'aria-hidden' ] ) {
		warn( `icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/button.html#default-icon-only` );
	}
};

function flattenVNodeContents( nodes: VNodeArrayChildren ): ( VNode | string )[] {
	const flattenedContents: ( VNode | string )[] = [];
	for ( const node of nodes ) {
		if ( typeof node === 'string' && node.trim() !== '' ) {
			flattenedContents.push( node );
		} else if ( Array.isArray( node ) ) {
			flattenedContents.push( ...flattenVNodeContents( node ) );
		} else if ( typeof node === 'object' && node ) {
			// node is a VNode
			if (
				// HTML tag
				typeof node.type === 'string' ||
				// Component
				typeof node.type === 'object'
			) {
				flattenedContents.push( node );
			} else if ( node.type !== Comment ) {
				// Text node or fragment (or something fragment-like). Descend into its children.
				if ( typeof node.children === 'string' && node.children.trim() !== '' ) {
					flattenedContents.push( node.children );
				} else if ( Array.isArray( node.children ) ) {
					flattenedContents.push( ...flattenVNodeContents( node.children ) );
				}
			}
		}
	}
	return flattenedContents;
}

const isIconOnlyButton = ( slotContent: VNode[] | undefined, attrs: SetupContext['attrs'] ): boolean => {
	if ( !slotContent ) {
		return false;
	}
	const flattenedContents = flattenVNodeContents( slotContent );
	if ( flattenedContents.length !== 1 ) {
		return false;
	}
	const soleNode = flattenedContents[ 0 ];
	const isIconComponent = typeof soleNode === 'object' &&
		typeof soleNode.type === 'object' &&
		'name' in soleNode.type &&
		soleNode.type.name === CdxIcon.name;
	const isSvgTag = typeof soleNode === 'object' && soleNode.type === 'svg';
	if ( isIconComponent || isSvgTag ) {
		validateIconOnlyButtonAttrs( attrs );
		return true;
	}
	return false;
};

/**
 * A control that can be pressed to trigger an action.
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
		// Support: Firefox (space), all (enter)
		// Whether the button is being pressed via the space or enter key. Needed to apply
		// consistent active styles across browsers. For mousedown/mouseup, the browser's native
		// :active state will suffice.
		const isActive = ref( false );

		const rootClasses = computed( () => ( {
			[ `cdx-button--action-${props.action}` ]: true,
			[ `cdx-button--weight-${props.weight}` ]: true,
			[ `cdx-button--size-${props.size}` ]: true,
			'cdx-button--framed': props.weight !== 'quiet',
			'cdx-button--icon-only': isIconOnlyButton( slots.default?.(), attrs ),
			'cdx-button--is-active': isActive.value
		} ) );

		const onClick = ( event: Event ) => {
			emit( 'click', event );
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

.cdx-button {
	// mixin for common base styles for buttons
	.cdx-mixin-button();

	&:enabled {
		color: @color-base;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-base );
		}

		&:hover {
			// Use hand cursor. This is nonstandard for a button but allows for a visible
			// interactivity distinction from the disabled state.
			cursor: @cursor-base--hover;
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
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		border-color: @border-color-transparent;
	}

	// Target both a CSS-only icon and a Vue icon, which could be included in the slot.
	.cdx-button__icon,
	.cdx-icon {
		// TODO: The vertical alignment in the current DOM structure is not ideal. The icon should
		// be aligned with the text baseline, but this doesn't work well in our multi font-size
		// theme setup in MediaWiki. This is a temporary compromise to be resolved with either
		// theme-specific CSS or a DOM structure change. See T326900.
		vertical-align: middle;
	}

	.cdx-icon {
		// Any icons used in the button content should have the color of the surrounding text
		// This overrides the color rule in Icon.vue, and ensures that the rules below changing the
		// text color for progressive and destructive buttons also apply to icons.
		color: inherit;
	}
}

// Buttons that only include an icon element.
.cdx-button--icon-only {
	&:not( .cdx-button--size-large ) {
		// Medium icon-only buttons have a smaller horizontal padding, to make them square.
		// Large icon-only buttons use the standard button padding applied in the button mixin.
		padding: 0 @spacing-horizontal-button-icon-only;
	}
}

// Non-quiet “framed” buttons (normal and primary types)
.cdx-button:not( .cdx-button--weight-quiet ) {
	&:enabled {
		background-color: @background-color-interactive-subtle;
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-base;
			color: @color-base--hover;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-base--hover );
			}
		}

		&:active,
		&.cdx-button--is-active {
			background-color: @background-color-interactive;
			color: @color-emphasized;
			border-color: @border-color-interactive;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-emphasized );
			}
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	/* stylelint-disable no-descending-specificity */
	&:disabled {
		background-color: @background-color-disabled;
		color: @color-inverted;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
		}
	}
	/* stylelint-enable no-descending-specificity */
}

// Primary buttons.
.cdx-button--weight-primary {
	// Progressive primary buttons
	&.cdx-button--action-progressive {
		&:enabled {
			background-color: @background-color-progressive;
			color: @color-inverted;
			border-color: @border-color-progressive;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
			}

			&:hover {
				background-color: @background-color-progressive--hover;
				// Ensure this overrides rule for framed buttons above.
				color: @color-inverted;
				border-color: @border-color-progressive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-progressive--active;
				// Ensure this overrides rule for framed buttons above.
				color: @color-inverted;
				border-color: @border-color-progressive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			&:focus:not( :active ):not( .cdx-button--is-active ) {
				border-color: @border-color-progressive--focus;
				// Make `box-shadow` feature a `1px` White inset outline with a value combination.
				/* stylelint-disable-next-line value-list-comma-newline-after */
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
					@box-shadow-inset-medium @box-shadow-color-inverted;
			}
		}
	}

	// Destructive primary buttons
	&.cdx-button--action-destructive {
		&:enabled {
			background-color: @background-color-destructive;
			color: @color-inverted;
			border-color: @border-color-destructive;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
			}

			&:hover {
				background-color: @background-color-destructive--hover;
				color: @color-inverted;
				border-color: @border-color-destructive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-destructive--active;
				// Ensure this overrides rule for framed buttons above.
				color: @color-inverted;
				border-color: @border-color-destructive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			&:focus:not( :active ):not( .cdx-button--is-active ) {
				// While Codex tokens feature `background-color-destructive--focus` it's not
				// necessary to duplicate it, as `background-color` is inherited.
				border-color: @border-color-destructive--focus;
				// Make `box-shadow` feature a `1px` White inset outline with a value combination.
				/* stylelint-disable-next-line value-list-comma-newline-after */
				box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus,
					@box-shadow-inset-medium @box-shadow-color-inverted;
			}
		}
	}
}

// Quiet buttons.
.cdx-button--weight-quiet {
	// Reset `<button>` default background color.
	background-color: @background-color-transparent;
	border-color: @border-color-transparent;

	&:enabled {
		&:hover {
			background-color: @background-color-button-quiet--hover;
		}

		&:active,
		&.cdx-button--is-active {
			background-color: @background-color-button-quiet--active;
			color: @color-emphasized;
			border-color: @border-color-interactive;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-emphasized );
			}
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	// Progressive quiet buttons.
	&.cdx-button--action-progressive {
		&:enabled {
			color: @color-progressive;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-progressive );
			}

			&:hover {
				background-color: @background-color-progressive-subtle;
				color: @color-progressive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-progressive--hover );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-progressive--active;
				color: @color-inverted;
				border-color: @border-color-progressive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			// `:focus` styles covered in `.cdx-button` selector above.
			// `color` inherited from `:enabled` rule.
		}
	}

	// Destructive quiet buttons.
	&.cdx-button--action-destructive {
		&:enabled {
			color: @color-destructive;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-destructive );
			}

			&:hover {
				background-color: @background-color-destructive-subtle;
				color: @color-destructive--hover;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-destructive--hover );
				}
			}

			&:active,
			&.cdx-button--is-active {
				background-color: @background-color-destructive--active;
				color: @color-inverted;
				border-color: @border-color-destructive--active;

				.cdx-button__icon {
					.cdx-mixin-button-css-icon-fallback-color( @color-inverted );
				}
			}

			&:focus:not( :active ):not( .cdx-button--is-active ) {
				border-color: @border-color-destructive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus;
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
	&:disabled {
		color: @color-disabled;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-disabled );
		}
	}
	/* stylelint-enable no-descending-specificity */
}

// Normal type buttons (using the not selectors allows this class to be the default).
&:not( .cdx-button--weight-primary ):not( .cdx-button--weight-quiet ):enabled {
	// Normal progressive buttons
	&.cdx-button--action-progressive {
		color: @color-progressive;

		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-progressive );
		}

		&:hover {
			color: @color-progressive--hover;
			border-color: @border-color-progressive--hover;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-progressive--hover );
			}
		}

		&:active,
		&.cdx-button--is-active {
			background-color: @background-color-progressive-subtle;
			color: @color-progressive--active;
			border-color: @border-color-progressive--active;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-progressive--active );
			}
		}

		// `:focus` styles covered in `.cdx-button` selector above.
		// `color` inherited from `:enabled` rule.
	}

	// Normal destructive buttons
	&.cdx-button--action-destructive {
		color: @color-destructive;

		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-button__icon {
			.cdx-mixin-button-css-icon-fallback-color( @color-destructive );
		}

		&:hover {
			color: @color-destructive--hover;
			border-color: @border-color-destructive--hover;

			.cdx-button__icon {
				.cdx-mixin-button-css-icon-fallback-color( @color-destructive--hover );
			}
		}

		&:active,
		&.cdx-button--is-active {
			background-color: @background-color-destructive-subtle;
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
}
</style>
