import type { ToastOptions, ToastUpdateOptions, UseToastReturn } from './toast.types';
import { contentRefsById, toastStore } from './toast.store';

import { useId } from 'vue';

/**
 * Composable for managing toast notifications programmatically.
 *
 * @return Toast API (show, dismiss, clear, success, error, info, warning)
 */
export default function useToast(): UseToastReturn {
	const baseId = useId();
	const toastCounter = { value: 0 };

	/**
	 * Show a toast notification.
	 * Provide either message (programmatic) or contentRef (declarative cdx-toast).
	 *
	 * @param options Toast options
	 * @return Toast id
	 */
	function show( options: ToastOptions ): string {
		const {
			message,
			contentRef,
			type,
			icon,
			actionButton,
			preventUserDismiss,
			autoDismiss,
			onUserDismissed,
			onAutoDismissed,
		} = options;

		if ( message === undefined && !contentRef ) {
			throw new Error( 'Toast: provide either message or contentRef in options.' );
		}

		const id = `${ baseId }-${ toastCounter.value++ }`;
		if ( contentRef ) {
			contentRefsById.set( id, contentRef );
		}
		toastStore.toasts.push( {
			id,
			message,
			type: type ?? 'notice',
			icon,
			actionButton,
			autoDismiss: autoDismiss ?? false,
			preventUserDismiss: preventUserDismiss ?? false,
			onUserDismissed,
			onAutoDismissed,
		} );
		return id;
	}

	/**
	 * Dismiss a toast by ID.
	 * Callbacks (onUserDismissed, onAutoDismissed) are run by ToastContainer.
	 *
	 * @param id Toast ID
	 */
	function dismiss( id: string ): void {
		const index = toastStore.toasts.findIndex( ( t ) => t.id === id );
		if ( index !== -1 ) {
			toastStore.toasts.splice( index, 1 );
			contentRefsById.delete( id );
		}
	}

	/**
	 * Update an existing toast by ID. Only display-related options are applied.
	 * Used by declarative CdxToast to keep the store in sync when props change.
	 *
	 * @param id Toast ID
	 * @param options Partial updatable options
	 */
	function update( id: string, options: Partial<ToastUpdateOptions> ): void {
		const toast = toastStore.toasts.find( ( t ) => t.id === id );
		if ( !toast ) {
			return;
		}
		Object.assign( toast, options );
	}

	/**
	 * Clear all toasts.
	 */
	function clear(): void {
		toastStore.toasts.length = 0;
		contentRefsById.clear();
	}

	/**
	 * Show a success toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	function success(
		message: string,
		opts: Omit<ToastOptions, 'message' | 'type'> = {}
	): string {
		return show( { ...opts, message, type: 'success' } );
	}

	/**
	 * Show an error toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	function error(
		message: string,
		opts: Omit<ToastOptions, 'message' | 'type'> = {}
	): string {
		return show( { ...opts, message, type: 'error' } );
	}

	/**
	 * Show a notice/info toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	function info(
		message: string,
		opts: Omit<ToastOptions, 'message' | 'type'> = {}
	): string {
		return show( { ...opts, message, type: 'notice' } );
	}

	/**
	 * Show a warning toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	function warning(
		message: string,
		opts: Omit<ToastOptions, 'message' | 'type'> = {}
	): string {
		return show( { ...opts, message, type: 'warning' } );
	}

	return {
		show,
		dismiss,
		update,
		clear,
		success,
		error,
		info,
		warning
	};
}
