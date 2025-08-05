<script setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconDownload } from '@wikimedia/codex-icons';
import ButtonTypes from '@/../component-demos/button/examples/ButtonTypes.vue';
import ButtonWithIcon from '@/../component-demos/button/examples/ButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/button/examples/IconOnlyButton.vue';
import ButtonGroupWithIcons from '@/../component-demos/button-group/examples/ButtonGroupWithIcons.vue';
import GroupOfButtons from '@/../component-demos/button/examples/GroupOfButtons.vue';
import ButtonHierarchy from '@/../component-demos/button/examples/ButtonHierarchy.vue';
import MultiStepButtons from '@/../component-demos/button/examples/MultiStepButtons.vue';
import ButtonsAndLinks from '@/../component-demos/button/examples/ButtonsAndLinks.vue';
import FieldWithDisabledAction from '@/../component-demos/field/examples/FieldWithDisabledAction.vue';

</script>

# Using links and buttons

An overarching guide for when to use links, buttons, and groups of both.

## Links versus buttons

Use a [Link](../components/mixins/link.md) when navigating to a different resource or section on the same page, and use a [Button](../components/demos/button.md) to perform an action.

Making the difference between Links and Buttons is important to help inform the user of an expected interaction, especially for keyboard and screen reader users. **A Button should not be styled as a Link and a Link should not be styled as a Button.**

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">

Avoid styling an anchor `<a>` element as a button and instead use a Codex [Button](../components/demos/button.md).

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid styling a `<button>` element as a link and instead use a Codex [Link](../components/mixins/link.md).

</cdx-demo-best-practice>
</cdx-demo-best-practices>

There are, however, exceptions to this guidance, where the visual style is absolutely necessary to emphasize a link. In such cases, such as “Donate” or “Register” actions which link to another page, [use these guidelines](../components/demos/button.md#link-buttons-and-other-elements) to implement a Link which visually appears as a Button, but is semantically a different type of element.

::: tip Accessibility note
Links can be activated using only the <kbd>Enter</kbd> or <kbd>Return</kbd> key, while Buttons can be activated using both the <kbd>Enter</kbd> or <kbd>Return</kbd> key as well as the <kbd>Space</kbd> key.
:::

## Group of links and buttons

Links and Buttons can be used in the same group next to one another.

**Be conscious of the fact that quiet progressive Buttons can look similar to Links, so avoid using them next to each other.**

### Spacing

A Button next to a Link or another Button should have `@spacing-75` (equivalent to 12px in the default Codex theme) as the default [spacing token](../design-tokens/spacing.md). Links next to Links should also have `@spacing-75` as the default spacing token.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<buttons-and-links />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/ButtonsAndLinks.vue [NPM]

<<< @/../component-demos/button/examples-mw/ButtonsAndLinks.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Links

Use Link to provide users with a clickable element to navigate to other pages or to other sections of the same page (such as citations and other wiki pages).

Avoid using Link to perform an action (such as “hide” or "edit" when using VisualEditor). In the case of an action that appears as a button, but loads a different page, a link should still be used (such as “edit” when *not* using VisualEditor).

**Links are not underlined by default.**
- By default, links are only underlined when they are hovered over or pressed.
- In MediaWiki, to suit user preferences and for accessibility reasons, having links underlined by default can be enabled within Preferences > Appearance > Advanced options.

**Links are used as text only.**
- An exception to this is a Link that opens in a new tab or window, such as the [External links](https://en.wikipedia.org/wiki/Wikipedia#External_links) at the bottom of a Wikipedia article. These external links must use the external link icon, `cdxIconLinkExternal`, in addition to the text to denote a destination outside of the current domain.
- Links should not be icons alone.

**Link font styling can be changed as needed.**

- Any of the Codex font size tokens can be used.
- Fonts should remain the size of the surrounding text when a part of other content.
- Use the Regular weight by default for Links.
- Links may be Bold or Italic when a part of surrounding text where that text is also Bold or Italic or when they need to be emphasized apart from default Links, such as in examples provided on the [main page](https://en.wikipedia.org/wiki/Main_Page) of Wikipedia.

### Base Link

Use [base Links](../components/mixins/link.md#base-link) (blue) as the default Link type.

### Red Link

Use [red Links](../components/mixins/link.md#red-link) only to represent wiki pages that do not exist yet.

## Group of links

When Link content is related, it's advisable to combine them into a group. A group of Links can include any number of Links.

### Spacing

Use `@spacing-75` as the default spacing token between Links in a group, both horizontal and vertical (stacked).

Group of multiple links can be presented in various ways:

1. As a single vertical column, such as the Table of Contents on an [article page](https://en.wikipedia.org/wiki/Wikipedia).

2. When there are too many links, they can be organized into different columns, such as the link groups within the languages panel on [wikipedia.org](https://www.wikipedia.org/).

3. As a horizontal line, such as the footer links on an [article page](https://en.wikipedia.org/wiki/Wikipedia).

## Buttons

Use Button when you want to trigger an action.

Avoid using Button to navigate the user to a new page. In such case, use a Link instead.

### Type of action

A Button can convey one of three `action` types.

1. **Neutral**<br>Use for neutral or secondary actions.
2. **Progressive**<br>Use for main actions or actions that lead to the next step in a process.
3. **Destructive**<br>Use only for actions that cannot be undone.

### Type of weight

A Button can convey one of three `weight` types.

1. **Primary**<br>Use for main actions.
2. **Normal**<br>Use for secondary actions.
3. **Quiet**<br>Use for tertiary actions or when you want to avoid distracting from the content.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button-types />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/ButtonTypes.vue [NPM]

<<< @/../component-demos/button/examples-mw/ButtonTypes.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icon

Use an icon with the button label when you need to convey meaning through both textual and visual elements.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/ButtonWithIcon.vue [NPM]

<<< @/../component-demos/button/examples-mw/ButtonWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon-only button

Use an icon-only button for actions that can be universally recognized through the icon alone. For an icon-only Button, the label is visually hidden but available to assistive technology users.

<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-only-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/IconOnlyButton.vue [NPM]

<<< @/../component-demos/button/examples-mw/IconOnlyButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Disabled button

Buttons may be disabled, but disabled buttons should be used sparingly.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use disabled Buttons only when one input or interaction will enable the Button.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using disabled Buttons at the end of a form with multiple fields. Instead, use inline validation to inform of what might be incomplete or incorrect.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-disabled-action />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithDisabledAction.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithDisabledAction.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Group of buttons

A group of Buttons usually includes 2 to 3 Buttons. When more actions are needed in a group of Buttons, use a [MenuButton](../components/demos/menu-button.md), which triggers a menu with any additional actions.

Buttons should be combined in a group when they relate to the same affected general element, such as footer actions within a Dialog and actions at the end of a form or the top of a Table.

<cdx-demo-wrapper>
<template v-slot:demo>
	<group-of-buttons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/GroupOfButtons.vue [NPM]

<<< @/../component-demos/button/examples-mw/GroupOfButtons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

When actions are direct siblings of one another, affecting a more focused element, a [ButtonGroup](../components/demos/button-group.md) should be used. An example of this is a set of actions to “Edit”, "Discuss", mark "Done", “Download”, or “Delete” the same element.

<cdx-demo-wrapper>
<template v-slot:demo>
    <button-group-with-icons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button-group/examples/ButtonGroupWithIcons.vue [NPM]

<<< @/../component-demos/button-group/examples-mw/ButtonGroupWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Spacing

Use `@spacing-75` as the default spacing token between Buttons in a group, both horizontal and vertical (stacked). This spacing guidance does not pertain to [ButtonGroup](../components/demos/button-group.md) or [ToggleButtonGroup](../components/demos/toggle-button-group.md).

### Types and Order of Buttons

Using the right action, weight, and order of Buttons is important to help users understand the different actions they can take.

#### Hierarchy

1. **Primary actions** should be represented by a primary progressive Button. Use only one primary progressive Button in a group of Buttons.
2. **Secondary actions** can accompany the primary progressive Button as normal Buttons.
3. **Tertiary actions** are less important or less used actions should appear as quiet Buttons.

<cdx-demo-best-practices>

<cdx-demo-best-practice>A group of Buttons can include any combination of these levels. For example, for a group with a primary action and a less important tertiary action, use a primary progressive Button and a quiet Button. A group with no primary action will only have normal and quiet Buttons.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using only a progressive and destructive action together, without a neutral action, to prevent the user from having to make a polarizing, permanent decision.</cdx-demo-best-practice>
<cdx-demo-best-practice>When using a destructive Button, keep in mind that the color outweighs progressive and neutral colors (in the default Codex theme).</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<button-hierarchy />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/ButtonHierarchy.vue [NPM]

<<< @/../component-demos/button/examples-mw/ButtonHierarchy.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Order

<cdx-demo-best-practices>

<cdx-demo-best-practice>When stacking buttons (typically on smaller viewports), place the most important Button at the top.</cdx-demo-best-practice>
<cdx-demo-best-practice>Maintain the same order for a stacked group of Buttons in both left-to-right (LTR) and right-to-left (RTL) reading directions.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid placing a destructive Button next to a progressive Button. Instead, consider separating them to opposite sides of the container or using a neutral Button for one of the actions.</cdx-demo-best-practice>

</cdx-demo-best-practices>

::: info
The order of a stacking group of Buttons does not change with bidirectionality.
:::

### Forward moving processes (forms, Dialogs, etc.)

<cdx-demo-best-practices>

<cdx-demo-best-practice>When a group of buttons is part of a flow, place the most important Button at the end.</cdx-demo-best-practice>
<cdx-demo-best-practice>Buttons in the footer of a form, whether single step or multi-step should be aligned to the leftmost edge of the overall container for LTR and the rightmost edge of the overall container for RTL.</cdx-demo-best-practice>
<cdx-demo-best-practice>Buttons in the footer of a Dialog, whether single step or multi-step should be aligned to the rightmost edge of the overall container for LTR and the leftmost edge of the overall container for RTL.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Multi-step

For multi-step processes, align a back Button next to the forward Button. The back Button should be of less visual hierarchy than the forward Button. Usually it comes second in the hierarchy. For example, “Next” is set as a progressive primary Button on the right for LTR or the left for RTL, next to that would be “Previous” set as a neutral normal Button, and next to that might be a tertiary action set as a neutral quiet Button (such as “Skip”). In Dialogs, the "Skip" action may also be in the header.

<cdx-demo-wrapper>
<template v-slot:demo>
	<multi-step-buttons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/MultiStepButtons.vue [NPM]

<<< @/../component-demos/button/examples-mw/MultiStepButtons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
	@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

	.cdx-demo-wrapper {
		:deep( .cdx-demo-group-buttons ) {
			display: flex;
			flex-direction: row;
			gap: @spacing-75;
		}
	}
</style>
