# 12) Native constraint validation

Date: 2024-10-24

## Status

Accepted

## Context

Codex is commonly used to construct forms. Form fields often need to be validated on the client
side to help users input properly formatted data. Currently, all validation of form inputs and
controls must be implemented by the feature developer.

HTML5 provides [native tools](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
for validating inputs based on their [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#semantic_input_types)
and a variety of [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes),
and the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api)
enables checking more complex constraints. These tools can check the validity of an input, emit an
event when the input is found to be invalid, detail exactly how the input is invalid, and provide a
user-facing message explaining the problem.

If these tools were made available within Codex components, developers could use native constraint
validation rather than implementing their own, vastly simplifying the process of validating form
inputs. Custom input validation will still be necessary in some places, but native browser
validation (required, common formats such as dates, times, email addresses, etc.) will often be
sufficient.

## Considered actions

### Working with the Field component and status prop

Codex form components already have their own error styling and "status" state (success, error,
warning, etc.). We wanted to ensure that adding support for native browser validations would not
conflict with this.

We considered automatically setting the `status` of a component to "error" when a new `invalid`
event occurs, and emitting an event to tell a parent Field component of the change. The alternative
would be to continue requiring the developer to bind the current `status` to the Field component and
update it on `invalid` events. To support the latter case, we considered a new
[composable](https://doc.wikimedia.org/codex/latest/composables/overview.html) to provide helpers to
make using the native API and integrating it with the Field simpler.

### Component coverage

We also considered which components should support native constraint validation. Many components can
be used in forms, but the native API is less helpful or possible to implement for some of them. For
instance, the only relevant attribute for binary inputs like Checkbox, Radio, and ToggleSwitch is
`required`, and it cannot be used to check groups of these inputs, so it is only useful when there
is a single Checkbox or ToggleSwitch that must be checked. Additionally, in the Select component, we
do not use the native `<select>` element, so we can't take advantage of native validation.

### Error UI

The native API can display native validation messages in a browser-specific UI. We considered
whether to allow this, for example when the Field component is not being used, or only to support
passing the validation messages into the Field component for display.

## Decision

We decided not to automatically update the `status` prop of the input component or Field component
on the `invalid` event because we can't predict with certainty the status that should be set given a
specific [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) nor when
to set the status back to "default", and because the way status is passed between Field and its
children is already quite complex. Instead, we will continue work on the new `useNativeValidation`
composable to make it easy to work with native validation.

We will aim to support native validation in the following components:
- TextInput
- TextArea
- Checkbox
- Radio
- ToggleSwitch
- SearchInput
- Combobox
- ChipInput
- Lookup

Finally, we will allow the native validation message UI in cases where the Field component is not
used, but will encourage use of the Field component as much as possible to create a consistent UI
across products.

## Consequences

Native validation will provide an easy and standard way to validate form inputs.

## Acknowledgements

This feature was proposed by Itamar Givon of Wikimedia Deutschland, including several patches
demonstrating an implementation strategy for TextInput and the new composable that we intend to
finalize and publish (see [task](https://phabricator.wikimedia.org/T373872),
[patch chain](https://gerrit.wikimedia.org/r/c/design/codex/+/1070241)). Many thanks to Itamar for
proposing this work and contributing code to Codex!
