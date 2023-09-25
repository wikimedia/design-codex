<script setup>
import BasicButtonGroup from '@/../component-demos/button-group/examples/BasicButtonGroup.vue';
import ButtonGroupWithIcons from '@/../component-demos/button-group/examples/ButtonGroupWithIcons.vue';
import IconOnlyButtonGroup from '@/../component-demos/button-group/examples/IconOnlyButtonGroup.vue';
import DisabledButtonGroup from '@/../component-demos/button-group/examples/DisabledButtonGroup.vue';
import MaximumButtonGroup from '@/../component-demos/button-group/examples/MaximumButtonGroup.vue';
import ButtonGroupWithSlot from '@/../component-demos/button-group/examples/ButtonGroupWithSlot.vue';
</script>

## Demos

Open up the browser console to see events emitted on click.

### Basic usage
Describe the buttons in the group with an array of `ButtonGroupItem` objects. The text in the
`label` property will be displayed in the buttons. When a button is clicked, a `click` event
will be emitted with the `value` property of the clicked button. Values must be unique within a
button group.

If the `label` property is omitted, the `value` property will be used as the label. This allows
using `{ value: 'Foo' }` as a shorthand for `{ label: 'Foo', value: 'Foo' }`.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
<basic-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/BasicButtonGroup.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/BasicButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons
Use the `icon` property to add an icon before the text of a button. Use the `disabled` property
to disable individual buttons.

<cdx-demo-wrapper>
<template v-slot:demo>
<button-group-with-icons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/ButtonGroupWithIcons.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/ButtonGroupWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon-only buttons
To display an icon as the only content of a button, use the `icon` property to specify an icon, and
set the `label` property to `null`.

<cdx-demo-wrapper>
<template v-slot:demo>
<icon-only-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/IconOnlyButtonGroup.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/IconOnlyButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Disabled
The entire component can be disabled by setting the `disabled` prop. Individual buttons can be
disabled by setting their `.disabled` property. Clicking a disabled button does not emit a `click`
event.

<cdx-demo-wrapper>
<template v-slot:demo>
<disabled-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/DisabledButtonGroup.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/DisabledButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>


### Overflowing buttons
When the button group is too large to fit on one line, the buttons overflow to the next line.

<cdx-demo-wrapper>
<template v-slot:demo>
<maximum-button-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/MaximumButtonGroup.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/MaximumButtonGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Custom button display
The contents of the buttons can be customized using the default slot. The `ButtonGroupItem` object
for each button is available through the `button` binding. In this example, the value of the button
is displayed in superscript after its label.

<cdx-demo-wrapper>
<template v-slot:demo>
<button-group-with-slot />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/ButtonGroupWithSlot.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/ButtonGroupWithSlot.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage
