<script setup>
import { CdxMessage } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';
import MessageFadeIn from '@/../component-demos/message/examples/MessageFadeIn.vue';
import MessageUserDismiss from '@/../component-demos/message/examples/MessageUserDismiss.vue';
import MessageAutoDismiss from '@/../component-demos/message/examples/MessageAutoDismiss.vue';

const controlsConfig = [
	{
		name: 'type',
		type: 'radio',
		options: [ 'notice', 'warning', 'error', 'success' ],
	},
	{
		name: 'inline',
		type: 'boolean'
	},
	{
		name: 'dismissButtonLabel',
		type: 'text',
		initial: 'Close'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Message text'
	}
];
</script>

A Message provides system feedback for users. Messages can be provided as a
prominently-displayed banner with a longer explanation, or as inline validation
feedback.

## Guidelines

### Using messages

Messages must include text clearly defining the system feedback to the user. They also include an
icon to help users recognize the type of message, and they can also feature an optional dismiss
button to close the message.

### Specifications

The message component may contain the following items:

![Specification of Message.](../../assets/components/message-specifications-message.svg)

1. **Icon**<br>
Icons simplify user recognition and provide the ability to shorten message text. A specific icon is
matched with each message type (e.g., ‘success’) to ensure recognition.
2. **Message text**<br>
The message text should be as clear and concise as possible, offering feedback to users. If
applicable, it may also suggest next steps.
3. **Close button** (optional)<br>
To allow for the message to be dismissed, an optional icon-only quiet button can be included.

![Specification of Inline Message.](../../assets/components/message-specifications-inline-message.svg)

The inline message component includes both the icon and message elements, excluding the close
button.

The message can contain an unlimited number of characters, and there is no minimum requirement.
Ensure that the icon is always aligned on top with the text.

:::tip Accessibility note
The message icon adds a point of recognition for color-blind users.
:::

Refer to the
[Message component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=4902-47684&mode=design&t=yTcArGDe2utFY0wc-11).

### Types

#### Message layout

There are two types of messages, each suited to specific use cases:
1. **Message:** Utilize it to display system feedback, respond to user actions, or provide
information.
2. **Inline message:** Employ it to offer feedback on the validation of form inputs.

![Types of Messages: message and inline message.](../../assets/components/message-types.svg)

#### Message type

Depending on the feedback conveyed to the user, the messages can be categorized as follows:
1. **Neutral or notice** messages provide general user feedback. They are accompanied by the
'infoFilled' icon by default, but the icon may be changed to any other system icon to emphasize a
specific aspect of the notice message.
2. **Success** messages deliver feedback of a successful user interaction, like publishing an
article. Accompany the message with the 'success' icon.
3. **Error** messages have the strongest visual priority of all system messages. Use them to alert
the user only in situations when their immediate attention is needed. Accompany the message with the
'error' icon.
4. **Warning** messages provide important information about circumstances that require caution.
Accompany the message with the 'alert' icon.

![Message types based on feedback conveyed to the user: notice, success, error, and warning.](../../assets/components/message-types-message.svg)

Inline messages follow the same categorization: notice, success, error, and warning.

![Inline message types based on feedback conveyed to the user: notice, success, error, and warning.](../../assets/components/message-types-inline-message.svg)

#### Dismissability

Messages can be categorized based on how they are removed from the interface as follows:

##### Dismiss button

Messages can be dismissed by utilizing the close button within the message. Note that inline
messages cannot be dismissable.

![Message with a dismiss button.](../../assets/components/message-types-dismiss.svg)

##### Auto-dismiss

Messages can be also auto-dismissable. This means they will automatically disappear after 4 seconds.

This feature should only be used for very short messages to ensure that they can be read and
understood before disappearing. When in doubt, do not use auto-dismiss. To prevent error messages
from disappearing before users fix the error, do not use auto-dismiss with error messages.
Auto-dismiss can be used with or without the manual dismiss button.

![Two auto-dismissible messages: one without dismiss button and one with a dismiss button.](../../assets/components/message-types-auto-dismiss.svg)

### Best practices

Consider the following recommendations when working with messages.

#### Icon

<cdx-demo-rules>

<template #do-media>

![Notice message with the user icon and success message with its success icon.](../../assets/components/message-best-practices-icon-do.svg)

</template>

<template #do-text>

- Customize the notice message with another icon if needed.
- Use the 'success', 'error', and 'alert' icons to represent their corresponding message statuses.

</template>

<template #dont-media>

![Success message without icon and error message with a non-error icon.](../../assets/components/message-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Remove the icon, as it is essential for reinforcing the meaning of the message.
- Replace the status icon in the success, error, and warning messages.

</template>

</cdx-demo-rules>

#### Message's text

<cdx-demo-rules>

<template #do-media>

![Success Message with different text formats and a link.](../../assets/components/message-best-practices-text-do.svg)

</template>

<template #do-text>

- Incorporate various text formats and links within the message text as necessary.

</template>

<template #dont-media>

![Success Message with the entire text bolded.](../../assets/components/message-best-practices-text-dont.svg)

</template>

<template #dont-text>

- Bold all the message text.

</template>

</cdx-demo-rules>

### Content

Keeping messages clear is ideal for accessibility (reducing cognitive load) and using the right tone provides relevance.

#### Error message

Error messages let a reader know that there is a problem and should include clear instructions or
next steps to solve the problem.

<cdx-demo-rules>
<template #do-media>

![Error message conveying the use of concise messaging with clear actions.](../../assets/components/message-content-error-do.svg)

</template>
<template #do-text>

- Keep messages short and simple, with one or two solutions, to reduce cognitive load. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)
- Use formatting to make the copy easy to skim and help users move through a flow more quickly and confidently. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
<template #dont-media>

![Error message conveying the use of long form messaging with no clear action.](../../assets/components/message-content-error-dont.svg)

</template>
<template #dont-text>

- Give multiple options for fixing the issue. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)
- Apologize more than once, to avoid eroding the reader’s sense of trust in the experience. [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
</cdx-demo-rules>

#### Success message

Success messages let a user know that the action they took was successful.

<cdx-demo-rules>
<template #do-media>

![Success message conveying the use of concise messaging.](../../assets/components/message-content-success-do.svg)

</template>
<template #do-text>

- Use clear, positive, short messages. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible) & [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant)

</template>
<template #dont-media>

![Success message conveying the use of long form messaging with no clear action.](../../assets/components/message-content-success-dont.svg)

</template>
<template #dont-text>

- Include too much information. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
</cdx-demo-rules>

#### Warning message

Warning messages indicate urgent information and consequences to the user (e.g., that an impending
action is irreversible). Warning messages should also include a solution to the potential problem.

<cdx-demo-rules>
<template #do-media>

![Warning message conveying the use of concise messaging.](../../assets/components/message-content-warning-do.svg)

</template>
<template #do-text>

- Keep messages short and precise. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</template>
<template #dont-media>

![Warning message conveying the use of long form messaging with no clear action.](../../assets/components/message-content-warning-dont.svg)

</template>
<template #dont-text>

- Write in a way that might cause a reader to panic or worry. [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
</cdx-demo-rules>

#### Notice message

Notice messages alert a reader to important, but non-urgent, information. These messages are not
generally used for feedback on a user’s actions, but rather for offering neutral information
or recommendations.

<cdx-demo-rules>
<template #do-media>

![Notice message conveying the use of concise messaging in a neutral tone.](../../assets/components/message-content-notice-do.svg)

</template>
<template #do-text>

- Keep messages in an informative, neutral tone. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
<template #dont-media>

![Notice message conveying the use of long form messaging.](../../assets/components/message-content-notice-dont.svg)

</template>
<template #dont-text>

- Include more than one message. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)
- Use warning or error language. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | When the Message is closable and the focus is placed on its close button, it closes the Message. If the focus is placed on a link within the Message, it activates the link. |

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-message v-bind="propValues">{{ slotValues.default }}</cdx-message>
</template>
</cdx-demo-wrapper>

### Fade in

When a message is dynamically added to the UI, use the `fadeIn` prop to enable a transition.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<MessageFadeIn />
</template>

<template v-slot:code>

<!-- Note that this code is a simplified version of the MessageFadeIn component. CSS classes and
styles specific to the demo have been removed to avoid confusion. -->

:::code-group

```vue [NPM]
<template>
	<cdx-button :disabled="showMessage" @click="showMessage = true">
		Show message
	</cdx-button>
	<cdx-message
		v-if="showMessage"
		type="warning"
		:fade-in="true"
	>
		<p><strong>Warning!</strong> Here's some information you should know.</p>
	</cdx-message>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MessageFadeIn',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>
```

```vue [MediaWiki]
<template>
	<cdx-button :disabled="showMessage" @click="showMessage = true">
		Show message
	</cdx-button>
	<cdx-message
		v-if="showMessage"
		type="warning"
		:fade-in="true"
	>
		<p><strong>Warning!</strong> Here's some information you should know.</p>
	</cdx-message>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMessage, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MessageFadeIn',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>
```

:::

</template>
</cdx-demo-wrapper>

### Dismiss button

Messages can be made dismissable by supplying a semantic label for the dismiss button via the
`dismissButtonLabel` prop. This label will be visually hidden but accessible to assistive
technology, specifically screen readers.

When the dismiss button is clicked, the Message component hides itself, and a 'user-dismissed' event
is emitted to the parent component in case the parent component needs to react to the message
dismissal in some way.

Note that inline messages cannot be dismissable.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<MessageUserDismiss />
</template>

<template v-slot:code>

```vue-html
<cdx-message dismiss-button-label="Close">
	Notice message with dismiss button
</cdx-message>
```

</template>
</cdx-demo-wrapper>

### Auto-dismiss

The `autoDismiss` prop can be used to automatically remove the message after a period of time.
Set this prop to `true` to use the default display time of 4000 milliseconds (4 seconds). To
customize the display time, set the `autoDismiss` prop to a number of milliseconds.

This feature should only be used for very short messages to ensure that can be read and
understood before disappearing. When in doubt, do not use auto-dismiss. Auto-dismiss
cannot be used for error messages: if the `type` prop is set to `error`, the `autoDismiss`
prop will be ignored and a warning will be thrown if it's set.

Auto-dismiss can be used with or without the manual dismiss button.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<MessageAutoDismiss />
</template>

<template v-slot:code>

<!-- Note that this code is a simplified version of the MessageAutoDismiss component. CSS classes
and styles specific to the demo, the "reset" tip, and the logic for showing that tip have been
removed to avoid confusion. -->

:::code-group

```vue [NPM]
<template>
	<cdx-button :disabled="showMessage" @click="showMessage = true">
		Show message
	</cdx-button>
	<cdx-message
		v-if="showMessage"
		type="success"
		:fade-in="true"
		:auto-dismiss="true"
		:display-time="3000"
	>
		Success! This message will disappear...
	</cdx-message>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MessageAutoDismiss',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>
```

```vue [MediaWiki]
<template>
	<cdx-button :disabled="showMessage" @click="showMessage = true">
		Show message
	</cdx-button>
	<cdx-message
		v-if="showMessage"
		type="success"
		:fade-in="true"
		:auto-dismiss="true"
		:display-time="3000"
	>
		Success! This message will disappear...
	</cdx-message>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMessage, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MessageAutoDismiss',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>
```

:::

</template>
</cdx-demo-wrapper>

### Multiline message

Message content can contain markup like bold text and links.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<cdx-message type="error">
		<p><strong>An error has occurred.</strong></p>
		<p>Comprehensive explanation of the error.</p>
		<p><a href="#">Link</a> to more information.</p>
	</cdx-message>
</template>

<template v-slot:code>

```vue-html
<cdx-message type="error">
	<p><strong>An error has occurred.</strong></p>
	<p>Comprehensive explanation of the error.</p>
	<p><a href="#">Link</a> to more information.</p>
</cdx-message>
```

</template>
</cdx-demo-wrapper>

### With custom icon

Only notice messages may have a custom icon.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-message :icon="cdxIconArticle">
		Notice message with custom icon
	</cdx-message>
</template>

<template v-slot:code>

```vue-html
<cdx-message :icon="cdxIconArticle">
	Notice message with custom icon
</cdx-message>
```

</template>
</cdx-demo-wrapper>

## Vue usage

Message styles and icon will vary depending on the message type (notice, warning, error or success). Messages are block style by default, but can be displayed as inline messages via the `inline` prop.

Block-style messages can be made dismissable in the following ways:
- By using the `dismissButtonLabel` prop, which adds a dismiss button
- By using the `autoDismiss` prop. This can be set to `true` to use the default display time of 4000 milliseconds (4 seconds), or the display time can be customized by setting `autoDismiss` to a number of milliseconds. Error messages cannot auto-dismiss: if the `type` prop is set to `error`, then the `autoDismiss` prop will be ignored.

## CSS-only version

Note that some features of the Vue component require JavaScript and are therefore not supported in
the CSS-only version (fade in, dismiss button, and auto-dismiss).

### Markup structure

:::tip
The outer `<div>` should have one of the following ARIA attributes:
- For notice, warning, and success messages: `aria-live="polite"`
- For error messages: `role="alert"`
:::

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			Message content (can include markup)
		</div>
	</div>
</template>
<template v-slot:code>

```html
<!-- Root element with layout and type classes, and additional attribute(s). -->
<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
	<!-- Empty span for message icon. -->
	<span class="cdx-message__icon"></span>
	<!-- Div for content. -->
	<div class="cdx-message__content">
		Message content (can include markup)
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Message layout

There are two layout styles for messages: block and inline. Use the following classes to apply
these layouts.
- Block: `cdx-message--block` (class can be omitted since this is the default)
- Inline: `cdx-message--inline`

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<div class="cdx-docs-message-layout">
		<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
			<span class="cdx-message__icon"></span>
			<div class="cdx-message__content">
				This is a block-style message.
			</div>
		</div>
		<div class="cdx-message cdx-message--inline cdx-message--notice" aria-live="polite">
			<span class="cdx-message__icon"></span>
			<div class="cdx-message__content">
				This is an inline-style message.
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is a block-style message.
	</div>
</div>
<div class="cdx-message cdx-message--inline cdx-message--notice" aria-live="polite">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is an inline-style message.
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Message types

There are 4 message types, which change the colors and icon depending on the message's purpose.
Use these classes to apply the different message type styles:
- Notice: `cdx-message--notice` (class can be omitted since this is the default)
- Warning: `cdx-message--warning`
- Error: `cdx-message--error`
- Success: `cdx-message--success`

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			This is a notice message.
		</div>
	</div>
	<div class="cdx-message cdx-message--block cdx-message--warning" aria-live="polite">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			This is a warning message.
		</div>
	</div>
	<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			This is an error message.
		</div>
	</div>
	<div class="cdx-message cdx-message--block cdx-message--success" aria-live="polite">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			This is a success message.
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is a notice message.
	</div>
</div>
<div class="cdx-message cdx-message--block cdx-message--warning" aria-live="polite">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is a warning message.
	</div>
</div>
<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is an error message.
	</div>
</div>
<div class="cdx-message cdx-message--block cdx-message--success" aria-live="polite">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		This is a success message.
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Multiline message

Message content can contain markup like bold text and links.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
		<span class="cdx-message__icon"></span>
		<div class="cdx-message__content">
			<p><strong>An error has occurred.</strong></p>
			<p>Comprehensive explanation of the error.</p>
			<p><a href="#">Link</a> to more information.</p>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
	<span class="cdx-message__icon"></span>
	<div class="cdx-message__content">
		<p><strong>An error has occurred.</strong></p>
		<p>Comprehensive explanation of the error.</p>
		<p><a href="#">Link</a> to more information.</p>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	.cdx-docs-message-layout {
		/* stylelint-disable-next-line selector-class-pattern */
		.cdx-message:first-child {
			margin-bottom: @spacing-200;
		}
	}

	p {
		// Remove margins on p tags in the multiline message demos.
		margin: 0;
	}
}
</style>
