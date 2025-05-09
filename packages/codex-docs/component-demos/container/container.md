<script setup>
import { CdxContainer } from '@wikimedia/codex';
import { CdxImage } from '@wikimedia/codex';
</script>

A Container is a flexible layout wrapper that adapts across the different breakpoints and
screen sizes.

## Overview

### When to use Container

A Container helps to structure content, maintain visual alignment, and adapt layouts at different
breakpoints. Any type of content can be included within a container, including other
nested containers.

**Use the Container component when:**
- Content must be wrapped so it remains fluid and maintains a consistent width across different
  screen sizes.
- Components or groups of elements should adapt fluidly according to predefined screen
  size constraints.
- A specific page section should not exceed a certain width (e.g. an article’s content).
- Content should expand to full width at a specified breakpoint, ensuring a user-friendly,
  consistent experience on smaller screens.

**Avoid using Container when:**
- The components or elements need to remain the same width in all screen sizes, like a pop-up panel
  or menus.
- The components require absolute positioning outside main layout, such as Dialog, Tooltip, or
  Popups menus.
- The components features a maximum width smaller than the smallest supported mobile screen, such
  as Tooltip.
- The icon-only components where the container’s constraints are unnecessary, such as icons,
  MenuButton or icon-only Button.

### About Container
The wrapper is the only element of the Container. It serves as a flexible area where any type of
content can be placed.

<cdx-demo-best-practices>
	<cdx-demo-best-practice>Always define a `max-width` that aligns with your content’s nature.
	</cdx-demo-best-practice>
	<cdx-demo-best-practice type="dont">Don't apply `padding` and `margin` directly to
	the Container. Instead, add them to the content or nested components inside it whenever
	possible.
	</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples
A container can hold any type of content, such as text, images, forms, or group of elements. It also
supports nesting other containers, enabling the creation of complex and flexible layouts.

## Technical implementation

### Vue usage
