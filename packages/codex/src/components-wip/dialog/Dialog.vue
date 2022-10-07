<template>
	<transition name="cdx-dialog-fade" appear>
		<div
			v-if="open"
			class="cdx-dialog-backdrop"
			@click="close"
			@keyup.escape="close"
		>
			<!-- Focus trap start -->
			<div
				ref="focusTrapStart"
				tabindex="0"
				@focus="focusLast"
			/>
			<div
				ref="dialogElement"
				class="cdx-dialog"
				:class="rootClasses"
				role="dialog"
				:aria-labelledby="labelId"
				@click.stop
			>
				<div v-if="showHeader" class="cdx-dialog__header">
					<h2
						v-show="!hideTitle"
						:id="labelId"
						class="cdx-dialog__header__title"
					>
						{{ title }}
					</h2>

					<cdx-button
						v-if="closeButtonLabel"
						class="cdx-dialog__header__close-button"
						type="quiet"
						:aria-label="closeButtonLabel"
						@click="close"
					>
						<cdx-icon
							:icon="cdxIconClose"
							:icon-label="closeButtonLabel"
						/>
					</cdx-button>
				</div>

				<div
					ref="focusHolder"
					class="cdx-dialog-focus-trap"
					tabindex="-1"
				/>

				<div ref="dialogBody" class="cdx-dialog__body">
					<!-- @slot Dialog content -->
					<slot />
				</div>

				<div v-if="primaryAction || defaultAction" class="cdx-dialog__footer">
					<cdx-button
						v-if="primaryAction"
						class="cdx-dialog__footer__primary-action"
						type="primary"
						:action="primaryAction.actionType"
						:disabled="primaryAction.disabled"
						@click="$emit( 'primary' )"
					>
						{{ primaryAction.label }}
					</cdx-button>

					<cdx-button
						v-if="defaultAction"
						class="cdx-dialog__footer__default-action"
						:disabled="defaultAction.disabled"
						@click="$emit( 'default' )"
					>
						{{ defaultAction.label }}
					</cdx-button>
				</div>
			</div>

			<!-- Focus trap end -->
			<div
				ref="focusTrapEnd"
				tabindex="0"
				@focus="focusFirst"
			/>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, toRef, watch, PropType, ref, onMounted, onUnmounted } from 'vue';
import CdxButton from '../../components/button/Button.vue';
import CdxIcon from '../../components/icon/Icon.vue';
import { cdxIconClose } from '@wikimedia/codex-icons';
import useGeneratedId from '../../composables/useGeneratedId';
import { DialogAction, PrimaryDialogAction } from '../../types';

/**
 * A modal element that presents relevant information or actions.
 *
 * The Dialog overtakes the user's entire viewport until it is dismissed,
 * preventing mouse and keyboard interaction with other parts of the page
 * while open. This is a significant interruption in the user experience,
 * so this component should be used with care.
 *
 * The parent component controls whether the Dialog is open via `v-model:open`.
 *
 * A Dialog can offer two kinds of actions (represented by buttons of the
 * appropriate type): primary action (can be progressive or destructive), and
 * default action (typically a safe option like "cancel").
 *
 * The Dialog component can either be used on its own (in which case it
 * displays in-place, using CSS positioning and z-index to overlay the rest
 * of the viewport), or it can be used along with Vue's built-in `<teleport>`
 * component to move the component elsewhere in the DOM. This latter approach
 * may be useful when Dialog is embedded in a large/complex page with other
 * absolutely-positioned elements near the end of the markup.
 *
 * When open, the Dialog adds a class to the document body to prevent scrolling;
 * this is applied whether or not teleport is used.
 */
export default defineComponent( {
	name: 'CdxDialog',

	components: {
		CdxButton,
		CdxIcon
	},

	props: {
		/**
		 * Whether the dialog is visible. Should be provided via a v-model:open
		 * binding in the parent scope.
		 */
		open: {
			type: Boolean,
			default: false
		},

		/**
		 * Title for the dialog header
		 */
		title: {
			type: String,
			required: true
		},

		/**
		 * Whether the dialog title should be visually hidden
		 */
		hideTitle: {
			type: Boolean,
			default: false
		},

		/**
		 * Label for the icon-only close button in the header.
		 *
		 * Including this prop adds the close button.
		 */
		closeButtonLabel: {
			type: String,
			default: ''
		},

		/**
		 * Primary user action. This will display a primary button with the specified action
		 * (progressive or destructive).
		 */
		primaryAction: {
			type: Object as PropType<PrimaryDialogAction>,
			default: null
		},

		/**
		 * Default user action. This will display a normal button.
		 */
		defaultAction: {
			type: Object as PropType<DialogAction>,
			default: null
		},

		/**
		 * Whether action buttons should be vertically stacked and 100% width.
		 */
		stackedActions: {
			type: Boolean,
			default: false
		},

		/**
		 * Dialog size.
		 *
		 * @todo implement fullscreen size (requires mobile workarounds)
		 *
		 * @values 'large'
		 */
		size: {
			type: String,
			default: ''
		},

		/**
		 * Whether the dialog should display dividers between header, footer,
		 * and body sections.
		 */
		showDividers: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the open/close state changes, e.g. when the close button is clicked.
		 *
		 * @property {boolean} newValue The new open/close state (true for open, false for closed)
		 */
		'update:open',

		/**
		 * When the primary action button is clicked.
		 */
		'primary',

		/**
		 * When the default action button is clicked.
		 */
		'default'
	],

	setup( props, { emit } ) {
		const labelId = useGeneratedId( 'dialog-label' );

		const dialogElement = ref<HTMLDivElement>(); // dialog "frame"
		const dialogBody = ref<HTMLDivElement>(); // dialog content
		const focusHolder = ref<HTMLDivElement>();
		const focusTrapStart = ref<HTMLDivElement>();
		const focusTrapEnd = ref<HTMLDivElement>();

		const showHeader = computed( () => !props.hideTitle || !!props.closeButtonLabel );

		const rootClasses = computed( () => ( {
			'cdx-dialog--vertical-actions': props.stackedActions,
			'cdx-dialog--horizontal-actions': !props.stackedActions,
			'cdx-dialog--large': props.size === 'large',
			'cdx-dialog--dividers': props.showDividers
		} ) );

		// Value needed to compensate for the width of any visible scrollbar
		// on the page prior to the dialog taking over; without this, browsers
		// that permanently display scrollbars will exhibit a layout shift.
		const scrollWidth = ref( 0 );

		// Stash the current window innerHeight to provide the most accurate measurement
		// possible for browsers like MobileSafari (where header and footer may or may
		// not be visible at any given time).
		const windowHeight = ref( window.innerHeight );

		// Wrap this value in a px measurement so it can be used in a CSS variable.
		const windowHeightInPx = computed( () => {
			return `${windowHeight.value}px`;
		} );

		/**
		 * Close the dialog by emitting an event to the parent
		 */
		function close() {
			emit( 'update:open', false );
		}

		/**
		 * Programmatically focus the first focusable element inside the dialog
		 * frame.
		 */
		function focusFirst() {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			focusFirstFocusableElement( dialogElement.value! );
		}

		/**
		 * Programmatically focus the last focusable element inside the dialog
		 * frame.
		 */
		function focusLast() {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			focusFirstFocusableElement( dialogElement.value!, true );
		}

		/**
		 * Programmatically assign focus to the first focusable element in a
		 * specified container. Can optionally run backwards. This method is
		 * used in the component's focus trap implementation, which ensures that
		 * the user cannot focus outside the Dialog while it is open.
		 *
		 * @param container {HTMLElement}
		 * @param backwards {boolean}
		 * @return {boolean}
		 */
		function focusFirstFocusableElement( container: HTMLElement, backwards = false ): boolean {
			// Find all focusable elements in the container.
			// Exclude elements with a negative tabindex; those are technically focusable, but are
			// skipped when tabbing
			let candidates = Array.from(
				container.querySelectorAll<HTMLElement>( `
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				` )
			);

			// If we're looking for the previous element, reverse the array.
			if ( backwards ) {
				candidates = candidates.reverse();
			}

			for ( const candidate of candidates ) {
				// Try to focus each element.
				candidate.focus();
				// Once it works, return true.
				if ( document.activeElement === candidate ) {
					return true;
				}
			}
			return false;
		}

		watch( toRef( props, 'open' ), ( opened ) => {
			if ( opened ) {
				// Determine the width of the scrollbar and compensate for it if necessary
				scrollWidth.value = window.innerWidth - document.documentElement.clientWidth;
				document.documentElement.style.setProperty( 'margin-right', `${scrollWidth.value}px` );

				// Add a class to <body> to prevent scrolling
				document.body.classList.add( 'cdx-dialog-open' );

				// Focus within the dialog so that we can listen to keypress events.
				// Try focusing on the first focusable element in the body. If there isn't one,
				// use the focus holder.
				// Do this on nextTick, otherwise the focus might be stolen back by e.g. a button
				// whose click event opened the dialog.
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				nextTick( () => {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					if ( !focusFirstFocusableElement( dialogBody.value! ) ) {
						focusHolder.value?.focus();
					}
				} );
			} else {
				document.body.classList.remove( 'cdx-dialog-open' );
				document.documentElement.style.removeProperty( 'margin-right' );
			}
		} );

		// Update the `windowHeight` ref defined above whenever a window resize
		// event is fired (in MobileSafari this happens whenver the browser footer)
		// appears or disappears.
		function onResize() {
			windowHeight.value = window.innerHeight;
		}

		onMounted( () => {
			window.addEventListener( 'resize', onResize );
		} );

		onUnmounted( () => {
			window.removeEventListener( 'resize', onResize );
		} );

		return {
			close,
			cdxIconClose,
			labelId,
			rootClasses,
			dialogElement,
			focusTrapStart,
			focusTrapEnd,
			focusFirst,
			focusLast,
			dialogBody,
			focusHolder,
			showHeader,
			windowHeightInPx
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-dialog-backdrop {
	background-color: @background-color-backdrop-light;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: @z-index-overlay;
	min-height: @size-full;
	width: @size-viewport-width-full;
	height: @size-viewport-height-full;
	// Support Safari/iOS: Make `100vh` work with Safari's address bar.
	// See https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	height: -webkit-fill-available;
}

.cdx-dialog {
	background-color: @background-color-base;
	display: flex;
	flex-direction: column;
	width: calc( @size-full - ( @size-100 * 2) );
	max-width: @size-3200;
	max-height: calc( @size-viewport-height-full - @size-250 );
	border: @border-base;
	border-radius: @border-radius-base;
	padding-top: @spacing-100;
	padding-bottom: @spacing-150;
	box-shadow: @box-shadow-dialog;

	&.cdx-dialog--large {
		width: @size-full;
		/* stylelint-disable-next-line value-keyword-case */
		height: v-bind( windowHeightInPx );
		max-width: unset;
		max-height: unset;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			width: calc( @size-full - ( @size-200 * 2 ) );
			height: calc( @size-viewport-height-full - @size-250 );
		}

		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			max-width: @size-5600;
		}
	}

	&__header {
		display: flex;
		align-items: center;
		// Close button should appear at the end regardless of whether or not a title is present
		justify-content: flex-end;
		width: @size-full;
		padding: 0 @spacing-150 @spacing-50 @spacing-150;
		font-weight: @font-weight-bold;

		& &__title {
			flex-grow: 1;
			font-size: 1em;
			line-height: 1.25;
		}

		&__close-button {
			margin-right: -@spacing-50;
		}

		.cdx-dialog--dividers & {
			border-bottom: @border-style-base @border-width-base @border-color-subtle;
		}
	}

	&__body {
		flex-grow: 1;
		margin-top: @spacing-50;
		padding: 0 @spacing-150;
		overflow-y: auto;

		.cdx-dialog--dividers & {
			padding-top: @spacing-75;
		}
	}

	&__footer {
		display: flex;
		margin-top: @spacing-100;
		padding: 0 @spacing-150;

		.cdx-dialog--dividers & {
			border-top: @border-style-base @border-width-base @border-color-subtle;
			padding-top: @spacing-100;
		}
	}

	&--horizontal-actions &__footer {
		flex-direction: row-reverse;

		.cdx-dialog__footer__primary-action + .cdx-dialog__footer__default-action {
			margin-right: @spacing-50;
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--vertical-actions &__footer {
		flex-direction: column;

		.cdx-dialog__footer__primary-action + .cdx-dialog__footer__default-action {
			margin-top: @spacing-50;
		}

		.cdx-dialog__footer__primary-action,
		.cdx-dialog__footer__default-action {
			max-width: none;
		}
	}
	/* stylelint-enable no-descending-specificity */
}

.cdx-dialog-focus-trap {
	// Don't show visible focus outline for the focus-trap element
	&:focus {
		outline: 0;
	}
}

.cdx-dialog-fade-enter-active,
.cdx-dialog-fade-leave-active {
	transition-property: @transition-property-fade;
	// For system initiated transitions – the user clicks a dialog trigger button,
	// the system opens the dialog – use a longer transition and system timing function.
	transition-duration: @transition-duration-medium;
	transition-timing-function: @transition-timing-function-system;
}

.cdx-dialog-fade-enter-from,
.cdx-dialog-fade-leave-to {
	opacity: @opacity-transparent;
}

body.cdx-dialog-open {
	overflow: hidden;
}
</style>
