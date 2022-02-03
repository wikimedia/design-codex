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
import { makeStringTypeValidator } from '../../utils';

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
			'cdx-button--action-default': props.action === 'default',
			'cdx-button--action-progressive': props.action === 'progressive',
			'cdx-button--action-destructive': props.action === 'destructive',
			'cdx-button--type-primary': props.type === 'primary',
			'cdx-button--type-normal': props.type === 'normal',
			'cdx-button--type-quiet': props.type === 'quiet',
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
// TODO: Remove references to wikimedia-ui-base once we have the proper tokens in place.
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

.cdx-button {
	box-sizing: border-box;

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
	font-weight: bold;

	// Support Edge, Firefox, and IE: Normalize by removing the inheritance of `text-transform`.
	text-transform: none;

	// Contents are single line.
	white-space: nowrap;
	transition-property: border-color, background-color, color, box-shadow;
	transition-duration: @transition-base;

	// Support Firefox: Normalize by hiding the inner focus `border` and `padding`.
	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&:focus {
		// Hide the standard focus outline. A border and box-shadow representation is added below.
		outline: 0;
	}

	&:not( [ disabled ] ) {
		color: @color-base;

		// Use hand cursor. This is nonstandard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--emphasized;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		border-color: transparent;
	}

	.cdx-icon {
		/*
		Any icons used in the button content should have the color of the surrounding text
		This overrides the color rule in Icon.vue, and ensures that the rules below changing the
		text color for progressive and destructive buttons also apply to icons.
		*/
		color: inherit;
	}
}

// Non-quiet “framed” buttons (normal and primary types)
.cdx-button--framed {
	&:not( [ disabled ] ) {
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
	}

	&[ disabled ] {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
	}
}

.cdx-button--type-primary {
	// Progressive primary buttons
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		background-color: @color-primary;
		color: @color-base--inverted;
		border-color: @color-primary;

		&:hover {
			background-color: @color-primary--hover;
			border-color: @color-primary--hover;
		}

		&:focus {
			background-color: @color-primary--focus;
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @color-primary--active;
			border-color: @color-primary--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}

	// Destructive primary buttons
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		background-color: @color-destructive;
		color: @color-base--inverted;
		border-color: @color-destructive;

		&:hover {
			background-color: @color-destructive--hover;
			border-color: @color-destructive--hover;
		}

		&:focus {
			background-color: @color-destructive--focus;
			border-color: @color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: @color-destructive--active;
			border-color: @color-destructive--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}
}

.cdx-button--type-normal {
	// Normal progressive buttons
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		color: @color-primary;

		&:hover {
			color: @color-primary--hover;
			border-color: @border-color-primary--hover;
		}

		&:focus {
			color: @color-primary--focus;
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: lighten( @color-primary--active, 60% );
			color: @color-primary--active;
			border-color: @border-color-primary--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}

	// Normal destructive buttons
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		color: @color-destructive;

		&:hover {
			color: @color-destructive--hover;
			border-color: @border-color-destructive--hover;
		}

		&:focus {
			color: @color-destructive--focus;
			border-color: @border-color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: lighten( @color-destructive--active, 60% );
			color: @color-destructive--active;
			border-color: @border-color-destructive--active;
			// Reset `:focus` box shadow to amplify 'interaction' feeling when pressed.
			box-shadow: none;
		}
	}
}

// Quiet buttons.
.cdx-button--type-quiet {
	background-color: transparent;
	border-color: transparent;

	&:not( [ disabled ] ) {
		&:hover {
			background-color: @background-color-quiet--hover;
		}

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @background-color-quiet--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	// Progressive quiet buttons.
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		color: @color-primary;

		&:hover {
			// FIXME: @background-color-primary--hover exists but is a little lighter.
			background-color: fade( #347bff, 20% );
			color: @color-primary--hover;
		}

		&:focus {
			color: @color-primary--focus;
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:active {
			background-color: @color-primary--active;
			color: @color-base--inverted;
			border-color: @color-primary--active;
			box-shadow: none;
		}
	}

	// Destructive quiet buttons.
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		color: @color-destructive;

		&:hover {
			// FIXME: @background-color-destructive--hover should exist but doesn't.
			background-color: fade( #d11d13, 20% );
			color: @color-destructive--hover;
		}

		&:focus {
			color: @color-destructive--focus;
			border-color: @border-color-destructive--focus;
			box-shadow: @box-shadow-destructive--focus;
		}

		&:active {
			background-color: @color-destructive--active;
			color: @color-base--inverted;
			border-color: @color-destructive--active;
			box-shadow: none;
		}
	}

	&[ disabled ] {
		color: @color-base--disabled;
	}
}
</style>
