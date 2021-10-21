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

<style lang="postcss">
/*
TODO: Remove references to wikimedia-ui-base once we have
the proper tokens in place
*/
@import 'wikimedia-ui-base/wikimedia-ui-base.css';

.cdx-button {
	box-sizing: border-box;

	/* Interactive elements have a minimum touch area. */
	min-width: var( --min-size-base );
	min-height: var( --min-size-base );
	max-width: var( --max-width-button );

	/* Support Firefox, Safari: Normalize by removing the `margin`. */
	margin: 0;
	border-width: var( --border-width-base );
	border-style: var( --border-style-base );
	border-radius: var( --border-radius-base );
	padding-right: var( --padding-horizontal-base );
	padding-left: var( --padding-horizontal-base );

	/* Support IE 11: Normalize by showing `overflow`. */
	overflow: visible;

	/*
	Support all browsers: Normalize by inheriting `font-family`.
	Initial value depends on user-agent.
	*/
	font-family: inherit;

	/*
	Support all browsers: Normalize by inheriting `font-size` over initial value
	of `none`.
	*/
	font-size: inherit;
	font-weight: bold;

	/*
	Support Edge, Firefox, and IE: Normalize by removing the inheritance of
	`text-transform`.
	*/
	text-transform: none;

	/* Contents are single line. */
	white-space: nowrap;
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	transition-property: border-color, background-color, color, box-shadow;
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	transition-duration: var( --transition-base );

	/*
	Support Firefox: Normalize by hiding the inner focus `border` and `padding`.
	*/
	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&:focus {
		/*
		Hide the standard focus outline. A border and box-shadow representation
		is added below.
		*/
		outline: 0;
	}

	&:not( [ disabled ] ) {
		color: var( --color-base );

		/*
		Use hand cursor. This is nonstandard for a button but allows for a
		visible interactivity distinction from the disabled state.
		*/
		cursor: pointer;

		&:focus {
			border-color: var( --color-primary--focus );
			box-shadow: var( --box-shadow-base--focus );
			/* In Windows high contrast mode the outline becomes visible. */
			outline: var( --outline-base--focus );
		}

		&:active {
			background-color: var( --background-color-framed--active );
			color: var( --color-base--emphasized );
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

/* Non-quiet “framed” buttons (normal and primary types) */
.cdx-button--framed {
	&:not( [ disabled ] ) {
		background-color: var( --background-color-framed );
		border-color: var( --border-color-base );

		&:hover {
			background-color: var( --background-color-framed--hover );
			color: var( --color-base--hover );
		}

		&:active {
			background-color: var( --background-color-framed--active );
			color: var( --color-base--active );
			border-color: var( --border-color-base--active );
		}
	}

	&[ disabled ] {
		background-color: var( --background-color-filled--disabled );
		color: var( --color-filled--disabled );
	}
}

.cdx-button--type-primary {
	/* Progressive primary buttons */
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		background-color: var( --color-primary );
		color: var( --color-base--inverted );
		border-color: var( --color-primary );

		&:hover {
			background-color: var( --color-primary--hover );
			border-color: var( --color-primary--hover );
		}

		&:focus {
			background-color: var( --color-primary--focus );
			border-color: var( --color-primary--focus );
			box-shadow: var( --box-shadow-primary--focus );
		}

		&:active {
			background-color: var( --color-primary--active );
			border-color: var( --color-primary--active );
			/* Reset `:focus` box shadow to amplify 'interaction' feeling when pressed. */
			box-shadow: none;
		}
	}

	/* Destructive primary buttons */
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		background-color: var( --color-destructive );
		color: var( --color-base--inverted );
		border-color: var( --color-destructive );

		&:hover {
			background-color: var( --color-destructive--hover );
			border-color: var( --color-destructive--hover );
		}

		&:focus {
			background-color: var( --color-destructive--focus );
			border-color: var( --color-destructive--focus );
			box-shadow: var( --box-shadow-destructive--focus );
		}

		&:active {
			background-color: var( --color-destructive--active );
			border-color: var( --color-destructive--active );
			/* Reset `:focus` box shadow to amplify 'interaction' feeling when pressed. */
			box-shadow: none;
		}
	}
}

.cdx-button--type-normal {
	/* Normal progressive buttons */
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		color: var( --color-primary );

		&:hover {
			color: var( --color-primary--hover );
			border-color: var( --border-color-primary--hover );
		}

		&:focus {
			color: var( --color-primary--focus );
			border-color: var( --border-color-primary--focus );
			box-shadow: var( --box-shadow-primary--focus );
		}

		&:active {
			/*
			FIXME this was done in LESS via lighten(color, 60%);
			we need a css-compatible alternative
			*/
			background-color: #eff3fa;
			color: var( --color-primary--active );
			border-color: var( --border-color-primary--active );
			/* Reset `:focus` box shadow to amplify 'interaction' feeling when pressed. */
			box-shadow: none;
		}
	}

	/* Normal destructive buttons */
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		color: var( --color-destructive );

		&:hover {
			color: var( --color-destructive--hover );
			border-color: var( --border-color-destructive--hover );
		}

		&:focus {
			color: var( --color-destructive--focus );
			border-color: var( --border-color-destructive--focus );
			box-shadow: var( --box-shadow-destructive--focus );
		}

		&:active {
			/*
			FIXME this was done in LESS via lighten(color, 60%);
			we need a css-compatible alternative
			*/
			background-color: #fff;
			color: var( --color-destructive--active );
			border-color: var( --border-color-destructive--active );
			/* Reset `:focus` box shadow to amplify 'interaction' feeling when pressed. */
			box-shadow: none;
		}
	}
}

/* Quiet buttons. */
.cdx-button--type-quiet {
	background-color: transparent;
	border-color: transparent;

	&:not( [ disabled ] ) {
		&:hover {
			background-color: var( --background-color-quiet--hover );
		}

		&:focus {
			border-color: var( --border-color-primary--focus );
			box-shadow: var( --box-shadow-primary--focus );
		}

		&:active {
			background-color: var( --background-color-quiet--active );
			border-color: var( --border-color-base--active );
			box-shadow: none;
		}
	}

	/* Progressive quiet buttons. */
	&.cdx-button--action-progressive:not( [ disabled ] ) {
		color: var( --color-primary );

		&:hover {
			/* FIXME @background-color-primary--hover exists but is a little lighter */
			/* FIXME the LESS version used fade() but we need a CSS-compatible alternative */
			background-color: rgba( 52, 123, 255, 0.2 );
			color: var( --color-primary--hover );
		}

		&:focus {
			color: var( --color-primary--focus );
			border-color: var( --border-color-primary--focus );
			box-shadow: var( --box-shadow-primary--focus );
		}

		&:active {
			background-color: var( --color-primary--active );
			color: var( --color-base--inverted );
			border-color: var( --color-primary--active );
			box-shadow: none;
		}
	}

	/* Destructive quiet buttons. */
	&.cdx-button--action-destructive:not( [ disabled ] ) {
		color: var( --color-destructive );

		&:hover {
			/* FIXME @background-color-destructive--hover should exist but doesn't */
			/* FIXME the LESS version used fade() but we need a CSS-compatible alternative */
			background-color: rgba( 209, 29, 19, 0.2 );
			color: var( --color-destructive--hover );
		}

		&:focus {
			color: var( --color-destructive--focus );
			border-color: var( --border-color-destructive--focus );
			box-shadow: var( --box-shadow-destructive--focus );
		}

		&:active {
			background-color: var( --color-destructive--active );
			color: var( --color-base--inverted );
			border-color: var( --color-destructive--active );
			box-shadow: none;
		}
	}

	&[ disabled ] {
		color: var( --color-base--disabled );
	}
}
</style>
