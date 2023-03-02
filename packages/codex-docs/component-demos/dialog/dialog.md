<script setup>
import DialogBasic from '@/../component-demos/dialog/examples/DialogBasic.vue';
import ConfigurableDialog from '@/../component-demos/dialog/examples/ConfigurableDialog.vue';
import DialogWithSelect from '@/../component-demos/dialog/examples/DialogWithSelect.vue';
import DialogMaxContent from '@/../component-demos/dialog/examples/DialogMaxContent.vue';
import DialogStackedActions from '@/../component-demos/dialog/examples/DialogStackedActions.vue';
import DialogFooterText from '@/../component-demos/dialog/examples/DialogFooterText.vue';
import DialogFooterButton from '@/../component-demos/dialog/examples/DialogFooterButton.vue';
import DialogFooterCheckbox from '@/../component-demos/dialog/examples/DialogFooterCheckbox.vue';

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Dialog title' },
	{ name: 'subtitle', type: 'text', initial: 'Dialog subtitle' },
	{ name: 'hideTitle', type: 'boolean' },
	{ name: 'closeButtonLabel', type: 'text', initial: 'Close' },
	{ name: 'showDividers', type: 'boolean' },
	{ name: 'stackedActions', type: 'boolean' },
	{ name: 'usePrimaryAction', type: 'boolean', initial: true },
	{ name: 'primaryActionLabel', type: 'text', initial: 'Save' },
	{ name: 'primaryActionType', type: 'radio', options: [ 'progressive', 'destructive' ] },
	{ name: 'primaryActionDisabled', type: 'boolean' },
	{ name: 'useDefaultAction', type: 'boolean', initial: true },
	{ name: 'defaultActionLabel', type: 'text', initial: 'Close dialog' },
	{ name: 'defaultActionDisabled', type: 'boolean' },
	{ name: 'optionalFooterText', type: 'boolean' },
	{ name: 'optionalFooterContent', type: 'radio', options: [ 'none', 'checkbox', 'button' ] },
	{
		name: 'default',
		type: 'slot',
		default: 'Simple dialogs are mainly for short messages, confirmations or alerts. Their content should aim to fill one or two lines.'
	},
];
</script>

## Demos

### Configurable Dialog
<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
<configurable-dialog v-bind="propValues">
{{ slotValues.default }}
</configurable-dialog>
</template>
</cdx-demo-wrapper>

### Basic example
This example includes a title, close button label (which enables the appearance of the icon-only
close button), primary action, and default action.

<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-basic />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogBasic.vue

</template>
</cdx-demo-wrapper>

### With expandable menus
Expandable menus, like the one used by the Select component, will extend past the end of the dialog
frame (instead of being cut off by it).

<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-with-select />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogWithSelect.vue

</template>
</cdx-demo-wrapper>

### With overflowing content
When content in the default slot (the dialog body) is longer than the available space, the body
section will scroll while the dialog header and footer will remain in view. Use the `showDividers`
prop to add dividers between the header, body, and footer of the dialog.
<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-max-content />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogMaxContent.vue

</template>
</cdx-demo-wrapper>

### With stacked actions
When action button text is long, use the `stackedActions` prop to stack the action buttons
vertically.
<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-stacked-actions />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogStackedActions.vue

</template>
</cdx-demo-wrapper>

### With optional footer content
In addition to the actions, the Dialog component supports two other optional
footer elements, represented by named slots: `footer-text` and `footer-optional`.

#### Footer Text
The `footer-text` slot can accept plain text, links, and basic formatting
markup; do not use it to provide images or block-level elements. All content
provided is wrapped inside of a `<p>` tag. Use this slot for situations like
showing a disclaimer, linking to help or legal documentation, etc. The
`footer-text` content will appear above the dialog actions.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<dialog-footer-text />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogFooterText.vue

</template>
</cdx-demo-wrapper>

#### Optional Footer action
An additional slot called `footer-optional` is also supported. Use this slot
to provide some kind of supplemental action alongside the primary and default
action buttons. A checkbox or an icon-only button would be examples of
appropriate content here.

##### Icon-only button example

<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-footer-button />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogFooterButton.vue

</template>
</cdx-demo-wrapper>

##### Checkbox example

<cdx-demo-wrapper>
<template v-slot:demo>
<dialog-footer-checkbox />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogFooterCheckbox.vue

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
/* stylelint-disable selector-class-pattern */
:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog h2 ) {
	margin: unset;
	border: unset;
	padding: unset;
}

:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog p:first-child ) {
	margin-top: unset;
}

:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog p:last-child ) {
	margin-bottom: unset;
}
/* stylelint-enable selector-class-pattern */
</style>