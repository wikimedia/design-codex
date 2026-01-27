import { ComponentPublicInstance, Ref, nextTick, ref } from 'vue';

import { unwrapElement } from '../utils/unwrapElement';

interface UseFocusTrapOptions {
	containerRef: Ref<HTMLElement | undefined>;
	bodyRef?: Ref<HTMLElement | undefined>;
	/**
	 * Optional anchor/trigger element. If the previously focused element is the anchor,
	 * focus will not be moved away from it to prevent triggering blur events.
	 */
	anchorRef?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>;
	/**
	 * Whether to prevent scrolling when focusing elements.
	 * Defaults to false.
	 */
	preventScroll?: boolean;
}

export default function useFocusTrap(
	options: UseFocusTrapOptions
) {
	const {
		containerRef,
		bodyRef,
		anchorRef,
		preventScroll = false
	} = options;

	const focusTrapStart = ref<HTMLDivElement>();
	const focusTrapEnd = ref<HTMLDivElement>();
	const focusHolder = ref<HTMLDivElement>();
	let previouslyFocused: Element | null = null;

	/**
	 * Check if the previously focused element is the anchor element.
	 * This is used to avoid moving focus away from or restoring focus to the anchor,
	 * which could trigger unwanted blur/focus events.
	 *
	 * @return {boolean} True if the previously focused element is the anchor
	 */
	function isPreviouslyFocusedAnchor(): boolean {
		if ( !anchorRef || !previouslyFocused ) {
			return false;
		}
		const anchorEl = unwrapElement( anchorRef.value );
		return anchorEl !== null && previouslyFocused === anchorEl;
	}

	/**
	 * Programmatically focus the first focusable element inside the container.
	 */
	function focusFirst(): void {
		if ( containerRef.value ) {
			focusFirstFocusableElement( containerRef.value );
		}
	}

	/**
	 * Programmatically focus the last focusable element inside the container.
	 */
	function focusLast(): void {
		if ( containerRef.value ) {
			focusFirstFocusableElement( containerRef.value, true );
		}
	}

	/**
	 * Programmatically assign focus to the first focusable element in a
	 * specified container. Can optionally run backwards. This method is
	 * used in the component's focus trap implementation, which ensures that
	 * the user cannot focus outside the container while it is open.
	 *
	 * @param container {HTMLElement}
	 * @param backwards {boolean}
	 * @return {boolean}
	 */
	function focusFirstFocusableElement(
		container: HTMLElement,
		backwards = false
	): boolean {
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
			candidate.focus( { preventScroll } );
			// Once it works, return true.
			if ( document.activeElement === candidate ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Activate the focus trap.
	 * Stores the previously focused element and moves focus inside the container.
	 * If the previously focused element is the anchor, focus is not moved away from it
	 * to prevent triggering blur events on the anchor.
	 */
	async function activateFocusTrap(): Promise<void> {
		// Most of the things below need to happen on nextTick because they rely on template
		// refs, and those are not yet set when the watcher for the open prop runs.
		await nextTick();

		// Stash the currently focused element so we can restore it later.
		previouslyFocused = document.activeElement;

		// If the previously focused element is the anchor, don't move focus away from it.
		// This prevents triggering blur events on the anchor that might close the popover.
		// The focus trap will still work when focus naturally moves into the container.
		if ( isPreviouslyFocusedAnchor() ) {
			// Don't move focus away from the anchor, but still set up the trap
			// so it works when focus moves into the container.
			return;
		}

		// Focus within the container so that we can listen to keypress events.
		// Try focusing on the first focusable element in the body (if provided) or
		// fall back to the container. If there isn't one, use the focus holder.
		const focusTarget = bodyRef?.value ?? containerRef.value;
		if ( focusTarget && !focusFirstFocusableElement( focusTarget ) ) {
			focusHolder.value?.focus( { preventScroll } );
		}
	}

	/**
	 * Deactivate the focus trap.
	 * Restores focus to the previously-focused element, if possible.
	 * If the previously focused element was the anchor, focus is not restored
	 * to avoid triggering unwanted events.
	 */
	function deactivateFocusTrap(): void {
		// If the previously focused element was the anchor, don't restore focus to it.
		// This prevents triggering blur/focus events that could cause issues.
		if ( isPreviouslyFocusedAnchor() ) {
			previouslyFocused = null;
			return;
		}

		// Restore focus to the previously-focused element, if there was one
		// (and if it still exists in the document).
		if (
			previouslyFocused instanceof HTMLElement &&
			document.contains( previouslyFocused )
		) {
			previouslyFocused.focus( { preventScroll } );
			previouslyFocused = null;
		}
	}

	return {
		focusTrapStart,
		focusTrapEnd,
		focusHolder,
		focusFirst,
		focusLast,
		activateFocusTrap,
		deactivateFocusTrap
	};
}
