<script setup>
import { CdxButton, CdxAccordion } from '@wikimedia/codex';
import ButtonTypes from '@/../component-demos/button/examples/ButtonTypes.vue';
import ButtonWithIcon from '@/../component-demos/button/examples/ButtonWithIcon.vue';
import QuietButtonWithIcon from '@/../component-demos/button/examples/QuietButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/button/examples/IconOnlyButton.vue';
import QuietIconOnlyButton from '@/../component-demos/button/examples/QuietIconOnlyButton.vue';
import ButtonSizes from '@/../component-demos/button/examples/ButtonSizes.vue';

const controlsConfig = [
	{
		name: 'action',
		type: 'radio',
		options: [ 'default', 'progressive', 'destructive' ],
	},
	{
		name: 'weight',
		type: 'radio',
		options: [ 'normal', 'primary', 'quiet' ],
	},
	{
		name: 'size',
		type: 'radio',
		options: [ 'medium', 'large' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Click me'
	}
];
</script>

A Button triggers an action when the user clicks or taps on it.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-button v-bind="propValues">
		{{ slotValues.default }}
	</cdx-button>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Button

Use the Button component when you want to trigger an action or toggle something in the user's
current context.

Avoid using Button when:
- The action is to navigate the user to a new resource, which would take them away from the current
context. In such cases, consider [Link](../mixins/link.md) instead. Learn more about [using links and buttons](../../style-guide/using-links-and-buttons.html).
- You need to represent state-persistent user actions. In this case, use
[ToggleButton](./toggle-button.md) instead.

### About Button

Button includes the following elements.

#### Label

Button labels should be as short as possible, with text that clearly states what action follows clicking the button (e.g. download, submit form, search).

Buttons labels should ideally be fewer than 38 characters in English, as translations average 42 characters. Logographic and Arabic-script languages are generally shorter, while Romance, some Germanic, Slavic, Austronesian, and others like Greek and Finnish tend to be longer, averaging 45–53 characters.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use descriptive, accessible verbs to encourage action. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Write in sentence case, capitalizing only the first word. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent)

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Answer direct questions in titles or body copy using the same terminology. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid using similar words for different actions. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid verbs that imply visual or sensory abilities such as "see", or are idiomatic or vague. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Icon (optional)

Icons simplify user recognition and provide the ability to shorten Button labels to a minimum. When the Button includes a label, the icon is optional and should be used to add a clear visual reinforcement to the label. If the Button is icon-only, it should use a universally recognizable icon, such as the “edit” action.

<cdx-demo-best-practice>Ensure that icons used in buttons are relevant and easily recognizable.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using icons that are difficult to recognize or do not clearly convey their purpose.</cdx-demo-best-practice>

## Examples

### Button types

#### Button action

A Button can convey one of three `action` types.

1. **Neutral**<br>Use neutral buttons for actions that are neutral or secondary in importance.
2. **Progressive**<br>Use progressive buttons for actions that lead to the next step in the process.
3. **Destructive**<br>Reserve destructive buttons for actions that involve removal or limitation, such as deleting a page or blocking a user. Avoid using them for actions like cancel buttons.

#### Button weight

A Button can convey one of three `weight` types.

1. **Normal**<br>When designing a project, normal buttons are the default choice.
2. **Primary**<br>Primary buttons signal the main action in a given view – a page or a dialog. As they
should guide the user to the most important action (“call to action”), there should only be one
primary button per view.
3. **Quiet**<br>Use quiet buttons for an easily recognizable action that does not detract focus from the content.
For example, the icon-only edit buttons alongside sections in an article on mobile
Wikipedia.

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

::: warning
Due to the lack of descriptive text, icon-only buttons require one of the following attributes: `aria-label` or `aria-hidden`.

The attribute `aria-label` has to be used on icon-only buttons to be understandable by assistive technology users. Exceptions are buttons in component combinations, e.g. the button in the [Combobox component](./combobox), that are skipped by adding `aria-hidden` without negatively impacting the component's functionality.
:::

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

<cdx-demo-best-practice>Use disabled Buttons when they are related to a single input, therefore implying what must be completed to enable the Button.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using disabled Buttons to prevent a user from attmepting to continue forward. Instead, rely on providing validation as a response to what might be incomplete or incorrect.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button" disabled>Disabled button</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button" disabled>Disabled button</button>
```

</template>
</cdx-demo-wrapper>

### Button sizes

Buttons can be medium or large `size`.

Most Buttons should use the medium size. The large size is intended only for accessibility purposes,
such as making icon-only Buttons larger on touchscreens to increase the touch area.

By default, the width of a Button with text is determined by the width of the text until reaching a max-width. However, on mobile, Buttons should span the full-width of the container, except for icon-only Buttons, which will maintain their fixed square proportions.

<cdx-demo-wrapper :allow-table-styles="true">
<template v-slot:demo>
	<button-sizes />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/ButtonSizes.vue [NPM]

<<< @/../component-demos/button/examples-mw/ButtonSizes.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

Set `min-width` manually on Buttons with extremely short labels
Non-icon-only Buttons with text labels of only 1-2 characters in length may fall
below size of the target area described above. If you are dealing with
non-icon-only Buttons with extremely short labels, it is recommended to set a
minimum width of: `@min-size-interactive-pointer` in your own CSS.

</cdx-accordion>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

The CSS Button component uses the `<button>` element and the `.cdx-button` class.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button">Click me</button>
</template>
<template v-slot:code>

```html
<!-- Button element with CSS class(es). -->
<button class="cdx-button">Click me</button>
```

</template>
</cdx-demo-wrapper>

#### Button actions

There are three Button actions: default, progressive, and destructive. Use the following classes to
apply these actions:
- Default: `cdx-button--action-default` (class can be omitted since this is the default)
- Progressive: `cdx-button--action-progressive`
- Destructive: `cdx-button--action-destructive`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<button class="cdx-button cdx-button--action-default">Default button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-destructive">Destructive button</button>
	</div>
</template>
<template v-slot:code>

```html
	<div>
		<button class="cdx-button cdx-button--action-default">Default button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-destructive">Destructive button</button>
	</div>
```

</template>
</cdx-demo-wrapper>

#### Button weights

There are three Button weights: normal, primary, and quiet. Use the following classes to
apply these actions:
- Normal: `cdx-button--weight-normal` (class can be omitted since this is the default)
- Primary: `cdx-button--weight-primary`
- Quiet: `cdx-button--weight-quiet`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Normal progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive cdx-button--weight-primary">Primary progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive cdx-button--weight-quiet">Quiet progressive button</button>
	</div>
</template>
<template v-slot:code>

```html
<div>
	<button class="cdx-button cdx-button--action-progressive">Progressive normal button</button>
</div>
<div>
	<button class="cdx-button cdx-button--action-progressive cdx-button--weight-primary">Progressive primary button</button>
</div>
<div>
	<button class="cdx-button cdx-button--action-progressive cdx-button--weight-quiet">Progressive quiet button</button>
</div>
```

</template>
</cdx-demo-wrapper>

#### Disabled

Add the `disabled` attribute to the `<button>` element to get a disabled element with appropriate
styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button" disabled>Disabled button</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button" disabled>Disabled button</button>
```

</template>
</cdx-demo-wrapper>

#### With CSS icon

You can use [CSS icons](./icon.md#css-only-version) within button content. To set up an icon within
a CSS-only button, do the following.

1. Add an empty span inside the button before the label with the class `cdx-button__icon`.
2. Use the `.cdx-mixin-css-icon()` mixin with the `@param-is-button-icon` parameter set to `true`.

Note that in Firefox version 52 and below, full color support for icons inside CSS-only buttons is
not available, and the icon will fall back to a single color.

:::warning
Be sure to add `aria-hidden="true"` to the icon element to hide it from assistive technology.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button">
		<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous" aria-hidden="true"></span>
		Go back
	</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button">
	<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous" aria-hidden="true"></span>
	Go back
</button>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

:::

</template>
</cdx-demo-wrapper>

#### Icon-only Button

Add the `cdx-button--icon-only` class for an icon-only Button.

:::warning
Be sure to add an `aria-label` attribute to the button element so it can be understandable to screen
reader users.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button cdx-button--icon-only" aria-label="Back">
		<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous"></span>
	</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button cdx-button--icon-only" aria-label="Back">
	<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous"></span>
</button>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

:::

</template>
</cdx-demo-wrapper>

#### Button sizes

There are two Button sizes: medium and large. Most Buttons should use the medium size. The large
size is intended only for accessibility purposes, such as making icon-only Buttons larger on small
screens to increase the touch area.

Use the following classes to apply these actions:
- Medium: `cdx-button--size-medium` (class can be omitted since this is the default)
- Large: `cdx-button--size-large`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<button class="cdx-button cdx-button--icon-only" aria-label="Back">
			<span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
		</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--icon-only cdx-button--size-large" aria-label="Back">
			<span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
		</button>
	</div>
</template>
<template v-slot:code>

```html
<div>
	<button class="cdx-button cdx-button--icon-only" aria-label="Back">
		<span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
	</button>
</div>
<div>
	<button class="cdx-button cdx-button--icon-only cdx-button--size-large" aria-label="Back">
		<span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
	</button>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--bell {
	.cdx-mixin-css-icon( @cdx-icon-bell, @param-is-button-icon: true );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--bell {
	.cdx-mixin-css-icon( @cdx-icon-bell, @param-is-button-icon: true );
}
```

:::

</template>
</cdx-demo-wrapper>

#### Link buttons and other elements

:::danger
**Do not do this** unless you absolutely have to. Use a `<button>` element styled like a button for
an action, and use an `<a>` element styled like a link for navigation.
:::

There are rare occasions where an inline element other than `<button>` needs to be styled to look
like a button. To achieve this, add the following classes to your inline element:

- The classes detailed above: `cdx-button`, plus any other classes needed for action, weight, or
  size
- `cdx-button--fake-button`
- Either `cdx-button--fake-button--enabled` for an enabled button or `cdx-button--fake-button--disabled`
  for a disabled button. **You must include one of these classes to get the proper button styles.**

If your element behaves like a button (triggering an action or event), you should also add
`role="button"` to the element if that role is allowed. Visit the [ARIA Authoring Practices Guide on buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
for more information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<a class="cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--action-progressive" href="#">
		Progressive link button
	</a>
</template>
<template v-slot:code>

```html
<a class="cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--action-progressive" href="#">
	Progressive link button
</a>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	:deep( .cdx-demo-wrapper__demo-pane__demo > div ) {
		margin-bottom: @spacing-100;
	}

	// Needed to undo a VitePress link style.
	/* stylelint-disable-next-line selector-class-pattern */
	:deep( .cdx-button--fake-button ) {
		font-weight: @font-weight-bold;
	}
}
</style>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

// Note that these styles can't be scoped. If they are, a data attribute is added to their
// selectors, which increases specificity.
.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}

.cdx-demo-css-icon--bell {
	.cdx-mixin-css-icon( @cdx-icon-bell, @param-is-button-icon: true );
}

.cdx-demo-css-icon--user-avatar {
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @param-is-button-icon: true );
}
</style>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on the Button, it activates the Button. |