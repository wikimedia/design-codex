<script setup>
import { ref } from 'vue';
import { CdxToast, CdxButton, CdxAccordion } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';
import ToastBasic from '@/../component-demos/toast/examples/ToastBasic.vue';
import ToastWithAction from '@/../component-demos/toast/examples/ToastWithAction.vue';
import ToastAutoDismiss from '@/../component-demos/toast/examples/ToastAutoDismiss.vue';
import ToastStacked from '@/../component-demos/toast/examples/ToastStacked.vue';
import ToastContainerExample from '@/../component-demos/toast/examples/ToastContainerExample.vue';

const showToast = ref( false );

const controlsConfig = [
	{
		name: 'type',
		type: 'radio',
		options: [ 'notice', 'warning', 'error', 'success' ],
	},
	{
		name: 'actionButton',
		type: 'text',
		default: ''
	},
	{
		name: 'preventUserDismiss',
		type: 'boolean',
		default: false
	},
	{
		name: 'autoDismiss',
		type: 'boolean',
		default: true
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Toast text'
	}
];
</script>

A Toast is a short and temporary pop-up notification, meant to be noticed without interrupting the user experience.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<div>
		<cdx-button :disabled="showToast" @click="showToast = true">
			Show toast
		</cdx-button>
		<cdx-toast
			v-if="showToast"
			v-bind="propValues"
			@user-dismissed="showToast = false"
			@auto-dismissed="showToast = false"
		>
			{{ slotValues.default }}
		</cdx-toast>
	</div>
</template>
</cdx-demo-wrapper>

## Overview

### When to use toasts

A Toast is a short and temporary pop-up notification, meant to be noticed without interrupting the user experience.

Toasts must include a short text clearly defining the system feedback to the user. They also include an icon to help users recognize the type of toast, and they can also feature an optional action button and a dismiss button to close the toast.

**Use a Toast when:**
- Informing the user about the status of an action that doesn't require immediate interaction (e.g. "Article published").
- The issue is non-critical and does not block the user from continuing.
- Displaying temporary, brief, and easy-to-understand information that fades out automatically and does not interrupt the user's workflow.

**Avoid using a Toast when:**
- Detailed information is needed, the issue is critical, or immediate action is required. In these cases, use a permanent Message instead.
- More than two actions are required. In such cases, use a Dialog instead.

### About Toast

Toast includes the following elements.

#### Icon

Icons simplify user recognition and provide the ability to shorten toast text. A specific icon is matched with each toast type (e.g., 'success') to ensure recognition.

#### Toast text

The toast text should be as concise as possible, offering clear feedback to users. When using declarative `<cdx-toast>`, the default slot can contain rich content (e.g. links or components), as it is teleported into the container. Programmatic toasts via `useToast()` accept a plain-text `message` only.

#### Action button (optional)

To allow for the Toast to have an action, an optional normal quiet text button can be included.

#### Close button (optional)

To allow for the Toast to be dismissed, an optional icon-only quiet button can be included. On desktop and tablet, the close button is visible. On mobile, toasts can be dismissed by swiping left or right.

### Placement

On desktop and mobile, the Toast is placed at the bottom in the center of the screen. On breakpoints desktop-wide, desktop, and tablet the Toast will be spacing-150 (equivalent to 24px in the default Codex theme) above the bottom edge of the screen and spacing-100 (equivalent to 16px in the default Codex theme) on breakpoint mobile.

### Component limitations

Toast text should be as short as possible, containing no more than 90 characters.
On desktop and mobile, the toast component is placed at the bottom in the center of the screen. It will be fixed width of size-3200 (equivalent to 512px in the default Codex theme) on desktop, while full width with spacing-100 from the sides on mobile.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Keep toast text under 90 characters so it stays brief and scannable.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't pack long messages or multiple actions into a toast; use a Dialog instead.</cdx-demo-best-practice>
</cdx-demo-best-practices>

### Toast type

Depending on the feedback conveyed to the user, the toasts can be categorized as follows:
- **Notice** — General feedback; default 'infoFilled' icon (customizable).
- **Success** — Completed action; 'success' icon.
- **Error** — Action failed; strongest priority; 'error' icon.
- **Warning** — Caution or potential issue; 'alert' icon.

### Action, dismiss, and auto-dismiss

### Action and close button

It is optional for toasts on desktop and tablet to contain an action button and a close button. Toasts can be dismissed by utilizing the close button within the message. Mobile toasts may only contain an action button and do not include a close button, instead it is possible to dismiss the toast by swiping left or right.

Toasts can be also auto-dismissable. This means they will automatically disappear after 4 seconds by default.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Add an action button or close button when the user may need to act or dismiss.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use auto-dismiss for short confirmations (e.g. 4 seconds default) so the toast doesn't stay on screen.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't rely only on auto-dismiss when the user might need to act (e.g. Undo); provide an action button and allow user dismiss.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Basic toast

A simple toast notification that appears at the bottom center of the screen.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<ToastBasic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toast/examples/ToastBasic.vue [NPM]

<<< @/../component-demos/toast/examples-mw/ToastBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With action button

Toasts can include an optional action button to allow users to take immediate action.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<ToastWithAction />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toast/examples/ToastWithAction.vue [NPM]

<<< @/../component-demos/toast/examples-mw/ToastWithAction.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Auto-dismiss

Toasts automatically disappear after a period of time. By default, they dismiss after 4 seconds, but this can be customized. Hovering over a toast pauses the auto-dismiss timer.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<ToastAutoDismiss />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toast/examples/ToastAutoDismiss.vue [NPM]

<<< @/../component-demos/toast/examples-mw/ToastAutoDismiss.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Stacked toasts

Multiple toasts are managed through a shared stack rendered by `<cdx-toast-container />`. You can trigger toasts either **declaratively** with `<cdx-toast>` or **programmatically** with `useToast()`; both feed into the same queue and are displayed one-by-one.

#### Toasts with `<cdx-toast>`

This example shows two inline `<cdx-toast>` components with separate state. Each enqueues into the shared stack; the container displays them one-by-one.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<ToastStacked />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toast/examples/ToastStacked.vue [NPM]

<<< @/../component-demos/toast/examples-mw/ToastStacked.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Toasts with useToast()

This example shows triggering toasts with the `useToast()` composable (same container as above).

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<ToastContainerExample />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toast/examples/ToastContainerExample.vue [NPM]

<<< @/../component-demos/toast/examples-mw/ToastContainerExample.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

To use toasts in your app, follow these steps:

1. **Mount a single ToastContainer** — Add `<cdx-toast-container />` once in your root layout or App (e.g. next to your main content). It will teleport to `body` by default; you can change the target either by:
   - passing a `target` prop, e.g. `<cdx-toast-container target="#my-target" />`, or
   - providing a `CdxTeleportTarget`, e.g. `provide('CdxTeleportTarget', '#my-target')`.

   Both `<cdx-toast>` and `useToast()` rely on this container to render the shared toast stack.

2. **Choose how to trigger toasts** — You can either show toasts **programmatically** with `useToast()` or **declaratively** with a single `<cdx-toast>`:

#### Programmatic toast: useToast()

Show toasts from anywhere (e.g. after API calls) with the useToast() composable:

- **`show( options )`** — Requires `message` (plain text; use declarative toast for rich content). Options: `type`, `actionButton` (`{ label, onClick }`), `preventUserDismiss`, `autoDismiss` (boolean or ms), `onUserDismissed`, `onAutoDismissed`. Returns toast ID.
- **`success( message, opts? )`**, **`error`**, **`info`**, **`warning`** — Convenience methods; second arg = same options as `show` (except `message` and `type`).
- **`dismiss( id )`** — Remove by ID. **`clear()`** — Remove all.

Example:

```vue
<template>
  <cdx-button @click="handleSave">Save</cdx-button>
</template>

<script setup>
import { CdxButton, useToast } from '@wikimedia/codex';

const toast = useToast();

function handleSave() {
  // After a successful save:
  toast.success( 'Article published successfully', { autoDismiss: 4000 } );
}
</script>
```

#### Declarative Toast: CdxToast

Use `<cdx-toast>` in templates for simple cases. The default slot is teleported into the container, so you can put links, components, or formatted text in the slot.

- **Unmounting:** Keep the component mounted until the toast is dismissed; then unmount on `@user-dismissed` and `@auto-dismissed` (e.g. `@user-dismissed="showToast = false"`).
- Declarative and programmatic toasts share the same queue. For many toasts, prefer `useToast()` so logic stays in one place.

Example:

```vue
<template>
  <div>
    <cdx-button @click="showToast = true">Show toast</cdx-button>
    <cdx-toast-container />
    <cdx-toast
      v-if="showToast"
      type="success"
      :auto-dismiss="true"
      @user-dismissed="showToast = false"
      @auto-dismissed="showToast = false"
    >
      Article published. <a href="#">View article</a>
    </cdx-toast>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CdxButton, CdxToast, CdxToastContainer } from '@wikimedia/codex';

const showToast = ref( false );
</script>
```

#### Standalone mode

If you can't mount `<cdx-toast-container />`, set `standalone` on `<cdx-toast>`. The toast then renders (and teleports or uses `renderInPlace`) itself. Teleport target order: `target` prop → provided `CdxTeleportTarget` → `body`. Use `renderInPlace` to disable teleport. **Drawbacks:** standalone toasts do not use the shared queue, so multiple toasts can show at once and overlap instead of appearing one-by-one; there is no unified stack, so layout and coordination (e.g. touch-pause) are limited. Prefer the container + stack for normal usage.

#### Dismiss and auto-dismiss

- **`preventUserDismiss`** — When `false` (default), show dismiss button on desktop/tablet and allow swipe to dismiss on mobile. Set to `true` to prevent user dismissal.
- **`autoDismiss`** — `true` for 4s default, or a number (ms). `false` to disable.
- Hover pauses the timer; swipe on one toast pauses others' timers until release.
- **Events** — `user-dismissed` and `auto-dismissed` fire after the leave transition; unmount the toast then.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Mount a single cdx-toast-container and use either cdx-toast or useToast() to show toasts; both use the same queue.</cdx-demo-best-practice>
<cdx-demo-best-practice>For multiple toasts from different parts of the app, prefer useToast() so toast logic stays in one place.</cdx-demo-best-practice>
<cdx-demo-best-practice>When using declarative cdx-toast with the shared stack, unmount it on dismiss (e.g. @user-dismissed and @auto-dismissed).</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't mount more than one ToastContainer in your app; only the first will render toasts.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use the standalone prop for normal app usage; it's an escape hatch when you can't mount a cdx-toast-container.</cdx-demo-best-practice>
</cdx-demo-best-practices>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | The focus is placed in the next interactive element. |
| <kbd>Enter</kbd> | If the focus is placed in any of the Toast buttons, it activates the button. |
| <kbd>Esc</kbd> | Dismisses the Toast when focused. |

### Mobile interaction

On mobile devices, toasts can be dismissed by swiping left or right. The close button is not shown on mobile to provide a cleaner interface.
