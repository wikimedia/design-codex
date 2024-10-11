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
			<cdx-icon class="cdx-message__icon--vue" :icon="computedIcon" />

			<div class="cdx-message__content">
				<!-- @slot Message content. -->
				<slot />
			</div>

			<cdx-button
				v-if="userDismissable"
				class="cdx-message__dismiss-button"
				weight="quiet"
				type="button"
				:aria-label="translatedDismissButtonLabel"
				@click="onDismiss( 'user-dismissed' )"
			>
				<cdx-icon :icon="cdxIconClose" />
			</cdx-button>
		</div>
	</Transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted, warn, toRef } from 'vue';
import {
	cdxIconInfoFilled,
	cdxIconError,
	cdxIconAlert,
	cdxIconSuccess,
	cdxIconClose,
	Icon
} from '@wikimedia/codex-icons';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import { statusTypeValidator } from '../../constants';
import { StatusType, StatusIconMap } from '../../types';
import useI18nWithOverride from '../../composables/useI18nWithOverride';

const iconMap: StatusIconMap = {
	notice: cdxIconInfoFilled,
	error: cdxIconError,
	warning: cdxIconAlert,
	success: cdxIconSuccess
};

/**
 * A message that provides system feedback to the user.
 */
export default defineComponent( {
	name: 'CdxMessage',
	components: { CdxButton, CdxIcon },
	props: {
		/**
		 * Status type of Message.
		 *
		 * @values 'notice', 'warning', 'error', 'success'
		 */
		type: {
			type: String as PropType<StatusType>,
			default: 'notice',
			validator: statusTypeValidator
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
		 * Allow the message to be dismissed by the user. Adds an icon-only dismiss button.
		 */
		allowUserDismiss: {
			type: Boolean,
			default: false
		},

		// DEPRECATED: set default to 'Close' (T368444).
		/**
		 * Visually-hidden label text for the dismiss button for user-dismissable messages.
		 *
		 * Omit this prop to use the default value, "Close".
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
		 * Error messages cannot be automatically dismissed. If the `type` prop is set to `error`,
		 * this prop will be ignored.
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
			// DEPRECATED: require use of new prop allowUserDismiss (T368444).
			( props.dismissButtonLabel.length > 0 || props.allowUserDismiss )
		);

		// DEPRECATED: just use the dismissButtonLabel prop once it defaults to 'Close' (T368444).
		const translatedDismissButtonLabel = useI18nWithOverride(
			toRef( props, 'dismissButtonLabel' ),
			'cdx-message-dismiss-button-label',
			'Close'
		);

		const displayTime = computed( () => {
			if ( props.autoDismiss === false || props.type === 'error' ) {
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
				[ `cdx-message--${ props.type }` ]: true
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
			if ( props.type === 'error' && props.autoDismiss !== false ) {
				warn( 'CdxMessage: Message with type="error" cannot use auto-dismiss' );
			} else if ( displayTime.value ) {
				// If auto-dismiss is enabled, set a timer to remove the message after the
				// display time.
				setTimeout( () => onDismiss( 'auto-dismissed' ), displayTime.value );
			}
		} );

		return {
			dismissed,
			userDismissable,
			translatedDismissButtonLabel,
			rootClasses,
			leaveActiveClass,
			computedIcon,
			onDismiss,
			cdxIconClose
		};
	}
} );
</script>

<!-- eslint-disable max-len -->
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-message {
	// Background color and color are for notice type messages.
	// These will be overridden for other message types.
	background-color: @background-color-notice-subtle;
	color: @color-base;
	display: flex;
	align-items: flex-start;
	position: relative;
	border: @border-width-base @border-style-base @border-color-notice;
	border-radius: @border-radius-base;
	padding: @spacing-100 @spacing-100;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		padding-right: @spacing-150;
		padding-left: @spacing-150;
	}

	// Set the default CSS icon to the icon for notice messages, which is the default message type.
	// The icon and icon color will be overridden for other message types below.
	// The color of the Vue icon for notice messages is inherited from the color rule set on
	// .cdx-message.
	.cdx-message__icon {
		.cdx-mixin-css-icon( @cdx-icon-info-filled, @color-icon-notice );
	}

	.cdx-message__icon--vue {
		color: @color-icon-notice;
	}

	&--warning {
		background-color: @background-color-warning-subtle;
		border-color: @border-color-warning;

		.cdx-message__icon {
			.cdx-mixin-css-icon( @cdx-icon-alert, @color-icon-warning );
		}

		.cdx-message__icon--vue {
			color: @color-icon-warning;
		}
	}

	&--error {
		background-color: @background-color-error-subtle;
		border-color: @border-color-error;

		.cdx-message__icon {
			.cdx-mixin-css-icon( @cdx-icon-error, @color-icon-error );
		}

		.cdx-message__icon--vue {
			color: @color-icon-error;
		}
	}

	&--success {
		background-color: @background-color-success-subtle;
		border-color: @border-color-success;

		.cdx-message__icon {
			.cdx-mixin-css-icon( @cdx-icon-success, @color-icon-success );
		}

		.cdx-message__icon--vue {
			color: @color-icon-success;
		}
	}

	&--user-dismissable {
		padding-right: calc( @min-size-interactive-pointer + @spacing-100 );

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			padding-right: calc( @min-size-interactive-pointer + @spacing-150 );
		}
	}

	&--inline {
		background-color: @background-color-transparent;
		border: 0;
		padding: 0;
		font-weight: @font-weight-bold;

		&.cdx-message--error {
			color: @color-error;
		}
	}

	// Note that the height is set above for the CSS icons via the mixin, which is why the selector
	// used here is `.cdx-message__icon` instead of `&__icon`. This allows the styles included here
	// to override those set above.
	// The second selector is written the same way for consistency's sake.
	.cdx-message__icon,
	.cdx-message__icon--vue {
		// Vertically align the icon with the first line of text by setting the height equal to the
		// message text's line height. This needs to be in ems to ensure the height changes with
		// font size, since the line height of text will do the same.
		height: unit( @line-height-medium, em );
	}

	&__content {
		.hyphens();
		// Vertically center message with icon.
		align-self: center;
		flex-grow: 1;
		// Take all horizontal space remaining next to the icon,
		// but don't let the width grow beyond the width of the container.
		// TODO: Remove the width override after T372896, it should no longer be needed.
		width: 0;
		// Add space between icon and message content.
		margin-left: @spacing-50;
	}

	&__content,
	&__content > * {
		line-height: @line-height-medium;
	}

	&__content > *:first-child {
		margin-top: 0;
		padding-top: 0;
	}

	&__content > *:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
	}

	&__dismiss-button.cdx-button {
		position: absolute;
		// Use `spacing` tokens as the top/right axis orientation can always be in pixels,
		// similar to paddings
		top: @spacing-75;
		right: @spacing-100;
		padding: @spacing-30;
		// Remove `line-height` to not overgrow button.
		line-height: 0;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			right: @spacing-50;
		}
	}

	// Add space between stacked messages.
	& + & {
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
<!-- eslint-enable max-len -->
