<script setup>
import DialogBasic from '@/../component-demos/dialog/examples/DialogBasic.vue';
import ConfigurableDialog from '@/../component-demos/dialog/examples/ConfigurableDialog.vue';
import DialogWithSelect from '@/../component-demos/dialog/examples/DialogWithSelect.vue';
import DialogMaxContent from '@/../component-demos/dialog/examples/DialogMaxContent.vue';
import DialogStackedActions from '@/../component-demos/dialog/examples/DialogStackedActions.vue';
</script>

## Demos

### Configurable Dialog
<cdx-demo-wrapper>
<template v-slot:demo>
<configurable-dialog />
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
section will scroll while the dialog header and footer will remain in view.
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

<style lang="less" scoped>
/* stylelint-disable selector-class-pattern */
:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog h2 ) {
	margin: unset;
	border: unset;
	padding: unset;
	font-family: unset;
	font-size: unset;
	font-weight: unset;
	letter-spacing: initial;
	line-height: unset;
}

:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog p:first-child ) {
	margin-top: unset;
}

:deep( .cdx-demo-wrapper__demo-pane .cdx-dialog p:last-child ) {
	margin-bottom: unset;
}
/* stylelint-enable selector-class-pattern */
</style>