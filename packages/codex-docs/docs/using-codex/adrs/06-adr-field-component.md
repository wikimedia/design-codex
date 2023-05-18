# 06) Field component

Date: 2023-05-18

## Status

Accepted

## Context

The Design Systems Team would like to add a Field component to Codex, containing a form input or
control plus features like a semantic label, helper text, validation messages and styles, and more.
There are several ways we could implement such a component and we wanted to find a balance between
ease of use and enough flexibility, all while ensuring a high degree of accessibility.

## Considered actions

Given that the Field component would contain various features such as a `<label>` element, tooltip
popup next to the label, description/helper text, validation message, character counter, and field
action (such as a "delete" button), we opted to build a component rather than a composable. If we
wrote a composable, we would have had to handle all of the different markup and slots within render
functions. This is something we have avoided elsewhere in the library; we try to use templates
whenever possible as we find them easier to read and accessible to more people.

We considered several implementation paths:

### Integrated Field component

In this implementation, the Field component is integrated into form input and control components
(although it can also be used by developer users who want to create a custom form field). For most
cases, developer users would pass field parameters (label text, description text, etc.) directly
into the form input or control component, e.g. TextInput.

```vue-html
<cdx-text-input
	v-model="inputValue"
	label="Username"
	description="Enter a unique username. Don't use your real name."
	:status="inputStatus"
/>
```

This implementation means dev users only need to use a single component, and may encourage them to
add features like a semantic label. It also would make it easier to apply input-specific field
features, like the character counter for the TextInput and TextArea.

However, this implementation does not encourage easy composition. We could set it up so that you
could use the Field component directly and turn off the field features in the form input or control
components used to build a custom field, but this is not intuitive. We would also need to create
separate RadioGroup and CheckboxGroup components to properly handle semantic labelling.
Documentation of field features would have to be displayed on the Field demo page and all form
input and control component demo pages. We also evaluated this to be more complex from a library
development and maintenance standpoint.

### Standalone Field component

In this implementation, the Field component gets used directly by the developer user, and form
input and control components do not internally use the Field component. The dev user wraps the form
input or control component in the Field component.

```vue-html
<cdx-field
	label="Username"
	description="Enter a unique username. Don't use your real name."
	:status="inputStatus"
>
	<cdx-text-input v-model="inputValue" />
</cdx-field>
```

This implementation means that Field features are documented in a single place: the Field demo
page. It also makes it easier to handle input groups, so we wouldn't need new components for
RadioGroup or CheckboxGroup. It encourages maximum flexibility: complex fields with multiple inputs
can easily be composed. The building blocks are simpler and easier to maintain.

However, this does mean that dev users must use 2 components instead of 1, which could discourage
them from adding important elements like a semantic label. It also makes it more difficult to
implement input-specific features like the character count.

### Both

We also considered doing both of these things by creating "InputField" components. For example,
we'd leave the TextInput component alone, but create a new TextInputField component that integrates
the Field component with TextInput. This would give people more granular tools, but be more
components to maintain and demonstrate.

## Decision

Based on feedback from potential developer users, we chose the standalone Field component option,
which we believe will not only be easier to develop and maintain, but will give our users the
flexibility they need to build complex fields. We also think this will be most straightforward from
a documentation standpoint, helping developer users quickly and intuitively learn how to build
fields. We could create InputField components in the future if people want them.

## Consequences

- We will enable developer users to build their own field solutions by providing a Field component
  and a series of form input and control components that they can combine as needed
- We will document field features in a single place: the Field demo page
- Building input-specific field features may be more complex in the future

Further reading: https://phabricator.wikimedia.org/T330803
