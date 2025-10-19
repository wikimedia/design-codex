<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<transition name="cdx-dialog-fade" appear>
			<div
				v-if="open"
				ref="backdrop"
				class="cdx-dialog-backdrop"
				@mousedown="onBackdropMouseDown"
				@click="onBackdropClick"
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
					aria-modal="true"
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
								v-if="useCloseButtonOrLabel"
								class="cdx-dialog__header__close-button"
								weight="quiet"
								type="button"
								:aria-label="translatedCloseButtonLabel"
								@click="close"
							>
								<cdx-icon :icon="cdxIconClose" />
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
						class="cdx-dialog__body cdx-scrollable-container"
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

				<!-- Teleport target for menus inside this dialog -->
				<div ref="innerTeleportTarget" />
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, toRef, watch, ref, inject, onMounted, onUnmounted, useId, PropType, provide, unref } from 'vue';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import { cdxIconClose } from '@wikimedia/codex-icons';
import useI18nWithOverride from '../../composables/useI18nWithOverride';
import useResizeObserver from '../../composables/useResizeObserver';
import { TeleportTarget, ModalAction, PrimaryModalAction } from '../../types';

/**
 * A modal element that overlays the current page, preventing interaction with
 * other content until it is dismissed.
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
		 * Add an icon-only close button to the dialog header.
		 */
		useCloseButton: {
			type: Boolean,
			default: false
		},

		// DEPRECATED: Set default to 'Close' and remove validator (T368444).
		/**
		 * Visually-hidden label text for the icon-only close button in the header.
		 *
		 * Omit this prop to use the default value, "Close".
		 */
		closeButtonLabel: {
			type: String,
			default: '',
			validator: ( value: string, props ) => {
				if ( value.length > 0 && !props.useCloseButton ) {
					// eslint-disable-next-line no-console
					console.warn(
						`[CdxDialog]: The boolean \`useCloseButton\` prop is required to show the close button.\n
Refer to https://doc.wikimedia.org/codex/latest/components/demos/dialog.html#props.`
					);
					return false;
				}
				return true;
			}
		},

		/**
		 * Primary user action. This will display a primary button with the specified action
		 * (progressive or destructive).
		 */
		primaryAction: {
			type: Object as PropType<PrimaryModalAction>,
			default: null
		},

		/**
		 * Default user action. This will display a normal button.
		 */
		defaultAction: {
			type: Object as PropType<ModalAction>,
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
		 * Selector or DOM element identifying the container the dialog should
		 * be rendered in. The dialog will be `<teleport>`ed to this element.
		 * An ID selector is recommended, e.g. `#foo-bar`, but providing an
		 * actual element is also supported.
		 *
		 * If this prop is not set, and the parent or one of its ancestors
		 * provides a teleport target using `provide( 'CdxTeleportTarget',
		 * '#foo-bar' )`, the provided target will be used. If there is no
		 * provided target, the dialog will be teleported to the end of the
		 * `<body>` element.
		 */
		target: {
			type: String as PropType<string | HTMLElement | null>,
			default: null
		},

		/**
		 * Whether to disable the use of teleport and render the Dialog in its
		 * original location in the document. If this is true, the `target` prop
		 * is ignored.
		 */
		renderInPlace: {
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
		const labelId = useId();

		const backdrop = ref<HTMLDivElement>();
		const dialogElement = ref<HTMLDivElement>(); // dialog "frame"
		const dialogBody = ref<HTMLDivElement>(); // dialog content
		const focusHolder = ref<HTMLDivElement>();
		const focusTrapStart = ref<HTMLDivElement>();
		const focusTrapEnd = ref<HTMLDivElement>();
		const innerTeleportTarget = ref<HTMLDivElement>();
		let previouslyFocused: Element|null = null;

		// DEPRECATED: require use of new prop useCloseButton (T368444)
		const useCloseButtonOrLabel = computed(
			() => props.useCloseButton || props.closeButtonLabel.length > 0
		);
		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-dialog-close-button-label',
			'Close'
		);

		const showHeader = computed( () => !props.hideTitle || useCloseButtonOrLabel.value );
		const showFooterActions = computed( () => !!props.primaryAction || !!props.defaultAction );

		const bodyDimensions = useResizeObserver( dialogBody );
		const currentBodyHeight = computed( () => bodyDimensions.value.height ?? 0 );
		const showDividers = ref( false );

		const rootClasses = computed( () => ( {
			'cdx-dialog--vertical-actions': props.stackedActions,
			'cdx-dialog--dividers': showDividers.value
		} ) );

		// Determine where to teleport the Dialog to
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => props.target ?? unref( providedTarget ) ?? 'body' );
		// Provide our own inner teleport target as the teleport target to child components
		provide( 'CdxTeleportTarget', innerTeleportTarget );

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

		// We close the dialog when the backdrop is clicked, but unfortunately the click event
		// also fires if the user holds the mouse down inside the dialog, drags the mouse out of
		// the dialog onto the backdrop, and releases it on the backdrop (T358544). We only want
		// to close the dialog on a "true" click on the backdrop, so only close the dialog on click
		// if the preceding mousedown event happened on the backdrop.
		let mousedownOnBackdrop = false;

		function onBackdropMouseDown( e: MouseEvent ) {
			mousedownOnBackdrop = e.target === backdrop.value;
		}

		function onBackdropClick() {
			if ( mousedownOnBackdrop ) {
				close();
			}
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

		let ariaHiddenElements: Element[] = [];
		let inertElements: Element[] = [];

		/**
		 * Hide all other elements on the page from screen readers, and prevent user
		 * interaction with them, by setting aria-hidden and inert on all siblings of all
		 * ancestors of the dialog. This leaves the path from the root node to the
		 * dialog as the only nodes that aren't covered by aria-hidden and inert.
		 */
		function setAriaHiddenAndInert() {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			let element: HTMLElement = backdrop.value!;
			while ( element.parentElement && element.nodeName !== 'BODY' ) {
				for ( const sibling of Array.from( element.parentElement.children ) ) {
					if ( sibling === element || sibling.nodeName === 'SCRIPT' ) {
						continue;
					}
					// Store the elements we set aria-hidden and inert on, so that we can
					// unset them when the dialog closes. Exclude elements that already have these
					// attributes set, so that we don't unset things that were supposed to stay set.
					if ( !sibling.hasAttribute( 'aria-hidden' ) ) {
						sibling.setAttribute( 'aria-hidden', 'true' );
						ariaHiddenElements.push( sibling );
					}
					if ( !sibling.hasAttribute( 'inert' ) ) {
						sibling.setAttribute( 'inert', '' );
						inertElements.push( sibling );
					}
				}
				element = element.parentElement;
			}
		}

		function unsetAriaHiddenAndInert() {
			for ( const element of ariaHiddenElements ) {
				element.removeAttribute( 'aria-hidden' );
			}
			for ( const element of inertElements ) {
				element.removeAttribute( 'inert' );
			}
			ariaHiddenElements = [];
			inertElements = [];
		}

		async function onDialogOpen() {

			// Most of the things below need to happen on nextTick because they rely on template
			// refs, and those are not yet set when the watcher for props.open runs.
			// The documentElement and body manipulations don't need to happen on nextTick, but
			// it's better to group them with the other DOM changes so that we don't cause two
			// separate reflows.
			await nextTick();

			// Determine the width of the scrollbar and compensate for it if necessary
			scrollWidth.value = window.innerWidth - document.documentElement.clientWidth;
			document.documentElement.style.setProperty( 'margin-right', `${ scrollWidth.value }px` );

			// Add a class to <body> to prevent scrolling
			document.body.classList.add( 'cdx-dialog-open' );

			setAriaHiddenAndInert();

			// Stash the currently focused element so we can restore it later.
			previouslyFocused = document.activeElement;

			// Focus within the dialog so that we can listen to keypress events.
			// Try focusing on the first focusable element in the body. If there isn't one,
			// use the focus holder.
			// This needs to happen on nextTick, otherwise the focus might be stolen back by
			// e.g. a button whose click event opened the dialog.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if ( !focusFirstFocusableElement( dialogBody.value! ) ) {
				focusHolder.value?.focus();
			}
		}

		function onDialogClose() {
			document.body.classList.remove( 'cdx-dialog-open' );
			document.documentElement.style.removeProperty( 'margin-right' );
			unsetAriaHiddenAndInert();

			// Restore focus to the previously-focused element, if there was one
			// (and if it still exists in the document).
			if (
				previouslyFocused instanceof HTMLElement &&
				document.contains( previouslyFocused )
			) {
				previouslyFocused.focus();
				previouslyFocused = null;
			}
		}

		// If the dialog is mounted in the open state, make sure we set things up properly
		onMounted( async () => {
			if ( props.open ) {
				await onDialogOpen();
			}
		} );

		// If the dialog is closed while it's still mounted, make sure we clean up behind ourselves
		onUnmounted( () => {
			if ( props.open ) {
				onDialogClose();
			}
		} );

		watch( toRef( props, 'open' ), async ( opened ) => {
			if ( opened ) {
				await onDialogOpen();
			} else {
				onDialogClose();
			}
		} );

		// Determine if content dividers should be displayed for overflowing content
		watch( currentBodyHeight, () => {
			if ( dialogBody.value ) {
				showDividers.value = dialogBody.value.clientHeight < dialogBody.value.scrollHeight;
			}
		} );

		return {
			close,
			onBackdropClick,
			onBackdropMouseDown,
			cdxIconClose,
			labelId,
			rootClasses,
			backdrop,
			dialogElement,
			focusTrapStart,
			focusTrapEnd,
			innerTeleportTarget,
			focusFirst,
			focusLast,
			dialogBody,
			focusHolder,
			showHeader,
			showFooterActions,
			useCloseButtonOrLabel,
			translatedCloseButtonLabel,
			computedTarget
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/public/typography.less';

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
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,
		scale-unlimited/declaration-strict-value */
	height: -webkit-fill-available;
}

.cdx-dialog {
	background-color: @background-color-base;
	display: flex;
	flex-direction: column;
	box-sizing: @box-sizing-base;
	// On narrow screens, make dialogs full screen
	width: @size-full;
	height: @size-full;

	@media ( min-width: @min-width-breakpoint-tablet ) {
		// On wide screens, ensure some space around the sides
		// Dynamically size the height of the dialog to fit the content, up to a limit
		width: calc( @size-full - ( @size-100 * 2 ) );
		height: unset;
		max-width: @size-3200;
		max-height: calc( @size-viewport-height-full - @size-250 );
		border: @border-base;
		border-radius: @border-radius-base;
		box-shadow: @box-shadow-large;
	}

	&__header {
		padding: @spacing-100 @spacing-150 @spacing-50;

		// If no custom header content is provided, apply these styles to the
		// `<header>` element
		&--default {
			display: flex;
			align-items: baseline;
			// Close button should appear at the end regardless of whether or not a title is present
			justify-content: flex-end;
			box-sizing: @box-sizing-base;
			width: @size-full;
		}

		&__title-group {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
		}

		// Add specificity to override h2 styles, e.g. in MediaWiki skins.
		// See https://phabricator.wikimedia.org/T324495.
		& &__title {
			margin: 0;
			border: 0;
			padding: 0;
			font-family: inherit;
			font-size: @font-size-x-large;
			font-weight: @font-weight-bold;
			line-height: @line-height-x-large;
		}

		// Increase specificity to ensure that this style shows up in VitePress.
		& &__subtitle {
			color: @color-subtle;
			margin: 0;
			padding: 0;
			font-size: @font-size-medium;
			line-height: @line-height-small;
		}

		&__close-button.cdx-button {
			margin-right: -@spacing-50;
		}

		.cdx-dialog--dividers & {
			border-bottom: @border-subtle;
		}
	}

	&__body {
		padding: @spacing-50 @spacing-150;
		overflow-y: auto;
		.cdx-mixin-body-text();

		// If the dialog does not display a `<header>` element, add some extra
		// padding at the top of the body
		&--no-header {
			padding-top: @spacing-150;
		}

		// If the dialog does not display a `<footer>` element, add some extra
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
		// Put the footer at the bottom without making the body larger than it needs to be
		// This ensures the ResizeObserver on the body works even in full-screen mode, which
		// it would not if we set flex-grow: 1; on the body.
		margin-top: auto;
		padding: @spacing-100 @spacing-150 @spacing-150;

		.cdx-dialog--dividers & {
			border-top: @border-subtle;
		}

		// If no custom footer content is provided, apply these styles to the
		// `<footer>` element
		&--default {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			justify-content: space-between;
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
			flex-direction: row-reverse;
			gap: @spacing-75;

			@media ( max-width: @max-width-breakpoint-mobile ) {
				flex-direction: column;
				width: @size-full;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-button {
					max-width: none;
				}
			}
		}
	}

	&--vertical-actions &__footer__actions {
		flex-direction: column;
		width: @size-full;

		.cdx-button {
			max-width: none;
		}
	}
}

// This element is not used for visual styling, just
// focus management. It needs to be invisible but cannot
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
