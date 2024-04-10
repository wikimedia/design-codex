<script setup>
import RadioGroup from '@/../component-demos/radio/examples/RadioGroup.vue';
import InlineRadios from '@/../component-demos/radio/examples/InlineRadios.vue';
import RadioGroupNoSelection from '@/../component-demos/radio/examples/RadioGroupNoSelection.vue';
import RadiosWithDescriptions from '@/../component-demos/radio/examples/RadiosWithDescriptions.vue';
import RadioGroupField from '@/../component-demos/radio/examples/RadioGroupField.vue';
</script>

A Radio is a binary input that is usually combined in a group of two or more
options. They signal a pattern where users can only select one of the available
options. Radios are also known as “radio buttons”.

## Guidelines

### Using radios

Radios must feature a descriptive label. They must be part of a radio group of at least two
elements. A radio may also have sub-components or child radio groups.

Use the Radio component to make a single selection from a list of options where only one choice is
allowed. When multiple selections are needed, use [Checkbox](./checkbox.md) instead.

### Specifications

![Specification of Radio.](../../assets/components/radio-specifications.svg)

1. **Radio**<br>
Radio buttons make the selection visually distinct.
2. **Label**<br>
The Radio must always contain a label, with the text size matching the base font size for consistency with the body text. Labels can include links and bold text and should be concise, clearly indicating the selected option.
3. **Description** (optional)<br>
If additional information about the label is required, a description can be included.

The Radio label will expand to fit longer text while the radio itself remains aligned with the first line of the label's text.

A group of radios should consist of at least 2 radios, with no maximum limit on the number of radios per group.

Refer to the
[Radio component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2549-67656&mode=design&t=7wyBmhfdJTJevQmT-11).

### Interaction states

Radio buttons’ states were designed using  accessible color variations. In addition to the 'disc'
icon, these make it easier to differentiate between the radio button’s selected and unselected modes
(e.g. disabled, hover, active):

![States of Radio for both unselected and selected states: default, hover, active, focus, and disabled.](../../assets/components/radio-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default unselected
2. Hover unselected
3. Active unselected
4. Focus unselected
5. Disabled unselected
6. Default selected
7. Hover selected
8. Active selected
9. Focus selected
10. Disabled selected

</div>

::: tip Accessibility note
The disabled state does not meet our minimum color contrast rules. WCAG 2.1
states that “…part[s] of an inactive user interface component […] have no contrast
requirement”.<sup>[[1]](#ref1)</sup><br>
Provide sufficient information in a disabled element's context, so the user can understand what is
disabled and how to enable it (if applicable).
:::

### Best practices

Consider the following recommendations when using radios.

#### Label’s format

<cdx-demo-rules>

<template #do-media>

![Radio group including different text formats and a link.](../../assets/components/radio-best-practices-label-do.svg)

</template>

<template #do-text>

- Accompany the Radio with a label that matches the base font size.
- Include a description below the label to provide additional information.
- Use text formatting like bold and italic in the label.
- Include standalone links within the label to provide additional information regarding a specific option when necessary.

</template>

<template #dont-media>

![Radio group with bolded labels and a link within the last label.](../../assets/components/radio-best-practices-label-dont.svg)

</template>

<template #dont-text>

- Bold all Radio label.
- Link the entire Radio label as it could cause issues with the selection.

</template>

</cdx-demo-rules>

#### Inline radios

<cdx-demo-rules>

<template #do-media>

![Inline Radio group including two radios with short labels.](../../assets/components/radio-best-practices-inline-do.svg)

</template>

<template #do-text>

- Use inline radios, but reserve its use for specific cases to prevent disruptions in the reading flow.

</template>

<template #dont-media>

![Inline Radio group with three radios, where the middle one is longer than the others.](../../assets/components/radio-best-practices-inline-dont.svg)

</template>

<template #dont-text>

- Use inline radios if there are too many radios per line.
- Use inline radios if there is significant variation in the length of the radios labels.

</template>

</cdx-demo-rules>

### Content

A radio button ensure that a reader chooses only one option from a set of two or more. Keeping choices simple and mutually exclusive makes for concise, effective and trustworthy content.

<cdx-demo-rules>
<template #do-media>

![Radio buttons conveying an example of a clear prompt and concise list of options.](../../assets/components/radio-content-do.svg)

</template>
<template #do-text>

- Keep the choices short and mutually exclusive. [*Concise*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-concise), [*Clear*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
<template #dont-media>

![Radio buttons conveying an example of a list of options with unnecessarily long descriptions.](../../assets/components/radio-content-dont.svg)

</template>
<template #dont-text>

- Make the options overly long or complicated. [*Concise*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-concise), [*Clear*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | The focus is placed on the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | The focus is placed on the previous interactive element. |
| <kbd>Up arrow</kbd> / <kbd>Down arrow</kbd> | When the focus is placed on a Radio within a group, the arrow keys move the focus between the different Radios. |

### References

1. <span id="ref1">[Web Content Accessibility Guidelines (WCAG) 2.1 – Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)</span>

## Demos

Open up the browser console to see events emitted on input.

### Label and description

Always include label text via the default slot. You can also add description text via the
`#description` slot.

This demo uses the [Field](./field.md) component—usage of this component is described in the next
section.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<radios-with-descriptions />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadiosWithDescriptions.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadiosWithDescriptions.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

When used in a form, a group of Radios can be wrapped in the Field component to add features like a
semantic label, description and help text, validation messages, and more. See the
[Field](./field.md) page for more information.

When building a Radio field, **always set `isFieldset` to `true`** to ensure proper accessibility
support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

If using a Radio group outside of a form, follow the instructions in the next demo.

<cdx-demo-wrapper>
<template v-slot:demo>
	<radio-group-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroupField.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Radio group

For a group of radios, each Radio component's `v-model` will be bound to the same ref, which is
equal to the `inputValue` prop of the selected Radio. Use the same `name` prop for all of the Radio
components in a group.

This demo shows what to do when using a Radio group outside of a form:
1. Wrap the group in an element with `role="radiogroup"`
2. Connect the group with a label via the `aria-labelledby` attribute

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<radio-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroup.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Inline radios

Use the `inline` prop to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<inline-radios />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/InlineRadios.vue [NPM]

<<< @/../component-demos/radio/examples-mw/InlineRadios.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With no initial selection

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<radio-group-no-selection />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroupNoSelection.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroupNoSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

Typical use of this component will involve using `v-for` to loop through an array of items and
output a Radio component for each one. Each Radio will have the same `v-model` binding and `name`
prop, but different `inputValue` props and label content.<br>
The `v-model` value is the `inputValue` of the Radio that is currently on.

## CSS-only version

### Markup structure

The structure below can be used for most cases. If you need a description, see the section on that
feature below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-radio">
		<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-css-only-1">
			Radio 1
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-radio">
	<!-- <input> element with id, type, name, and any other necessary
	attributes. The actual input is visually hidden. -->
	<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
	<!-- Empty span that will be styled to look like a radio input. -->
	<span class="cdx-radio__icon"></span>
	<!-- Label with `for` attribute matching the input's id. -->
	<label class="cdx-radio__label" for="radio-css-only-1">
		Radio 1
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

### With description

To add a description below the label:
- Add a span after the `<label>` element with an ID and class `cdx-label__description`. Include the
  description text here.
- Add class `cdx-label__label` to the `<label>` element
- Wrap the label and description in a div with classes `cdx-radio__label` and `cdx-label`
- Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">Search completion</span>
		</legend>
		<div class="cdx-field__control">
			<span class="cdx-radio">
				<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
				<span class="cdx-radio__icon"></span>
				<div class="cdx-radio__label cdx-label">
					<label for="radio-group-css-only-description-1" class="cdx-label__label">
						Default (recommended)
					</label>
					<span id="cdx-description-css-1" class="cdx-label__description">
						Corrects up to two typos. Removes redirects that are very similar to the main title.
					</span>
				</div>
			</span>
			<span class="cdx-radio">
				<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
				<span class="cdx-radio__icon"></span>
				<div class="cdx-radio__label cdx-label">
					<label for="radio-group-css-only-description-2" class="cdx-label__label">
						Strict mode (advanced)
					</label>
					<span id="cdx-description-css-2" class="cdx-label__description">
						No typo correction. No accent folding. Strict matching.
					</span>
				</div>
			</span>
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-field">
	<legend class="cdx-label">
		<span class="cdx-label__label__text">Search completion</span>
	</legend>
	<div class="cdx-field__control">
		<span class="cdx-radio">
			<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
			<span class="cdx-radio__icon"></span>
			<div class="cdx-radio__label cdx-label">
				<label for="radio-group-css-only-description-1" class="cdx-label__label">
					Default (recommended)
				</label>
				<span id="cdx-description-css-1" class="cdx-label__description">
					Corrects up to two typos. Removes redirects that are very similar to the main title.
				</span>
			</div>
		</span>
		<span class="cdx-radio">
			<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
			<span class="cdx-radio__icon"></span>
			<div class="cdx-radio__label cdx-label">
				<label for="radio-group-css-only-description-2" class="cdx-label__label">
					Strict mode (advanced)
				</label>
				<span id="cdx-description-css-2" class="cdx-label__description">
					No typo correction. No accent folding. Strict matching.
				</span>
			</div>
		</span>
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>

### Radio group

Native attributes of the `<input>` element can be used. For example:
- Add the `checked` attribute to the `<input>` element if it should be selected initially.
- Add the `disabled` attribute to the `<input>` element if it should be disabled.

Always include one of these two features for accessible grouping:
1. If using the Radio group in a field, wrap the group in a `<fieldset>` element and add a
  `<legend>` element with the group label. This method is demonstrated below and requires some
  style resets on `<fieldset>` and `<legend>`. You can use the CSS-only [Field](./field.md#css-only-version)
  and [Label](./label.md#css-only-version) components to reset browser styles of these elements.
2. If using the Radio group outside of a field, wrap the group in a `<div>` with `role="group"`
  and `aria-labelledby` set to the ID of the group label. See an example of this
  [above](#radio-group) (you can just include a `<label>` element instead of using the Label
  component).

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Radio group demo</span>
		</legend>
		<div class="cdx-field__control">
			<span class="cdx-radio">
				<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-1">
					Radio 1
				</label>
			</span>
			<span class="cdx-radio">
				<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-2">
					Radio 2 (initially selected)
				</label>
			</span>
			<span class="cdx-radio">
				<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-3">
					Radio 3, which has a very long label that spans onto a second line to
					demonstrate what happens when text wraps
				</label>
			</span>
			<span class="cdx-radio">
				<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-4">
					Radio 4 (disabled)
				</label>
			</span>
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-field">
	<legend class="cdx-label">
		<span class="cdx-label__label__text">CSS-only Radio group demo</span>
	</legend>
	<div class="cdx-field__control">
		<span class="cdx-radio">
			<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-1">
				Radio 1
			</label>
		</span>
		<span class="cdx-radio">
			<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-2">
				Radio 2 (initially selected)
			</label>
		</span>
		<span class="cdx-radio">
			<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-3">
				Radio 3, which has a very long label that spans onto a second line to
				demonstrate what happens when text wraps
			</label>
		</span>
		<span class="cdx-radio">
			<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-4">
				Radio 4 (disabled)
			</label>
		</span>
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>

### Inline radios

Add the `cdx-radio--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only inline Radio demo</span>
		</legend>
		<div class="cdx-field__control">
			<span class="cdx-radio cdx-radio--inline">
				<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-inline-1">
					Radio 1
				</label>
			</span>
			<span class="cdx-radio cdx-radio--inline">
				<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="radio-group-css-only-inline-2">
					Radio 2
				</label>
			</span>
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-field">
	<legend class="cdx-label">
		<span class="cdx-label__label__text">CSS-only inline Radio demo</span>
	</legend>
	<div class="cdx-field__control">
		<span class="cdx-radio cdx-radio--inline">
			<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-inline-1">
				Radio 1
			</label>
		</span>
		<span class="cdx-radio cdx-radio--inline">
			<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="radio-group-css-only-inline-2">
				Radio 2
			</label>
		</span>
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>
