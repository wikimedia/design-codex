<template>
	<div
		v-if="!dismissed"
		class="cdx-message"
		:class="rootClasses"
		:aria-live="type !== 'error' ? 'polite' : undefined"
		:role="type === 'error' ? 'alert' : undefined"
	>
		<cdx-icon class="cdx-message__icon" :icon="computedIcon" />

		<div class="cdx-message__content">
			<slot />
		</div>

		<cdx-button
			v-if="dismissable"
			class="cdx-message__dismiss"
			type="quiet"
			:aria-label="dismissButtonLabel"
			@click="onDismiss"
		>
			<cdx-icon :icon="cdxIconClose" :icon-label="dismissButtonLabel" />
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
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
import { makeStringTypeValidator } from '../../utils';

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
 * Block-style notice messages can be made dismissable by supplying a `dismissButtonLabel` prop.
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
		 * Whether this message follows the inline design (no padding,
		 * background color, or border).
		 */
		inline: {
			type: Boolean,
			default: false
		},

		/**
		 * Label text for the dismiss button for notice messages.
		 *
		 * For notice messages, an icon-only button can be displayed that will
		 * hide the message on click. This prop is for the hidden button label
		 * required for accessibility.
		 */
		dismissButtonLabel: {
			type: String,
			default: ''
		},

		/**
		 * Custom message icon.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		}
	},
	emits: [
		/**
		 * Emitted when the message is dismissed by the user.
		 */
		'dismissed'
	],
	setup( props, { emit } ) {
		const dismissed = ref( false );
		const dismissable = computed( () =>
			props.type === 'notice' &&
			props.inline === false &&
			props.dismissButtonLabel.length > 0
		);

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-message--inline': props.inline,
				'cdx-message--block': !props.inline,
				'cdx-message--dismissable': dismissable.value,
				[ `cdx-message--${props.type}` ]: true
			};
		} );

		const computedIcon = computed( () => props.icon || iconMap[ props.type ] );

		/**
		 * Handle user dismissal of message.
		 */
		function onDismiss() {
			// Remove this component from the DOM via the v-if statement on the root element.
			dismissed.value = true;
			// Emit an event in case the parent component needs to take action on dismissal.
			emit( 'dismissed' );
		}

		return {
			dismissed,
			dismissable,
			rootClasses,
			computedIcon,
			onDismiss,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
// TODO: Remove references to wikimedia-ui-base once we have the proper tokens in place.
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

// TODO: add component-level design tokens.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@size-icon-relative: unit( ( 20 / @font-size-browser / @font-size-base ), em );
@size-top-message-dismiss: unit( ( 8 / 14 ), em);
@padding-vertical-message-block: 16px;
@padding-horizontal-message-block: 24px;
@margin-top-message: 8px;
@margin-left-message-content: unit( ( 8 / @font-size-browser / @font-size-base ), em );

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
		font-weight: bold;

		&.cdx-message--error {
			color: @color-error;
		}

		&.cdx-message--success {
			color: @color-success;
		}
	}

	&--block {
		padding: @padding-vertical-message-block @padding-horizontal-message-block;

		&.cdx-message--notice {
			background-color: @background-color-notice--framed;
			border: @border-notice;
		}

		&.cdx-message--error {
			background-color: @background-color-error--framed;
			border: @border-error;
		}

		&.cdx-message--warning {
			background-color: @background-color-warning--framed;
			border: @border-warning;
		}

		&.cdx-message--success {
			background-color: @background-color-success--framed;
			border: @border-success;
		}
	}

	&--dismissable {
		padding-right: @min-size-base + @padding-horizontal-message-block;
	}

	// Icons must scale with font size to maintain vertical alignment with the
	// first line of message text.
	svg {
		width: @size-icon-relative;
		height: @size-icon-relative;
	}

	&__content {
		// Add space between icon and message content.
		margin-left: @margin-left-message-content;
	}

	&__dismiss {
		position: absolute;
		top: 8px;
		right: 8px;
		// Make this icon-only button appear square (e.g. on focus).
		padding: 5px;
	}

	// Add space between stacked messages.
	& + .cdx-message {
		margin-top: @margin-top-message;
	}
}
</style>
