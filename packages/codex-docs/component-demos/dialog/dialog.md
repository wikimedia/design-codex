<script setup>
import DialogBasic from '@/../component-demos/dialog/examples/DialogBasic.vue';
import ConfigurableDialog from '@/../component-demos/dialog/examples/ConfigurableDialog.vue';
import DialogWithSelect from '@/../component-demos/dialog/examples/DialogWithSelect.vue';
import DialogMaxContent from '@/../component-demos/dialog/examples/DialogMaxContent.vue';
import DialogStackedActions from '@/../component-demos/dialog/examples/DialogStackedActions.vue';
import DialogFooterText from '@/../component-demos/dialog/examples/DialogFooterText.vue';
import DialogCustomHeader from '@/../component-demos/dialog/examples/DialogCustomHeader.vue'

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Dialog title' },
	{ name: 'subtitle', type: 'text', initial: 'Dialog subtitle' },
	{ name: 'hideTitle', type: 'boolean' },
	{ name: 'closeButtonLabel', type: 'text', initial: 'Close' },
	{ name: 'stackedActions', type: 'boolean' },
	{ name: 'usePrimaryAction', type: 'boolean', initial: true },
	{ name: 'primaryActionLabel', type: 'text', initial: 'Save' },
	{ name: 'primaryActionType', type: 'radio', options: [ 'progressive', 'destructive' ] },
	{ name: 'primaryActionDisabled', type: 'boolean' },
	{ name: 'useDefaultAction', type: 'boolean', initial: true },
	{ name: 'defaultActionLabel', type: 'text', initial: 'Close dialog' },
	{ name: 'defaultActionDisabled', type: 'boolean' },
	{
		name: 'default',
		type: 'slot',
		default: 'Simple dialogs are mainly for short messages, confirmations or alerts. Their content should aim to fill one or two lines.'
	},
	{
		name: 'footer-text',
		type: 'slot',
		default: ''
	},
];
</script>

::: tip Attributes passed to inner element
This component forwards any attributes applied by the user to the inner
`.cdx-dialog` element, instead of applying them to the outermost backdrop
element.
:::

## Demos

### Configurable Dialog
<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
<configurable-dialog v-bind="propValues">
	<template #default>
		{{ slotValues.default }}
	</template>
	<template v-if="slotValues[ 'footer-text' ]" #footer-text>
		{{ slotValues[ 'footer-text' ] }}
	</template>
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
When content in the default slot (the dialog body) is longer than the available
space, the body section will scroll while the dialog header and footer will
remain in view.

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

### With optional Footer Text
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

### With custom Header and Footer
By default, the Dialog displays a header with an optional title, subtitle, and
close button, and a footer with optional buttons and footer text.

The entire content of the header and footer can be replaced with user-provided
markup (by using the `#header` and `#footer` slots, respectively). This allows
for the creation of one-off custom dialogs as well as variant Dialog components
that wrap the base Dialog with some additional content and styling.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<dialog-custom-header />
</template>
<template v-slot:code>

<<< @/../component-demos/dialog/examples/DialogCustomHeader.vue

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
/* stylelint-disable selector-class-pattern */
:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog h2 ) {
	margin: unset;
	border: unset;
	padding: unset;
}
/* stylelint-enable selector-class-pattern */
</style>