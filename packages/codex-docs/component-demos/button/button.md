<script setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import CdxDocsNamedIcon from '@/../src/components/named-icon/NamedIcon.vue';
import ButtonWithIcon from '@/../component-demos/button/examples/ButtonWithIcon.vue';
import ProgressiveButtonWithIcon from '@/../component-demos/button/examples/ProgressiveButtonWithIcon.vue';
import DestructivePrimaryButtonWithIcon from '@/../component-demos/button/examples/DestructivePrimaryButtonWithIcon.vue';
import QuietButtonWithIcon from '@/../component-demos/button/examples/QuietButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/button/examples/IconOnlyButton.vue';
import ProgressivePrimaryIconOnlyButton from '@/../component-demos/button/examples/ProgressivePrimaryIconOnlyButton.vue';
import DestructiveIconOnlyButton from '@/../component-demos/button/examples/DestructiveIconOnlyButton.vue';
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
	// TODO not a prop, but listed as such in the UI; how should we group this instead?
	{
		name: 'icon',
		type: 'icon'
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

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-button v-bind="propValues">
	<cdx-docs-named-icon v-if="propValues.icon" :icon-name="propValues.icon" />
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

#### Progressive, with icon

<cdx-demo-wrapper>
<template v-slot:demo>
<progressive-button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/ProgressiveButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

#### Destructive, primary, with icon

<cdx-demo-wrapper>
<template v-slot:demo>
<destructive-primary-button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/DestructivePrimaryButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

#### Default, quiet, with icon

<cdx-demo-wrapper>
<template v-slot:demo>
<quiet-button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/DestructivePrimaryButtonWithIcon.vue

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

#### Progressive, primary, icon only
<cdx-demo-wrapper>
<template v-slot:demo>
<progressive-primary-icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/ProgressivePrimaryIconOnlyButton.vue

</template>
</cdx-demo-wrapper>

#### Destructive, icon only
<cdx-demo-wrapper>
<template v-slot:demo>
<destructive-icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/DestructiveIconOnlyButton.vue

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
