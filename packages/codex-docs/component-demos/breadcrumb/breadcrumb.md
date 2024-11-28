<script setup>
import { CdxBreadcrumb } from '@wikimedia/codex';

const items = [
    { text: 'Home', href: '/', active: false },
    { text: 'Components', href: '/components/overview.html', active: false },
    { text: 'Breadcrumb', active: true },
];

const controlsConfig = [
  { name: 'maxVisible', type: 'text', label: 'maxVisible', default: 3 },
  { name: 'truncateLength', type: 'text', label: 'Truncate Length', default: 10 },
];

</script>

A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order.

## Guidelines

### When to use breadcrumbs

Breadcrumbs are used to provide a clear navigation path within a hierarchical structure, showing the user's current location and allowing easy navigation to parent or sibling sections.

- Use breadcrumbs to display where the user is within a hierarchy by showing a structured navigation path within the hierarchy.

Avoid using breadcrumbs for single-level navigation or flat structures. If a navigation menu alone suffices for the structure, breadcrumbs may not be necessary.

### Specifications
![Specification of Breadcrumb.](../../assets/components/breadcrumb-specifications.svg)

Breadcrumb may contain the following items:
1. **Previous page**<br>A clickable link representing a previously visited page in the hierarchy.
2. **Separator**<br>A visual divider (e.g., › or similar icon) separating breadcrumb items.
3. **Current page**<br>The last item in the breadcrumb trail representing the current page; it is non-clickable.
4. **Overflow separator**<br>A placeholder (e.g., …) representing items that are collapsed into an overflow menu for space constraints.
5. **Overflow menu**<br>A dropdown containing links to hidden breadcrumb items that appear when the overflow separator is clicked.

#### Component limitations

Breadcrumbs will occupy the full width of the area assigned to them in a layout. They will occupy only horizontal space, and not wrap to the next line or beyond the width of the page.

If the amount of pages within the breadcrumbs exceeds the horizontal space allowed, a MenuButton will appear as the first item and contain any overflow pages within its menu. Pages will overflow into the menu from first to most current, keeping the most recent pages visible in the Breadcrumbs until a minimum of two are present.

Breadcrumbs can be as short as two pages, including the current page. Each page name itself should be a minimum of 5 characters before truncating with an ellipsis, as described in [Content overflow guidelines](../../style-guide/content-overflow.md). The last page name to use ellipses truncation should be the current page.

### Best practices

Consider the following recommendations when using breadcrumbs.

#### Alignment

<cdx-demo-rules>

<template #do-media>

![Breadcrumbs aligned to the start of the page.](../../assets/components/breadcrumbs-best-practices-alignment-do.svg)

</template>

<template #do-text>

- Align breadcrumbs to the start of the page with the content.

</template>

<template #dont-media>

![Breadcrumbs center-aligned on the page.](../../assets/components/breadcrumbs-best-practices-alignment-dont.svg)

</template>

<template #dont-text>

- Avoid center-aligning breadcrumbs as it disrupts alignment with the content.

</template>

</cdx-demo-rules>

#### Placement

<cdx-demo-rules>

<template #do-media>

![Breadcrumbs correctly positioned above the content, following the page hierarchy.](../../assets/components/breadcrumbs-best-practices-placement-do.svg)

</template>

<template #do-text>

- Place breadcrumbs above the content and below the main navigation.
- Ensure breadcrumbs follow the logical page hierarchy.

</template>

<template #dont-media>

![Breadcrumbs incorrectly positioned, disrupting page structure.](../../assets/components/breadcrumbs-best-practices-placement-dont.svg)

</template>

<template #dont-text>

- Avoid placing breadcrumbs in non-standard locations.
- Do not position breadcrumbs in a way that disrupts the visual or structural flow of the page.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key                               | Function                                                                                                                                                                             |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <kbd>Tab</kbd>                    | Moves the focus to the next breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the last button of the group.     |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the previous breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the last button of the group. |

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
  <template v-slot:demo="{ propValues }">
    <cdx-breadcrumb :items="items" :max-visible="propValues.maxVisible" :truncate-length="propValues.truncateLength" />
  </template>
</cdx-demo-wrapper>

## Vue usage
