<script setup>
import { CdxMessage } from '@wikimedia/codex';
</script>
# useModelWrapper

Returns an editable computed property that emits an event when changed.

This is useful to reduce boilerplate when `v-model` is set on a component in the parent and
its `modelValue` needs to be bound via `v-model` to an input or another component within the component.

This approach was inspired by https://www.vuemastery.com/blog/vue-3-data-down-events-up/.

## Background

With the standard Vue APIs this is the code required to bind a value from a component to an input within
it:

```vue
<!-- Example.vue -->
<message-editor
	v-model="message"
/>
```
The `modelValue` from `v-model` could be bound to an input like this:
```vue
<!-- MessageEditor.vue -->
<input
	type="text"
	v-model="modelValue"
 >
```
Which is expanded by Vue's compiler to:
```vue
<!-- MessageEditor.vue -->
<input
	type="text"
	:value="modelValue"
	@input="modelValue = $event.target.value"
>
```

When using this approach with a custom component instead of an input, the event name
is defined by the component, hence the verbose approach is required to capture it. The event
handler is then responsible to bubble up the received event and value:

```vue
<!-- MessageEditor.vue -->
<my-input
	:value="modelValue"
	@update:model-value="( newValue ) => emit( 'update:modelValue', newValue )"
/>
```
```vue
<!-- MyInput.vue -->
<template>
	<!-- ✗ BAD -->
	<input v-model="modelValue" />
</template>
<script>
export default {
	emits: [ 'update:modelValue' ],
	props: {
		/**
		 * The component model value. Should be provided via a v-model
		 * binding in the parent scope.
		 */
		modelValue: {
			type: String,
			default: ''
		}
	}
}
</script>
```
:::warning
The example above will yield an _eslint_ error for the rule _[vue/no-mutating-props](https://eslint.vuejs.org/rules/no-mutating-props.html)_
:::

We can't just reuse the bound `modelValue` because that would mutate a prop which is highly discouraged.
Instead, we need a separate computed property that manually handles setting the value and emitting an event
when the input is changed.

The described pattern requires some verbosity to bind models down and to bubble events up that
can be simplified using this composable.

## Example of usage

The prior code could be re-written as follows:

```vue
<!-- MessageEditor.vue -->
<template>
	<my-input v-model="wrappedModel">
</template>
<script>
import { useModelWrapper } from '@wikimedia/codex';
import MyInput from './MyInput.vue';

export default {
	components: { MyInput },
	emits: [ 'update:modelValue' ],
	props: {
		/**
		 * The component model value. Should be provided via a v-model
		 * binding in the parent scope.
		 */
		modelValue: {
			type: String,
			default: ''
		}
	},
	setup() {
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ) )
		return {
			wrappedModel
		}
	}
}
</script>
```

This also allows you to document the type of the `v-model` bound value with Vue's standard prop definitions.
