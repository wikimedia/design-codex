<script setup>
import BasicButtonGroup from '@/../component-demos/button-group/examples/BasicButtonGroup.vue';
import ButtonGroupWithIcons from '@/../component-demos/button-group/examples/ButtonGroupWithIcons.vue';
import IconOnlyButtonGroup from '@/../component-demos/button-group/examples/IconOnlyButtonGroup.vue';
import DisabledButtonGroup from '@/../component-demos/button-group/examples/DisabledButtonGroup.vue';
import MaximumButtonGroup from '@/../component-demos/button-group/examples/MaximumButtonGroup.vue';
import ButtonGroupWithSlot from '@/../component-demos/button-group/examples/ButtonGroupWithSlot.vue';
</script>

A button group consists of a set of two or more normal buttons. Buttons in such a group signal a
number of equally important actions that will occur when the user taps on them.

## Guidelines

### When to use button groups
Each button within the button group must have a label. For icon-only buttons, the label will be
visually hidden and available only to users of assistive technology.

Use the ButtonGroup component when you want users to choose actions from a set of actions, with the
restriction that only one can be active at a time. If you want to enable users to select one
or multiple options from a set of options, use
[ToggleButtonGroup](./toggle-button-group.md) instead.

### Specifications

![Specification of ButtonGroup.](../../assets/components/button-group-specifications.svg)

A button group consists of a minimum of two normal (framed) buttons, which may include the following elements:
1. **Icon** (optional)<br>Icons simplify user recognition and provide the ability to shorten button
labels to a minimum.
2. **Label**<br>Button labels should be as short as possible, with text that clearly states what
action will be taken once the button is pressed (e.g. download, submit form, search).

#### Component limitations

There is no maximum limit on the number of buttons per group. The width of the button group will adjust to accommodate the expanding text within each button. If the total width of the button group surpasses the maximum width of `@max-width-button` (equivalent to `448px` in the default Codex theme), the buttons will be wrapped into the next line.

![Maximum example for ButtonGroup component.](../../assets/components/button-group-specifications-max.svg)

Refer to the [ButtonGroup component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=6639-59569&mode=design&t=7wyBmhfdJTJevQmT-11).

### Interaction states
Button groups have the following visually separate states:

![Interaction states of ButtonGroup: default,
hover on second button, second button active, focus on second button, disabled second button,
and disabled button group.](../../assets/components/button-group-interaction-states.svg)

1. Default buttons
2. Hover on one button
3. Active button
4. Focus on one button
5. Disabled button
6. Disabled button group

### Best practices

Consider the following recommendations when working with button groups.

#### Buttons within the group

<cdx-demo-rules>
<template #do-media>

![ButtonGroup with two neutral normal text buttons.](../../assets/components/button-group-best-practices-buttons-do.svg)

</template>
<template #do-text>

- Only neutral normal Buttons can be used within the ButtonGroup component.

</template>
<template #dont-media>

![Two ButtonGroups using progressive and destructive normal and primary buttons.](../../assets/components/button-group-best-practices-buttons-dont.svg)

</template>
<template #dont-text>

- Use other flavors or weights of a Button within the ButtonGroup component.

</template>
</cdx-demo-rules>

#### Button’s content

<cdx-demo-rules>
<template #do-media>

![Two ButtonGroups with text and text numeral neutral buttons.](../../assets/components/button-group-best-practices-content-do.svg)

</template>
<template #do-text>

- Customize the content of each button, allowing for superscript, subscript, or special characters.
- Use numbers instead of text if needed.
- Mix text-only and icon-only buttons exclusively when using the ‘ellipsis‘ icon to indicate additional actions.

</template>
<template #dont-media>

![ButtonGroup with neutral buttons with mixed contents.](../../assets/components/button-group-best-practices-content-dont.svg)

</template>
<template #dont-text>

- In order to ensure consistency, avoid mixing different types of button contents within the same ButtonGroup.

</template>
</cdx-demo-rules>

#### Icon-only buttons

<cdx-demo-rules>
<template #do-media>

![ButtonGroup using icon-only buttons with universally recognizable icons.](../../assets/components/button-group-best-practices-icon-only-do.svg)

</template>
<template #do-text>

- Icon-only buttons may be used to form a ButtonGroup but only if the icons used are [universally understood](../../style-guide/icons.md#universal-rather-than-culturally-specific) and do not require accompanying text.

</template>
<template #dont-media>

![ButtonGroup using icon-only buttons with too complex and non-universal icons.](../../assets/components/button-group-best-practices-icon-only-dont.svg)

</template>
<template #dont-text>

- Use icon-only buttons if the icons are not easy to understand or do not clearly communicate their purpose.

</template>
</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next Button within the group or to the next interactive element in tab order when the focus is placed on the last Button of the group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous Button within the group or to the previous interactive element when the focus is placed on the first Button of the group. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on one of the buttons, it activates that Button. |

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
