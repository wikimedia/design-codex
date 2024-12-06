<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import CheckboxGroup from '@/../component-demos/checkbox/examples/CheckboxGroup.vue';
import InlineCheckboxes from '@/../component-demos/checkbox/examples/InlineCheckboxes.vue';
import IndeterminateState from '@/../component-demos/checkbox/examples/IndeterminateState.vue';
import CheckboxWithDescription from '@/../component-demos/checkbox/examples/CheckboxWithDescription.vue';
import CheckboxField from '@/../component-demos/checkbox/examples/CheckboxField.vue';
import CheckboxConfigurable from '@/../component-demos/checkbox/examples/CheckboxConfigurable.vue';
import CheckboxWithCustomInput from '@/../component-demos/checkbox/examples/CheckboxWithCustomInput.vue';

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
		name: 'indeterminate',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Checkbox label'
	},
	{
		name: 'description',
		type: 'slot',
		default: ''
	}
];
</script>

A Checkbox is a binary input that can appear by itself or in a multiselect
group. Checkboxes can be selected, unselected or in an indeterminate state.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<checkbox-configurable v-bind="propValues">
		{{ slotValues.default }}
		<template #description>
			{{ slotValues.description }}
		</template>
	</checkbox-configurable>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Checkbox

Checkbox must feature a descriptive label. They may appear alone, such as in a disclaimer, or as a part of a group. A
Checkbox may also have sub-options or child Checkboxes.

Use the Checkbox component when you want users to make one or more selections from a list of
options. A Checkbox can also be used to accept terms and conditions. Avoid using Checkbox when
only one selection is allowed; in such cases, use [Radio](./radio.md) instead.

### About Checkbox

Checkbox includes the following elements.

#### Checkbox

The Checkbox’s input makes the selection visually distinct.

#### Label

The Checkbox must always contain a label, with the text size matching the base font size for consistency with the body text. Labels can include links and bold text and should be concise, clearly indicating the selected option.

<cdx-demo-best-practices>

<cdx-demo-best-practice>

Keep the choices short and mutually exclusive. [*Concise*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-concise), [*Clear*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html#is-this-trustworthy)

</cdx-demo-best-practice>
<cdx-demo-best-practice>Use text formatting like bold and italic sparingly in the label.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include standalone links within the label to provide additional information regarding a specific option when necessary.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid linking the entire label as it could cause issues with the selection.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Description (optional)

If additional information about the label is required, a description can be included.

## Examples

### Label and description

Checkboxes must always have a label and can also feature a description.

<cdx-demo-wrapper>
<template v-slot:demo>
	<checkbox-with-description />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/CheckboxWithDescription.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/CheckboxWithDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

Always include label text via the default slot. You can also add description text via the
`#description` slot.

A single Checkbox does not need an `inputValue` prop. `v-model` is bound to a
boolean value: `true` for checked, `false` for unchecked.

</cdx-accordion>

### Form field

When used in a form, a single Checkbox or group of Checkboxes can be wrapped in the Field component
to add features like a semantic label, description and help text, validation messages, and more.
See the [Field](./field.md) page for more information.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Create a direct question or a complete sentence to precede the Checkboxes. [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Include inline error messages for both individual and groups of Checkboxes to inform users and guide them in fixing issues.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

If using a Checkbox or Checkbox group outside of a form, follow the instructions in the next demo.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<checkbox-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/CheckboxField.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/CheckboxField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

When building a Checkbox field, **always set `isFieldset` to `true`**, even for a single Checkbox,
to ensure accessibility support. This wraps the group in a `<fieldset>` element and labels it
with an associated `<legend>`.

</cdx-accordion>

### Checkbox group

Checkboxes are most typically used in groups.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<checkbox-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/CheckboxGroup.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/CheckboxGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

For a group of related Checkboxes, each Checkbox component's `v-model` will be bound to an array of
the `inputValue` props of the Checkboxes that are currently "on".

This demo shows what to do when using a Checkbox group outside of a form:
1. Wrap the group in an element with `role="group"`
2. Connect the group with a label via the `aria-labelledby` attribute

</cdx-accordion>

### Inline Checkboxes

Checkboxes can be horizontally stacked if needed in some specific cases. However, the recommendation is to vertically stack them to maintain visual flow.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use inline Checkboxes for specific cases to prevent disruptions in the reading flow.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using inline Checkboxes if there are too many Checkboxes per line.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using inline Checkboxes if there is significant variation in the length of the Checkbox labels.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<inline-checkboxes />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/InlineCheckboxes.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/InlineCheckboxes.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

Use the `inline` prop to get an inline layout.

</cdx-accordion>

### Indeterminate state

In addition to selected and unselected, a Checkbox can be in an `indeterminate` state. This state is common for checkboxes to present a number of sub-options (which are also checkboxes). If all of the sub-options are checked, the main checkbox will also be checked, and if they're all unchecked, the main checkbox would be unchecked. If any one or more of the sub-options have a
different state than the others, the main checkbox would present an [indeterminate state checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes).

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use the indeterminate Checkbox when there is a long list of sub-checkboxes to select.</cdx-demo-best-practice>
<cdx-demo-best-practice>Align secondary Checkboxes with the label of the indeterminate Checkbox.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<indeterminate-state />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/IndeterminateState.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/IndeterminateState.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

The parent component must house the logic to set a Checkbox to the `indeterminate` state via this
prop (e.g. in the case of a set of nested checkboxes where some boxes are checked and some are not,
making the parent checkbox neither fully on nor fully off).

This prop is independent of the value provided by `v-model`. If `indeterminate` is set to `true`,
the indeterminate visual state will display, but the value will not be affected. Nor will the value
affect the visual state: `indeterminate` overrides the checked and unchecked visual states. If
`indeterminate` changes to `false`, the visual state will reflect the current `v-model` value.

</cdx-accordion>

### With custom input

An additional input field can be included within the Checkbox to allow the user to input a custom response. The custom input within the Checkbox can include any of the following form components designed to gather user input, including:

- TextInput and TextArea
- Select
- Combobox
- ChipInput
- Lookup
- A combination of more than one input

<cdx-demo-best-practices>

<cdx-demo-best-practice>Display the custom input at the end of a Checkbox group whenever possible.</cdx-demo-best-practice>
<cdx-demo-best-practice>Disable the custom input unless its corresponding Checkbox is selected.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't design a layout where multiple Checkboxes include custom inputs visible simultaneously.</cdx-demo-best-practice>

</cdx-demo-best-practices>

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<checkbox-with-custom-input />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/checkbox/examples/CheckboxWithCustomInput.vue [NPM]

<<< @/../component-demos/checkbox/examples-mw/CheckboxWithCustomInput.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

To add a custom input, use the `custom-input` slot to pass in an input like TextInput, TextArea,
Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

In the example below, the custom input is always visible but remains disabled until the parent
Checkbox is selected. Inside the custom input `<div>`, a Field wraps the TextInput to display its
own validation message.

Open the console to review form data on submission.

</cdx-accordion>

## Technical implementation

### Vue usage

Typical use of this component will involve using `v-for` to loop through an array of items and
output a Checkbox component for each one. Each Checkbox will have the same `v-model` prop, but
different `inputValue` props and label content.

For a single Checkbox, the `v-model` value will be a boolean `true` when the checkbox is checked
and `false` when unchecked.

For multiple Checkboxes, the `v-model` value will be an array of the `inputValue` props of any
currently checked checkboxes (or an empty array if no checkboxes are checked).

### CSS-only version

#### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-checkbox">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-css-only-1" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-css-only-1" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Checkbox 1
					</span>
				</label>
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-checkbox">
	<div class="cdx-checkbox__wrapper">
		<!-- <input> element with id, type, and any other necessary attributes.
		The actual input is visually hidden. -->
		<input id="checkbox-css-only-1" class="cdx-checkbox__input" type="checkbox">
		<!-- Empty span that will be styled to look like a checkbox input. -->
		<span class="cdx-checkbox__icon"></span>
		<div class="cdx-checkbox__label cdx-label">
			<!-- Label with `for` attribute matching the input's id. -->
			<label for="checkbox-css-only-1" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Checkbox 1
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
- Add an `aria-describedby` attribute to the `<input>` element whose value is the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-checkbox">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-description-css-only-1" class="cdx-checkbox__input" type="checkbox" aria-describedby="cdx-description-css-1">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-description-css-only-1" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Send password reset emails only when both email address and username are provided.
					</span>
				</label>
				<span id="cdx-description-css-1" class="cdx-label__description">
					This improves privacy and helps prevent unsolicited emails.
				</span>
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-checkbox">
	<div class="cdx-checkbox__wrapper">
		<input id="checkbox-description-css-only-1" class="cdx-checkbox__input" type="checkbox" aria-describedby="cdx-description-css-1">
		<span class="cdx-checkbox__icon"></span>
		<div class="cdx-checkbox__label cdx-label">
			<label for="checkbox-description-css-only-1" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Send password reset emails only when both email address and username are provided.
				</span>
			</label>
			<span id="cdx-description-css-1" class="cdx-label__description">
				This improves privacy and helps prevent unsolicited emails.
			</span>
		</div>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### Checkbox group

Native attributes of the `<input>` element can be used. For example:
- Add the `checked` attribute to the `<input>` element if it should be selected initially.
- Add the `disabled` attribute to the `<input>` element if it should be disabled.

Note that `indeterminate` is not supported in the CSS-only version since it cannot be set without
JavaScript.

Always include one of these two features for accessible grouping:
1. If using the Checkbox group in a field, wrap the group in a `<fieldset>` element and add a
  `<legend>` element with the group label. This method is demonstrated below and requires some
  style resets on `<fieldset>` and `<legend>`. You can use the CSS-only [Field](./field.md#css-only-version)
  and [Label](./label.md#css-only-version) components to reset browser styles of these elements.
2. If using the Checkbox group outside of a field, wrap the group in a `<div>` with `role="group"`
  and `aria-labelledby` set to the ID of the group label. See an example of this
  [above](#checkbox-group).

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Checkbox group demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-1" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-3" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-4" class="cdx-checkbox__input" type="checkbox" disabled>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-4" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 4 (disabled)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-5" class="cdx-checkbox__input" type="checkbox" checked disabled>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-5" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 5 (initially selected, disabled)
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
			<span class="cdx-label__label__text">CSS-only Checkbox group demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-1" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-3" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-4" class="cdx-checkbox__input" type="checkbox" disabled>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-4" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 4 (disabled)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-group-css-only-5" class="cdx-checkbox__input" type="checkbox" checked disabled>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-group-css-only-5" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 5 (initially selected, disabled)
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

#### Inline Checkboxes

Add the `cdx-checkbox--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-checkbox cdx-checkbox--inline">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-group-inline-css-only-1" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-group-inline-css-only-1" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Checkbox 1
					</span>
				</label>
			</div>
		</div>
	</div>
	<div class="cdx-checkbox cdx-checkbox--inline">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-group-inline-css-only-2" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-group-inline-css-only-2" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Checkbox 2
					</span>
				</label>
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-checkbox cdx-checkbox--inline">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-group-inline-css-only-1" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-group-inline-css-only-1" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Checkbox 1
					</span>
				</label>
			</div>
		</div>
	</div>
	<div class="cdx-checkbox cdx-checkbox--inline">
		<div class="cdx-checkbox__wrapper">
			<input id="checkbox-group-inline-css-only-2" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<div class="cdx-checkbox__label cdx-label">
				<label for="checkbox-group-inline-css-only-2" class="cdx-label__label">
					<span class="cdx-label__label__text">
						Checkbox 2
					</span>
				</label>
			</div>
		</div>
	</div>
```

</template>
</cdx-demo-wrapper>

#### With custom input

To add a custom input, add a `<div>` element with the
`cdx-radio__custom-input` class inside a Checkbox.
Inside the custom input, add an input like TextInput, TextArea, Select,
Combobox, ChipInput, Lookup, or a combination of more than one input.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Checkbox custom input demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-1" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-3" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 3, with custom input
							</span>
						</label>
					</div>
				</div>
				<div class="cdx-checkbox__custom-input">
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
			<span class="cdx-label__label__text">CSS-only Checkbox custom input demo</span>
		</legend>
		<div class="cdx-field__control">
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-1" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-1" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 1
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-2" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 2 (initially selected)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="cdx-checkbox">
				<div class="cdx-checkbox__wrapper">
					<input id="checkbox-custom-input-css-only-3" class="cdx-checkbox__input" type="checkbox">
					<span class="cdx-checkbox__icon"></span>
					<div class="cdx-checkbox__label cdx-label">
						<label for="checkbox-custom-input-css-only-3" class="cdx-label__label">
							<span class="cdx-label__label__text">
								Checkbox 3, with custom input
							</span>
						</label>
					</div>
				</div>
				<div class="cdx-checkbox__custom-input">
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
| <kbd>Tab</kbd> | It moves the focus to the next Checkbox within a group or to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous Checkbox within a group or to the previous interactive element. |
| <kbd>Space</kbd> | If the focus is placed on the Checkbox, it toggles the Checkbox state. |
