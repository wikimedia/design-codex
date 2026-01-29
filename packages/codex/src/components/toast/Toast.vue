<template>
	<cdx-toast-display
		v-if="standalone"
		:type="type"
		:icon="icon"
		:action-button="actionButton"
		:prevent-user-dismiss="preventUserDismiss"
		:auto-dismiss="autoDismiss"
		:render-in-place="renderInPlace"
		:target="target"
		v-bind="$attrs"
		@user-dismissed="$emit( 'user-dismissed' )"
		@auto-dismissed="$emit( 'auto-dismissed' )"
		@action-button-click="$emit( 'action-button-click' )"
	>
		<slot />
	</cdx-toast-display>
	<!-- Render only when container has set the target (avoids slot appearing next to trigger). -->
	<teleport v-else-if="stackContentRef" :to="stackContentRef">
		<slot />
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import CdxToastDisplay from './ToastDisplay.vue';
import { statusTypeValidator } from '../../constants';
import { StatusType, TeleportTarget } from '../../types';
import useToast from './useToast';

/**
 * A Toast is a short and temporary pop-up notification, meant to be noticed without interrupting
 * the user experience.
 */
export default defineComponent( {
	name: 'CdxToast',
	components: { CdxToastDisplay },
	inheritAttrs: false,
	props: {
		/**
		 * Status type of Toast.
		 *
		 * @values 'notice', 'warning', 'error', 'success'
		 */
		type: {
			type: String as PropType<StatusType>,
			default: 'notice',
			validator: statusTypeValidator
		},

		/**
		 * Custom toast icon. Only allowed for notice toasts.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},

		/**
		 * Label text for the optional action button.
		 */
		actionButton: {
			type: String,
			default: ''
		},

		/**
		 * Whether to prevent the user from dismissing the toast. When false (default), an
		 * icon-only dismiss button is shown on desktop/tablet and toasts can be dismissed
		 * by swiping on mobile.
		 */
		preventUserDismiss: {
			type: Boolean,
			default: false
		},

		/**
		 * Enable automatic dismissal of toast after a period of time.
		 *
		 * This prop can be set to `true` to use the default display time of 4000 milliseconds. To
		 * customize the display time, set this prop to a number of milliseconds.
		 *
		 * Set to `false` to disable automatic dismissal.
		 */
		autoDismiss: {
			type: [ Boolean, Number ],
			default: false,
			validator: ( value: unknown ) => typeof value === 'boolean' ||
				( typeof value === 'number' && value > 0 )
		},

		/**
		 * Whether to disable the use of teleport and render the toast in its
		 * original location in the document.
		 * This is ignored if the toast is rendered inside ToastContainer.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
		},

		/**
		 * Teleport target used when this toast renders itself in standalone mode.
		 * Ignored when the toast is rendered inside ToastContainer, or when
		 * `renderInPlace` is true.
		 */
		target: {
			type: [ String, Object ] as PropType<TeleportTarget>,
			default: undefined
		},

		/**
		 * When true, this toast does not use the shared store or ToastContainer:
		 * it renders and teleports (or renders in place) itself. Use when you
		 * cannot or do not want to mount a single `<cdx-toast-container />`.
		 * Default is false (toast is added to the store and shown by the container).
		 */
		standalone: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when the user dismisses the toast (e.g. close button or swipe).
		 * Fires after the leave transition.
		 */
		'user-dismissed',
		/**
		 * Emitted when the toast is automatically dismissed after the display time.
		 * Fires after the leave transition.
		 */
		'auto-dismissed',
		/**
		 * Emitted when the optional action button is clicked.
		 */
		'action-button-click'
	],
	setup( props, { emit } ) {
		const stackContentRef = ref<HTMLElement | null>( null );
		const toastId = ref<string | null>( null );

		const actionButtonConfig = computed( () => props.actionButton ?
			{
				label: props.actionButton,
				onClick: () => emit( 'action-button-click' )
			} :
			undefined
		);

		// When used with ToastContainer (not standalone): register with store and pass
		// contentRef so the container can assign the placeholder element; our Teleport
		// then moves the slot there. Parent should normally keep this instance mounted
		// until dismiss (unmount on @user-dismissed / @auto-dismissed), but we also
		// dismiss the toast if this wrapper is unmounted for any other reason.
		if ( !props.standalone ) {
			const { show, dismiss, update } = useToast();

			onMounted( () => {
				const { preventUserDismiss, autoDismiss, icon, type } = props;
				toastId.value = show( {
					contentRef: stackContentRef,
					type,
					icon: icon ?? undefined,
					actionButton: actionButtonConfig.value,
					preventUserDismiss,
					autoDismiss,
					onUserDismissed: () => emit( 'user-dismissed' ),
					onAutoDismissed: () => emit( 'auto-dismissed' )
				} );
			} );

			// Keep the store in sync when props change so the container re-renders with new values.
			watch(
				() => [
					props.type,
					props.icon,
					props.actionButton,
					props.autoDismiss,
					props.preventUserDismiss
				],
				() => {
					if ( !toastId.value ) {
						return;
					}
					update( toastId.value, {
						type: props.type,
						icon: props.icon ?? undefined,
						actionButton: actionButtonConfig.value,
						autoDismiss: props.autoDismiss,
						preventUserDismiss: props.preventUserDismiss
					} );
				}
			);

			// If this wrapper is unmounted for any other reason, dismiss the toast.
			onUnmounted( () => {
				if ( toastId.value ) {
					dismiss( toastId.value );
				}
			} );
		}

		return {
			stackContentRef
		};
	}
} );
</script>
