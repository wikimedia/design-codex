# Definition and Structure

## 1. What are design tokens?

Design tokens are the smallest units that store Codex visual styles and design decisions. They define, document, and apply consistent design decisions across Codex components and other UI elements, making it easier to scale and maintain visual coherence between design and code.

They are based on the visual styles defined in the [style guide](../style-guide/overview), which are translated into code through tokens.

### Token typologies

There are three types of tokens, depending on their function and level of
abstraction:

#### Option tokens (theme options)

Option tokens are context-agnostic tokens that encapsulate the primitive visual
foundations of the system. They use raw values and have simple, generic names that do not indicate a specific use case. For example, the option token `color.blue700` stores the hex value `#36c`.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">Avoid using option tokens to style components. They are only meant to define raw values for use in decision (or component) tokens.</cdx-demo-best-practice>
</cdx-demo-best-practices>

Option tokens are captured in the theme specific JSON file: `themes/wikimedia-ui.json`

#### Decision tokens (application tokens)

Decision tokens consume option tokens as raw values. They represent design decisions that can be reused to style system components. For this reason, they communicate their intended use case via their name. For example, the decision token `color-progressive` reuses the option token `color.blue700`.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use decision tokens to style components based on predefined design choices.</cdx-demo-best-practice>
</cdx-demo-best-practices>

This set of tokens is collected in the JSON file `application.json`.

##### Modes (theme variants)

A given Codex theme may also optionally support one or more variants, called
"modes". For example, a dark or high-contrast color mode might override certain
color tokens defined in `application.json` with alternate values drawn from the
same set of option tokens. For more information about how Codex will represent
modes, visit [ADR 08](../using-codex/adrs/08-adr-color-modes.md).

#### Component tokens (use only in exceptions)

In the context of Codex, component tokens are used to define styles for specific components when those styles cannot be covered by shared decision tokens. They are exceptions, meant for single-use cases, so their names include the component and the property they affect. Component tokens usually consume decision tokens, but in some cases, they can also be based directly on raw values from option tokens. An example of a component token is `color-link-red`, which reuses the decision token `color-destructive`.

<cdx-demo-best-practices>
<cdx-demo-best-practice type="dont">Avoid using component tokens for styles that could be reused across multiple components. If a style is reusable, use or convert it into a decision token instead.</cdx-demo-best-practice>
</cdx-demo-best-practices>

Component tokens are defined in a dedicated `components.json` file.

## 2. Tokens in design

### From design to implementation
Designers can access an overview of Codex foundational styles and principles, along with their token translation, in the
[Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11). By enabling this library in their project’s Figma files,
designers can reuse the Codex visual principles as Figma styles and variables when creating components and compositions.

::: info
Please note that tokens are context-specific: use them accordingly to the
intended purpose expressed by their name. E.g. Apply content colors only to
text.
:::

During implementation, engineers will be able to follow the design
specifications in Figma (whether these are presented explicitly, or via the
Inspect panel) and use the correct design tokens as values of the component’s
CSS properties.

![Design tokens when applied in code, here screenshot of primary button variant](../assets/design-tokens-overview/using-tokens-code.png)

Please find all current design system token category demos in this section of
the Codex docs, starting at [Animation](animation.md) and ending at
[Z-Index](z-index.md).

## 3. Tokens in code
### File organization
Codex token files are structured to cater to Wikimedia's multi-theme,
multi-mode environment. Base tokens apply the theme-agnostic named tokens from
`themes` JSON files across components and patterns. Single component tokens also
apply theme-agnostic named tokens.

1. **Theme tokens (`themes/*.json` files): Design options**<br>
Themes are defined in JSON files with theme-agnostic keys and theme-specific
values. Theme tokens are not meant to ever be directly applied in Codex
stylesheet rules for components or patterns. They are only the internal pool of
design options for the decisions represented by base and component tokens.

2. **Base tokens (`application.json` and `modes/*.json`): Design decisions**<br>
The base tokens `application.json` file and the component tokens
`components.json` file are featuring the design decisions. All token keys follow
a more semantic, developer-friendly naming scheme, where values from the
design options token pool above are applied into decisions. Base tokens are used
across various components. If mode-specific overrides have been defined, they
should live in `modes/*.json` files; these files will contain a subset of the
base tokens (using the same names) and will provide new values (drawing from
different option tokens within the same theme).

3. **Component tokens (`components.json`): Design decisions**<br>
The component tokens `components.json` file collects only single-component
design decisions, that are not covered by the base tokens. All component tokens
carry the single-file-component name in their name after the token category, for
example `background-color-button-quiet--hover`. <br>
Important reasons for separating component from base tokens are to support
identifying consistency gaps and emerging design patterns across components or
to surface very close values for combination later.

### Naming and definition structure
To create an extensible structure that is easily understood by humans, we follow
these rules when naming tokens:

- The JSON keys follow CSS property names for the sake of familiarity and
  readability. They follow by and large
  [variable naming patterns established for MediaWiki](https://www.mediawiki.org/wiki/Manual:Coding_conventions/CSS#Variable_naming).
  For example, we use `{ font-weight.100 }` instead of `{ font.weight.100 }`.
  There are a few category naming exceptions like `size` and `spacing` tokens, in
  order to reuse them in different property contexts – as values in `width`,
  `height`, `padding` and so on.
- The name describing the CSS property or category value always comes first,
  which makes it obvious when a token is improperly applied to a different
  property, e.g. ~~`color: @background-color-base`~~.
- Tokens with numerical values are centered around a default key of `100`. This
  is critical to creating a structure that is flexible and theme-agnostic. For
  example, base size is defined by `{ dimension.100 }`, which could be used to
  define a default theme base font size of `16px`, or a theme-specific base font
  size of `14px`, depending on what theme the size token is set to. Because the
  names of the design tokens do not refer to a specific value, they can be reused
  by both the default and other themes.

### Further technical notes
- Note, that normalization and reset values like `0` or `none` are not tokenized
  as they aren't used for design decisions.<br>
  `box-shadow: none` or `z-index: 0` on the other hand are representing design
  decisions.
- We're not using [Style Dictionary's predefined transform groups](https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md)
  for all stylesheet formats (CSS, Less and Sass) in order to keep precise
  control over output. For cross-browser support, we rely on a variety of output
  values for different applications (example: `transparent` over 'color/css'
  output hexadecimal color `#00000000`) and also deliver small performance gems
  like hex color shorthands.
