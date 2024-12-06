<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import BasicButtonGroup from '@/../component-demos/button-group/examples/BasicButtonGroup.vue';
import ButtonGroupWithIcons from '@/../component-demos/button-group/examples/ButtonGroupWithIcons.vue';
import IconOnlyButtonGroup from '@/../component-demos/button-group/examples/IconOnlyButtonGroup.vue';
import DisabledButtonGroup from '@/../component-demos/button-group/examples/DisabledButtonGroup.vue';
import MaximumButtonGroup from '@/../component-demos/button-group/examples/MaximumButtonGroup.vue';
import ButtonGroupWithSlot from '@/../component-demos/button-group/examples/ButtonGroupWithSlot.vue';
</script>

A ButtonGroup consists of a set of two or more normal buttons. Buttons in such a group signal a
number of equally important actions that will occur when the user taps on them.

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

## Overview

### When to use ButtonGroup

Use the ButtonGroup component when you want users to choose actions from a set of actions, with the
restriction that only one can be active at a time. If you want to enable users to select one
or multiple options from a set of options, use
[ToggleButtonGroup](./toggle-button-group.md) instead.

### About ButtonGroup

ButtonGroup consists of a minimum of two neutral normal Buttons, which include the following elements.

#### Label

Each button within the ButtonGroup must have a label. Button labels should be as short as possible, with text that clearly states what action will be taken once the button is pressed (e.g. download, submit form, search).

<cdx-demo-best-practices>

<cdx-demo-best-practice>Customize the content of each button, allowing for superscript, subscript, or special characters.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use numbers instead of text if needed.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Icon (optional)

Icons simplify user recognition and provide the ability to shorten button labels to a minimum.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Mix text-only and icon-only buttons exclusively when using the ‘ellipsis‘ icon to indicate additional actions.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">In order to ensure consistency, avoid mixing different types of button contents within the same ButtonGroup.</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Basic usage

<cdx-demo-wrapper>
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

<cdx-accordion>

<template #title>Developer notes</template>

Describe the buttons in the group with an array of `ButtonGroupItem` objects. The text in the
`label` property will be displayed in the buttons. When a button is clicked, a `click` event
will be emitted with the `value` property of the clicked button. Values must be unique within a
button group.

If the `label` property is omitted, the `value` property will be used as the label. This allows
using `{ value: 'Foo' }` as a shorthand for `{ label: 'Foo', value: 'Foo' }`.

</cdx-accordion>

### With icons

Use an icon with the button label when you need to convey meaning through both textual and visual elements.

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

For icon-only buttons, the label will be visually hidden and available only to users of assistive technology.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Icon-only buttons may be used to form a ButtonGroup but only if the icons used are [universally understood](../../style-guide/icons.md#universal-rather-than-culturally-specific) and do not require accompanying text.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

<cdx-accordion>

<template #title>Developer notes</template>

To display an icon as the only content of a button, use the `icon` property to specify an icon, and
set the `label` property to `null`.

</cdx-accordion>

### Disabled

You can disable the entire ButtonGroup or individual buttons.

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

<cdx-accordion>

<template #title>Developer notes</template>

The entire component can be disabled by setting the `disabled` prop. Individual buttons can be
disabled by setting their `disabled` property. Clicking a disabled button does not emit a `click`
event.

</cdx-accordion>

### Overflowing buttons

When the ButtonGroup is too large to fit on one line, the buttons overflow to the next line.

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

The contents of the buttons can be customized using the default slot.

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

<cdx-accordion>

<template #title>Developer notes</template>

The `ButtonGroupItem` object for each button is available through the `button` binding. In this example, the value of the button
is displayed in superscript after its label.

</cdx-accordion>

## Technical implementation

### Vue usage

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next Button within the group or to the next interactive element in tab order when the focus is placed on the last Button of the group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous Button within the group or to the previous interactive element when the focus is placed on the first Button of the group. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on one of the buttons, it activates that Button. |