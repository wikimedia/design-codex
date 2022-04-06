<script setup>
import { CdxMessage } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';
import MessageFadeIn from './../../component-demos/message/examples/MessageFadeIn.vue';

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
		default: 'Close'
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

### Dismiss button

Messages can be made dismissable by supplying a semantic label for the dismiss button via the
`dismissButtonLabel` prop. This label will be visually hidden but accessible to screen readers.

When the dismiss button is clicked, the Message component hides itself, and a 'dismissed' event is
emitted to the parent component in case the parent component needs to react to the message dismissal
in some way.

Note that inline messages cannot be dismissable.

<cdx-demo-wrapper force-reset="true">
<template v-slot:demo>
<div style="min-height: 64px;">
<cdx-message dismiss-button-label="Close">Notice message with dismiss button</cdx-message>
</div>
</template>

<template v-slot:code>

```vue
<cdx-message dismiss-button-label="Close">
	Notice message with dismiss button
</cdx-message>
```

</template>
</cdx-demo-wrapper>

### Fade in

When a message is dynamically added to the UI, use the `fadeIn` prop to enable a transition.

<cdx-demo-wrapper force-reset="true">
<template v-slot:demo>
<MessageFadeIn />
</template>

<template v-slot:code>

```vue
<template>
	<cdx-button @click="showMessage = true">
		Show message
	</cdx-button>
	<cdx-message
		v-if="showMessage"
		type="success"
		:fade-in="true"
	>
		Success!
	</cdx-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MenuItemDefault',
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

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-message type="error">
<p><strong>An error has occurred</strong></p>
<p>Comprehensive explanation of the error</p>
<p><a href="#">Link</a> to more information.</p>
</cdx-message>
</template>

<template v-slot:code>

```vue
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

```vue
<cdx-message :icon="cdxIconArticle">
	Notice message with custom icon
</cdx-message>
```

</template>
</cdx-demo-wrapper>

<style scoped>
.cdx-demo-wrapper :deep( p ) {
	margin: 0;
	line-height: 1.4;
}
</style>
