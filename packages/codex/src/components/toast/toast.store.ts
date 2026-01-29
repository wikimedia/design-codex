import type { Ref } from 'vue';
import { reactive, ref } from 'vue';

import type { ToastInStore } from './toast.types';

/**
 * Global reactive store for toast notifications.
 * Use push/splice as usual. Refs cannot live on the toast object (reactive unwraps them),
 * so declarative slot targets are stored in contentRefsById.
 */
export const toastStore = reactive<{ toasts: ToastInStore[] }>( {
	toasts: []
} );

/**
 * Content target refs for declarative toasts, keyed by toast id.
 * The container assigns the placeholder element to the ref so CdxToast can teleport its slot there.
 */
export const contentRefsById = new Map<string, Ref<HTMLElement | null>>();

/**
 * True while the user is touching/swiping any toast. Used to pause auto-dismiss
 * on other toasts in the stack.
 */
export const isUserTouchingToastRef = ref( false );

/**
 * True when a ToastContainer has been mounted. Only one is allowed; duplicates
 * are warned and do not render.
 */
export const isToastContainerInitialized = ref( false );
