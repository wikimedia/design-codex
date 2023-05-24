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
				v-bind="$attrs"
				:aria-label="$slots.header || hideTitle ? title : undefined"
				:aria-labelledby="!$slots.header && !hideTitle ? labelId : undefined"
				@click.stop
			>
				<header
					v-if="showHeader || $slots.header"
					class="cdx-dialog__header"
					:class="{ 'cdx-dialog__header--default': !$slots.header }"
				>
					<!-- @slot Customizable Dialog header -->
					<slot name="header">
						<div v-if="!hideTitle" class="cdx-dialog__header__title-group">
							<h2 :id="labelId" class="cdx-dialog__header__title">
								{{ title }}
							</h2>

							<p v-if="subtitle" class="cdx-dialog__header__subtitle">
								{{ subtitle }}
							</p>
						</div>

						<cdx-button
							v-if="closeButtonLabel"
							class="cdx-dialog__header__close-button"
							weight="quiet"
							type="button"
							:aria-label="closeButtonLabel"
							@click="close"
						>
							<cdx-icon
								:icon="cdxIconClose"
								:icon-label="closeButtonLabel"
							/>
						</cdx-button>
					</slot>
				</header>

				<div
					ref="focusHolder"
					class="cdx-dialog-focus-trap"
					tabindex="-1"
				/>

				<div
					ref="dialogBody"
					class="cdx-dialog__body"
					:class="{
						'cdx-dialog__body--no-header': !( showHeader || $slots.header ),
						'cdx-dialog__body--no-footer': !(
							showFooterActions ||
							$slots.footer ||
							$slots[ 'footer-text' ]
						)
					}"
				>
					<!-- @slot Dialog content -->
					<slot />
				</div>

				<footer
					v-if="showFooterActions || $slots.footer || $slots[ 'footer-text' ]"
					class="cdx-dialog__footer"
					:class="{ 'cdx-dialog__footer--default': !$slots.footer }"
				>
					<!-- @slot Customizable Dialog footer -->
					<slot name="footer">
						<p v-if="$slots[ 'footer-text' ]" class="cdx-dialog__footer__text">
							<!-- @slot Optional footer text -->
							<slot name="footer-text" />
						</p>

						<div
							v-if="showFooterActions"
							class="cdx-dialog__footer__actions"
						>
							<cdx-button
								v-if="primaryAction"
								class="cdx-dialog__footer__primary-action"
								weight="primary"
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
					</slot>
				</footer>
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
import { computed, defineComponent, nextTick, toRef, watch, PropType, ref } from 'vue';
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

	inheritAttrs: false,

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
		 * Title for the dialog header. Used for ARIA purposes even if no
		 * visible header element is displayed.
		 */
		title: {
			type: String,
			required: true
		},

		/**
		 * Optional subtitle for the dialog.
		 */
		subtitle: {
			type: String,
			required: false,
			default: null
		},

		/**
		 * Whether the dialog header should hide the title & subtitle
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
		const showFooterActions = computed( () => !!props.primaryAction || !!props.defaultAction );

		const rootClasses = computed( () => ( {
			'cdx-dialog--vertical-actions': props.stackedActions,
			'cdx-dialog--horizontal-actions': !props.stackedActions
		} ) );

		// Value needed to compensate for the width of any visible scrollbar
		// on the page prior to the dialog taking over; without this, browsers
		// that permanently display scrollbars will exhibit a layout shift.
		const scrollWidth = ref( 0 );

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
			showFooterActions
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-dialog-backdrop {
	background-color: @background-color-backdrop-light;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: @z-index-overlay-backdrop;
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
	box-sizing: @box-sizing-base;
	width: calc( @size-full - ( @size-100 * 2) );
	max-width: @size-3200;
	max-height: calc( @size-viewport-height-full - @size-250 );
	border: @border-base;
	border-radius: @border-radius-base;
	box-shadow: @box-shadow-drop-medium;
	gap: @spacing-200;

	&__header {
		// If no custom header content is provided, apply these styles to the
		// <header> element
		&--default {
			display: flex;
			align-items: baseline;
			// Close button should appear at the end regardless of whether or not a title is present
			justify-content: flex-end;
			box-sizing: @box-sizing-base;
			width: @size-full;
			padding: @spacing-100 @spacing-150 0 @spacing-150;
		}

		&__title-group {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			gap: @spacing-35;
		}

		// Add specificity to override h2 styles, e.g. in MediaWiki skins.
		// See https://phabricator.wikimedia.org/T324495.
		& &__title {
			margin: 0;
			border: 0;
			padding: 0;
			font-family: inherit;
			font-size: @font-size-large;
			font-weight: @font-weight-bold;
			line-height: @line-height-xxx-small;
		}

		// Increase specificity to ensure that this style shows up in VitePress.
		& &__subtitle {
			color: @color-subtle;
			margin: 0;
			padding: 0;
			font-size: @font-size-medium;
			line-height: @line-height-xx-small;
		}

		&__close-button {
			margin-right: -@spacing-50;
		}
	}

	&__body {
		flex-grow: 1;
		padding: 0 @spacing-150;
		overflow-y: auto;

		// If the dialog does not display a <header> element, add some extra
		// padding at the top of the body
		&--no-header {
			padding-top: @spacing-150;
		}

		// If the dialog does not display a <footer> element, add some extra
		// padding at the bottom of the body
		&--no-footer {
			padding-bottom: @spacing-150;
		}

		// Zero-out any margin or padding on the first content element that
		// could disrupt the layout
		> *:first-child {
			margin-top: 0;
			padding-top: 0;
		}

		// Zero-out any margin or padding on the last content element that
		// could disrupt the layout
		> *:last-child {
			margin-bottom: 0;
			padding-bottom: 0;
		}
	}

	&__footer {
		// If no custom footer content is provided, apply these styles to the
		// <footer> element
		&--default {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 @spacing-150 @spacing-150;
			gap: @spacing-75;
		}

		// Increased specificity to ensure that this style shows up in VitePress
		& &__text {
			color: @color-subtle;
			flex: 1 0 auto;
			width: @spacing-full;
			margin: 0;
			font-size: @font-size-small;
			line-height: @line-height-small;
		}

		&__actions {
			display: flex;
			flex-grow: 1;
			gap: @spacing-50;
		}
	}

	&--horizontal-actions &__footer {
		&__actions {
			flex-direction: row-reverse;
		}
	}

	&--vertical-actions &__footer {
		&__actions {
			flex-direction: column;
			width: @size-full;
		}

		.cdx-dialog__footer__primary-action,
		.cdx-dialog__footer__default-action {
			max-width: none;
		}
	}
}

// This element is not used for visual styling, just
// focus managmenent. It needs to be invisible but cannot
// have display:none, and its position in the markup is
// important (must be inside the dialog element).
.cdx-dialog-focus-trap {
	// Set position to absolute so that this element is
	// omitted from all flex layout calculations
	position: absolute;

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
