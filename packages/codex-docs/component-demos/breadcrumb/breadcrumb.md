<script setup>
import { CdxBreadcrumb } from '@wikimedia/codex';
import BreadcrumbBasic from '@/../component-demos/breadcrumb/examples/BreadcrumbBasic.vue';
import BreadcrumbOverflow from '@/../component-demos/breadcrumb/examples/BreadcrumbOverflow.vue';

const items = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components/overview.html' },
    { label: 'Breadcrumb', url: '' }
];

const controlsConfig = [
  { name: 'maxVisible', type: 'text', label: 'maxVisible', default: 3 },
  { name: 'truncateLength', type: 'text', label: 'Truncate Length', default: 10 },
];

</script>

Breadcrumb is a list of links to the parent pages of the current page in hierarchical order.

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
  	<template v-slot:demo="{ propValues }">
		<cdx-breadcrumb
			:items="items"
			:max-visible="propValues.maxVisible"
			:truncate-length="propValues.truncateLength"
		/>
  	</template>
</cdx-demo-wrapper>

## Overview

### When to use Breadcrumb

Breadcrumbs are used to provide a clear navigation path within a hierarchical structure, showing the user's current location and allowing easy navigation to parent or sibling sections.

Use Breadcrumb to display where the user is within a hierarchy by showing a structured navigation path within the hierarchy.

Avoid using Breadcrumb for single-level navigation or flat structures. If a navigation menu alone suffices for the structure, a breadcrumb trail may not be necessary.

### About Breadcrumb

Breadcrumb contains the following elements.

#### Breadcrumb items

Each visible item in the trail will be displayed as a link. The current page is displayed last in
bold text. Items should appear in order from top level to the current page.

#### Overflow menu

If there are more breadcrumb items than the visible item limit, the rest of the items will be
displayed in a MenuButton.


## Examples

### Basic usage

<cdx-demo-best-practices>

<cdx-demo-best-practice>Align breadcrumbs to the start of the page, above the content and below the main navigation.</cdx-demo-best-practice>
<cdx-demo-best-practice>Ensure breadcrumbs follow the logical page hierarchy.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<breadcrumb-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/breadcrumb/examples/BreadcrumbBasic.vue [NPM]

<<< @/../component-demos/breadcrumb/examples-mw/BreadcrumbBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With overflow menu

<cdx-demo-best-practices>

<cdx-demo-best-practice>Limit visible items to ensure breadcrumbs display on a single line.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<breadcrumb-overflow />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/breadcrumb/examples/BreadcrumbOverflow.vue [NPM]

<<< @/../component-demos/breadcrumb/examples-mw/BreadcrumbOverflow.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

### Keyboard navigation

| Key | Function |
|---|---|
| <kbd>Tab</kbd> | Moves the focus to the next breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the last link in the group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the previous breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the first link in the group. |
