# Content overflow

An overarching guide for managing text and element content overflow in layouts.

## Types of content overflow

Content overflow occurs when the content within a component or element exceeds the designated space. This overflow can include:
1. **Text overflow:** When lengthy text exceeds the available space within a component, such as lengthy text within a button.
2. **Element overflow:** When all elements within a component are not visible due to space constraints, such as items requiring scrolling within a container.

To address the challenges posed by content overflow, we can use the following solutions:
- Wrap text or content onto multiple lines.
- Use an ellipsis to truncate overlong text.
- Implement a fade effect to indicate that content can be scrolled to reveal additional information.

<div class="cdx-docs-example">

![A mix of elements: Tabs using an ellipsis on one of the tabs and fade to indicate scroll in the rest of tabs, a paragraph, and a group of accordions, one with a long label wrapped.](../assets/design-principles/content-overflow/content-overflow-types.svg)

</div>

## Wrapping

Content wrapping involves allowing text or elements to overflow onto multiple lines. It is suitable for components where the height is not fixed or where vertical expansion is acceptable.

<cdx-demo-rules>

<template #do-media>

![A group of accordions: one accordion has a label wrapping onto two lines.](../assets/design-principles/content-overflow/content-overflow-wrapping-do.svg)

</template>

<template #do-text>

- Use wrapping as the base solution to content overflow, enabling text to extend onto multiple lines when it doesn’t affect the fixed height of the component.

</template>

<template #dont-media>

![A collection of form items where the Select component appears taller than the other elements due to inappropriate text wrapping.](../assets/design-principles/content-overflow/content-overflow-wrapping-dont.svg)

</template>

<template #dont-text>

- Use wrapping in elements where uniformity in height is crucial.

</template>

</cdx-demo-rules>

## Truncation with ellipses

Ellipses truncation can condense text in cases where the text becomes longer than expected.

<cdx-demo-rules>

<template #do-media>

![A Select component with its label truncated by an ellipsis.](../assets/design-principles/content-overflow/content-overflow-ellipsis-do.svg)

</template>

<template #do-text>

- Use an ellipsis to maintain consistency when component height is essential.
- Use an ellipsis to prevent disparities in the heights of element groups, such as a collection of chips or a group of buttons.
- Include tooltip support for truncated text, enabling users to access full content as needed.

</template>

<template #dont-media>

![An article title wrongly truncated by an ellipsis.](../assets/design-principles/content-overflow/content-overflow-ellipsis-dont.svg)

</template>

<template #dont-text>

- Use an ellipsis in elements where uniformity in height is not crucial.

</template>

</cdx-demo-rules>

### Optional ellipses truncation

Ellipses truncation can also be used to optionally customize the number of lines for lengthy descriptions in specific components, like [Card](../components/demos/card.md) or [Menu](../components/demos/menu.md). In such cases, tooltips are unnecessary for displaying the entire description, as they are primarily used to display the label's content.

<div class="cdx-docs-example">

![Two cards with ellipsis truncation when the description is longer than three lines.](../assets/design-principles/content-overflow/content-overflow-customizable-ellipsis.svg)

</div>

### Bidirectionality for ellipses truncation

In left-to-right (LTR) languages, the ellipsis typically appears on the right side of the truncated text. In right-to-left (RTL) languages, such as Arabic or Hebrew, the ellipsis is typically situated on the left side, aligning with the natural flow of reading.

Refer to the [Bidirectionality guidelines](./bidirectionality.md) for more information about handling LTR and RTL behaviors.

<div class="cdx-docs-grid cdx-docs-grid-columns-2">
    <img src="../assets/design-principles/content-overflow/content-overflow-ellipsis-LTR.svg" alt="A Button with lengthy text in left-to-right (LTR) direction, truncating its label with an ellipsis.">
    <img src="../assets/design-principles/content-overflow/content-overflow-ellipsis-RTL.svg" alt="A Button with lengthy text in right-to-left (RTL) direction, truncating its label with an ellipsis.">
</div>

## Truncation with fade

Fade effects can be used as visual indicators of scroll within a group of elements, and they should not be used to indicate text truncation.

<cdx-demo-rules>

<template #do-media>

![Tabs using a fade effect to indicate that there is a scroll to reveal the rest of the tabs.](../assets/design-principles/content-overflow/content-overflow-fade-do.svg)

</template>

<template #do-text>

- Reserve fade effects to indicate that a group of elements can be scrolled.

</template>

<template #dont-media>

![A Popup using a fade effect for truncating the long text.](../assets/design-principles/content-overflow/content-overflow-fade-dont.svg)

</template>

<template #dont-text>

- Use fade effects for truncating text. Instead, use an ellipsis for text truncation.

</template>

</cdx-demo-rules>