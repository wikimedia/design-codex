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
import { defineComponent, computed, warn, Comment, PropType, SetupContext, VNode, VNodeArrayChildren } from 'vue';
import { ButtonActions, ButtonTypes } from '../../constants';
import { ButtonAction, ButtonType } from '../../types';
import CdxIcon from '../icon/Icon.vue';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const buttonTypeValidator = makeStringTypeValidator( ButtonTypes );
const buttonActionValidator = makeStringTypeValidator( ButtonActions );
const validateIconOnlyButtonAttrs = ( attrs: SetupContext['attrs'] ) => {
	if ( !attrs[ 'aria-label' ] && !attrs[ 'aria-hidden' ] ) {
		warn( `icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/main/components/button.html#default-icon-only` );
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
	setup( props, { emit, slots, attrs } ) {
		const rootClasses = computed( () => ( {
			[ `cdx-button--action-${props.action}` ]: true,
			[ `cdx-button--type-${props.type}` ]: true,
			'cdx-button--framed': props.type !== 'quiet',
			'cdx-button--icon-only': isIconOnlyButton( slots.default?.(), attrs )
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

// The following paddings are required to achieve a width of 32px for icon-only buttons.
@horizontal-padding-icon-only: ( ( 32px - @size-icon ) / 2 ) - @border-width-base;

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
		&:focus:not( :active ) {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
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

// Buttons that only include an icon element.
.cdx-button--icon-only {
	padding: 0 @horizontal-padding-icon-only;
}

// Non-quiet “framed” buttons (normal and primary types)
.cdx-button--framed {
	&:enabled {
		background-color: @background-color-interactive-subtle;
		border-color: @border-color-base;

		&:hover {
			background-color: @background-color-base;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-interactive;
			color: @color-emphasized;
			border-color: @border-color-interactive;
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-disabled;
		color: @color-inverted;
	}
}

.cdx-button--type-primary {
	// Progressive primary buttons
	&.cdx-button--action-progressive {
		&:enabled {
			background-color: @background-color-progressive;
			color: @color-inverted;
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

			&:hover {
				background-color: @background-color-destructive--hover;
				border-color: @border-color-destructive--hover;
			}

			&:active {
				background-color: @background-color-destructive--active;
				border-color: @border-color-destructive--active;
			}

			&:focus:not( :active ) {
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
				box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus;
			}
		}
	}
}

// Quiet buttons.
.cdx-button--type-quiet {
	// Reset `<button>` default background color.
	background-color: @background-color-transparent;
	border-color: @border-color-transparent;

	&:enabled {
		&:hover {
			background-color: @background-color-quiet--hover;
		}

		&:active {
			background-color: @background-color-quiet--active;
			color: @color-emphasized;
			border-color: @border-color-interactive;
		}

		// `:focus` styles covered in `.cdx-button` selector above.
	}

	// Progressive quiet buttons.
	&.cdx-button--action-progressive {
		&:enabled {
			color: @color-progressive;

			&:hover {
				background-color: @background-color-progressive-subtle;
				color: @color-progressive--hover;
			}

			&:active {
				background-color: @background-color-progressive--active;
				color: @color-inverted;
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
				background-color: @background-color-destructive-subtle;
				color: @color-destructive--hover;
			}

			&:active {
				background-color: @background-color-destructive--active;
				color: @color-inverted;
				border-color: @color-destructive--active;
			}

			&:focus:not( :active ) {
				border-color: @border-color-destructive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-destructive--focus;
			}
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		color: @color-disabled;
	}
}
</style>
