# Design tokens

**Design tokens are the smallest stylistic pieces of our design system** — specifically, they are
named entities that store visual design attributes to build components and patterns. We use them in
place of hard-coded values (such as hex values for color or pixel values for spacing) in order to
maintain a scalable and consistent visual system for user-interface (UI) development.

Tokens replace static values or single-use variables. Using tokens ensures that only systematic,
pre-made decisions are used to style components and other UI elements and layouts. Tokens prevent
deviations from the system’s visual and interactive rules, and make style modifications possible at
scale and from a single source of truth.

Design tokens help to:

1. Guide the definition of the visual style of components: Since tokens capture the system’s
stylistic pieces, they can provide guidance to designers working to define the styles (background
colors, colors, text formatting, sizes, spacing) of new system components from scratch.

2. Create specifications for handover: Designers use them to specify all the visual and interactive
properties of a given component: this is how design decisions are literally embedded in system
components. For more details regarding the use of design tokens for specification, please refer to
the section dedicated to specification handover (LINK) in the Designing Components section.

Designers can copy them and use them while creating specifications for system components.
Please reach out to the Design Systems team in case you find that a specific token is missing,
incorrect or inconsistent.


## Token structure
### File structure
Codex tokens are structured to cater to Wikimedia's multi-theme environment. Base tokens apply the
theme-agnostic named tokens from 'theme-*' JSON files across components and patterns. Single
component tokens also apply theme-agnostic named tokens.

### Naming structure
To create an extensible structure that is easily understood by humans, we follow these rules when naming tokens:

- Tokens with numerical values are centered around a default key of `100`. This is critical to creating a structure that is flexible and theme-agnostic. For example, base size is defined by `{ size.relative.em.100.value }`, which could be used to define a default theme base font size of 16px, or a theme-specific base font size of 14px, depending on what theme the size token is set to. Because the names of the design tokens do not refer to a specific value, they can be reused by both the default and other themes.
- The JSON keys follow CSS property names for the sake of familiarity and readability. For example, we use
`{ font-weight.100.value }` instead of `{ font.weight.100.value }`. There are a few exceptions for variable shorthands like `size` and `spacing` so we can reuse them in different property contexts.
- The CSS property name always comes first, which makes it obvious when a token is improperly applied to a different property, e.g. `color: @background-color-base`.

### Theme tokens: Design options
Themes are defined in JSON files with theme-agnostic key and theme-specific values.
Theme tokens are not meant to ever be directly applied in Codex components or patterns. They are
only the internal pool for the decisions.

### Base and component tokens: Design decisions
The base tokens 'codex-base.json' file and the component tokens 'codex-components.json' file are
featuring the design decisions. All token keys follow a more semantic, developer-friendly naming
scheme, where design decisions are made by applying values from the design options token pool above.

## Further technical notes
- Note, that normalization and reset values like `0` or `none` are not tokenized as they aren't used
for design decisions.
Exceptions to above are `box-shadow: none` and `z-index: 0`.
- We're not using [Style Dictionary's predefined transform groups](https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md) for all stylesheet formats (CSS, Less
and Sass) in order to keep precise control over output. For cross-browser support, we rely on a
variety of output values for different applications (example: `transparent` over 'color/css' output
hexadecimal color `#00000000`) and also deliver small performance gems like hex color shorthands.

