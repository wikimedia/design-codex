<script setup>
import { ref } from 'vue';
import { CdxButton, CdxAccordion } from '@wikimedia/codex';
import DialogBasic from '@/../component-demos/dialog/examples/DialogBasic.vue';
import ConfigurableDialog from '@/../component-demos/dialog/examples/ConfigurableDialog.vue';
import DialogWithFormInputs from '@/../component-demos/dialog/examples/DialogWithFormInputs.vue';
import DialogStackedActions from '@/../component-demos/dialog/examples/DialogStackedActions.vue';
import DialogCustomHeader from '@/../component-demos/dialog/examples/DialogCustomHeader.vue'
import MultistepDialog from '@/../component-demos/dialog/examples/MultistepDialog.vue';

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Dialog title' },
	{ name: 'subtitle', type: 'text', initial: 'Dialog subtitle' },
	{ name: 'hideTitle', type: 'boolean' },
	{ name: 'useCloseButton', type: 'boolean' },
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

A Dialog is a container that is overlaid on a web page or app in order to present necessary
information and tasks. A Dialog is sometimes referred to as a modal or an overlay.

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

## Overview

### When to use Dialog

Dialogs facilitate communication between the system and user. They perform best when used for urgent
decisions or as a workflow within a bigger task, as they don’t require loading a new page and keep
actions in context.

Dialogs are intentionally disruptive, since the user needs to interact with or close the Dialog
before moving on. For this reason, they should be used sparingly and only when necessary.

**Use the Dialog component when:**
- The user needs to make a decision or provide input to the system before continuing with the
  task at hand.
- Additional information needs to be displayed and separated from the page content.
- The user needs to provide additional confirmation before taking an action.

**Avoid using Dialog when:**
- The information can be displayed within the main interface.
- The information is not important enough to interrupt the user's flow.
- The content is long or complex, like a form with numerous fields, and cannot be split into
  multiple steps within a Dialog.

### About Dialog

Dialog includes the following elements.

#### Header

The Dialog header must contain a title, though it can be visually-hidden if the Dialog's purpose is
clear from context. A subtitle can be used to provide additional information about the Dialog.

A quiet, icon-only Button may be used to close the Dialog. It can also be replaced with a text
Button in some cases.

#### Body

Any type of content or components can be included within the Dialog’s body.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">Avoid using Cards or other elevated components within the Dialog.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Footer

One to two action buttons should appear at the end of the Dialog. A primary Button (either
progressive or destructive) is used to indicate the main action. A normal neutral Button can be used
to indicate a default action (e.g. “Cancel”).

<cdx-demo-best-practices>
<cdx-demo-best-practice>Include at least one action button.</cdx-demo-best-practice>
<cdx-demo-best-practice>Stack action buttons based on text length when needed, placing the primary button on top.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't stack action buttons when they can be placed side by side.</cdx-demo-best-practice>
</cdx-demo-best-practices>

The Dialog footer can include text above the action buttons to provide additional information (e.g.
terms and conditions to read before publishing).

A permanent action can be included (e.g. a "Don't show again" checkbox) (refer to the [Multi-step Dialog](#multi-step-dialog) for an example).

## Examples

### Basic usage

This example includes a title, close button, footer text, primary action, and default action.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Write short titles and simple calls to action to help users understand what to do. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<dialog-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/DialogBasic.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

:::tip `<client-only>` tag
The examples on this page are all wrapped with VitePress's built-in
[`<client-only>` component](https://vitepress.dev/reference/runtime-api#clientonly),
since the Codex documentation site (built with VitePress) uses SSR. Other
SSRed applications will need to do something similar (only rendering Dialog
after the `mounted` hook has been fired, etc.).

This tag has been removed from the MediaWiki examples, as `<client-only>` is
meaningless there.
:::

### With form inputs

A Dialog can be used to gather user input. For long forms with many inputs, consider splitting the
Dialog into multiple steps or creating a separate page instead.

<cdx-demo-wrapper>
<template v-slot:demo>
	<dialog-with-form-inputs />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/DialogWithFormInputs.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogWithFormInputs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Stacked actions

Footer actions may stack depending on the length of the text.

<cdx-demo-wrapper>
<template v-slot:demo>
		<dialog-stacked-actions />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/DialogStackedActions.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogStackedActions.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

When using the default Dialog footer, use the `stackedActions` prop to stack the action buttons
vertically.

</cdx-accordion>

### Custom header and footer

By default, the Dialog displays a header with a `title` and optional `subtitle` and
close button, and a footer with optional buttons and footer text.

The entire contents of the header and footer can be replaced with custom content, layout, and styles. You could:
- Use a text button in place of the icon-only close button in the header.
- Use icon-only action buttons in the footer (such as previous and next buttons in a multi-step
Dialog).
- Add a permanent action in the footer (such as a "Don't show again" checkbox), which should appear next to the buttons (or above them them, in the case of stacked actions).

<cdx-demo-best-practices>
<cdx-demo-best-practice>Ensure the primary action button remains in the footer and place it after the default action, if there is one.</cdx-demo-best-practice>
<cdx-demo-best-practice>When stacking action buttons, ensure they are full-width.</cdx-demo-best-practice>
<cdx-demo-best-practice>Always use a quiet Button for the close button of the Dialog.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<dialog-custom-header />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/DialogCustomHeader.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogCustomHeader.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Override the default header and footer via the `header` and `footer` slots.

</cdx-accordion>

### Multi-step Dialog

You can make a multi-step Dialog by customizing the header and footer and showing different content
in the body section.

This example is based on the Growth Team's [Add a Link Dialog](https://doc.wikimedia.org/GrowthExperiments/master/js/frontend/demos/add-link-dialog.html).

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<multistep-dialog />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/MultistepDialog.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/MultistepDialog.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
/* stylelint-disable selector-class-pattern */
.cdx-demo-wrapper :deep( .cdx-dialog h2 ) {
	margin: unset;
	border: unset;
	padding: unset;
}
/* stylelint-enable selector-class-pattern */
</style>

## Technical implementation

### Vue usage

The parent component controls whether the Dialog is open via `v-model:open`.

A Dialog can offer two kinds of actions (represented by buttons of the
appropriate type): primary action (can be progressive or destructive), and
default action (typically a safe option like "cancel").

When open, the Dialog adds a class to the document body to prevent scrolling;
this is applied whether or not teleport is used.

::: tip Attributes passed to inner element
This component forwards any attributes applied by the user to the inner
`.cdx-dialog` element, instead of applying them to the outermost backdrop
element.
:::

::: tip Dialog and `<teleport>`
Dialogs rely on Vue's built-in
[`<teleport>`](https://vuejs.org/guide/built-ins/teleport.html) feature,
and a "target" prop can be supplied which will be passed to the teleport's `to`
prop. This prop is optional and defaults to the `<body>` element on the page
(although if Dialog is being used with SSR, a dedicated target should be
provided).

An alternative default target can be set using Vue's
[provide/inject](https://vuejs.org/guide/components/provide-inject.html)
feature, with `provide( 'CdxTeleportTarget', '#my-teleport-target' )`.
This provided target will be used if the "target" prop is not set.

Finally, Dialog teleportation behavior can be disabled by setting
`renderInPlace: true`.
:::


### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element in tab order within the Dialog. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element within the Dialog. |
| <kbd>Enter</kbd> | If the focus is placed on one of the Dialog’s buttons, it activates the button. |
| <kbd>Esc</kbd> | It closes the Dialog. |
