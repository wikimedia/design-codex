<script setup>
import { CdxButton } from '@wikimedia/codex';
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

## Guidelines

### When to use buttons

Buttons must contain a label and can also include an icon. For icon-only buttons, the label is
visually hidden but available to assistive technology users.

Use the Button component when you want to trigger an action or toggle something in the user's
current context.

Avoid using buttons when:
- The action is to navigate the user to a new resource, which would take them away from the current
context. In such cases, consider [Link](../mixins/link.md) instead.<sup>[[1]](#ref1)</sup>
- You need to represent state-persistent user actions. In this case, use
[ToggleButton](./toggle-button.md) instead.

### Specifications
The button styles distinguish types of buttons and each button’s state (e.g.
hover, active, focused) in accessible color variations.

![Specification of Button.](../../assets/components/button-specifications.svg)

1. **Icon** (optional)<br>Icons simplify user recognition and provide the ability to shorten button labels to a minimum.
2. **Label**<br>Button labels should be as short as possible, with text that clearly states what action follows clicking the button (e.g. download, submit form, search).

#### Component limitations

When using buttons, consider the size of their target area. Make sure that the
associated active touch area is at least 44 x 44 dp. Otherwise users may fail to
hit the active area, for example due to motor disabilities.

Icon-only buttons have their minimum width set to `@min-size-interactive-pointer`
(equivalent to `32px` in the default Codex theme). Buttons will adjust to fit the
expanding text but will halt growth at a maximum width of `@max-width-button`
(equivalent to `448px` in the default Codex theme). An ellipsis will appear to
accommodate the button text if necessary.

On mobile, buttons should span the full-width of the container, except for icon-only
buttons, which will maintain their fixed square proportions. For buttons within mobile
forms, refer to the [constructing forms](../../style-guide/constructing-forms.md)
guidelines.

Refer to the [Button component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10019-91329&mode=design&t=eVqRGnL1b9RbOdZ0-11).

::: tip Set `min-width` manually on Buttons with extremely short labels
Non-icon-only buttons with text labels of only 1-2 characters in length may fall
below size of the target area described above. If you are dealing with
non-icon-only buttons with extremely short labels, it is recommended to set a
minimum width of: `@min-size-interactive-pointer` in your own CSS.
:::

### Types

#### Button content
Depending on the content of the button, there are the following types:

1. **Text with icon**<br>It combines descriptive text with a reinforcing icon. It's suitable when you need to convey meaning through both textual and visual elements.
2. **Text-only**<br>It contains only text for simplicity. It is suitable for actions that do not require or benefit from an accompanying icon, or when the icon would not effectively reinforce the meaning of the text.
3. **Icon-only**<br>It uses an icon alone to create visual impact. It is suitable for actions that can be universally recognized through the icon alone, such as the “edit” action.

![Example of button content: text with icon, text-only and icon-only.](../../assets/components/button-types-content.svg)

#### Button action or variant (“flavor”)
There three type of buttons based on the type of action they convey:

1. **Neutral**<br>Use neutral buttons for actions that are neutral or secondary in importance.
2. **Progressive**<br>Use progressive buttons for actions that lead to the next step in the process.
3. **Destructive**<br>Reserve destructive buttons for actions that involve removal or limitation, such as deleting a page or blocking a user. Avoid using them for actions like cancel buttons.

![Example of button action: progressive, destructive, and neutral.](../../assets/components/button-types-flavors.svg)

#### Button weight
Buttons can be categorized into three types based on their weight and their significance in their respective contexts:

##### Primary buttons
Primary buttons signal the main action in a given view – a page or a dialog. As they
should guide the user to the most important action (“call to action”), there should only be one
primary button per view.

![Variants of primary buttons: progressive and destructive.](../../assets/components/button-types-primary.svg)

They come in two variants (“flavors”):

1. **Progressive**: Use progressive buttons for actions that lead to the next step in the process.
2. **Destructive**: Use destructive buttons for actions that remove or limit, such as deleting a
page or blocking a user. Don't use it for actions such as cancel buttons.

##### Normal buttons
When designing a project, normal framed buttons are the default choice. Quiet, frameless buttons
(read next section) should only be used in views, where normal buttons need to be further visually
de-emphasized, see below.

![Variants of normal buttons: neutral, progressive and destructive.](../../assets/components/button-types-normal.svg)

Normal buttons have three variants (“flavors”):

1. **Neutral**
2. **Progressive**
3. **Destructive**

##### Quiet buttons (“frameless”)
Use quiet buttons for an easily recognizable action that does not detract focus from the content.
For example, the icon-only edit buttons alongside sections in article view on mobile
Wikipedia.<sup>[[2]](#ref2)</sup>They still feature minimal target sizes and states to provide the user clear interaction feedback.
Normal (framed) buttons are the default choice for simplified recognition.

![Variants of quiet buttons: neutral, progressive and destructive.](../../assets/components/button-types-quiet.svg)

Quiet buttons have three variants (“flavors”):

1. **Neutral**
2. **Progressive**
3. **Destructive**

### Interaction states
Buttons have the following visually separate states:

#### Neutral buttons

![Interaction states of the Neutral Button (both normal and quiet buttons): default,
hover, active, focus, and disabled.](../../assets/components/button-interaction-states-neutral.svg)

#### Progressive buttons

![Interaction states of the Progressive Button (primary, normal,
and quiet buttons): default, hover, active, focus, and disabled.](../../assets/components/button-interaction-states-progressive.svg)

#### Destructive buttons

![Interaction states of the Destructive Button (primary, normal,
and quiet buttons): default, hover, active, focus, and disabled.](../../assets/components/button-interaction-states-destructive.svg)

1. Default
2. Hover
3. Active
4. Focus
5. Disabled

**Accessibility note**: The disabled state does not meet our minimum color contrast rules. WCAG 2.1 states that “…part[s] of an inactive user interface component […] have no contrast requirement”.<sup>[[3]](#ref3)</sup><br>
Provide sufficient information in a disabled element’s context, so the user can understand what is disabled and how to enable it (if applicable).

### Best practices

Consider the following recommendations when working with buttons.

#### Icon

<cdx-demo-rules>
<template #do-media>

![Edit button using an edit icon.](../../assets/components/button-best-practices-do.svg)

</template>
<template #do-text>

- Ensure that icons used in buttons are relevant to the action they represent.
- Use icons just when they are clear and easily recognizable.

</template>
<template #dont-media>

![Edit button using a complex icon.](../../assets/components/button-best-practices-dont.svg)

</template>
<template #dont-text>

- Avoid complex or abstract icons that may confuse users.

</template>
</cdx-demo-rules>

### Content

The wording on a button lets a user know what happens when they select it. Users need to know what action will occur, or where they will go, when they click or tap.

Use short, precise verbs, ideally with fewer than 38 characters for English. The average character length of language translations is 42 characters. Logographic (such as Chinese, Japanese, Korean) and Arabic-script (such as Saraiki, Punjabi, Sindhi, Pashto, Balochi) languages tend to use less characters. Language translations which use more characters are Romance (such as Lombard, French, Portuguese, Spanish, Galician, Arpitan, Romanian, Catalan), some Germanic (Colognian, German, Dutch), Slavic (Belarusian, Russian, Bulgarian, Polish, Ukrainian) and Austronesian (Sakizaya, Ilokano, Tagalog, Bikol, Indonesian). Other notable, but not easily grouped languages that tend to be longer are Irish, Greek, Shan, Quechua, Finnish, Hungarian, Basque, and Malayalam. All of them have an average length between 45 and 53 characters.

#### Progressive button

Progressive buttons allow a reader to continue or complete an action.

<cdx-demo-rules>
<template #do-media>

![Interface button with a short, concise action.](../../assets/components/button-content-progressive-do.svg)

</template>
<template #do-text>

- Use descriptive, accessible verbs to encourage action. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)
- Write in sentence case, capitalising only the first word. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent)

</template>
<template #dont-media>

![Interface button with unnecessarily long form text which wraps to two lines.](../../assets/components/button-content-progressive-dont.svg)

</template>
<template #dont-text>

- Choose verbs that imply visual or sensory abilities, or are idiomatic or vague. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)
- Write a CTA that wraps over two lines. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
</cdx-demo-rules>

#### Destructive button

Destructive buttons are for cancelling, deleting or non-reversible actions. Posing and answering direct questions with matching terminology makes for scannable, effective content.

<cdx-demo-rules>
<template #do-media>

![Button reading "Delete".](../../assets/components/button-content-destructive-do.svg)

</template>
<template #do-text>

- Answer direct questions in titles or body copy using the same terminology. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
<template #dont-media>

![Button reading "Yes, I'm sure".](../../assets/components/button-content-destructive-dont.svg)

</template>
<template #dont-text>

- Pose a question in addition to the main action. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
</cdx-demo-rules>

#### Neutral button

Neutral buttons are for minor or secondary actions. Always keep the hierarchy of the message simple and direct, and choose the words carefully, in order to make the copy as clear and effective as possible.

<cdx-demo-rules>
<template #do-media>

![Buttons reading "Create account" and "Log in".](../../assets/components/button-content-neutral-do.svg)

</template>
<template #do-text>

- Establish a clear hierarchy of choices on the page. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
<template #dont-media>

![Buttons reading "Sign up" and "Sign in".](../../assets/components/button-content-neutral-dont.svg)

</template>
<template #dont-text>

- Use similar words for different actions. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on the Button, it activates the Button. |

### References

1. <span id="ref1">[“Links vs. Buttons in Modern Web Applications” by Marcy Sutton](https://marcysutton.com/links-vs-buttons-in-modern-web-applications)</span>
2. <span id="ref2">[Mobile English Wikipedia: Button (computing) article with exemplified quiet edit buttons](https://en.m.wikipedia.org/wiki/Button_(computing))</span>
3. <span id="ref3">[Web Content Accessibility Guidelines (WCAG) 2.1 – Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)</span>


## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-button v-bind="propValues">
		{{ slotValues.default }}
	</cdx-button>
</template>
</cdx-demo-wrapper>

### Default

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-button>Click me</cdx-button>
</template>

<template v-slot:code>

```vue-html
<cdx-button>Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

### Button actions

There are three button actions: default, progressive, and destructive.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<cdx-button>Default button</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive">Progressive button</cdx-button>
	</div>
	<div>
		<cdx-button action="destructive">Destructive button</cdx-button>
	</div>
</template>

<template v-slot:code>

```vue-html
<div>
	<cdx-button>Default button</cdx-button>
</div>
<div>
	<cdx-button action="progressive">Progressive button</cdx-button>
</div>
<div>
	<cdx-button action="destructive">Destructive button</cdx-button>
</div>
```

</template>
</cdx-demo-wrapper>

### Button weights

There are three button weights: normal, primary, and quiet.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<cdx-button action="progressive">
			Normal progressive button
		</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive" weight="primary">
			Primary progressive button
		</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive" weight="quiet">
			Quiet progressive button
		</cdx-button>
	</div>
</template>

<template v-slot:code>

```vue-html
<div>
	<cdx-button action="progressive">
		Normal progressive button
	</cdx-button>
</div>
<div>
	<cdx-button action="progressive" weight="primary">
		Primary progressive button
	</cdx-button>
</div>
<div>
	<cdx-button action="progressive" weight="quiet">
		Quiet progressive button
	</cdx-button>
</div>
```

</template>
</cdx-demo-wrapper>

### Disabled

Add the `disabled` attribute for a disabled button.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-button disabled>Disabled button</cdx-button>
</template>

<template v-slot:code>

```vue-html
<cdx-button disabled>Disabled button</cdx-button>
```

</template>
</cdx-demo-wrapper>

### With icon

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

<cdx-demo-wrapper>
<template v-slot:demo>
	<quiet-button-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/QuietButtonWithIcon.vue [NPM]

<<< @/../component-demos/button/examples-mw/QuietButtonWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon-only button

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

<cdx-demo-wrapper>
<template v-slot:demo>
	<quiet-icon-only-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/button/examples/QuietIconOnlyButton.vue [NPM]

<<< @/../component-demos/button/examples-mw/QuietIconOnlyButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Button sizes

There are two button sizes: medium and large.

Most buttons should use the medium size. The large size is intended only for accessibility purposes,
such as making icon-only buttons larger on touchscreens to increase the touch area.

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

## Vue usage

## CSS-only version

### Markup structure

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

### Button actions

There are three button actions: default, progressive, and destructive. Use the following classes to
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

### Button weights

There are three button weights: normal, primary, and quiet. Use the following classes to
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

### Disabled

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

### With CSS icon

You can use [CSS icons](./icon.md#css-only-version) within button content. To set up an icon within
a CSS-only button, do the following:

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

### Icon-only button

Add the `cdx-button--icon-only` class for an icon-only button.

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

### Button sizes

There are two button sizes: medium and large. Most buttons should use the medium size. The large
size is intended only for accessibility purposes, such as making icon-only buttons larger on small
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

### Link buttons and other elements

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
`role="button"` to the element if that role is allowed. See the [ARIA Authoring Practices Guide on buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
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
