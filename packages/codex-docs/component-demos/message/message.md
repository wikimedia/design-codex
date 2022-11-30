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

```vue
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

<script lang="ts">
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

</template>
</cdx-demo-wrapper>

### Dismiss button

Messages can be made dismissable by supplying a semantic label for the dismiss button via the
`dismissButtonLabel` prop. This label will be visually hidden but accessible to screen readers.

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

This feature should only be used for very short messages to ensure that can be read and understand
before disappearing. When in doubt, do not use auto-dismiss.

Auto-dismiss can be used with or without the manual dismiss button.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<MessageAutoDismiss />
</template>

<template v-slot:code>

<!-- Note that this code is a simplified version of the MessageAutoDismiss component. CSS classes
and styles specific to the demo, the "reset" tip, and the logic for showing that tip have been
removed to avoid confusion. -->
```vue
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

<script lang="ts">
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

</template>
</cdx-demo-wrapper>

### Multiline message

Message content can contain markup like bold text and links.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<cdx-message type="error">
<p><strong>An error has occurred</strong></p>
<p>Comprehensive explanation of the error</p>
<p><a href="#">Link</a> to more information.</p>
</cdx-message>
</template>

<template v-slot:code>

```vue-html
<cdx-message type="error">
	<p><strong>An error has occurred</strong></p>
	<p>Comprehensive explanation of the error</p>
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

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	:deep( p ) {
		margin: 0;
		line-height: 1.4;
	}
}
</style>
