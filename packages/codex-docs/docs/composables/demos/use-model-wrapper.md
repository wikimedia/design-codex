# useModelWrapper

Returns an [editable computed property](https://vuejs.org/guide/essentials/computed.html#writable-computed)
that emits an event when changed.

This is useful to reduce boilerplate when `v-model` is set on a component in the parent and
its `modelValue` needs to be bound via `v-model` to an input or another component within the component.
Setting `v-model="modelValue"` on the child component doesn't work, because
mutating the `modelValue` prop is not allowed, and an `update:modelValue` event needs to be
emitted instead.

This composable returns a `wrappedModel` such that `v-model="wrappedModel"`
does work correctly. When reading from `wrappedModel`, the value of the `modelValue` prop is
returned; when writing to `wrappedModel`, an `update:modelValue` event is emitted, which
instructs the parent to change the value it passes into the `modelValue` prop.

This approach was inspired by https://www.vuemastery.com/blog/vue-3-data-down-events-up/.

## Usage
To wrap the `modelValue` prop, pass in the prop as a ref (using the `toRef` function from Vue)
and the `emit` function that is passed to the setup function:
```js
const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );
```

To wrap a prop with a different name, pass a third parameter with the name of the event to emit.
This is `update:` followed by the name of the prop. For example, to wrap a prop called `open`,
use:
```js
const wrappedOpen = useModelWrapper(
	toRef( props, 'open' ),
	emit,
	'update:open'
);
```

Make sure that the event name (`update:open` in the example above, or `update:modelValue` when
wrapping the `modelValue` prop) is listed in the `emits` array in the component definition.
If you're using TypeScript, TypeScript will verify that this is the case, and will throw cryptic
errors if the event is not listed. For more information and examples of what these errors look
like, see
[the section about useModelWrapper on the TypeScript page](../../contributing/contributing-code/typescript.md#incorrect-event-name-passed-to-usemodelwrapper).

## Full examples

### Wrapping the `modelValue` prop
Below is a simple component that wraps a Codex TextArea. It takes a string through its
`modelValue` prop, and passes it down to the TextArea. It's designed to be used with `v-model`
in its parent component, e.g. `<message-editor v-model="message" />`.
```vue
<template>
	<p>Edit your message:</p>
	<!-- Conceptually, we want to use v-model="modelValue",
	     but that causes lint errors -->
	<cdx-text-area v-model="wrappedModel" />
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { CdxTextArea, useModelWrapper } from '@wikimedia/codex';

export default defineComponent( {
	components: {
		CdxTextArea
	},
	props: {
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: [
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const wrappedModel = useModelWrapper(
			toRef( props, 'modelValue' ),
			emit
		);
		return {
			wrappedModel
		};
	}
} );
</script>
```

### Wrapping a prop not named `modelValue`
Below is a simple component that wraps a Codex Dialog. It takes an `open` prop, and passes it down
to the Dialog. It's designed to be used with a named `v-model` in its parent component, e.g.
`<custom-dialog v-model:open="isDialogOpen" />`.

```vue
<template>
	<!-- Conceptually, we want to use v-model:open="open",
	     but that causes lint errors -->
	<cdx-dialog v-model:open="wrappedOpen">
		<p>Hello! I am a custom dialog.</p>
		<!-- This could also be @click="wrappedOpen = false" -->
		<cdx-button @click="close">Close me</cdx-button>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { CdxDialog, useModelWrapper } from '@wikimedia/codex';

export default defineComponent( {
	components: {
		CdxDialog
	},
	props: {
		open: {
			type: Boolean,
			required: true
		}
	},
	emits: [
		'update:open'
	],
	setup( props, { emit } ) {
		const wrappedOpen = useModelWrapper(
			toRef( props, 'open' ),
			emit,
			'update:open'
		);

		function close() {
			// Setting wrappedOpen.value = false; is equivalent to calling
			// emit( 'update:open', false );
			wrappedOpen.value = false;
		}

		return {
			wrappedOpen,
			close
		};
	}
} );
</script>
```
