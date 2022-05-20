<script setup>
import { CdxButton } from '@wikimedia/codex';
import ButtonWithIcon from '@/../component-demos/button/examples/ButtonWithIcon.vue';
import QuietButtonWithIcon from '@/../component-demos/button/examples/QuietButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/button/examples/IconOnlyButton.vue';
import QuietIconOnlyButton from '@/../component-demos/button/examples/QuietIconOnlyButton.vue';


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
		name: 'default-icon',
		type: 'slot-icon'
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

<!--
	Technically, the whitespace between the icon and the slot content results in an extra
	space being generated when it is not needed, if the icon is not set, but this doesn't
	appear to change the actual rendering, just the raw HTML if you inspect element, and its
	a lot easier than trying to add logic to only show the space when its needed.
-->
<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-button v-bind="propValues">
	<cdx-demo-slot-icon :icon="slotValues['default-icon']" />
	{{ slotValues.default }}
</cdx-button>
</template>
</cdx-demo-wrapper>

### Selected variations

#### Default

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-button>Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button>Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

#### Progressive

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-button action="progressive">Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button action="progressive">Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

#### Destructive, primary

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-button action="destructive" type="primary">Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button action="destructive" type="primary">Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

#### Destructive, primary, disabled

<cdx-demo-wrapper>
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
</cdx-demo-wrapper>

#### Quiet
<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-button	type="quiet">Click me</cdx-button>
</template>

<template v-slot:code>

```vue
<cdx-button	type="quiet">Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

#### Default, with icon

<cdx-demo-wrapper>
<template v-slot:demo>
<button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/ButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

#### Default, quiet, with icon

<cdx-demo-wrapper>
<template v-slot:demo>
<quiet-button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/QuietButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

#### Default, icon only
<cdx-demo-wrapper>
<template v-slot:demo>
<icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/IconOnlyButton.vue

</template>
</cdx-demo-wrapper>

#### Quiet, icon only
<cdx-demo-wrapper>
<template v-slot:demo>
<quiet-icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/QuietIconOnlyButton.vue

</template>
</cdx-demo-wrapper>
