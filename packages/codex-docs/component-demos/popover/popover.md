<script setup>
import { ref } from 'vue';
import { CdxPopover, CdxToggleButton, CdxAccordion } from '@wikimedia/codex';
import PopoverConfigurable from '@/../component-demos/popover/examples/PopoverConfigurable.vue';
import PopoverBasic from '@/../component-demos/popover/examples/PopoverBasic.vue';
import PopoverArticlePreview from '@/../component-demos/popover/examples/PopoverArticlePreview.vue';

const controlsConfig = [
	{ name: 'title', type: 'text', initial: 'Popover title' },
	{ name: 'icon', type: 'icon' },
	{ name: 'useCloseButton', type: 'boolean' },
	{
		name: 'placement',
		type: 'select',
		menuItems: [
			{ value: 'bottom' },
			{ value: 'bottom-start' },
			{ value: 'bottom-end' },
			{ value: 'top' },
			{ value: 'top-start' },
			{ value: 'top-end' },
			{ value: 'right' },
			{ value: 'right-start' },
			{ value: 'right-end' },
			{ value: 'left' },
			{ value: 'left-start' },
			{ value: 'left-end' }
		]
	},
	{ name: 'stackedActions', type: 'boolean' },
	{ name: 'usePrimaryAction', type: 'boolean', initial: true },
	{ name: 'primaryActionLabel', type: 'text', initial: 'Save' },
	{ name: 'primaryActionType', type: 'radio', options: [ 'progressive', 'destructive' ] },
	{ name: 'useDefaultAction', type: 'boolean', initial: true },
	{ name: 'defaultActionLabel', type: 'text', initial: 'Cancel' },
	{
		name: 'default',
		type: 'slot',
		default: 'Popover body content.'
	},
];

</script>

A Popover is a non-disruptive container that is overlaid on a web page or app, positioned near
its trigger, in order to present necessary information and tasks.

<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
	<popover-configurable v-bind="propValues">
		<template #default>
			{{ slotValues.default }}
		</template>
	</popover-configurable>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Popover

The Popover component is intended to be used with other components such as a [ToggleButton](./toggle-button.md) or [Link](../mixins/link.md). The Popover is displayed when the user interacts with the corresponding trigger element.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use a ToggleButton as a trigger to emphasize what opened the Popover, setting the ToggleButton into its toggled state when triggering the Popover.

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Use a Link as a trigger when the Popover is meant to serve as a preview for what pressing the link will present.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

Popovers facilitate communication between the system and user. They perform best when used for additional information or as a workflow within a bigger task, as they don’t require loading a new page and keep actions in context.

Popovers differ from Dialogs as they are not as disruptive, since the context of the page around the Popover remains, as there is no visual overlay on the page. That being said, they should be used sparingly and only when necessary, since they inherently hide content and require an additional action to reveal it.

**Use the Popover component when:**
- Additional information needs to be displayed and separated from the page content.
- It is helpful to have the context of the page still within view.

**Avoid using Popover when:**
- The information can be displayed within the main interface.
- The content is long or complex, like a form with numerous fields.
- Typed input is required from the user.
- Components that take up a large amount of space need to be used in the content.
- The information being shown is a very brief message or explanation for an element on the page. Instead, use [Tooltip](../directives/tooltip.md).

### About Popover

Popover includes the following elements.

#### Header

The Popover header can contain a decorative icon, title, or standard text. A quiet, icon-only Button may be used to close the Popover.

#### Body

Interactive types of content or components can be included within the Popover’s body—typically Fields or other form element types of components.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">

Avoid using Cards, other elevated components, or components requiring a lot of space within the Popover.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Footer

Action buttons should appear at the start of the Popover. A primary Button (either progressive or destructive) is used to indicate the main action. A normal neutral Button can be used to indicate a default action (e.g. “Cancel”). Additionally, icon-only Buttons can be used as needed.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Stack action buttons based on text length when needed, placing the primary button on top.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Don't stack action buttons when they can be placed side by side.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Arrow

Popovers have an arrow which points to the trigger.

## Examples

### Basic usage

This example includes text, a custom placement, and the ability to manually dismiss the Popover.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use the header to align standard text content to the dismiss action.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<popover-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/popover/examples/PopoverBasic.vue [NPM]

<<< @/../component-demos/popover/examples-mw/PopoverBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Create a template ref for the trigger element, and then pass that ref to the `anchor` prop.
The `anchor` prop is required to correctly position the Popover.

Ensure the toggle button's on/off state and the popover's visibility is synchronized via `v-model`.

::: tip Usage in TypeScript
Vue 3.5 introduced the `useTemplateRef()` composable to simplify the creation of
template refs in Vue components using the Composition API. If you are using
TypeScript, consider annotating the types for any template refs like this:

```ts
// Basic component typing with ComponentPublicInstance.
const anchorRef = useTemplateRef<ComponentPublicInstance>( 'my-anchor-id' );
```

More information on typing component template refs can be found in the
[Vue.js docs.](https://vuejs.org/guide/typescript/composition-api#typing-component-template-refs)
:::

</cdx-accordion>

### Article preview

This example uses the `hover` trigger since a link leads to a new page or section.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use images and other media as needed to convey visual information in the Popover.

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Use `hover` as a trigger only for elements which have a separate `press` action, such as a link.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<popover-article-preview />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/popover/examples/PopoverArticlePreview.vue [NPM]

<<< @/../component-demos/popover/examples-mw/PopoverArticlePreview.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The example has multiple anchor tags that displays Popover content when hovered or focused.
The trigger element and Popover content is dynamically updated based on where the event took
place.

- Assign each trigger element e.g. anchor tag a template ref, and store them in
the `triggerElements` array.
- To show and hide the Popover on hover and focus, add `mouseover`, `focus`, `mouseleave`, and `blur`
event listeners to the anchor tags that trigger a Popover.

</cdx-accordion>

## Technical implementation

### Vue usage

::: tip Popover and `<teleport>`
Popovers rely on Vue's built-in
[`<teleport>`](https://vuejs.org/guide/built-ins/teleport.html) feature. By
default, Popovers will be teleported to the `<body>` element on the page, but
this can be changed using Vue's
[provide/inject](https://vuejs.org/guide/components/provide-inject.html)
feature, with `provide( 'CdxTeleportTarget', '#my-teleport-target' )`.
If Popover is being used with SSR, a dedicated teleport target should be provided.

Popover teleportation can be disabled by setting the `renderInPlace` prop.
:::

::: warning Styling content in teleported Popovers
When a Popover is teleported (which is the default unless the `renderInPlace`
prop is set), its contents will not be descendants of the element that contains
the `<cdx-popover>` tag. When styling the contents of a Dialog, be careful not to
use CSS selectors that assume the Dialog is inside its parent component.

For example, CSS selectors like `.my-component .cdx-popover` or
`.my-component .something-inside-the-popover` won't work. Instead,
set e.g. `class="my-component-popover"` on the `<cdx-popover>` tag, and use that
class to style the dialog and things inside it.
:::

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves focus to the next interactive element and, if that element is outside the Popover, it closes the Popover. |
| <kbd>Shift + Tab</kbd> | It moves focus to the previous interactive element and, if that element is outside the Popover, it closes the Popover. |
| <kbd>Esc</kbd> | It closes the Popover. |
