<script setup>
import CheckboxGroup from '@/../component-demos/checkbox/examples/CheckboxGroup.vue';
import InlineCheckboxes from '@/../component-demos/checkbox/examples/InlineCheckboxes.vue';
import IndeterminateState from '@/../component-demos/checkbox/examples/IndeterminateState.vue';
import CheckboxWithDescription from '@/../component-demos/checkbox/examples/CheckboxWithDescription.vue';
import CheckboxField from '@/../component-demos/checkbox/examples/CheckboxField.vue';
import CheckboxConfigurable from '@/../component-demos/checkbox/examples/CheckboxConfigurable.vue';

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
	}
];
</script>

A Checkbox is a binary input that can appear by itself or in a multiselect
group. Checkboxes can be selected, unselected or in an indeterminate state.

## Guidelines

### Using checkboxes

Checkboxes must feature a descriptive label. They may appear alone or as a part of a group. A
checkbox may also have sub-options or child checkboxes.

Use the Checkbox component when you want users to make one or more selections from a list of
options. A checkbox can also be used to accept terms and conditions. Avoid using checkboxes when
only one selection is allowed; in such cases, use Radio instead.

![Example of a group of two Codex Checkboxes.](../../assets/components/checkbox-using.svg)

### Specifications

![Specification of Checkbox.](../../assets/components/checkbox-specifications.svg)

1. **Checkbox**<br>
The checkbox’s input makes the selection visually distinct.
2. **Label**<br>
The label text size should match the base font size to ensure consistency with the body text. It can
also include links and bold text. Labels should be short, with text that clearly states what action
is selected.

Refer to the
[Checkbox component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2549-59135&mode=design&t=7wyBmhfdJTJevQmT-11).

### Interaction states

The styles for checkbox states were designed with accessible color variations. In addition to the
'check' icon, these make the checkboxes’ selected or unselected states (e.g. disabled, hover,
active) easier to perceive:

![Interaction states of the Checkbox component for both unselected and selected states: default, hover, active, focus, error, error-hover, error-active, error-focus, and disabled.](../../assets/components/checkbox-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default unselected
2. Hover unselected
3. Active unselected
4. Focus unselected
5. Error unselected
6. Error-hover unselected
7. Error-active unselected
8. Error-focus unselected
9. Default selected
10. Hover selected
11. Active selected
12. Focus selected
13. Error selected
14. Error-hover selected
15. Error-active selected
16. Error-focus selected
17. Default indeterminate
18. Disabled unselected
19. Disabled selected
20. Disabled indeterminate

</div>

The error checkbox must always be accompanied by an inline error message,whether for a group or an
individual checkbox. This message ensures users are informed about the error and provides guidance
to fix it.

![Example of accompanying inline error messages on Checkboxes in error state.](../../assets/components/checkbox-using-interaction-states-error.svg)

::: tip Accessibility note
The disabled state does not meet our minimum color contrast rules. WCAG 2.1
states that “…part[s] of an inactive user interface component […] have no contrast requirement”.
<sup>[[1]](#ref1)</sup>
Provide sufficient information in a disabled element's context, so the user can understand what is
disabled and how to enable it (if applicable).
:::

**Indeterminate state**

In addition to selected and unselected, a checkbox can be in an indeterminate state. This state uses
the 'subtract' icon.
It is common for checkboxes to present a number of sub-options (which are also checkboxes). If all
of the sub-options are checked, the main checkbox will also be checked, and if they're all
unchecked, the main checkbox would be unchecked. If any one or more of the sub-options have a
different state than the others, the main  checkbox would present an indeterminate state.
<sup>[[2]](#ref2)</sup>

![One checkbox group with all items selected and another with an indeterminate state due to incomplete item selection.](../../assets/components/checkbox-interaction-states-indeterminate.svg)

### References

1. <span id="ref1">[Web Content Accessibility Guidelines (WCAG) 2.1 – Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)</span>
2. <span id="ref2">[MDN: `<input type="checkbox">` Indeterminate state checkboxes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes)</span>

## Demos

Open up the browser console to see events emitted on input.

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="checkboxValue">
<template v-slot:demo="{ propValues }">
	<checkbox-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Single checkbox with label and description

Always include label text via the default slot. You can also add description text via the
`#description` slot.

A single checkbox does not need an `inputValue` prop. `v-model` is bound to a
boolean value: `true` for checked, `false` for unchecked.

<cdx-demo-wrapper :force-controls="true">
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


### Form field

When used in a form, a single Checkbox or group of Checkboxes can be wrapped in the Field component
to add features like a semantic label, description and help text, validation messages, and more.
See the [Field](./field.md) page for more information.

When building a Checkbox field, **always set `isFieldset` to `true`**, even for a single Checkbox,
to ensure accessibility support. This wraps the group in a `<fieldset>` element and labels it
with an associated `<legend>`.

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

### Checkbox group

For a group of related checkboxes, each Checkbox component's `v-model` will be bound to an array of
the `inputValue` props of the checkboxes that are currently "on".

This demo shows what to do when using a Checkbox group outside of a form:
1. Wrap the group in an element with `role="group"`
2. Connect the group with a label via the `aria-labelledby` attribute

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

### Inline checkboxes

Use the `inline` prop to get an inline layout.

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

### Indeterminate state

The indeterminate state indicates that a checkbox is neither on nor off. Within this component, this
state is purely visual. The parent component must house the logic to set a checkbox to the
indeterminate state via this prop (e.g. in the case of a set of nested checkboxes where some boxes
are checked and some are not, making the parent checkbox neither fully on nor fully off).

This prop is independent of the value provided by `v-model`. If `indeterminate` is set to `true`,
the indeterminate visual state will display, but the value will not be affected. Nor will the value
affect the visual state: indeterminate overrides the checked and unchecked visual states. If
indeterminate changes to false, the visual state will reflect the current v-model value.

In the example below, all of the checkboxes have their `indeterminate` prop set to `true` initially.
As a result, they all appear to be in the indeterminate state initially, whether they are checked or
not. Checking or unchecking a checkbox will undo the indeterminate state since you have provided
a definite value for the checkbox.

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

## Vue usage

Typical use of this component will involve using `v-for` to loop through an array of items and
output a Checkbox component for each one. Each Checkbox will have the same `v-model` prop, but
different `inputValue` props and label content.

For a single checkbox, the `v-model` value will be a boolean `true` when the checkbox is checked
and `false` when unchecked.

For multiple checkboxes, the `v-model` value will be an array of the `inputValue` props of any
currently checked checkboxes (or an empty array if no checkboxes are checked).

## CSS-only version

### Markup structure

The structure below can be used for most cases. If you need a description, see the section on that
feature below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-checkbox">
		<input id="checkbox-css-only-1" class="cdx-checkbox__input" type="checkbox">
		<span class="cdx-checkbox__icon"></span>
		<label class="cdx-checkbox__label" for="checkbox-css-only-1">
			Checkbox 1
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-checkbox">
	<!-- <input> element with id, type, and any other necessary attributes.
	The actual input is visually hidden. -->
	<input id="checkbox-css-only-1" class="cdx-checkbox__input" type="checkbox">
	<!-- Empty span that will be styled to look like a checkbox input. -->
	<span class="cdx-checkbox__icon"></span>
	<!-- Label with `for` attribute matching the input's id. -->
	<label class="cdx-checkbox__label" for="checkbox-css-only-1">
		Checkbox 1
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
- Wrap the label and description in a div with classes `cdx-checkbox__label` and `cdx-label`
- Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-checkbox">
		<input id="checkbox-description-css-only-1" class="cdx-checkbox__input" type="checkbox" aria-describedby="cdx-description-css-1">
		<span class="cdx-checkbox__icon"></span>
		<div class="cdx-checkbox__label cdx-label">
			<label for="checkbox-description-css-only-1" class="cdx-label__label">
				Send password reset emails only when both email address and username are provided.
			</label>
			<span id="cdx-description-css-1" class="cdx-label__description">
				This improves privacy and helps prevent unsolicited emails.
			</span>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-checkbox">
	<input id="checkbox-description-css-only-1" class="cdx-checkbox__input" type="checkbox" aria-describedby="cdx-description-css-1">
	<span class="cdx-checkbox__icon"></span>
	<div class="cdx-checkbox__label cdx-label">
		<label for="checkbox-description-css-only-1" class="cdx-label__label">
			Send password reset emails only when both email address and username are provided.
		</label>
		<span id="cdx-description-css-1" class="cdx-label__description">
			This improves privacy and helps prevent unsolicited emails.
		</span>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

### Checkbox group

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
  [above](#checkbox-group) (you can just include a `<label>` element instead of using the Label
  component).

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<fieldset class="cdx-field">
		<legend class="cdx-label">
			<span class="cdx-label__label__text">CSS-only Checkbox group demo</span>
		</legend>
		<div class="cdx-field__control">
			<span class="cdx-checkbox">
				<input id="checkbox-group-css-only-1" class="cdx-checkbox__input" type="checkbox">
				<span class="cdx-checkbox__icon"></span>
				<label class="cdx-checkbox__label" for="checkbox-group-css-only-1">
					Checkbox 1
				</label>
			</span>
			<span class="cdx-checkbox">
				<input id="checkbox-group-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
				<span class="cdx-checkbox__icon"></span>
				<label class="cdx-checkbox__label" for="checkbox-group-css-only-2">
					Checkbox 2 (initially selected)
				</label>
			</span>
			<span class="cdx-checkbox">
				<input id="checkbox-group-css-only-3" class="cdx-checkbox__input" type="checkbox">
				<span class="cdx-checkbox__icon"></span>
				<label class="cdx-checkbox__label" for="checkbox-group-css-only-3">
					Checkbox 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps
				</label>
			</span>
			<span class="cdx-checkbox">
				<input id="checkbox-group-css-only-4" class="cdx-checkbox__input" type="checkbox" disabled>
				<span class="cdx-checkbox__icon"></span>
				<label class="cdx-checkbox__label" for="checkbox-group-css-only-4">
					Checkbox 4 (disabled)
				</label>
			</span>
			<span class="cdx-checkbox">
				<input id="checkbox-group-css-only-5" class="cdx-checkbox__input" type="checkbox" checked disabled>
				<span class="cdx-checkbox__icon"></span>
				<label class="cdx-checkbox__label" for="checkbox-group-css-only-5">
					Checkbox 5 (initially selected, disabled)
				</label>
			</span>
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
		<span class="cdx-checkbox">
			<input id="checkbox-group-css-only-1" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-1">
				Checkbox 1
			</label>
		</span>
		<span class="cdx-checkbox">
			<input id="checkbox-group-css-only-2" class="cdx-checkbox__input" type="checkbox" checked>
			<span class="cdx-checkbox__icon"></span>
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-2">
				Checkbox 2 (initially selected)
			</label>
		</span>
		<span class="cdx-checkbox">
			<input id="checkbox-group-css-only-3" class="cdx-checkbox__input" type="checkbox">
			<span class="cdx-checkbox__icon"></span>
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-3">
				Checkbox 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps
			</label>
		</span>
		<span class="cdx-checkbox">
			<input id="checkbox-group-css-only-4" class="cdx-checkbox__input" type="checkbox" disabled>
			<span class="cdx-checkbox__icon"></span>
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-4">
				Checkbox 4 (disabled)
			</label>
		</span>
		<span class="cdx-checkbox">
			<input id="checkbox-group-css-only-5" class="cdx-checkbox__input" type="checkbox" checked disabled>
			<span class="cdx-checkbox__icon"></span>
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-5">
				Checkbox 5 (initially selected, disabled)
			</label>
		</span>
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>

### Inline checkboxes

Add the `cdx-checkbox--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-checkbox cdx-checkbox--inline">
		<input id="checkbox-group-inline-css-only-1" class="cdx-checkbox__input" type="checkbox">
		<span class="cdx-checkbox__icon"></span>
		<label class="cdx-checkbox__label" for="checkbox-group-inline-css-only-1">
			Checkbox 1
		</label>
	</span>
	<span class="cdx-checkbox cdx-checkbox--inline">
		<input id="checkbox-group-inline-css-only-2" class="cdx-checkbox__input" type="checkbox">
		<span class="cdx-checkbox__icon"></span>
		<label class="cdx-checkbox__label" for="checkbox-group-inline-css-only-2">
			Checkbox 2
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-checkbox cdx-checkbox--inline">
	<input id="checkbox-group-inline-css-only-1" class="cdx-checkbox__input" type="checkbox">
	<span class="cdx-checkbox__icon"></span>
	<label class="cdx-checkbox__label" for="checkbox-group-inline-css-only-1">
		Checkbox 1
	</label>
</span>
<span class="cdx-checkbox cdx-checkbox--inline">
	<input id="checkbox-group-inline-css-only-2" class="cdx-checkbox__input" type="checkbox">
	<span class="cdx-checkbox__icon"></span>
	<label class="cdx-checkbox__label" for="checkbox-group-inline-css-only-2">
		Checkbox 2
	</label>
</span>
```

</template>
</cdx-demo-wrapper>
