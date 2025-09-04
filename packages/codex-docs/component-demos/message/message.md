<script setup>
import { CdxMessage, CdxAccordion } from '@wikimedia/codex';
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
		name: 'allowUserDismiss',
		type: 'boolean'
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

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-message v-bind="propValues">{{ slotValues.default }}</cdx-message>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Message

Use the Message component to display system feedback, respond to user actions, or provide information. Use inline Messages to offer feedback on the validation of form inputs.

Depending on the type of feedback conveyed to the user, Messages can be used to convey one of four statuses.

1. **Notice**<br>Use to provide general, neutral and non-urgent information or recommendations.
2. **Warning**<br>Use to provide important information about circumstances that require caution.
3. **Error**<br>Use to alert the user only in situation where their immediate attention is needed. Error Messages have the strongest visual priority of all system messages.
4. **Success**<br>Use to deliver feedback of a successful user interaction, like publishing an
article.

### About Message

Message includes the following elements.

#### Icon

Icons simplify user recognition and provide the ability to shorten message text. A specific icon is
matched with each message type (e.g., "success") to ensure recognition.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Customize the icon in notice Messages, or hide it if needed.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid removing or replacing the icon in warning, error, and success Messages, as it reinforces the meaning of their respective statuses.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Message text

The message text should be as clear and concise as possible, offering feedback to users. If
applicable, it may also suggest next steps.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Keep messages short and simple, with one or two solutions, to reduce cognitive load. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Incorporate various text formats and links within the Message text as necessary.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid bolding all the message text.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Close button (optional)

To allow for the message to be dismissed, an optional icon-only quiet button can be included.

## Examples

### Fade in

We can apply a transition when a Message is dynamically added to the user interface.

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Use the `fadeIn` prop to enable a transition.

</cdx-accordion>

### Dismiss button

Messages can be dismissed by using the close button within the Message. Note that inline Messages cannot be dismissable.

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Messages can be made dismissable by setting the `allowUserDismiss` prop to `true`.

When the dismiss button is pressed, the Message component hides itself, and a 'user-dismissed' event
is emitted to the parent component in case the parent component needs to react to the Message
dismissal in some way.

</cdx-accordion>

### Auto-dismiss

Messages can be auto-dismissable. Auto-dismiss can be used with or without the manual dismiss button.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use for very short Messages to ensure that they can be read and understood before disappearing.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using with error Messages to prevent the message from disappearing before users fix the error.</cdx-demo-best-practice>

</cdx-demo-best-practices>

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

The `autoDismiss` prop can be used to automatically remove the Message after a period of time.
Set this prop to `true` to use the default display time of 4000 milliseconds (4 seconds). To
customize the display time, set the `autoDismiss` prop to a number of milliseconds.

This feature should only be used for very short messages to ensure they can be read and
understood before disappearing. When in doubt, do not use auto-dismiss. Auto-dismiss
cannot be used for error Messages: if the `type` prop is set to `error`, the `autoDismiss`
prop will be ignored and a warning will be thrown if it's set.

</cdx-accordion>

### Multiline

Message content can contain multiple lines. Message text can incorporate various text formats and links.

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

Only notice Messages may have a custom icon.

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

## Technical implementation

### Vue usage

Message styles and icon will vary depending on the message type (notice, warning, error or success). Messages are block style by default, but can be displayed as inline Messages via the `inline` prop.

Block-style Messages can be made dismissable in the following ways:
- By using the `allowUserDismiss` prop, which adds a dismiss button.
- By using the `autoDismiss` prop. This can be set to `true` to use the default display time of 4000 milliseconds (4 seconds), or the display time can be customized by setting `autoDismiss` to a number of milliseconds. Error Messages cannot auto-dismiss: if the `type` prop is set to `error`, then the `autoDismiss` prop will be ignored.

### CSS-only version

Note that some features of the Vue component require JavaScript and are therefore not supported in
the CSS-only version (fade in, dismiss button, and auto-dismiss).

#### Markup structure

:::tip
The outer `<div>` should have one of the following ARIA attributes:
- For notice, warning, and success Messages: `aria-live="polite"`
- For error Messages: `role="alert"`
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

#### Message layout

There are two layout styles for Messages: block and inline. Use the following classes to apply
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

#### Message types

There are 4 Message types, which change the colors and icon depending on the message's purpose.
Use these classes to apply the different Message type styles:
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

#### Multiline message

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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | When the Message is closable and the focus is placed on its close button, it closes the Message. If the focus is placed on a link within the Message, it activates the link. |