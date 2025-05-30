---
outline: [2,3]
---

# Definition and Structure

## What are design tokens?

Design tokens are the smallest units that store Codex visual styles and design decisions. They
define, document, and apply consistent design decisions across Codex components and other user interface
elements, making it easy to scale and maintain visual coherence between design and code.

They are based on the visual styles defined in the [style guide](../style-guide/overview), which are
translated into code through tokens.

## Token types

There are three types of tokens, depending on their function and level of abstraction:

### Option tokens

Option tokens are context-agnostic and represent the primitive visual foundations of the system.
They use raw values and have simple, generic names that do not indicate a specific use case. For
example, the option token `color.blue700` stores the hex value `#36c`.

Option tokens are not used directly to style components or elements—they are only meant to define
raw values for use in decision or component tokens.

Option tokens are captured in the theme specific JSON file in the `codex-design-tokens` package:
`themes/wikimedia-ui.json`

### Decision tokens

Decision tokens represent design decisions that can be reused to style system components. They use
option tokens as raw values and communicate their intended use case via their name. For example, the
decision token `color-progressive` reuses the option token `color.blue700`.

Use decision tokens to style components based on predefined design choices.

This set of tokens is collected in the  `application.json` file in the `codex-design-tokens`
package.

#### Modes

A given Codex theme may also optionally support one or more variants, called
"modes". For example, a dark or high-contrast color mode might override certain
color tokens defined in `application.json` with alternate values drawn from the
same set of option tokens. For more information about how Codex handles
modes, visit [alternate color modes](../using-codex/adrs/08-adr-color-modes.md).

### Component tokens

Within Codex, component tokens are used to define styles for specific components when those styles
cannot be covered by shared decision tokens. They are exceptions, meant for single-use cases, so
their names include the component and the property they affect. Component tokens usually consume
decision tokens, but in some cases, they can also be based directly on raw values from option
tokens. An example of a component token is `color-link-red`, which reuses the decision token
`color-destructive`.

Avoid using component tokens for styles that could be reused across multiple components. If a style
is reusable, use or convert it into a decision token instead.

Component tokens are defined in a dedicated `components.json` file in the `codex-design-tokens`
package.
