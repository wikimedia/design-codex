<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import RadioGroup from '@/../component-demos/radio/examples/RadioGroup.vue';
import InlineRadios from '@/../component-demos/radio/examples/InlineRadios.vue';
import RadioGroupNoSelection from '@/../component-demos/radio/examples/RadioGroupNoSelection.vue';
import RadiosWithDescriptions from '@/../component-demos/radio/examples/RadiosWithDescriptions.vue';
import RadioGroupField from '@/../component-demos/radio/examples/RadioGroupField.vue';
import RadiosWithCustomInput from '@/../component-demos/radio/examples/RadiosWithCustomInput.vue';
import RadioConfigurable from '@/../component-demos/radio/examples/RadioConfigurable.vue';

const controlsConfig = [
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Radio label'
	},
	{
		name: 'description',
		type: 'slot',
		default: ''
	}
];
</script>

A Radio is a binary input that is usually combined in a group of two or more
options. They signal a pattern where users can only select one of the available
options. Radios are also known as “radio buttons”.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<radio-configurable v-bind="propValues">
		<template #default>
			{{ slotValues.default }}
		</template>
		<template #description>
			{{ slotValues.description }}
		</template>
	</radio-configurable>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Radio

Radio must feature a descriptive label. They must be part of a Radio group of at least two
elements. A Radio may also have sub-components or child Radio groups.

Use the Radio component to make a single selection from a list of options where only one choice is
allowed. When multiple selections are needed, use [Checkbox](./checkbox.md) instead.

### About Radio

Radio includes the following elements.

#### Radio

Radio buttons make the selection visually distinct.

#### Label

The Radio must always contain a label, with the text size matching the base font size for consistency with the body text. Labels can include links and bold text and should be concise, clearly indicating the selected option.

<cdx-demo-best-practices>

<cdx-demo-best-practice>

Keep the choices short and mutually exclusive. [*Concise*](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-concise), [*Clear*](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-trustworthy)

</cdx-demo-best-practice>
<cdx-demo-best-practice>Use text formatting like bold and italic sparingly in the label.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include standalone links within the label to provide additional information regarding a specific option when necessary.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid linking the entire label as it could cause issues with the selection.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Description (optional)

If additional information about the label is required, a description can be included.

## Examples

### Label and description

Radios must always have a label and can also feature a description.

<cdx-demo-wrapper>
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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

This demo uses the [Field](./field.md) component—usage of this component is described in the next
section. Always include label text via the default slot. You can also add description text via the
`#description` slot.

</cdx-accordion>

### Form field

When used in a form, a group of Radios can be wrapped in the Field component to add features like a
semantic label, description and help text, validation messages, and more. Visit the
[Field](./field.md) page for more information.

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

When building a Radio field, **always set `isFieldset` to `true`** to ensure proper accessibility
support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

</cdx-accordion>

### Radio group

Radios must be used in multiples.

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

For a group of Radios, each Radio component's `v-model` will be bound to the same ref, which is
equal to the `inputValue` prop of the selected Radio. Use the same `name` prop for all of the Radio
components in a group.

This demo shows what to do when using a Radio group outside of a form:
1. Wrap the group in an element with `role="radiogroup"`
2. Connect the group with a label via the `aria-labelledby` attribute

</cdx-accordion>

### Inline Radios

Radios can be horizontally stacked if needed in some specific cases. However, the recommendation is to vertically stack them to keep consistency across forms.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use inline Radios, but reserve its use for specific cases to prevent disruptions in the reading flow.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using inline Radios if there are too many radios per line.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using inline Radios if there is significant variation in the length of the radio labels.</cdx-demo-best-practice>

</cdx-demo-best-practices>

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Use the `inline` prop to get an inline layout.

</cdx-accordion>

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

### With custom input

An additional input field can be included within the Radio to allow the user to input a custom response. The custom input within the Radio can include any of the following form components designed to gather user input, including:

- TextInput and TextArea
- Select
- Combobox
- ChipInput
- Lookup
- A combination of more than one input

<cdx-demo-best-practices>

<cdx-demo-best-practice>Display the custom input at the end of a Radio group whenever possible.</cdx-demo-best-practice>
<cdx-demo-best-practice>Disable the custom input unless its corresponding Radio is selected.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Design a layout where multiple Radios include custom inputs visible simultaneously.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<radios-with-custom-input />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadiosWithCustomInput.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadiosWithCustomInput.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

To add a custom input, use the `custom-input` slot to pass in an input like TextInput, TextArea,
Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

In the example below, the custom input is always visible but remains disabled
until its parent Radio component is selected.
Inside the custom input `<div>`, a Field wraps the TextInput to display its own validation message.

</cdx-accordion>

## Technical implementation

### Vue usage

Typical use of this component will involve using `v-for` to loop through an array of items and
output a Radio component for each one. Each Radio will have the same `v-model` binding and `name`
prop, but different `inputValue` props and label content.<br>
The `v-model` value is the `inputValue` of the Radio that is currently on.

### CSS-only version

#### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-radio">
		<div class="cdx-radio__wrapper">
			<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
			<span class="cdx-radio__icon"></span>
			<div class="cdx-radio__label cdx-label">
				<label for="radio-css-only-1" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Radio 1
					</span>
				</label>
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-radio">
	<div class="cdx-radio__wrapper">
		<!-- `<input>` element with id, type, name, and any other necessary
		attributes. The actual input is visually hidden. -->
		<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
		<!-- Empty `<span>` element that will be styled to look like a radio input. -->
		<span class="cdx-radio__icon"></span>
		<div class="cdx-radio__label cdx-label">
			<!-- Label with `for` attribute matching the input's id. -->
			<label for="radio-css-only-1" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Radio 1
				</span>
			</label>
		</div>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### With description

To add a description below the label:
- Add a `<span>` after the `<label>` element with an ID and class `cdx-label__description`.
  Include the description text here.
- Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">Search completion</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-description-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Default (recommended)
							</span>
						</label>
						<span id="cdx-description-css-1" class="cdx-label__description">
							Corrects up to two typos. Removes redirects that are very similar to the main title.
						</span>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-description-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Strict mode (advanced)
							</span>
						</label>
						<span id="cdx-description-css-2" class="cdx-label__description">
							No typo correction. No accent folding. Strict matching.
						</span>
					</div>
				</div>
			</div>
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
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-description-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Default (recommended)
							</span>
						</label>
						<span id="cdx-description-css-1" class="cdx-label__description">
							Corrects up to two typos. Removes redirects that are very similar to the main title.
						</span>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-description-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Strict mode (advanced)
							</span>
						</label>
						<span id="cdx-description-css-2" class="cdx-label__description">
							No typo correction. No accent folding. Strict matching.
						</span>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
```

</template>
</cdx-demo-wrapper>

#### Radio group

Native attributes of the `<input>` element can be used. For example:
- Add the `checked` attribute to the `<input>` element if it should be selected initially.
- Add the `disabled` attribute to the `<input>` element if it should be disabled.

Always include one of these two features for accessible grouping:
1. If using the Radio group in a field, wrap the group in a `<fieldset>` element and add a
  `<legend>` element with the group label. This method is demonstrated below and requires some
  style resets on `<fieldset>` and `<legend>`. You can use the CSS-only [Field](./field.md#css-only-version)
  and [Label](./label.md#css-only-version) components to reset browser styles of these elements.
2. If using the Radio group outside of a field, wrap the group in a `<div>` with `role="group"`
  and `aria-labelledby` set to the ID of the group label. Check an example of this
  [above](#radio-group).

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Radio group demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 3, which has a very long label that spans onto a second line to
								demonstrate what happens when text wraps
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-4" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 4 (disabled)
							</span>
						</label>
					</div>
				</div>
			</div>
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
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 3, which has a very long label that spans onto a second line to
								demonstrate what happens when text wraps
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-4" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 4 (disabled)
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
```

</template>
</cdx-demo-wrapper>

#### Inline Radios

Add the `cdx-radio--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only inline Radio demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-radio cdx-radio--inline">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-inline-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio cdx-radio--inline">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-inline-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2
							</span>
						</label>
					</div>
				</div>
			</div>
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
			<div class="cdx-radio cdx-radio--inline">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-inline-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio cdx-radio--inline">
				<div class="cdx-radio__wrapper">
					<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-group-css-only-inline-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
```

</template>
</cdx-demo-wrapper>

#### With custom input

To add a custom input, add a `<div>` element with the
`cdx-radio__custom-input` class inside a Radio.
Inside the custom input, add an input like TextInput, TextArea, Select,
Combobox, ChipInput, Lookup, or a combination of more than one input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Radio custom input demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-1" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-2" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-3" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 3, with custom input
							</span>
						</label>
					</div>
				</div>
				<div class="cdx-radio__custom-input">
					<div class="cdx-text-input">
						<input
							class="cdx-text-input__input"
							type="text"
							placeholder="Start typing..."
						/>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Radio custom input demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-1" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-2" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only" checked>
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="radio-custom-input-css-only-3" class="cdx-radio__input" type="radio" name="radio-custom-input-css-only">
					<span class="cdx-radio__icon"></span>
					<div class="cdx-radio__label cdx-label">
						<label for="radio-custom-input-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Radio 3 with custom input
							</span>
						</label>
					</div>
				</div>
				<div class="cdx-radio__custom-input">
					<div class="cdx-text-input">
						<input
							class="cdx-text-input__input"
							type="text"
							placeholder="Start typing..."
						/>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
```
</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | The focus is placed on the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | The focus is placed on the previous interactive element. |
| <kbd>Up arrow</kbd> / <kbd>Down arrow</kbd> / <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | When the focus is placed on a Radio within a group, the arrow keys move the focus between the different Radios and select them. |
