<script setup>
import { ref } from 'vue';
import { CdxButton } from '@wikimedia/codex';
import DialogBasic from '@/../component-demos/dialog/examples/DialogBasic.vue';
import ConfigurableDialog from '@/../component-demos/dialog/examples/ConfigurableDialog.vue';
import DialogWithSelect from '@/../component-demos/dialog/examples/DialogWithSelect.vue';
import DialogMaxContent from '@/../component-demos/dialog/examples/DialogMaxContent.vue';
import DialogStackedActions from '@/../component-demos/dialog/examples/DialogStackedActions.vue';
import DialogFooterText from '@/../component-demos/dialog/examples/DialogFooterText.vue';
import DialogCustomHeader from '@/../component-demos/dialog/examples/DialogCustomHeader.vue'
import WrappedDialog from '@/../component-demos/dialog/examples/WrappedDialog.vue';

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

const wrappedDialogState = ref( false );
</script>

Dialogs are elements that are overlaid on a web page or app in order to present
necessary information and tasks. Dialogs are also sometimes referred to as
modals or overlays.

## Guidelines

### Using dialogs

Dialogs facilitate communication between the system and user. They perform best when used for urgent
decisions or as a workflow within a bigger task, as they don’t require loading a new page and keep
actions in context.

Dialogs can be intentionally disruptive, since the user needs to interact with or close the dialog
before moving on. For this reason, they should be used sparingly and only when necessary (more
information below).

![Example of a Codex Dialog with a title, paragraph, two action buttons, and a close button.](../../assets/components/dialog-using.svg)

**When to use:**
- When the user needs to make a decision or provide input to the system before continuing with the
task at hand.
- When additional information needs to be displayed and separated from the page content.
- When the user needs to provide additional confirmation before taking an action.

**When not to use:**
- When the information can be displayed inline within the main interface.
- When the information is not important enough to interrupt the user's flow.
- When the content within the dialog is so long that it requires scrolling. In this case, split the
dialog content into different steps or provide it on a dedicated  page.
- When dealing with a lengthy form comprising numerous form fields and actions. In this case it's
more appropriate to create the form on a separate page.

### Specifications

![Specification of Dialog.](../../assets/components/dialog-specifications.svg)

A dialog contains:
1. **Title**<br>All dialogs should include a title. This should be a short, one-line overview of the
purpose of the dialog.
2. **Subtitle** (optional)<br>A subtitle can be used to provide additional information about the
dialog.
3. **Body**<br>Any type of content or components can be included within the dialog’s body.
4. **Footer text** (optional)<br>Further text can be included above the action buttons, in order to
provide additional information (e.g. terms and conditions to read before publishing).
5. **Permanent action** (optional)<br>A permanent action can be included (e.g. “Don’t show again”).
Main action: A primary button (either progressive or destructive) is used to indicate the main
action.
6. **Secondary action** (optional)<br>A normal neutral button can be used to indicate a secondary
action (e.g. “Cancel”).
7. **Close button** (optional)<br>A quiet, icon-only button may be used to close the dialog. It can
also be replaced with a text button in some cases.

Behind every dialog, there is an overlay that displays the color White (#fff) at 65% opacity. This
is to provide continued context while the user focuses on the dialog.

![A white overlay separating a dialog from a Wikipedia page.](../../assets/components/dialog-specifications-overlay.svg)

If the action buttons’ text is too long, the main action button may be stacked above the secondary
action.

![A dialog with stacked buttons due to their lengthy text.](../../assets/components/dialog-specifications-stacked-actions.svg)

#### Scrolling

If needed, scrolling is allowed in dialogs, but should be used sparingly. While scrolling, top and
bottom dividers appear and both the top and bottom sections become fixed as content scrolls
underneath them.

![A dialog is being scrolled with fixed head and footer sections.](../../assets/components/dialog-specifications-scroll.svg)

#### Closing

A dialog can be dismissed by:
- The close button (X)
- A dismissive action like “Cancel“
- Tapping or clicking anywhere outside of the dialog on the background
- Pressing the key ‘esc’

![A representation of how dialogs can be closed.](../../assets/components/dialog-specifications-closing.svg)

#### Maximum width and height

All dialogs are vertically and horizontally centered on the canvas. We aim to keep dialogs at a
fixed width of 512dp on desktop, while allowing them to use 90% of the width on mobile web. This
makes dialogs the focus of the screen.

![A desktop and mobile mockup of a Wikipedia page with a dialog displayed on the center of the page.](../../assets/components/dialog-specifications-max-width-height.svg)

Refer to the
[Dialog component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=9315-77934&mode=design&t=wP2FzP1WBnRhiMln-11).

### Interaction states

Buttons may be disabled until a required action is completed.

![A dialog with a disabled main button.](../../assets/components/dialog-specifications-disabled-button.svg)

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogBasic.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogBasic.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogWithSelect.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogWithSelect.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogMaxContent.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogMaxContent.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogStackedActions.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogStackedActions.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogFooterText.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogFooterText.vue [MediaWiki]

:::

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

:::code-group

<<< @/../component-demos/dialog/examples/DialogCustomHeader.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/DialogCustomHeader.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Reusable custom Dialog example
The example above demonstrates a unique Dialog instance, suitable for a one-off
dialog. For a re-usable custom dialog, consider using a wrapper component.

A wrapper component could pre-apply certain customizations (a consistent
custom header or footer, for example) while still accepting `<slot>` content
from the user that gets forwarded to the Dialog's own slots.

An example of how to write such a component can be found below. This example
relies on Codex's `useModelWrapper` composable to pass a `v-model` binding from
the parent context down to the inner Dialog component.

Usage of the custom component would look like this:

```vue
<wrapped-dialog  
	title="Custom dialog header"  
	v-model:open="wrappedDialogState"  
>  
	Custom dialog content.  
</wrapped-dialog>
```

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<cdx-button @click="wrappedDialogState = true">Test</cdx-button>

	<wrapped-dialog title="Custom dialog header" v-model:open="wrappedDialogState">
	Custom dialog content.
	</wrapped-dialog>
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/dialog/examples/WrappedDialog.vue [NPM]

<<< @/../component-demos/dialog/examples-mw/WrappedDialog.vue [MediaWiki]

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

## Vue usage

The Dialog overtakes the user's entire viewport until it is dismissed,
preventing mouse and keyboard interaction with other parts of the page
while open. This is a significant interruption in the user experience,
so this component should be used with care.

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

The examples on this page are all wrapped with Vitepress's built-in
[`<client-only>` component](https://vitepress.dev/reference/runtime-api#clientonly),
since the Codex documentation site (built with Vitepress) uses SSR. Other
SSRed applications will need to do something similar (only rendering Dialog
after the `mounted` hook has been fired, etc.).

Use of the Dialog component in features which don't rely on SSR (which includes
all MediaWiki usage for now) can dispense with this.
:::
