<script setup>
import { ref } from 'vue';
import { CdxPopover, CdxToggleButton } from '@wikimedia/codex';

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
	{
		name: 'default',
		type: 'slot',
		default: 'Popover body content.'
	},
];

const showPopover = ref( false );
const anchorElement = ref( null );
</script>

A Popover is a localized, non-disruptive container that is overlaid on a web page or app, near its trigger, in order to present necessary information and tasks.

<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-toggle-button v-model="showPopover" ref="anchorElement">
	Open Popover
</cdx-toggle-button>
<cdx-popover
	v-model:open="showPopover"
	render-in-place
	v-bind="propValues"
	:anchor="anchorElement"
>
	<template #default>
		{{ slotValues.default }}
	</template>
</cdx-popover>
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

This example includes text with the ability to manually dismiss the Popover.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use the header to align standard text content to the dismiss action.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

## Technical implementation

### Vue usage

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves focus to the next interactive element and, if that element is outside the Popover, it closes the Popover. |
| <kbd>Shift + Tab</kbd> | It moves focus to the previous interactive element and, if that element is outside the Popover, it closes the Popover. |
| <kbd>Esc</kbd> | It closes the Popover. |
