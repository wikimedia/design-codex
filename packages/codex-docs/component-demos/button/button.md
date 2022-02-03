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
<CdxButton v-bind="propValues">{{ slotValues.default }}</CdxButton>
</template>
</Wrapper>

### Selected variations

#### Default

<Wrapper>
<template v-slot:demo>
<CdxButton>Click me</CdxButton>
</template>

<template v-slot:code>

```vue
<CdxButton>Click me</CdxButton>
```

</template>
</Wrapper>

#### Progressive

<Wrapper>
<template v-slot:demo>
<CdxButton action="progressive">Click me</CdxButton>
</template>

<template v-slot:code>

```vue
<CdxButton action="progressive">Click me</CdxButton>
```

</template>
</Wrapper>

#### Destructive, primary

<Wrapper>
<template v-slot:demo>
<CdxButton action="destructive" type="primary">Click me</CdxButton>
</template>

<template v-slot:code>

```vue
<CdxButton action="destructive" type="primary">Click me</CdxButton>
```

</template>
</Wrapper>

#### Destructive, primary, disabled

<Wrapper>
<template v-slot:demo>
<CdxButton
	action="destructive"
	type="primary"
	:disabled="true"
>
	Click me
</CdxButton></template>

<template v-slot:code>

```vue
<CdxButton
	action="destructive"
	type="primary"
	:disabled="true"
>
	Click me
</CdxButton>
```

</template>
</Wrapper>
