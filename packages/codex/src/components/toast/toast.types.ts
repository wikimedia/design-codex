import type { Icon } from '@wikimedia/codex-icons';
import type { Ref } from 'vue';
import type { StatusType } from '../../types';

/**
 * Action button configuration for a toast.
 */
export interface ToastActionButton {
	/**
	 * Label text for the action button.
	 */
	label: string;
	/**
	 * Callback function when the action button is clicked.
	 */
	onClick: () => void;
}

/**
 * Options for creating a toast.
 * Provide either message (programmatic) or contentRef (declarative cdx-toast).
 */
export interface ToastOptions {
	/**
	 * Toast message. Required for programmatic useToast(); omit when using contentRef.
	 */
	message?: string;
	/**
	 * Ref that the container will assign to the content element. Used by declarative
	 * cdx-toast so slot content is teleported into the container without raw HTML.
	 */
	contentRef?: Ref<HTMLElement | null>;
	/**
	 * Toast type. Defaults to 'notice'.
	 */
	type?: StatusType;
	/**
	 * Custom icon. Only allowed for notice toasts.
	 */
	icon?: Icon | null;
	/**
	 * Optional action button configuration.
	 */
	actionButton?: ToastActionButton;
	/**
	 * Whether to prevent the user from dismissing the toast. Defaults to false
	 * (user can dismiss via close button or swipe).
	 */
	preventUserDismiss?: boolean;
	/**
	 * Callback function when the toast is dismissed by the user.
	 */
	onUserDismissed?: () => void;
	/**
	 * Callback function when the toast is automatically dismissed.
	 */
	onAutoDismissed?: () => void;
	/**
	 * Enable automatic dismissal. Can be set to `true` for default 4000ms,
	 * a number for custom duration in milliseconds, or `false` to disable.
	 */
	autoDismiss?: boolean | number;
}

/**
 * Toast instance with all required properties.
 */
export interface Toast extends ToastOptions {
	/**
	 * Unique identifier for the toast.
	 */
	id: string;
}

/**
 * Toast as stored in reactive toastStore. contentRef is kept in contentRefsById.
 */
export type ToastInStore = Omit<Toast, 'contentRef'>;

/**
 * Updatable toast options. Used to reactively update a toast in the store (e.g. when
 * declarative CdxToast props change). Excludes message, contentRef, and callbacks.
 */
export type ToastUpdateOptions = Pick<
	ToastOptions,
	'type' | 'icon' | 'actionButton' | 'autoDismiss' | 'preventUserDismiss'
>;

/**
 * Return type for the useToast composable.
 */
export interface UseToastReturn {
	/**
	 * Show a toast notification.
	 *
	 * @param options Toast options
	 * @return Toast ID
	 */
	show: ( options: ToastOptions ) => string;

	/**
	 * Dismiss a toast by ID.
	 *
	 * @param id Toast ID
	 */
	dismiss: ( id: string ) => void;

	/**
	 * Update an existing toast by ID. Only display-related options are applied;
	 * callbacks and contentRef are unchanged. Used by CdxToast to keep the store
	 * in sync when props change.
	 *
	 * @param id Toast ID
	 * @param options Partial updatable options
	 */
	update: ( id: string, options: Partial<ToastUpdateOptions> ) => void;

	/**
	 * Clear all toasts.
	 */
	clear: () => void;

	/**
	 * Show a success toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	success: (
		message: string,
		opts?: Omit<ToastOptions, 'message' | 'type'>
	) => string;

	/**
	 * Show an error toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	error: (
		message: string,
		opts?: Omit<ToastOptions, 'message' | 'type'>
	) => string;

	/**
	 * Show a notice/info toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	info: (
		message: string,
		opts?: Omit<ToastOptions, 'message' | 'type'>
	) => string;

	/**
	 * Show a warning toast.
	 *
	 * @param message Toast message
	 * @param opts Additional toast options (excluding message and type)
	 * @return Toast ID
	 */
	warning: (
		message: string,
		opts?: Omit<ToastOptions, 'message' | 'type'>
	) => string;
}
