<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextAreaDefault from '@/../component-demos/text-area/examples/TextAreaDefault.vue';
import TextAreaWithRows from '@/../component-demos/text-area/examples/TextAreaWithRows.vue';
import TextAreaWithAutosize from '@/../component-demos/text-area/examples/TextAreaWithAutosize.vue';
import TextAreaWithIcons from '@/../component-demos/text-area/examples/TextAreaWithIcons.vue';
import TextAreaField from '@/../component-demos/text-area/examples/TextAreaField.vue';
import TextAreaNativeValidation from '@/../component-demos/text-area/examples/TextAreaNativeValidation.vue';

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

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="textareaValue">
<template v-slot:demo="{ propValues }">
    <cdx-docs-configurable-generic v-bind="propValues"/>
</template>
</cdx-demo-wrapper>

## Overview

### When to use TextArea

Use the TextArea component to let users enter long text that exceeds one line.

This form element is useful when the user needs to enter a sizable amount of free-form text, for
example comments, reviews, feedback, or short essay responses. If the text is expected to be short,
use [TextInput](./text-input.md) instead.

### About TextArea

TextArea includes the following elements.

#### Start icon (optional)

A start icon can be included to visually enhance the TextArea's purpose.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a simple icon that is easily understandable to users.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Textarea

The textarea element's has an optional grabber that allows vertical resizing, and a scrollbar will
appear if the text exceeds the height of the textarea before resizing. If the autosize property is
enabled, the height of the textarea adjusts automatically according to the length of the text.

##### Placeholder text (optional)

Placeholder text provides an example of what type of information is being requested in the
TextArea.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Placeholder text should further illustrate and support the TextArea's label.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should never replace the label nor be the input's only description.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### End icon (optional)

A secondary end icon can be included if needed.

## Examples

### Basic usage

By default, the TextArea has a grabber that can be used to manually resize it.

::: warning Browser Support Warning
While Codex strives to provide a consistent experience across
different platforms and browsers, it's important to be aware that the vertical
resizing feature may not be available on iOS devices, including iPhones and
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

<cdx-accordion>
<template #title>Developer notes</template>

The TextArea component uses `v-model` to two-way bind the reactive reference to
the value of `<textarea>`. The reactive reference will automatically update when
the value changes in the `<textarea>`.

</cdx-accordion>

### Custom rows

You can set a number of `rows` of text to display initially.

<cdx-demo-best-practices>
<cdx-demo-best-practice>The number of rows shown should reflect the amount of text expected to be entered.</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

When the `autosize` property is enabled, the TextArea's height will automatically grow with the length of the text. The grabber and scrollbar are removed since the TextArea expands automatically and shows all of the text at once.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a TextArea with `autosize` when there is ample space in the layout for the TextArea to expand.</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

A TextArea can have a start icon, end icon, or both. Any Codex icon can be used.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use simple icons that are easily understandable to users.</cdx-demo-best-practice>
</cdx-demo-best-practices>

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

### Form field

A TextArea can be wrapped in the Field component to add features like a semantic label, description
and help text, and validation messages. A [character counter](./field.html#custom-help-text-content)
can also be added via the Field component. Refer to the [Field](./field.md) page for more
information.

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

### Native validation

The TextArea component exposes [native constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
methods. Refer to the [methods](#methods) below to review all of the supported features.

This demo sets the `required` attribute on the textarea and validates it when the form is submitted.
When the textarea is invalid, it sets the Field's status to "error" and passes the native validation
message to the Field component for display. Submit the form while leaving the TextArea
blank.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<text-area-native-validation />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-area/examples/TextAreaNativeValidation.vue [NPM]

<<< @/../component-demos/text-area/examples-mw/TextAreaNativeValidation.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

`v-model` is used to track the current value of the textarea. Refer to the events docs for details
on emitted events and their properties.

::: tip Attributes passed to textarea
This component will pass any HTML attributes applied to it, except for CSS class, to the `<textarea>` element within the component.
:::

### CSS-only version

#### Markup structure

The CSS-only TextArea component consists of a `<div>` wrapping a `<textarea>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-area">
		<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-text-area">
	<!-- `<textarea>` element with CSS class and attributes. -->
	<textarea class="cdx-text-area__textarea" placeholder="Start typing..."></textarea>
</div>
```

</template>
</cdx-demo-wrapper>

#### With icons

You can use [CSS-only icons](./icon.md#css-only-version) to add start and end icons to the textarea.

##### Using CSS-only icons

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

#### Disabled

Add the `disabled` attribute to the `<textarea>` element for a disabled textarea. This also works
for the `readonly` attribute.

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

#### Error state

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

#### Form field

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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | The left and right arrows navigate through the text content within the input. |
| <kbd>Up arrow</kbd> / <kbd>Down arrow</kbd> | Up arrow moves the focus from the last position of the input to the first one, while down arrow moves it from the first position to the last. |
