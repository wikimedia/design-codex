<script setup>
import { CdxMessage } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';

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

### Dismissable notice

Notice messages can be dismissable. This is enabled by setting the message `type` to 'notice' (or
omitting this prop, as 'notice' is the default value) and supplying a semantic label for the dismiss
button via the `dismissButtonLabel` prop. This label will be visually hidden but accessible to
screen readers.

When the dismiss button is clicked, the Message component hides itself, and a 'dismissed' event is
emitted to the parent component in case the parent component needs to react to the message dismissal
in some way.

Note that inline messages cannot be dismissable.

<cdx-demo-wrapper force-reset="true">
<template v-slot:demo>
<cdx-message dismiss-button-label="Close">Notice message with dismiss button</cdx-message>
</template>

<template v-slot:code>

```vue
<cdx-message dismiss-button-label="Close">
	Notice message with dismiss button
</cdx-message>
```

</template>
</cdx-demo-wrapper>

### Multiline message

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-message type="error">
<p><strong>An error has occurred</strong></p>
<p>Comprehensive explanation of the error</p>
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

### Multiline inline message

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-message type="error" :inline="true">
<p>An error has occurred</p>
<p>Comprehensive explanation of the error</p>
</cdx-message>
</template>

<template v-slot:code>

```vue
<cdx-message type="error" :inline="true">
	<p>An error has occurred</p>
	<p>Comprehensive explanation of the error</p>
</cdx-message>
```

</template>
</cdx-demo-wrapper>

### With custom icon

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
