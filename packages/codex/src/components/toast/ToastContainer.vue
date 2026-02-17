<template>
	<teleport v-if="isInitialized" :to="computedTarget">
		<div class="cdx-toast-container">
			<div class="cdx-toast-container__stack">
				<cdx-toast-display
					v-for="toast in toastStore.toasts"
					:key="toast.id"
					:type="toast.type"
					:icon="toast.icon ?? undefined"
					:action-button-label="toast.actionButton?.label ?? ''"
					:auto-dismiss="toast.autoDismiss"
					:prevent-user-dismiss="toast.preventUserDismiss"
					render-in-place
					@user-dismissed="handleUserDismissed( toast.id )"
					@auto-dismissed="handleAutoDismissed( toast.id )"
					@action-button-click="handleActionButtonClick( toast.id )"
				>
					<template v-if="toast.message">
						{{ toast.message }}
					</template>
					<div
						v-else
						:ref="( el ) => setToastContentRef( toast.id, el )"
						class="cdx-toast__content-target"
					/>
				</cdx-toast-display>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, computed, inject, unref, PropType, ref, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue';
import CdxToastDisplay from './ToastDisplay.vue';
import { TeleportTarget } from '../../types';
import { contentRefsById, toastStore, isToastContainerInitialized } from './toast.store';
import useToast from './useToast';

/**
 * Container component for managing stacked Toast notifications.
 * Toasts appear one-by-one and are not stacked on top of each other or side-by-side.
 *
 * This component reads from the global toastStore and renders toasts accordingly.
 * Use the useToast composable to add/remove toasts programmatically.
 */
export default defineComponent( {
	name: 'CdxToastContainer',
	components: { CdxToastDisplay },
	props: {
		/**
		 * Teleport target for the ToastContainer.
		 *
		 * If `target` is provided, the container will teleport there. Otherwise, if
		 * an ancestor provides a `CdxTeleportTarget` (e.g. via
		 * `provide( 'CdxTeleportTarget', '#foo-bar' )`), that target is used.
		 * If neither is set, the container is teleported to the end of `<body>`.
		 */
		target: {
			type: [ String, Object ] as PropType<TeleportTarget>,
			default: undefined
		}
	},
	setup( props ) {
		const { dismiss } = useToast();
		const isInitialized = ref( false );

		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( props.target ?? providedTarget ) ?? 'body' );

		/**
		 * Set the content target element for a declarative toast so its slot can teleport here.
		 *
		 * @param toastId Toast id (used to look up the ref in contentRefsById)
		 * @param el Placeholder element from the template ref, or null when unmounted
		 */
		function setToastContentRef(
			toastId: string,
			el: Element | ComponentPublicInstance | null
		): void {
			const contentRef = contentRefsById.get( toastId );
			if ( contentRef ) {
				const target = el && '$el' in el ? el.$el : el;
				contentRef.value = target as HTMLElement | null;
			}
		}

		/**
		 * Handle user dismissal.
		 * Fired after leave transition; remove from store and run callback.
		 *
		 * @param id Toast ID
		 */
		function handleUserDismissed( id: string ): void {
			const toast = toastStore.toasts.find( ( t ) => t.id === id );
			dismiss( id );
			toast?.onUserDismissed?.();
		}

		/**
		 * Handle auto-dismissal.
		 * Fired after fade-out completes; remove from store and run callback.
		 *
		 * @param id Toast ID
		 */
		function handleAutoDismissed( id: string ): void {
			const toast = toastStore.toasts.find( ( t ) => t.id === id );
			dismiss( id );
			toast?.onAutoDismissed?.();
		}

		/**
		 * Handle action button click.
		 *
		 * @param id Toast ID
		 */
		function handleActionButtonClick( id: string ): void {
			const toast = toastStore.toasts.find( ( t ) => t.id === id );
			toast?.actionButton?.onClick();
		}

		// Only allow one ToastContainer in the app; warn and hide duplicates.
		onMounted( () => {
			if ( isToastContainerInitialized.value ) {
				// eslint-disable-next-line no-console
				console.warn(
					'CdxToastContainer: Only one ToastContainer should be mounted in the app. ' +
					'Multiple instances may cause duplicate or missing toasts. This instance will not render.'
				);
				return;
			}
			isToastContainerInitialized.value = true;
			isInitialized.value = true;
		} );

		onUnmounted( () => {
			if ( isInitialized.value ) {
				isToastContainerInitialized.value = false;
			}
		} );

		return {
			toastStore,
			computedTarget,
			isInitialized,
			setToastContentRef,
			handleUserDismissed,
			handleAutoDismissed,
			handleActionButtonClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-toast-container {
	position: fixed;
	right: 0;
	bottom: @spacing-100;
	left: @size-half;
	z-index: @z-index-toast-notification;
	width: @size-full;
	pointer-events: none;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		bottom: @spacing-150;
	}

	&__stack {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		gap: @spacing-50;
	}

	// Override ToastDisplay layout in container (root is .cdx-toast).
	.cdx-toast {
		position: relative;
		bottom: auto;
		left: 0;
		pointer-events: auto;
	}
}
</style>
