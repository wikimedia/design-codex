<script setup>
import { CdxButton } from '@wikimedia/codex';

// TODO: is it possible to get type checking in this markdown file, so we can
// take advantage of the defined config types?
const controlsConfig = [
	{
		name: 'action',
		type: 'radio',
		options: [ 'default', 'progressive', 'destructive' ],
	},
	{
		name: 'type',
		type: 'radio',
		options: [ 'normal', 'primary', 'quiet' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Click me'
	}
];
</script>

## Demos

### Configurable

<Wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-button v-bind="propValues">{{ slotValues.default }}</cdx-button>
</template>
</Wrapper>

### Selected variations

#### Default

<Wrapper>
<template v-slot:demo>
<cdx-button>Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button>Click me</cdx-button>
```

</template>
</Wrapper>

#### Progressive

<Wrapper>
<template v-slot:demo>
<cdx-button action="progressive">Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button action="progressive">Click me</cdx-button>
```

</template>
</Wrapper>

#### Destructive, primary

<Wrapper>
<template v-slot:demo>
<cdx-button action="destructive" type="primary">Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button action="destructive" type="primary">Click me</cdx-button>
```

</template>
</Wrapper>

#### Destructive, primary, disabled

<Wrapper>
<template v-slot:demo>
<cdx-button
	action="destructive"
	type="primary"
	:disabled="true"
>
	Click me
</cdx-button></template>

<template v-slot:code>

```vue
<cdx-button
	action="destructive"
	type="primary"
	:disabled="true"
>
	Click me
</cdx-button>
```

</template>
</Wrapper>
