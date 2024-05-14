<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextAreaDefault from '@/../component-demos/text-area/examples/TextAreaDefault.vue';
import TextAreaWithPlaceholder from '@/../component-demos/text-area/examples/TextAreaWithPlaceholder.vue';
import TextAreaWithRows from '@/../component-demos/text-area/examples/TextAreaWithRows.vue';
import TextAreaWithAutosize from '@/../component-demos/text-area/examples/TextAreaWithAutosize.vue';
import TextAreaWithDisabled from '@/../component-demos/text-area/examples/TextAreaWithDisabled.vue';
import TextAreaWithReadonly from '@/../component-demos/text-area/examples/TextAreaWithReadonly.vue';
import TextAreaWithIcons from '@/../component-demos/text-area/examples/TextAreaWithIcons.vue';
import TextAreaField from '@/../component-demos/text-area/examples/TextAreaField.vue';

const controlsConfig = [
    {
        name: 'status',
        type: 'radio',
        options: [ 'default', 'error' ]
    },
    {
        name: 'autosize',
        type: 'boolean'
    },
    {
        name: 'startIcon',
        type: 'icon'
    },
    {
        name: 'endIcon',
        type: 'icon'
    },
    {
        name: 'placeholder',
        type: 'text'
    },
    {
        name: 'disabled',
        type: 'boolean'
    },
    {
        name: 'readonly',
        type: 'boolean'
    },
    {
        name: 'rows',
        type: 'text'
    }
];
</script>

A TextArea is a multi-line text input that allows manual resizing if needed.

## Guidelines

### When to use text areas
This form element is useful when the user needs to enter a sizable amount of
free-form text, for example comments, reviews, feedback, or short essay
responses.

Use TextArea to let users enter long text that exceeds one line. Avoid using
TextArea if the text to be entered is short. In this case use [TextInput](./text-input.md)
instead.

### Specifications

![Specification of TextArea.](../../assets/components/text-area-specifications.svg)

TextArea may include the following optional elements:

1. **Start icon** (optional)<br>Icons can simplify the identification of specific user inputs.
2. **Placeholder** (optional)<br>The placeholder text provides an example of what type of information is being requested in the input.
3. **End icon** (optional)<br>A secondary end icon can be included if needed.
4. **Grabber** (optional)<br>Optionally, the grabber may be displayed to allow users the ability to vertically resize the text area as needed.

#### Component limitations

The base min-width for the TextArea component is `@size-1600` (equivalent to `256px` in the default Codex theme), but it's customizable to a smaller width if necessary. There's no maximum width limit.

The min-height is set at `@size-400` (equivalent to `64px` in the default Codex theme). The grabber allows vertical resizing, and a scrollbar will appear if the text exceeds the height of the TextArea before resizing. If the autosize property is enabled, the height of the TextArea adjusts automatically according to the length of the text.

Refer to the [TextArea component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&mode=design&t=gOjF3EjKCEwZTqj0-0).

### Types
According to the size properties, there are the following text area types:

#### With grabber
By default, a grabber will be visible, signaling to users that they can
vertically resize the text area field. In this scenario, if the content cannot
fit within the visible area, a scrollbar will appear to to navigate through the
text that exceeds the visible area.

Use this type of text area when you require it to have a more compact size,
especially in situations where it is positioned within other components like
dialogs.

![TextArea with grabber.](../../assets/components/text-area-types-grabber.svg)

#### Autosize
When the autosize property is enabled, the text area’s height will be
automatically resized with the length of the text. There is no need for the
grabber indicator in this case, and scrolling within the content is unnecessary
since the entire content will be fully visible. Choose this type of text area
when there is ample space available on the page where the text area is situated.

![TextArea with autosize.](../../assets/components/text-area-types-autosize.svg)

### Interaction states
Text areas have the following visually separate states:

![Interaction states of TextArea: default, hover, active-focus, filled, disabled, read-only, error default, error focus, and error filled.](../../assets/components/text-area-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover
3. Active - Focus
4. Filled
5. Disabled
6. Read-only
7. Error default
8. Error hover
9. Error filled

</div>

### Best practices

Consider the following recommendations when using textareas.

#### Usage

<cdx-demo-rules>

<template #do-media>

![TextArea included within a Field.](../../assets/components/text-area-best-practices-usage-do.svg)

</template>

<template #do-text>

- Use a TextArea when the intention is to compose lengthy text entries.
- Integrate the TextArea within a Field component to use all available properties of Field, such as label, helper text, and validation messages.


</template>

<template #dont-media>

![Standalone TextArea and a text editor.](../../assets/components/text-area-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use TextArea for single-line inputs where a simple [TextInput](https://doc.wikimedia.org/codex/latest/components/demos/text-input.md) is sufficient.
- Use TextArea for source editing.
- Use a standalone TextArea outside of a Field component.
- Use TextArea without a label, as the label is essential for accessibility and ease of scanning.

</template>

</cdx-demo-rules>

#### Icon

<cdx-demo-rules>

<template #do-media>

![TextArea with a recognizable icon.](../../assets/components/text-area-best-practices-icon-do.svg)

</template>

<template #do-text>

- Use a start icon to visually reinforce the purpose or context of the TextArea.
- Use a start icon that meets the input's requirements.

</template>

<template #dont-media>

![TextArea with a complex icon.](../../assets/components/text-area-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.

</template>

</cdx-demo-rules>

#### Character counter

<cdx-demo-rules>

<template #do-media>

![TextArea with character counter used for a long message.](../../assets/components/text-area-best-practices-characters-coounter-do.svg)

</template>

<template #do-text>

- Use the character counter when users need to input text within a specific character limit.

</template>

<template #dont-media>

![TextArea with character counter used for address.](../../assets/components/text-area-best-practices-characters-coounter-dont.svg)

</template>

<template #dont-text>

- Use character counter when users are unlikely to reach the limit.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | The left and right arrows navigate through the text content within the input. |
| <kbd>Up arrow</kbd> / <kbd>Down arrow</kbd> | Up arrow moves the focus from the last position of the input to the first one, while down arrow moves it from the first position to the last. |

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="textareaValue">
<template v-slot:demo="{ propValues }">
    <cdx-docs-configurable-generic v-bind="propValues"/>
</template>
</cdx-demo-wrapper>

### Default

The TextArea component uses `v-model` to two-way bind the reactive reference to
the value of `<textarea>`. The reactive reference will automatically update when
the value changes in the `<textarea>`. The value updates due to an emitted
`input` event.

By default, the initial value of the `autosize` prop is false. When `autosize`
is false, the textarea will display a grabber/resize tool and a scrollbar to
view the overflow content. The `<textarea>` can be manually resized vertically
to increase height of the element.

Note: The initial min-height of the `<textarea>` is set to 64px.

::: warning Browser Support Warning
While our design system strives to provide a consistent experience across
different platforms and browsers, it's important to be aware that the vertical
resizing feature will not be available on iOS devices, including iPhones and
iPads. This limitation is due to the default behavior of iOS Safari.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-default />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaDefault.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With placeholder

We passed in a native attribute, `placeholder`, to hint to users what to enter into the control.

Note: Placeholders are not a substitute for a proper `<label>` element tied to the control.

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-placeholder />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithPlaceholder.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithPlaceholder.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With rows

This example demonstrates how to pass in the native attribute, `rows`, to the `<textarea>`.

The `rows` attribute takes a positive number which represents the number of text lines to display in the control.

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-rows />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithRows.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithRows.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With autosize

When the `autosize` prop is set to `true`, the TextArea automatically grows with the height of the content inside `<textarea>`.

The grabber/resize tool is not displayed when `autosize` is set to `true`.

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-autosize />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithAutosize.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithAutosize.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

TextArea can pass in a start icon and end icon as props. This example shows how to add icons to the component. Refer to [Icon](./icon.md).

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-icons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithIcons.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Disabled

You can disable the component by adding the `disabled` attribute.

When `<textarea>` is `disabled`, the user cannot interact with the control. Users cannot click or select in the control and the form cannot be submitted.

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-disabled />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithDisabled.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithDisabled.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Readonly

You can make the component `readonly` by adding the `readonly` attribute.

When `<textarea>` is `readonly`, the user cannot modify the value of the control. Some key differences between `disabled` and `readonly` is that `readonly` does not prevent users from selecting and clicking in the form. Users can highlight and copy content in readonly. Readonly is tabbable and the form can be submitted.

One example usage of `readonly` textarea is when you want to prevent a user from typing into the textarea until a condition is met like selecting a a checkbox. In this situation, when the condition is met we can use JavaScript to remove the `readonly` to make the textarea editable.

<cdx-demo-wrapper>
<template v-slot:demo>
    <text-area-with-readonly />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaWithReadonly.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaWithReadonly.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A TextArea can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more information.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<text-area-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaField.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

`v-model` is used to track the current value of the textarea. Refer to the events docs for details on
emitted events and their properties.

::: tip Attributes passed to textarea
This component will pass any HTML attributes applied to it, except for CSS class, to the `<textarea>` element within the component.
:::

## CSS-only version

### Markup structure

The CSS-only TextArea component consists of a `<div>` wrapping a `<textarea>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area">
		<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper div. -->
<div class="cdx-text-area">
	<!-- Textarea element with CSS class and attributes. -->
	<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
</div>
```

</template>
</cdx-demo-wrapper>

### With icons

You can use [CSS-only icons](./icon.md#css-only-version) to add start and end icons to the textarea.

#### Using CSS-only icons

I. Add classes to elements.

You'll need the following CSS classes on the root element:
- Start icon: `.cdx-text-area--has-start-icon`
- End icon: `.cdx-text-area--has-end-icon`

The icons will be `<span>` elements with the `.cdx-text-area__icon` class, plus:
- Start icon: `.cdx-text-area__start-icon`
- End icon: `.cdx-text-area__end-icon`

You will need to add your own CSS classes to set the icon styles and background image.

II. Choose an icon ([list of all icons](/icons/all-icons.html#list-of-all-icons)) to set the background image.

You'll set the background image of the `<span>` with the icon of your choosing by utilizing a Less mixin built into Codex called `.cdx-mixin-css-icon-background-image`.

In the example below, we've chosen cdxIconNotBright as the start icon and added a class called `cdx-demo-css-icon--not-bright` to the `<span>`. In your stylesheet, the selector, `cdx-demo-css-icon--not-bright`, will call the background image mixin and pass in the icon name of your choice. The icon name is passed in the mixin as a argument and is in lower-case and separated by hyphens: `.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
		<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
		<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
		<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
	<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
	<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
	<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

### Disabled

Add the `disabled` attribute to the `<textarea>` element for a disabled textarea.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
		<textarea class="cdx-text-area__textarea" placeholder="Start typing..." disabled></textarea>
		<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
		<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
	<textarea class="cdx-text-area__textarea" placeholder="Start typing..." disabled></textarea>
	<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
	<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

### Readonly

Add the `readonly` attribute to the `<textarea>` element for a readonly textarea.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
		<textarea class="cdx-text-area__textarea" placeholder="Start typing..." readonly>The textarea is readonly.</textarea>
		<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
		<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
	<textarea class="cdx-text-area__textarea" placeholder="Start typing..." readonly>
		The textarea is readonly.
	</textarea>
	<span class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"></span>
	<span class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"></span>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

### Error state

Add the `cdx-text-area--status-error` class to the root element to show error styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area cdx-text-area--status-error">
		<textarea class="cdx-text-area__textarea" value="Something's wrong"></textarea>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-area cdx-text-area--status-error">
	<textarea class="cdx-text-area__textarea" value="Something's wrong"></textarea>
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
</style>

### Form field

The CSS-only Field component can wrap the CSS-only TextArea to add features like a semantic label,
description, optional flag, and help text. Refer to the [Field](./field.md) for more information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a <div>. -->
	<div class="cdx-field">
		<!-- Label. -->
		<div class="cdx-label">
			<!-- Label element. Include a `for` attribute to connect it with an textarea. -->
			<label class="cdx-label__label" for="cdx-demo-textarea">
			<!-- Label text. -->
			<span class="cdx-label__label__text">Edit summary</span>
			</label>
			<!-- Description. Include an `id` attribute so the textarea can have an `aria-describedby` attribute. -->
			<span id="cdx-demo-description-1" class="cdx-label__description">
			Briefly describe your changes
			</span>
		</div>
		<!-- Textarea/control wrapper. -->
		<div class="cdx-field__control">
			<!-- Textarea or control. -->
			<div class="cdx-text-textarea">
			<!-- Has `id` and `aria-describedby` attributes. -->
			<textarea
				id="cdx-demo-textarea"
				class="cdx-text-area__textarea"
				placeholder="Describe what you changed"
				aria-describedby="cdx-demo-description-1"
			></textarea>
			</div>
		</div>
		<div class="cdx-field__help-text">
			By saving changes, you agree to the
			<a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use">Terms of Use</a>,
			and you irrevocably agree to release your contribution under the
			<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY-SA 4.0 License</a>
			and the
			<a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License">GFDL</a>.
			You agree that a hyperlink or URL is sufficient attribution under the Creative Commons
			license.
		</div>
	</div>
</template>
<template v-slot:code>

```html
<!-- Outer element is a <div>. -->
	<div class="cdx-field">
		<!-- Label. -->
		<div class="cdx-label">
			<!-- Label element. Include a `for` attribute to connect it with an textarea. -->
			<label class="cdx-label__label" for="cdx-demo-textarea">
			<!-- Label text. -->
			<span class="cdx-label__label__text">Edit summary</span>
			</label>
			<!-- Description. Include an `id` attribute so the textarea can have an `aria-describedby` attribute. -->
			<span id="cdx-demo-description-1" class="cdx-label__description">
			Briefly describe your changes
			</span>
		</div>
		<!-- Textarea/control wrapper. -->
		<div class="cdx-field__control">
			<!-- Textarea or control. -->
			<div class="cdx-text-textarea">
			<!-- Has `id` and `aria-describedby` attributes. -->
			<textarea
				id="cdx-demo-textarea"
				class="cdx-text-area__textarea"
				placeholder="Describe what you changed"
				aria-describedby="cdx-demo-description-1"
			>
			</textarea>
			</div>
		</div>
		<div class="cdx-field__help-text">
			By saving changes, you agree to the
			<a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use">Terms of Use</a>,
			and you irrevocably agree to release your contribution under the
			<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY-SA 4.0 License</a>
			and the
			<a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License">GFDL</a>.
			You agree that a hyperlink or URL is sufficient attribution under the Creative Commons
			license.
		</div>
	</div>
```

</template>
</cdx-demo-wrapper>
