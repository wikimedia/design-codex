<template>
	<Transition
		name="cdx-message"
		:appear="fadeIn"
		:leave-active-class="leaveActiveClass"
	>
		<div
			v-if="!dismissed"
			class="cdx-message"
			:class="rootClasses"
			:aria-live="type !== 'error' ? 'polite' : undefined"
			:role="type === 'error' ? 'alert' : undefined"
		>
			<cdx-icon class="cdx-message__icon" :icon="computedIcon" />

			<div class="cdx-message__content">
				<!-- @slot Message content. -->
				<slot />
			</div>

			<cdx-button
				v-if="userDismissable"
				class="cdx-message__dismiss-button"
				type="quiet"
				:aria-label="dismissButtonLabel"
				@click="onDismiss( 'user-dismissed' )"
			>
				<cdx-icon :icon="cdxIconClose" :icon-label="dismissButtonLabel" />
			</cdx-button>
		</div>
	</Transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from 'vue';
import {
	cdxIconInfoFilled,
	cdxIconError,
	cdxIconAlert,
	cdxIconCheck,
	cdxIconClose,
	Icon
} from '@wikimedia/codex-icons';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import { MessageTypes } from '../../constants';
import { MessageType, MessageIconMap } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const messageTypeValidator = makeStringTypeValidator( MessageTypes );

const iconMap: MessageIconMap = {
	notice: cdxIconInfoFilled,
	error: cdxIconError,
	warning: cdxIconAlert,
	success: cdxIconCheck
};

/**
 * User-facing message with icon.
 *
 * Message styles and icon will vary depending on the message type (notice, warning, error or
 * success). Messages are block style by default, but can be displayed as inline messages via the
 * `inline` prop.
 *
 * Block-style messages can be made dismissable in the following ways:
 * - By using the `dismissButtonLabel` prop, which adds a dismiss button
 * - By using the `autoDismiss` prop. This can be set to `true` to use the default display time of
 *   4000 milliseconds (4 seconds), or the display time can be customized by setting `autoDismiss`
 *   to a number of milliseconds.
 */
export default defineComponent( {
	name: 'CdxMessage',
	components: { CdxButton, CdxIcon },
	props: {
		/**
		 * Message type.
		 *
		 * @values 'notice', 'warning', 'error', 'success'
		 */
		type: {
			type: String as PropType<MessageType>,
			default: 'notice',
			validator: messageTypeValidator
		},

		/**
		 * Whether this message follows the inline design (no padding, background color, or border).
		 */
		inline: {
			type: Boolean,
			default: false
		},

		/**
		 * Custom message icon. Only allowed for notice messages.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},

		/**
		 * Whether the message should fade in. Should be used for messages that are dynamically
		 * displayed, not present on page load.
		 */
		fadeIn: {
			type: Boolean,
			default: false
		},

		/**
		 * Label text for the dismiss button for user-dismissable messages.
		 *
		 * An icon-only button will be displayed that will hide the message on click. This prop is
		 * for the hidden button label required for screen reader accessibility and tooltip text.
		 */
		dismissButtonLabel: {
			type: String,
			default: ''
		},

		/**
		 * Enable automatic dismissal of message after a period of time.
		 *
		 * This prop can be set to `true` to use the default display time of 4000 milliseconds. To
		 * customize the display time, set this prop to a number of milliseconds.
		 *
		 * TODO: consider adding a stricter validator to set limits on this. If the time is too
		 * short, the message may not be readable. If the time is too long, the message probably
		 * shouldn't be auto-dismissed.
		 */
		autoDismiss: {
			type: [ Boolean, Number ],
			default: false,
			validator: ( value: unknown ) =>
				typeof value === 'boolean' ||
				( typeof value === 'number' && value > 0 )
		}
	},
	emits: [
		/**
		 * Emitted when the message is dismissed by the user via the dismiss button.
		 */
		'user-dismissed',
		/**
		 * Emitted when the message is automatically dismissed after the display time.
		 */
		'auto-dismissed'
	],
	setup( props, { emit } ) {
		const dismissed = ref( false );
		const userDismissable = computed( () =>
			props.inline === false &&
			props.dismissButtonLabel.length > 0
		);

		const displayTime = computed( () => {
			if ( props.autoDismiss === false ) {
				return false;
			} else if ( props.autoDismiss === true ) {
				// Return default delay time of 4000 milliseconds.
				return 4000;
			}
			// Return custom delay time.
			return props.autoDismiss;
		} );

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-message--inline': props.inline,
				'cdx-message--block': !props.inline,
				'cdx-message--user-dismissable': userDismissable.value,
				[ `cdx-message--${props.type}` ]: true
			};
		} );

		// For notice messages, use a custom icon if provided. Otherwise, use the default icon.
		const computedIcon = computed( () =>
			props.icon && props.type === 'notice' ? props.icon : iconMap[ props.type ]
		);

		// Custom class for the leave-active transition. Will be set on dismissal.
		const leaveActiveClass = ref( '' );

		/**
		 * Dismiss the message and emit an event.
		 *
		 * @param eventName Name of the event to be emitted.
		 */
		function onDismiss( eventName: 'user-dismissed' | 'auto-dismissed' ) {
			if ( dismissed.value ) {
				// Message has already been dismissed, so do not emit another event. This prevents
				// a race condition when the user dismisses an auto-dismissable message before the
				// display time elapses.
				return;
			}

			// Set the leave-active class name so we can customize the transition depending on how
			// the message was dismissed.
			leaveActiveClass.value = eventName === 'user-dismissed' ?
				'cdx-message-leave-active-user' :
				'cdx-message-leave-active-system';

			// Remove the component from the DOM via the v-if statement on the root element.
			dismissed.value = true;

			// Emit an event in case the parent component needs to take action on dismissal.
			emit( eventName );
		}

		onMounted( () => {
			// If auto-dismiss is enabled, set a timer to remove the message after the display time.
			if ( displayTime.value ) {
				setTimeout( () => onDismiss( 'auto-dismissed' ), displayTime.value );
			}
		} );

		return {
			dismissed,
			userDismissable,
			rootClasses,
			leaveActiveClass,
			computedIcon,
			onDismiss,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: Tokenize.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@size-icon-relative: unit( ( 20 / @font-size-browser / @font-size-base ), em );
@offset-top-message-dismiss: unit( ( 8 / @font-size-browser / @font-size-base ), em);
@offset-right-message-dismiss: unit( ( 16 / @font-size-browser / @font-size-base ), em);
@offset-right-message-dismiss-mobile: unit( ( 8 / @font-size-browser / @font-size-base ), em);

.cdx-message {
	color: @color-notice;
	display: flex;
	align-items: flex-start;
	position: relative;

	&--warning .cdx-message__icon {
		color: @border-color-warning;
	}

	&--error .cdx-message__icon {
		color: @color-error;
	}

	&--success .cdx-message__icon {
		color: @color-success;
	}

	&--inline {
		font-weight: @font-weight-bold;

		&.cdx-message--error {
			color: @color-error;
		}

		&.cdx-message--success {
			color: @color-success;
		}
	}

	&--block {
		border-width: @border-width-base;
		border-style: @border-style-base;
		padding: @spacing-100 @spacing-100;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			padding-right: @spacing-150;
			padding-left: @spacing-150;
		}

		&.cdx-message--notice {
			background-color: @background-color-notice-subtle;
			border-color: @border-color-notice;
		}

		&.cdx-message--error {
			background-color: @background-color-error-subtle;
			border-color: @border-color-error;
		}

		&.cdx-message--warning {
			background-color: @background-color-warning-subtle;
			border-color: @border-color-warning;
		}

		&.cdx-message--success {
			background-color: @background-color-success-subtle;
			border-color: @border-color-success;
		}
	}

	&--user-dismissable {
		padding-right: @min-size-base + @spacing-100;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			padding-right: @min-size-base + @spacing-150;
		}
	}

	// Icons must scale with font size to maintain vertical alignment with the
	// first line of message text.
	svg {
		width: @size-icon-relative;
		height: @size-icon-relative;
	}

	&__content {
		.hyphens();
		// Vertically center message with icon.
		align-self: center;
		flex-grow: 1;
		// Add space between icon and message content.
		margin-left: @spacing-50;
	}

	&__dismiss-button {
		position: absolute;
		top: @offset-top-message-dismiss;
		right: @offset-right-message-dismiss-mobile;
		// TODO: Make this icon-only button appear square (e.g. on focus).
		// Also replace probably by `spacing-25` as other icon buttons.
		padding: @spacing-30;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			right: @offset-right-message-dismiss;
		}
	}

	// Add space between stacked messages.
	& + .cdx-message {
		margin-top: @spacing-50;
	}

	// Fade-in and auto-dismissal use the system transition timing function.
	&-enter-active,
	&-leave-active-system {
		transition-property: @transition-property-fade;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}

	// User dismissal uses the human initiated transition timing function.
	&-leave-active-user {
		transition-property: @transition-property-fade;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-user;
	}

	&-enter-from,
	&-leave-to {
		opacity: @opacity-transparent;
	}
}
</style>
